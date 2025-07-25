import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Maximize2, Minimize2, ChevronUp, Sparkles, Zap, Square, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { ResizableTextarea } from "@/components/ui/resizable-textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FilePicker } from "./FilePicker";
import { SlashCommandPicker } from "./SlashCommandPicker";
import { ImagePreview } from "./ImagePreview";
import { useI18n } from "@/lib/i18n";
import { type FileEntry, type SlashCommand } from "@/lib/api";
import { type ClaudeModel } from "@/types/models";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { logger } from "@/lib/logger";

import { handleError } from "@/lib/errorHandler";
/**
 * Props interface for the FloatingPromptInput component
 */
interface FloatingPromptInputProps {
  /**
   * Callback when prompt is sent
   */
  onSend: (prompt: string, model: ClaudeModel) => void;
  /**
   * Whether the input is loading
   */
  isLoading?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Default model to select
   */
  defaultModel?: ClaudeModel;
  /**
   * Project path for file picker
   */
  projectPath?: string;
  /**
   * Optional className for styling
   */
  className?: string;
  /**
   * Callback when cancel is clicked (only during loading)
   */
  onCancel?: () => void;
}

export interface FloatingPromptInputRef {
  addImage: (imagePath: string) => void;
}

/**
 * Thinking mode type definition
 */
type ThinkingMode = "auto" | "think" | "think_hard" | "think_harder" | "ultrathink";

/**
 * Thinking mode configuration
 */
type ThinkingModeConfig = {
  id: ThinkingMode;
  name: string;
  description: string;
  level: number; // 0-4 for visual indicator
  phrase?: string; // The phrase to append
};

const THINKING_MODES: ThinkingModeConfig[] = [
  {
    id: "auto",
    name: "Auto",
    description: "Let Claude decide",
    level: 0,
  },
  {
    id: "think",
    name: "Think",
    description: "Basic reasoning",
    level: 1,
    phrase: "think",
  },
  {
    id: "think_hard",
    name: "Think Hard",
    description: "Deeper analysis",
    level: 2,
    phrase: "think hard",
  },
  {
    id: "think_harder",
    name: "Think Harder",
    description: "Extensive reasoning",
    level: 3,
    phrase: "think harder",
  },
  {
    id: "ultrathink",
    name: "Ultrathink",
    description: "Maximum computation",
    level: 4,
    phrase: "ultrathink",
  },
];

/**
 * ThinkingModeIndicator component - Shows visual indicator bars for thinking level
 */
const ThinkingModeIndicator: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 h-3 rounded-full transition-colors",
            i <= level ? "bg-blue-500" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
};

type Model = {
  id: ClaudeModel;
  name: string;
  description: string;
  icon: React.ReactNode;
};

/**
 * FloatingPromptInput component - Fixed position prompt input with model picker
 *
 * @example
 * const promptRef = useRef<FloatingPromptInputRef>(null);
 * <FloatingPromptInput
 *   ref={promptRef}
 *   onSend={(prompt, model) => logger.debug('Send:', prompt, model)}
 *   isLoading={false}
 * />
 */
/**
 * FloatingPromptInput component for advanced prompt input with AI features
 *
 * A sophisticated floating input interface for Claude Code with features including
 * model selection, thinking modes, image attachments, slash commands, file picker,
 * and resizable text area. Supports various AI thinking levels and provides
 * a comprehensive prompt composition experience.
 *
 * @param onSend - Callback when prompt is submitted
 * @param isLoading - Whether the input is in loading state
 * @param disabled - Whether the input is disabled
 * @param defaultModel - Default Claude model to select
 * @param projectPath - Project path for file operations
 * @param className - Additional CSS classes for styling
 * @param onCancel - Callback when operation is cancelled
 *
 * @example
 * ```tsx
 * const promptRef = useRef<FloatingPromptInputRef>(null);
 *
 * <FloatingPromptInput
 *   ref={promptRef}
 *   onSend={(prompt, model) => {
 *     console.log('Sending prompt:', prompt, 'with model:', model);
 *   }}
 *   isLoading={isProcessing}
 *   defaultModel="claude-3-5-sonnet"
 *   projectPath="/path/to/project"
 *   onCancel={() => cancelOperation()}
 * />
 *
 * // Add image programmatically
 * promptRef.current?.addImage('/path/to/image.png');
 * ```
 */
