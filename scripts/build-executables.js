﻿#!/usr/bin/env bun

/**
 * Build script for creating single-file executables from Claude Code package
 * Uses Bun's native embedding features with all optimizations enabled
 * 
 * Output files follow Tauri sidecar triple naming convention: name-platform-architecture
 * Examples: claude-code-x86_64-apple-darwin, claude-code-aarch64-unknown-linux-gnu

* 
 * Usage:
 *   bun run build-executables.js           # Build all platforms
 *   bun run build-executables.js linux     # Build Linux executables only
 *   bun run build-executables.js macos     # Build macOS executables only
 *   bun run build-executables.js windows   # Build Windows executables only
 *   bun run build-executables.js current   # Build for current platform only
 */

import { spawn } from "child_process";
import { mkdir, rm } from "fs/promises";
import { existsSync } from "fs";
// import { join } from 'path'; // Removed unused import

// Logger functions
const isDev = process.env.NODE_ENV !== "production";
const log = {
  debug: (...args) => isDev && console.log("[DEBUG]", ...args), // eslint-disable-line no-console
  info: (...args) => console.log("[INFO]", ...args), // eslint-disable-line no-console
  warn: (...args) => console.warn("[WARN]", ...args), // eslint-disable-line no-console
  error: (...args) => console.error("[ERROR]", ...args), // eslint-disable-line no-console
};

// All supported targets with proper output names
const PLATFORMS = {
  linux: [
    // Linux x64 - glibc
    { target: "bun-linux-x64", output: "claude-code-x86_64-unknown-linux-gnu" },
    { target: "bun-linux-x64-modern", output: "claude-code-modern-x86_64-unknown-linux-gnu" },
    { target: "bun-linux-x64-baseline", output: "claude-code-baseline-x86_64-unknown-linux-gnu" },

    // Linux ARM64 - glibc
    { target: "bun-linux-arm64", output: "claude-code-aarch64-unknown-linux-gnu" },

    // Linux x64 - musl (Alpine Linux, etc.)
    { target: "bun-linux-x64-musl", output: "claude-code-x86_64-unknown-linux-musl" },
    { target: "bun-linux-x64-musl-modern", output: "claude-code-modern-x86_64-unknown-linux-musl" },
    {
      target: "bun-linux-x64-musl-baseline",
      output: "claude-code-baseline-x86_64-unknown-linux-musl",
    },

    // Linux ARM64 - musl
    { target: "bun-linux-arm64-musl", output: "claude-code-aarch64-unknown-linux-musl" },
  ],
  macos: [
    // macOS x64
    { target: "bun-darwin-x64", output: "claude-code-x86_64-apple-darwin" },
    { target: "bun-darwin-x64-modern", output: "claude-code-modern-x86_64-apple-darwin" },
    { target: "bun-darwin-x64-baseline", output: "claude-code-baseline-x86_64-apple-darwin" },

    // macOS ARM64 (Apple Silicon)
    { target: "bun-darwin-arm64", output: "claude-code-aarch64-apple-darwin" },
  ],
  windows: [
    // Windows x64
    { target: "bun-windows-x64", output: "claude-code-x86_64-pc-windows-msvc.exe" },
    { target: "bun-windows-x64-modern", output: "claude-code-modern-x86_64-pc-windows-msvc.exe" },
    {
      target: "bun-windows-x64-baseline",
      output: "claude-code-baseline-x86_64-pc-windows-msvc.exe",
    },
  ],
};

async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    log.info(`Running: ${command} ${args.join(" ")}`);
    const child = spawn(command, args, { stdio: "inherit" });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function prepareBundle() {
  log.info("\nPreparing bundle with native Bun embedding...");
  await runCommand("bun", ["run", "scripts/prepare-bundle-native.js"]);
}

