import React, { useState, useEffect } from "react";
import { Terminal, User, Bot, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { ClaudeStreamMessage } from "./AgentExecution";
import {
  TodoWidget,
  TodoReadWidget,
  LSWidget,
  ReadWidget,
  ReadResultWidget,
  GlobWidget,
  BashWidget,
  WriteWidget,
  GrepWidget,
  EditWidget,
  EditResultWidget,
  MCPWidget,
  CommandWidget,
  CommandOutputWidget,
  SummaryWidget,
  MultiEditWidget,
  MultiEditResultWidget,
  SystemReminderWidget,
  SystemInitializedWidget,
  TaskWidget,
  LSResultWidget,
  ThinkingWidget,
  WebSearchWidget,
  WebFetchWidget,
  type TodoItem,
} from "./ToolWidgets";
import { handleError } from "@/lib/errorHandler";
/**
 * Props interface for the StreamMessage component
 */
interface StreamMessageProps {
  message: ClaudeStreamMessage;
  className?: string;
  streamMessages: ClaudeStreamMessage[];
  onLinkDetected?: (url: string) => void;
}

/**
 * Component to render a single Claude Code stream message
 *
 * Renders individual messages from Claude Code streaming sessions with
 * support for various message types including text, tool calls, and results.
 * Automatically detects and renders appropriate widgets for different tool types.
 *
 * @param message - The stream message to render
 * @param className - Additional CSS classes for styling
 * @param streamMessages - All messages in the stream for context
 * @param onLinkDetected - Callback when a URL is detected in content
 *
 * @example
 * ```tsx
 * <StreamMessage
 *   message={streamMessage}
 *   streamMessages={allMessages}
 *   onLinkDetected={(url) => window.open(url, '_blank')}
 * />
 * ```
 */
const StreamMessageComponent: React.FC<StreamMessageProps> = ({
  message,
  className,
  streamMessages,
  onLinkDetected,
}) => {
  // State to track tool results mapped by tool call ID
  const [toolResults, setToolResults] = useState<Map<string, unknown>>(new Map());

  // Extract all tool results from stream messages
  useEffect(() => {
    const results = new Map<string, unknown>();

    // Iterate through all messages to find tool results
    streamMessages.forEach((msg) => {
      if (msg.type === "user" && msg.message?.content && Array.isArray(msg.message.content)) {
        msg.message.content.forEach((content: unknown) => {
          const contentObj = content as Record<string, unknown>;
          if (contentObj.type === "tool_result" && contentObj.tool_use_id) {
            results.set(contentObj.tool_use_id as string, contentObj);
          }
        });
      }
    });

    setToolResults(results);
  }, [streamMessages]);

  // Helper to get tool result for a specific tool call ID
  const getToolResult = (toolId: string | undefined): unknown => {
    if (!toolId) return null;
    return toolResults.get(toolId) || null;
  };

  try {
    // Skip rendering for meta messages that don't have meaningful content
    if (message.isMeta && !message.leafUuid && !message.summary) {
      return null;
    }

    // Handle summary messages
    if (
      message.leafUuid &&
      message.summary &&
      (message as Record<string, unknown>).type === "summary"
    ) {
      return (
        <SummaryWidget
          summary={String(message.summary || "")}
          leafUuid={String(message.leafUuid || "")}
        />
      );
    }

    // System initialization message
    if (message.type === "system" && message.subtype === "init") {
      return (
        <SystemInitializedWidget
          sessionId={message.session_id}
          model={message.model}
          cwd={message.cwd}
          tools={message.tools}
        />
      );
    }

    // Assistant message
    if (message.type === "assistant" && message.message) {
      const msg = message.message;

      let renderedSomething = false;

      const renderedCard = (
        <Card className={cn("border-primary/20 bg-primary/5", className)}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-2 min-w-0">
                {msg.content &&
                  Array.isArray(msg.content) &&
                  msg.content.map((content: unknown, idx: number) => {
                    const contentItem = content as Record<string, unknown>;
                    // Text content - render as markdown
                    if (contentItem.type === "text") {
                      // Ensure we have a string to render
                      const textContent =
                        typeof contentItem.text === "string"
                          ? (contentItem.text as string)
                          : ((contentItem.text as Record<string, unknown>)?.text as string) ||
                            JSON.stringify(contentItem.text || contentItem);

                      renderedSomething = true;
                      return (
                        <div key={idx} className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code(
                                props: React.ComponentProps<"code"> & {
                                  node?: unknown;
                                  inline?: boolean;
                                }
                              ) {
                                const {
                                  node: _node,
                                  inline,
                                  className,
                                  children,
                                  ref: _ref,
                                  style: _style,
                                  ...restProps
                                } = props;
                                const match = /language-(\w+)/.exec((className as string) || "");
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    customStyle={{}}
                                    language={match[1]}
                                    PreTag="div"
                                    {...restProps}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className as string} {...restProps}>
                                    {children as React.ReactNode}
                                  </code>
                                );
                              },
                            }}
                          >
                            {textContent}
                          </ReactMarkdown>
                        </div>
                      );
                    }

                    // Thinking content - render with ThinkingWidget
                    const contentObj = content as {
                      type?: string;
                      thinking?: string;
                      signature?: string;
                    };
                    if (contentObj.type === "thinking") {
                      renderedSomething = true;
                      return (
                        <div key={idx}>
                          <ThinkingWidget
                            thinking={contentObj.thinking || ""}
                            signature={contentObj.signature}
                          />
                        </div>
                      );
                    }

                    // Tool use - render custom widgets based on tool name
                    const toolContent = content as {
                      type?: string;
                      name?: string;
                      input?: unknown;
                      id?: string;
                    };
                    if (toolContent.type === "tool_use") {
                      const toolName = toolContent.name?.toLowerCase();
                      const input = toolContent.input as Record<string, unknown>;
                      const toolId = toolContent.id;

                      // Get the tool result if available
                      const toolResult = getToolResult(toolId);

                      // Function to render the appropriate tool widget
                      const renderToolWidget = () => {
                        // Task tool - for sub-agent tasks
                        if (toolName === "task" && input) {
                          renderedSomething = true;
                          return (
                            <TaskWidget
                              description={input?.description as string}
                              prompt={input?.prompt as string}
                              result={toolResult}
                            />
                          );
                        }

                        // Edit tool
                        if (toolName === "edit" && input?.file_path) {
                          renderedSomething = true;
                          return (
                            <EditWidget
                              {...(input as {
                                file_path: string;
                                old_string: string;
                                new_string: string;
                              })}
                              result={toolResult}
                            />
                          );
                        }

                        // MultiEdit tool
                        if (toolName === "multiedit" && input?.file_path && input?.edits) {
                          renderedSomething = true;
                          return (
                            <MultiEditWidget
                              {...(input as {
                                file_path: string;
                                edits: { old_string: string; new_string: string }[];
                              })}
                              result={toolResult}
                            />
                          );
                        }

                        // MCP tools (starting with mcp__)
                        if (toolContent.name?.startsWith("mcp__")) {
                          renderedSomething = true;
                          return (
                            <MCPWidget
                              toolName={toolContent.name}
                              input={input}
                              result={toolResult}
                            />
                          );
                        }

                        // TodoWrite tool
                        if (toolName === "todowrite" && input?.todos) {
                          renderedSomething = true;
                          return (
                            <TodoWidget
                              todos={(input?.todos as TodoItem[]) || []}
                              result={toolResult}
                            />
                          );
                        }

                        // TodoRead tool
                        if (toolName === "todoread") {
                          renderedSomething = true;
                          return (
                            <TodoReadWidget
                              todos={input?.todos as TodoItem[]}
                              result={toolResult}
                            />
                          );
                        }

                        // LS tool
                        if (toolName === "ls" && input?.path) {
                          renderedSomething = true;
                          return (
                            <LSWidget path={(input?.path as string) || ""} result={toolResult} />
                          );
                        }

                        // Read tool
                        if (toolName === "read" && input?.file_path) {
                          renderedSomething = true;
                          return (
                            <ReadWidget
                              filePath={(input?.file_path as string) || ""}
                              result={toolResult}
                            />
                          );
                        }

                        // Glob tool
                        if (toolName === "glob" && input?.pattern) {
                          renderedSomething = true;
                          return (
                            <GlobWidget
                              pattern={(input.pattern as string) || ""}
                              result={toolResult}
                            />
                          );
                        }

                        // Bash tool
                        if (toolName === "bash" && input?.command) {
                          renderedSomething = true;
                          return (
                            <BashWidget
                              command={(input.command as string) || ""}
                              description={input.description as string}
                              result={toolResult}
                            />
                          );
                        }

                        // Write tool
                        if (toolName === "write" && input?.file_path && input?.content) {
                          renderedSomething = true;
                          return (
                            <WriteWidget
                              filePath={(input.file_path as string) || ""}
                              content={(input.content as string) || ""}
                              result={toolResult}
                            />
                          );
                        }

                        // Grep tool
                        if (toolName === "grep" && input?.pattern) {
                          renderedSomething = true;
                          return (
                            <GrepWidget
                              pattern={(input.pattern as string) || ""}
                              include={input.include as string}
                              path={input.path as string}
                              exclude={input.exclude as string}
                              result={toolResult}
                            />
                          );
                        }

                        // WebSearch tool
                        if (toolName === "websearch" && input?.query) {
                          renderedSomething = true;
                          return (
                            <WebSearchWidget
                              query={(input.query as string) || ""}
                              result={toolResult}
                            />
                          );
                        }

                        // WebFetch tool
                        if (toolName === "webfetch" && input?.url) {
                          renderedSomething = true;
                          return (
                            <WebFetchWidget
                              url={(input.url as string) || ""}
                              prompt={input.prompt as string}
                              result={toolResult}
                            />
                          );
                        }

                        // Default - return null
                        return null;
                      };

                      // Render the tool widget
                      const widget = renderToolWidget();
                      if (widget) {
                        renderedSomething = true;
                        return <div key={idx}>{widget}</div>;
                      }

                      // Fallback to basic tool display
                      renderedSomething = true;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Using tool: <code className="font-mono">{toolContent.name}</code>
                            </span>
                          </div>
                          {toolContent.input ? (
                            <div className="ml-6 p-2 bg-background rounded-md border">
                              <pre className="text-xs font-mono overflow-x-auto">
                                {JSON.stringify(toolContent.input, null, 2)}
                              </pre>
                            </div>
                          ) : null}
                        </div>
                      );
                    }

                    return null;
                  })}

                {msg.usage && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Tokens: {msg.usage.input_tokens} in, {msg.usage.output_tokens} out
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );

      if (!renderedSomething) return null;
      return renderedCard;
    }

    // User message - handle both nested and direct content structures
    if (message.type === "user") {
      // Don't render meta messages, which are for system use
      if (message.isMeta) return null;

      // Handle different message structures
      const msg = message.message || message;

      let renderedSomething = false;

      const renderedCard = (
        <Card className={cn("border-muted-foreground/20 bg-muted/20", className)}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-2 min-w-0">
                {/* Handle content that is a simple string (e.g. from user commands) */}
                {typeof msg.content === "string" || (msg.content && !Array.isArray(msg.content))
                  ? (() => {
                      const contentStr =
                        typeof msg.content === "string" ? msg.content : String(msg.content);
                      if (contentStr.trim() === "") return null;
                      renderedSomething = true;

                      // Check if it's a command message
                      const commandMatch = contentStr.match(
                        /<command-name>(.+?)<\/command-name>[\s\S]*?<command-message>(.+?)<\/command-message>[\s\S]*?<command-args>(.*?)<\/command-args>/
                      );
                      if (commandMatch) {
                        const [, commandName, commandMessage, commandArgs] = commandMatch;
                        return (
                          <CommandWidget
                            commandName={commandName.trim()}
                            commandMessage={commandMessage.trim()}
                            commandArgs={commandArgs?.trim()}
                          />
                        );
                      }

                      // Check if it's command output
                      const stdoutMatch = contentStr.match(
                        /<local-command-stdout>([\s\S]*?)<\/local-command-stdout>/
                      );
                      if (stdoutMatch) {
                        const [, output] = stdoutMatch;
                        return (
                          <CommandOutputWidget output={output} onLinkDetected={onLinkDetected} />
                        );
                      }

                      // Otherwise render as plain text
                      return <div className="text-sm">{contentStr}</div>;
                    })()
                  : null}

                {/* Handle content that is an array of parts */}
                {Array.isArray(msg.content) &&
                  msg.content.map((content: unknown, idx: number) => {
                    const contentObj = content as Record<string, unknown>;
                    // Tool result
                    if (contentObj.type === "tool_result") {
                      // Skip duplicate tool_result if a dedicated widget is present
                      let hasCorrespondingWidget = false;
                      if (contentObj.tool_use_id && streamMessages) {
                        for (let i = streamMessages.length - 1; i >= 0; i--) {
                          const prevMsg = streamMessages[i];
                          if (
                            prevMsg.type === "assistant" &&
                            prevMsg.message?.content &&
                            Array.isArray(prevMsg.message.content)
                          ) {
                            const toolUse = prevMsg.message.content.find((c: unknown) => {
                              const cObj = c as Record<string, unknown>;
                              return cObj.type === "tool_use" && cObj.id === contentObj.tool_use_id;
                            }) as Record<string, unknown> | undefined;
                            if (toolUse) {
                              const toolName = (toolUse?.name as string)?.toLowerCase();
                              const toolsWithWidgets = [
                                "task",
                                "edit",
                                "multiedit",
                                "todowrite",
                                "todoread",
                                "ls",
                                "read",
                                "glob",
                                "bash",
                                "write",
                                "grep",
                                "websearch",
                                "webfetch",
                              ];
                              if (
                                toolsWithWidgets.includes(toolName) ||
                                (toolUse?.name as string)?.startsWith("mcp__")
                              ) {
                                hasCorrespondingWidget = true;
                              }
                              break;
                            }
                          }
                        }
                      }

                      if (hasCorrespondingWidget) {
                        return null;
                      }
                      // Extract the actual content string
                      let contentText = "";
                      if (typeof contentObj.content === "string") {
                        contentText = contentObj.content as string;
                      } else if (contentObj.content && typeof contentObj.content === "object") {
                        // Handle object with text property
                        if ((contentObj.content as Record<string, unknown>)?.text) {
                          contentText = (contentObj.content as Record<string, unknown>)
                            .text as string;
                        } else if (Array.isArray(contentObj.content)) {
                          // Handle array of content blocks
                          contentText = (contentObj.content as unknown[])
                            .map((c: unknown) =>
                              typeof c === "string"
                                ? c
                                : (c as Record<string, unknown>).text || JSON.stringify(c)
                            )
                            .join("\n");
                        } else {
                          // Fallback to JSON stringify
                          contentText = JSON.stringify(contentObj.content, null, 2);
                        }
                      }

                      // Always show system reminders regardless of widget status
                      const reminderMatch = contentText.match(
                        /<system-reminder>(.*?)<\/system-reminder>/s
                      );
                      if (reminderMatch) {
                        const reminderMessage = reminderMatch[1].trim();
                        const beforeReminder = contentText
                          .substring(0, reminderMatch.index || 0)
                          .trim();
                        const afterReminder = contentText
                          .substring((reminderMatch.index || 0) + reminderMatch[0].length)
                          .trim();

                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Tool Result</span>
                            </div>

                            {beforeReminder && (
                              <div className="ml-6 p-2 bg-background rounded-md border">
                                <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                                  {beforeReminder}
                                </pre>
                              </div>
                            )}

                            <div className="ml-6">
                              <SystemReminderWidget message={reminderMessage} />
                            </div>

                            {afterReminder && (
                              <div className="ml-6 p-2 bg-background rounded-md border">
                                <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                                  {afterReminder}
                                </pre>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Check if this is an Edit tool result
                      const isEditResult = contentText.includes(
                        "has been updated. Here's the result of running `cat -n`"
                      );

                      if (isEditResult) {
                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Edit Result</span>
                            </div>
                            <EditResultWidget content={contentText} />
                          </div>
                        );
                      }

                      // Check if this is a MultiEdit tool result
                      const isMultiEditResult =
                        contentText.includes("has been updated with multiple edits") ||
                        contentText.includes("MultiEdit completed successfully") ||
                        contentText.includes("Applied multiple edits to");

                      if (isMultiEditResult) {
                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">MultiEdit Result</span>
                            </div>
                            <MultiEditResultWidget content={contentText} />
                          </div>
                        );
                      }

                      // Check if this is an LS tool result (directory tree structure)
                      const isLSResult = (() => {
                        const toolResultContent = content as { tool_use_id?: string };
                        if (!toolResultContent.tool_use_id || typeof contentText !== "string")
                          return false;

                        // Check if this result came from an LS tool by looking for the tool call
                        let isFromLSTool = false;

                        // Search in previous assistant messages for the matching tool_use
                        if (streamMessages) {
                          for (let i = streamMessages.length - 1; i >= 0; i--) {
                            const prevMsg = streamMessages[i];
                            // Only check assistant messages
                            if (
                              prevMsg.type === "assistant" &&
                              prevMsg.message?.content &&
                              Array.isArray(prevMsg.message.content)
                            ) {
                              const toolUse = prevMsg.message.content.find((c: unknown) => {
                                const cObj = c as Record<string, unknown>;
                                return (
                                  cObj.type === "tool_use" &&
                                  cObj.id === contentObj.tool_use_id &&
                                  (cObj.name as string)?.toLowerCase() === "ls"
                                );
                              }) as Record<string, unknown> | undefined;
                              if (toolUse) {
                                isFromLSTool = true;
                                break;
                              }
                            }
                          }
                        }

                        // Only proceed if this is from an LS tool
                        if (!isFromLSTool) return false;

                        // Additional validation: check for tree structure pattern
                        const lines = contentText.split("\n");
                        const hasTreeStructure = lines.some((line) => /^\s*-\s+/.test(line));
                        const hasNoteAtEnd = lines.some((line) =>
                          line.trim().startsWith("NOTE: do any of the files")
                        );

                        return hasTreeStructure || hasNoteAtEnd;
                      })();

                      if (isLSResult) {
                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Directory Contents</span>
                            </div>
                            <LSResultWidget content={contentText} />
                          </div>
                        );
                      }

                      // Check if this is a Read tool result (contains line numbers with arrow separator)
                      const isReadResult =
                        (content as { tool_use_id?: string }).tool_use_id &&
                        typeof contentText === "string" &&
                        /^\s*\d+→/.test(contentText);

                      if (isReadResult) {
                        // Try to find the corresponding Read tool call to get the file path
                        let filePath: string | undefined;

                        // Search in previous assistant messages for the matching tool_use
                        if (streamMessages) {
                          for (let i = streamMessages.length - 1; i >= 0; i--) {
                            const prevMsg = streamMessages[i];
                            // Only check assistant messages
                            if (
                              prevMsg.type === "assistant" &&
                              prevMsg.message?.content &&
                              Array.isArray(prevMsg.message.content)
                            ) {
                              const toolUse = prevMsg.message.content.find((c: unknown) => {
                                const cObj = c as Record<string, unknown>;
                                return (
                                  cObj.type === "tool_use" &&
                                  cObj.id === contentObj.tool_use_id &&
                                  (cObj.name as string)?.toLowerCase() === "read"
                                );
                              }) as Record<string, unknown> | undefined;
                              if ((toolUse?.input as Record<string, unknown>)?.file_path) {
                                filePath = (toolUse?.input as Record<string, unknown>)
                                  .file_path as string;
                                break;
                              }
                            }
                          }
                        }

                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Read Result</span>
                            </div>
                            <ReadResultWidget content={contentText} filePath={filePath} />
                          </div>
                        );
                      }

                      // Handle empty tool results
                      if (!contentText || contentText.trim() === "") {
                        renderedSomething = true;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Tool Result</span>
                            </div>
                            <div className="ml-6 p-3 bg-muted/50 rounded-md border text-sm text-muted-foreground italic">
                              Tool did not return any output
                            </div>
                          </div>
                        );
                      }

                      renderedSomething = true;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-2">
                            {(content as { is_error?: boolean }).is_error ? (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                            <span className="text-sm font-medium">Tool Result</span>
                          </div>
                          <div className="ml-6 p-2 bg-background rounded-md border">
                            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {contentText}
                            </pre>
                          </div>
                        </div>
                      );
                    }

                    // Text content
                    const textContent = content as {
                      type?: string;
                      text?: string | { text?: string };
                    };
                    if (textContent.type === "text") {
                      // Handle both string and object formats
                      const textValue =
                        typeof textContent.text === "string"
                          ? textContent.text
                          : (textContent.text as { text?: string })?.text ||
                            JSON.stringify(textContent.text);

                      renderedSomething = true;
                      return (
                        <div key={idx} className="text-sm">
                          {textValue}
                        </div>
                      );
                    }

                    return null;
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      );
      if (!renderedSomething) return null;
      return renderedCard;
    }

    // Result message - render with markdown
    if (message.type === "result") {
      const isError = message.is_error || message.subtype?.includes("error");

      return (
        <Card
          className={cn(
            isError
              ? "border-destructive/20 bg-destructive/5"
              : "border-green-500/20 bg-green-500/5",
            className
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {isError ? (
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-sm">
                  {isError ? "Execution Failed" : "Execution Complete"}
                </h4>

                {message.result && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code(
                          props: React.ComponentProps<"code"> & { node?: unknown; inline?: boolean }
                        ) {
                          const {
                            node: _node,
                            inline,
                            className,
                            children,
                            ref: _ref,
                            style: _style,
                            ...restProps
                          } = props;
                          const match = /language-(\w+)/.exec((className as string) || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              customStyle={{}}
                              language={match[1]}
                              PreTag="div"
                              {...restProps}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className as string} {...restProps}>
                              {children as React.ReactNode}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.result}
                    </ReactMarkdown>
                  </div>
                )}

                {message.error && <div className="text-sm text-destructive">{message.error}</div>}

                <div className="text-xs text-muted-foreground space-y-1 mt-2">
                  {(message.cost_usd !== undefined || message.total_cost_usd !== undefined) && (
                    <div>
                      Cost: ${Number(message.cost_usd || message.total_cost_usd || 0).toFixed(4)}{" "}
                      USD
                    </div>
                  )}
                  {message.duration_ms !== undefined && (
                    <div>Duration: {(message.duration_ms / 1000).toFixed(2)}s</div>
                  )}
                  {message.num_turns !== undefined && <div>Turns: {message.num_turns}</div>}
                  {message.usage && (
                    <div>
                      Total tokens: {message.usage.input_tokens + message.usage.output_tokens}(
                      {message.usage.input_tokens} in, {message.usage.output_tokens} out)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Skip rendering if no meaningful content
    return null;
  } catch (error) {
    // If any error occurs during rendering, show a safe error message
    handleError("Error rendering stream message:", { context: error, message }).catch(() => {
      // Silently handle error logging failure
    });
    return (
      <Card className={cn("border-destructive/20 bg-destructive/5", className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Error rendering message</p>
              <p className="text-xs text-muted-foreground mt-1">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export const StreamMessage = React.memo(StreamMessageComponent);