const FloatingPromptInputInner = (
  {
    onSend,
    isLoading = false,
    disabled = false,
    defaultModel = "sonnet-3-5",
    projectPath,
    className,
    onCancel,
  }: FloatingPromptInputProps,
  ref: React.Ref<FloatingPromptInputRef>
) => {
  const { t } = useI18n();

  const MODELS: Model[] = [
    {
      id: "haiku",
      name: t.agents.claude35Haiku,
      description: t.agents.fastAffordable,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: "sonnet-3-5",
      name: t.agents.claude35Sonnet,
      description: t.agents.balancedPerformance,
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      id: "sonnet-3-7",
      name: t.agents.claude37Sonnet,
      description: t.agents.advancedReasoning,
      icon: <Brain className="h-4 w-4" />,
    },
    {
      id: "sonnet",
      name: t.agents.claude4Sonnet,
      description: t.agents.fasterEfficient,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: "opus",
      name: t.agents.claude4Opus,
      description: t.agents.moreCapable,
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<ClaudeModel>(defaultModel);
  const [selectedThinkingMode, setSelectedThinkingMode] = useState<ThinkingMode>("auto");
  const [isExpanded, setIsExpanded] = useState(false);
  const [modelPickerOpen, setModelPickerOpen] = useState(false);
  const [thinkingModePickerOpen, setThinkingModePickerOpen] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [filePickerQuery, setFilePickerQuery] = useState("");
  const [showSlashCommandPicker, setShowSlashCommandPicker] = useState(false);
  const [slashCommandQuery, setSlashCommandQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [embeddedImages, setEmbeddedImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const textareaRef = useRef<globalThis.HTMLTextAreaElement>(null);
  const expandedTextareaRef = useRef<globalThis.HTMLTextAreaElement>(null);
  const unlistenDragDropRef = useRef<(() => void) | null>(null);

  // Expose a method to add images programmatically
  React.useImperativeHandle(
    ref,
    () => ({
      addImage: (imagePath: string) => {
        setPrompt((currentPrompt) => {
          const existingPaths = extractImagePaths(currentPrompt);
          if (existingPaths.includes(imagePath)) {
            return currentPrompt; // Image already added
          }

          // Wrap path in quotes if it contains spaces
          const mention = imagePath.includes(" ") ? `@"${imagePath}"` : `@${imagePath}`;
          const newPrompt = `${currentPrompt}${currentPrompt.endsWith(" ") || currentPrompt === "" ? "" : " "}${mention} `;

          // Focus the textarea
          globalThis.setTimeout(() => {
            const target = isExpanded ? expandedTextareaRef.current : textareaRef.current;
            target?.focus();
            target?.setSelectionRange(newPrompt.length, newPrompt.length);
          }, 0);

          return newPrompt;
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isExpanded]
  );

  // Helper function to check if a file is an image
  const isImageFile = (path: string): boolean => {
    // Check if it's a data URL
    if (path.startsWith("data:image/")) {
      return true;
    }
    // Otherwise check file extension
    const ext = path.split(".").pop()?.toLowerCase();
    return ["png", "jpg", "jpeg", "gif", "svg", "webp", "ico", "bmp"].includes(ext || "");
  };

  // Extract image paths from prompt text
  const extractImagePaths = useCallback(
    (text: string): string[] => {
      logger.debug("[extractImagePaths] Input text length:", text.length);

      // Updated regex to handle both quoted and unquoted paths
      // Pattern 1: @"path with spaces or data URLs" - quoted paths
      // Pattern 2: @path - unquoted paths (continues until @ or end)
      const quotedRegex = /@"([^"]+)"/g;
      const unquotedRegex = /@([^@\n\s]+)/g;

      const pathsSet = new Set<string>(); // Use Set to ensure uniqueness

      // First, extract quoted paths (including data URLs)
      let matches = Array.from(text.matchAll(quotedRegex));
      logger.debug("[extractImagePaths] Quoted matches:", matches.length);

      for (const match of matches) {
        const path = match[1]; // No need to trim, quotes preserve exact path
        logger.debug(
          "[extractImagePaths] Processing quoted path:",
          path.startsWith("data:") ? "data URL" : path
        );

        // For data URLs, use as-is; for file paths, convert to absolute
        const fullPath = path.startsWith("data:")
          ? path
          : path.startsWith("/")
            ? path
            : projectPath
              ? `${projectPath}/${path}`
              : path;

        if (isImageFile(fullPath)) {
          pathsSet.add(fullPath);
        }
      }

      // Remove quoted mentions from text to avoid double-matching
      const textWithoutQuoted = text.replace(quotedRegex, "");

      // Then extract unquoted paths (typically file paths)
      matches = Array.from(textWithoutQuoted.matchAll(unquotedRegex));
      logger.debug("[extractImagePaths] Unquoted matches:", matches.length);

      for (const match of matches) {
        const path = match[1].trim();
        // Skip if it looks like a data URL fragment (shouldn't happen with proper quoting)
        if (path.includes("data:")) continue;

        logger.debug("[extractImagePaths] Processing unquoted path:", path);

        // Convert relative path to absolute if needed
        const fullPath = path.startsWith("/")
          ? path
          : projectPath
            ? `${projectPath}/${path}`
            : path;

        if (isImageFile(fullPath)) {
          pathsSet.add(fullPath);
        }
      }

      const uniquePaths = Array.from(pathsSet);
      logger.debug("[extractImagePaths] Final extracted paths (unique):", uniquePaths.length);
      return uniquePaths;
    },
    [projectPath]
  );

  // Update embedded images when prompt changes
  useEffect(() => {
    logger.debug("[useEffect] Prompt changed:", prompt);
    const imagePaths = extractImagePaths(prompt);
    logger.debug("[useEffect] Setting embeddedImages to:", imagePaths);
    setEmbeddedImages(imagePaths);
  }, [prompt, projectPath, extractImagePaths]);

  // Set up Tauri drag-drop event listener
  useEffect(() => {
    // This effect runs only once on component mount to set up the listener.
    let lastDropTime = 0;

    const setupListener = async () => {
      try {
        // If a listener from a previous mount/render is still around, clean it up.
        if (unlistenDragDropRef.current) {
          unlistenDragDropRef.current();
        }

        const webview = getCurrentWebviewWindow();
        unlistenDragDropRef.current = await webview.onDragDropEvent((event) => {
          if (event.payload.type === "enter" || event.payload.type === "over") {
            setDragActive(true);
          } else if (event.payload.type === "leave") {
            setDragActive(false);
          } else if (event.payload.type === "drop" && event.payload.paths) {
            setDragActive(false);

            const currentTime = Date.now();
            if (currentTime - lastDropTime < 200) {
              // This debounce is crucial to handle the storm of drop events
              // that Tauri/OS can fire for a single user action.
              return;
            }
            lastDropTime = currentTime;

            const droppedPaths = event.payload.paths as string[];
            const imagePaths = droppedPaths.filter(isImageFile);

            if (imagePaths.length > 0) {
              setPrompt((currentPrompt) => {
                const existingPaths = extractImagePaths(currentPrompt);
                const newPaths = imagePaths.filter((p) => !existingPaths.includes(p));

                if (newPaths.length === 0) {
                  return currentPrompt; // All dropped images are already in the prompt
                }

                // Wrap paths with spaces in quotes for clarity
                const mentionsToAdd = newPaths
                  .map((p) => {
                    // If path contains spaces, wrap in quotes
                    if (p.includes(" ")) {
                      return `@"${p}"`;
                    }
                    return `@${p}`;
                  })
                  .join(" ");
                const newPrompt = `${currentPrompt}${currentPrompt.endsWith(" ") || currentPrompt === "" ? "" : " "}${mentionsToAdd} `;

                globalThis.setTimeout(() => {
                  const target = isExpanded ? expandedTextareaRef.current : textareaRef.current;
                  target?.focus();
                  target?.setSelectionRange(newPrompt.length, newPrompt.length);
                }, 0);

                return newPrompt;
              });
            }
          }
        });
      } catch (error) {
        await handleError("Failed to set up Tauri drag-drop listener:", { context: error });
      }
    };

    setupListener();

    return () => {
      // On unmount, ensure we clean up the listener.
      if (unlistenDragDropRef.current) {
        unlistenDragDropRef.current();
        unlistenDragDropRef.current = null;
      }
    };
  }, [extractImagePaths, isExpanded]); // Empty dependency array ensures this runs only on mount/unmount.

  useEffect(() => {
    // Focus the appropriate textarea when expanded state changes
    if (isExpanded && expandedTextareaRef.current) {
      try {
        expandedTextareaRef.current.focus();
      } catch (error) {
        logger.warn('Failed to focus expanded textarea:', error);
      }
    } else if (!isExpanded && textareaRef.current) {
      try {
        textareaRef.current.focus();
      } catch (error) {
        logger.warn('Failed to focus textarea:', error);
      }
    }
  }, [isExpanded]);

  const handleSend = () => {
    if (prompt.trim() && !disabled) {
      let finalPrompt = prompt.trim();

      // Append thinking phrase if not auto mode
      const thinkingMode = THINKING_MODES.find((m) => m.id === selectedThinkingMode);
      if (thinkingMode && thinkingMode.phrase) {
        finalPrompt = `${finalPrompt}.\n\n${thinkingMode.phrase}.`;
      }

      onSend(finalPrompt, selectedModel);
      setPrompt("");
      setEmbeddedImages([]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<globalThis.HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newCursorPosition = e.target.selectionStart || 0;

    // Check if / was just typed at the beginning of input or after whitespace
    if (newValue.length > prompt.length && newValue[newCursorPosition - 1] === "/") {
      // Check if it's at the start or after whitespace
      const isStartOfCommand =
        newCursorPosition === 1 ||
        (newCursorPosition > 1 && /\s/.test(newValue[newCursorPosition - 2]));

      if (isStartOfCommand) {
        logger.debug("[FloatingPromptInput] / detected for slash command");
        setShowSlashCommandPicker(true);
        setSlashCommandQuery("");
        setCursorPosition(newCursorPosition);
      }
    }

    // Check if @ was just typed
    if (
      projectPath?.trim() &&
      newValue.length > prompt.length &&
      newValue[newCursorPosition - 1] === "@"
    ) {
      logger.debug("[FloatingPromptInput] @ detected, projectPath:", projectPath);
      setShowFilePicker(true);
      setFilePickerQuery("");
      setCursorPosition(newCursorPosition);
    }

    // Check if we're typing after / (for slash command search)
    if (showSlashCommandPicker && newCursorPosition >= cursorPosition) {
      // Find the / position before cursor
      let slashPosition = -1;
      for (let i = newCursorPosition - 1; i >= 0; i--) {
        if (newValue[i] === "/") {
          slashPosition = i;
          break;
        }
        // Stop if we hit whitespace (new word)
        if (newValue[i] === " " || newValue[i] === "\n") {
          break;
        }
      }

      if (slashPosition !== -1) {
        const query = newValue.substring(slashPosition + 1, newCursorPosition);
        setSlashCommandQuery(query);
      } else {
        // / was removed or cursor moved away
        setShowSlashCommandPicker(false);
        setSlashCommandQuery("");
      }
    }

    // Check if we're typing after @ (for search query)
    if (showFilePicker && newCursorPosition >= cursorPosition) {
      // Find the @ position before cursor
      let atPosition = -1;
      for (let i = newCursorPosition - 1; i >= 0; i--) {
        if (newValue[i] === "@") {
          atPosition = i;
          break;
        }
        // Stop if we hit whitespace (new word)
        if (newValue[i] === " " || newValue[i] === "\n") {
          break;
        }
      }

      if (atPosition !== -1) {
        const query = newValue.substring(atPosition + 1, newCursorPosition);
        setFilePickerQuery(query);
      } else {
        // @ was removed or cursor moved away
        setShowFilePicker(false);
        setFilePickerQuery("");
      }
    }

    setPrompt(newValue);
    setCursorPosition(newCursorPosition);
  };

  /**
   * Handle file selection from file picker
   *
   * @param entry - Selected file entry
   */
  const handleFileSelect = async (entry: FileEntry) => {
    if (textareaRef.current) {
      // Find the @ position before cursor
      let atPosition = -1;
      for (let i = cursorPosition - 1; i >= 0; i--) {
        if (prompt[i] === "@") {
          atPosition = i;
          break;
        }
        // Stop if we hit whitespace (new word)
        if (prompt[i] === " " || prompt[i] === "\n") {
          break;
        }
      }

      if (atPosition === -1) {
        // @ not found, this shouldn't happen but handle gracefully
        await handleError("[FloatingPromptInput] @ position not found", {
          context: { prompt, cursorPosition, component: "FloatingPromptInput" },
        });
        return;
      }

      // Replace the @ and partial query with the selected path (file or directory)
      const textarea = textareaRef.current;
      const beforeAt = prompt.substring(0, atPosition);
      const afterCursor = prompt.substring(cursorPosition);
      const relativePath = entry.path.startsWith(projectPath || "")
        ? entry.path.slice((projectPath || "").length + 1)
        : entry.path;

      const newPrompt = `${beforeAt}@${relativePath} ${afterCursor}`;
      setPrompt(newPrompt);
      setShowFilePicker(false);
      setFilePickerQuery("");

      // Focus back on textarea and set cursor position after the inserted path
      globalThis.setTimeout(() => {
        try {
          textarea.focus();
          const newCursorPos = beforeAt.length + relativePath.length + 2; // +2 for @ and space
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        } catch (error) {
          logger.warn('Failed to focus textarea after file select:', error);
        }
      }, 0);
    }
  };

  const handleFilePickerClose = () => {
    setShowFilePicker(false);
    setFilePickerQuery("");
    // Return focus to textarea
    globalThis.setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  /**
   * Handle selection of a slash command
   *
   * @param command - Selected slash command
   */
  const handleSlashCommandSelect = async (command: SlashCommand) => {
    const textarea = isExpanded ? expandedTextareaRef.current : textareaRef.current;
    if (!textarea) return;

    // Find the / position before cursor
    let slashPosition = -1;
    for (let i = cursorPosition - 1; i >= 0; i--) {
      if (prompt[i] === "/") {
        slashPosition = i;
        break;
      }
      // Stop if we hit whitespace (new word)
      if (prompt[i] === " " || prompt[i] === "\n") {
        break;
      }
    }

    if (slashPosition === -1) {
      await handleError("[FloatingPromptInput] / position not found", {
        context: { prompt, cursorPosition, component: "FloatingPromptInput" },
      });
      return;
    }

    // Simply insert the command syntax
    const beforeSlash = prompt.substring(0, slashPosition);
    const afterCursor = prompt.substring(cursorPosition);

    if (command.accepts_arguments) {
      // Insert command with placeholder for arguments
      const newPrompt = `${beforeSlash}${command.full_command} `;
      setPrompt(newPrompt);
      setShowSlashCommandPicker(false);
      setSlashCommandQuery("");

      // Focus and position cursor after the command
      globalThis.setTimeout(() => {
        try {
          textarea.focus();
          const newCursorPos = beforeSlash.length + command.full_command.length + 1;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        } catch (error) {
          logger.warn('Failed to focus textarea after slash command:', error);
        }
      }, 0);
    } else {
      // Insert command and close picker
      const newPrompt = `${beforeSlash}${command.full_command} ${afterCursor}`;
      setPrompt(newPrompt);
      setShowSlashCommandPicker(false);
      setSlashCommandQuery("");

      // Focus and position cursor after the command
      globalThis.setTimeout(() => {
        try {
          textarea.focus();
          const newCursorPos = beforeSlash.length + command.full_command.length + 1;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        } catch (error) {
          logger.warn('Failed to focus textarea after slash command:', error);
        }
      }, 0);
    }
  };

  const handleSlashCommandPickerClose = () => {
    setShowSlashCommandPicker(false);
    setSlashCommandQuery("");
    // Return focus to textarea
    globalThis.setTimeout(() => {
      const textarea = isExpanded ? expandedTextareaRef.current : textareaRef.current;
      textarea?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<globalThis.HTMLTextAreaElement>) => {
    if (showFilePicker && e.key === "Escape") {
      e.preventDefault();
      setShowFilePicker(false);
      setFilePickerQuery("");
      return;
    }

    if (showSlashCommandPicker && e.key === "Escape") {
      e.preventDefault();
      setShowSlashCommandPicker(false);
      setSlashCommandQuery("");
      return;
    }

    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !isExpanded &&
      !showFilePicker &&
      !showSlashCommandPicker
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();

        // Get the image blob
        const blob = item.getAsFile();
        if (!blob) continue;

        try {
          // Convert blob to base64
          const reader = new globalThis.FileReader();
          reader.onload = () => {
            const base64Data = reader.result as string;

            // Add the base64 data URL directly to the prompt
            setPrompt((currentPrompt) => {
              // Use the data URL directly as the image reference
              const mention = `@"${base64Data}"`;
              const newPrompt = `${currentPrompt}${currentPrompt.endsWith(" ") || currentPrompt === "" ? "" : " "}${mention} `;

              // Focus the textarea and move cursor to end
              globalThis.setTimeout(() => {
                const target = isExpanded ? expandedTextareaRef.current : textareaRef.current;
                target?.focus();
                target?.setSelectionRange(newPrompt.length, newPrompt.length);
              }, 0);

              return newPrompt;
            });
          };

          reader.readAsDataURL(blob);
        } catch (error) {
          await handleError("Failed to paste image:", { context: error });
        }
      }
    }
  };

  // Browser drag and drop handlers - just prevent default behavior
  // Actual file handling is done via Tauri's window-level drag-drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Visual feedback is handled by Tauri events
  };

  /**
   * Handle drag and drop events for file uploads
   *
   * @param e - Drag event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // File processing is handled by Tauri's onDragDropEvent
  };

  /**
   * Handle removing an image from the prompt
   *
   * @param index - Index of the image to remove
   */
  const handleRemoveImage = (index: number) => {
    // Remove the corresponding @mention from the prompt
    const imagePath = embeddedImages[index];

    // For data URLs, we need to handle them specially since they're always quoted
    if (imagePath.startsWith("data:")) {
      // Simply remove the exact quoted data URL
      const quotedPath = `@"${imagePath}"`;
      const newPrompt = prompt.replace(quotedPath, "").trim();
      setPrompt(newPrompt);
      return;
    }

    // For file paths, use the original logic
    const escapedPath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedRelativePath = imagePath
      .replace(`${projectPath}/`, "")
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create patterns for both quoted and unquoted mentions
    const patterns = [
      // Quoted full path
      new RegExp(`@"${escapedPath}"\\s?`, "g"),
      // Unquoted full path
      new RegExp(`@${escapedPath}\\s?`, "g"),
      // Quoted relative path
      new RegExp(`@"${escapedRelativePath}"\\s?`, "g"),
      // Unquoted relative path
      new RegExp(`@${escapedRelativePath}\\s?`, "g"),
    ];

    let newPrompt = prompt;
    for (const pattern of patterns) {
      newPrompt = newPrompt.replace(pattern, "");
    }

    setPrompt(newPrompt.trim());
  };

  const selectedModelData = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  return (
    <>
      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border rounded-lg shadow-lg w-full max-w-2xl p-4 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Compose your prompt</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Image previews in expanded mode */}
              {embeddedImages.length > 0 && (
                <ImagePreview
                  images={embeddedImages}
                  onRemove={handleRemoveImage}
                  className="border-t border-border pt-2"
                />
              )}

              <ResizableTextarea
                ref={expandedTextareaRef}
                value={prompt}
                onChange={handleTextChange}
                onPaste={handlePaste}
                placeholder="Type your prompt here..."
                className=""
                minHeight={200}
                maxHeight={500}
                autoResize={true}
                showResizeHandle={true}
                disabled={disabled}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Model:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setModelPickerOpen(!modelPickerOpen)}
                      className="gap-2"
                    >
                      {selectedModelData.icon}
                      {selectedModelData.name}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Thinking:</span>
                    <Popover
                      trigger={
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setThinkingModePickerOpen(!thinkingModePickerOpen)}
                                className="gap-2"
                              >
                                <Brain className="h-4 w-4" />
                                <ThinkingModeIndicator
                                  level={
                                    THINKING_MODES.find((m) => m.id === selectedThinkingMode)
                                      ?.level || 0
                                  }
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">
                                {THINKING_MODES.find((m) => m.id === selectedThinkingMode)?.name ||
                                  "Auto"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {
                                  THINKING_MODES.find((m) => m.id === selectedThinkingMode)
                                    ?.description
                                }
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      }
                      content={
                        <div className="w-[280px] p-1">
                          {THINKING_MODES.map((mode) => (
                            <button
                              key={mode.id}
                              onClick={() => {
                                setSelectedThinkingMode(mode.id);
                                setThinkingModePickerOpen(false);
                              }}
                              className={cn(
                                "w-full flex items-start gap-3 p-3 rounded-md transition-colors text-left",
                                "hover:bg-accent",
                                selectedThinkingMode === mode.id && "bg-accent"
                              )}
                            >
                              <Brain className="h-4 w-4 mt-0.5" />
                              <div className="flex-1 space-y-1">
                                <div className="font-medium text-sm">{mode.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {mode.description}
                                </div>
                              </div>
                              <ThinkingModeIndicator level={mode.level} />
                            </button>
                          ))}
                        </div>
                      }
                      open={thinkingModePickerOpen}
                      onOpenChange={setThinkingModePickerOpen}
                      align="start"
                      side="top"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSend}
                  disabled={!prompt.trim() || disabled}
                  size="default"
                  className="min-w-[60px]"
                >
                  {isLoading ? (
                    <div className="rotating-symbol text-primary-foreground" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Position Input Bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border",
          dragActive && "ring-2 ring-primary ring-offset-2",
          className
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="max-w-5xl mx-auto">
          {/* Image previews */}
          {embeddedImages.length > 0 && (
            <ImagePreview
              images={embeddedImages}
              onRemove={handleRemoveImage}
              className="border-b border-border"
            />
          )}

          <div className="p-4">
            <div className="flex items-end gap-3">
              {/* Model Picker */}
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="default"
                    disabled={disabled}
                    className="gap-2 min-w-[180px] justify-start"
                  >
                    {selectedModelData.icon}
                    <span className="flex-1 text-left">{selectedModelData.name}</span>
                    <ChevronUp className="h-4 w-4 opacity-50" />
                  </Button>
                }
                content={
                  <div className="w-[300px] p-1">
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setModelPickerOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-md transition-colors text-left",
                          "hover:bg-accent",
                          selectedModel === model.id && "bg-accent"
                        )}
                      >
                        <div className="mt-0.5">{model.icon}</div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">{model.name}</div>
                          <div className="text-xs text-muted-foreground">{model.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                }
                open={modelPickerOpen}
                onOpenChange={setModelPickerOpen}
                align="start"
                side="top"
              />

              {/* Thinking Mode Picker */}
              <Popover
                trigger={
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="default"
                          disabled={disabled}
                          className="gap-2"
                        >
                          <Brain className="h-4 w-4" />
                          <ThinkingModeIndicator
                            level={
                              THINKING_MODES.find((m) => m.id === selectedThinkingMode)?.level || 0
                            }
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">
                          {THINKING_MODES.find((m) => m.id === selectedThinkingMode)?.name ||
                            "Auto"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {THINKING_MODES.find((m) => m.id === selectedThinkingMode)?.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                }
                content={
                  <div className="w-[280px] p-1">
                    {THINKING_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setSelectedThinkingMode(mode.id);
                          setThinkingModePickerOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-md transition-colors text-left",
                          "hover:bg-accent",
                          selectedThinkingMode === mode.id && "bg-accent"
                        )}
                      >
                        <Brain className="h-4 w-4 mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">{mode.name}</div>
                          <div className="text-xs text-muted-foreground">{mode.description}</div>
                        </div>
                        <ThinkingModeIndicator level={mode.level} />
                      </button>
                    ))}
                  </div>
                }
                open={thinkingModePickerOpen}
                onOpenChange={setThinkingModePickerOpen}
                align="start"
                side="top"
              />

              {/* Prompt Input */}
              <div className="flex-1 relative">
                <ResizableTextarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder={dragActive ? "Drop images here..." : "Ask Claude anything..."}
                  disabled={disabled}
                  className={cn("pr-10", dragActive && "border-primary")}
                  minHeight={44}
                  maxHeight={200}
                  autoResize={true}
                  showResizeHandle={true}
                  rows={1}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(true)}
                  disabled={disabled}
                  className="absolute right-1 bottom-1 h-8 w-8"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>

                {/* File Picker */}
                <AnimatePresence>
                  {showFilePicker && projectPath && projectPath.trim() && (
                    <FilePicker
                      basePath={projectPath.trim()}
                      onSelect={handleFileSelect}
                      onClose={handleFilePickerClose}
                      initialQuery={filePickerQuery}
                    />
                  )}
                </AnimatePresence>

                {/* Slash Command Picker */}
                <AnimatePresence>
                  {showSlashCommandPicker && (
                    <SlashCommandPicker
                      projectPath={projectPath}
                      onSelect={handleSlashCommandSelect}
                      onClose={handleSlashCommandPickerClose}
                      initialQuery={slashCommandQuery}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Send/Stop Button */}
              <Button
                onClick={isLoading ? onCancel : handleSend}
                disabled={isLoading ? false : !prompt.trim() || disabled}
                variant={isLoading ? "destructive" : "default"}
                size="default"
                className="min-w-[60px]"
              >
                {isLoading ? (
                  <>
                    <Square className="h-4 w-4 mr-1" />
                    Stop
                  </>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
              {projectPath?.trim() &&
                ", @ to mention files, / for commands, drag & drop or paste images"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const FloatingPromptInput = React.forwardRef<
  FloatingPromptInputRef,
  FloatingPromptInputProps
>(FloatingPromptInputInner);

FloatingPromptInput.displayName = "FloatingPromptInput";