async function buildExecutable(target, output) {
  log.info(`\nBuilding ${output}...`);
  const startTime = Date.now();

  await runCommand("bun", [
    "build",
    "--compile",
    "--minify", // Optimize size
    "--sourcemap", // Embed sourcemap for debugging
    // '--bytecode',   // Commented out - experimental feature that often fails
    `--target=${target}`,
    "./cli-native-bundled.js",
    `--outfile=src-tauri/binaries/${output}`,
  ]);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  log.info(`✓ Built ${output} in ${elapsed}s`);
}

async function cleanupBundledFile() {
  const filesToClean = ["./cli-bundled.js", "./cli-native-bundled.js"];
  for (const file of filesToClean) {
    if (existsSync(file)) {
      await rm(file);
    }
  }
  log.info("\n✓ Cleaned up temporary files");
}

async function getCurrentPlatform() {
  const arch = process.arch === "x64" ? "x86_64" : "aarch64";
  let targetTriple;

  if (process.platform === "darwin") {
    targetTriple = `${arch}-apple-darwin`;
  } else if (process.platform === "linux") {
    targetTriple = `${arch}-unknown-linux-gnu`;
  } else if (process.platform === "win32") {
    targetTriple = `${arch}-pc-windows-msvc`;
  } else {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }

  return targetTriple;
}

async function main() {
  const arg = process.argv[2];

  // Create src-tauri/binaries directory if it doesn't exist
  if (!existsSync("src-tauri/binaries")) {
    await mkdir("src-tauri/binaries", { recursive: true });
  }

  let platformsToBuild = [];

  if (!arg || arg === "all") {
    // Build all platforms
    platformsToBuild = [...PLATFORMS.linux, ...PLATFORMS.macos, ...PLATFORMS.windows];
  } else if (arg === "linux") {
    platformsToBuild = PLATFORMS.linux;
  } else if (arg === "macos" || arg === "darwin") {
    platformsToBuild = PLATFORMS.macos;
  } else if (arg === "windows" || arg === "win32") {
    platformsToBuild = PLATFORMS.windows;
  } else if (arg === "current") {
    // Build only for current platform
    const currentTargetTriple = await getCurrentPlatform();
    const allPlatforms = [...PLATFORMS.linux, ...PLATFORMS.macos, ...PLATFORMS.windows];

    // Find platform by matching the target triple in the output name
    const current = allPlatforms.find((p) => p.output.includes(currentTargetTriple));
    if (current) {
      platformsToBuild = [current];
    } else {
      log.error(`Current platform ${currentTargetTriple} not found in build targets`);
      process.exit(1);
    }
  } else {
    log.error(`Unknown argument: ${arg}`);
    log.error("Usage: bun run build-executables.js [all|linux|macos|windows|current]");
    process.exit(1);
  }

  log.info(`Building ${platformsToBuild.length} executable(s) with full optimizations...`);
  log.info("Optimizations enabled: --minify --sourcemap");
  const startTime = Date.now();

  try {
    // Prepare the bundle once with native embedding
    await prepareBundle();

    // Build executables sequentially to avoid resource conflicts
    let successCount = 0;
    for (const platform of platformsToBuild) {
      try {
        await buildExecutable(platform.target, platform.output);
        successCount++;
      } catch (error) {
        log.error(`Failed to build ${platform.output}:`, error.message);
      }
    }

    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    log.info(
      `\n✅ Successfully built ${successCount}/${platformsToBuild.length} executables in ${totalElapsed}s`
    );
    log.info("\nExecutables are available in the src-tauri/binaries/ directory");
    log.info("\nNotes:");
    log.info("- All executables include embedded assets (yoga.wasm, ripgrep binaries)");
    log.info(
      "- File names follow Tauri sidecar triple naming convention (name-platform-architecture)"
    );
    log.info("- Modern variants require CPUs from 2013+ (AVX2 support)");
    log.info("- Baseline variants support older CPUs (pre-2013)");
    log.info("- Musl variants are for Alpine Linux and similar distributions");
    log.info("- All executables are optimized with minification and sourcemaps");
  } finally {
    // Clean up temporary files
    await cleanupBundledFile();
  }
}

main().catch((error) => {
  console.error("Build failed:", error); // eslint-disable-line no-console
  process.exit(1);
});
