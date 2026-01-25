#!/usr/bin/env node

/**
 * Script to automatically update pubDatetime and modDatetime in blog post frontmatter.
 *
 * Rules:
 * - Files starting with `_` are treated as drafts (skipped)
 * - Files with `draft: true` are skipped
 * - `pubDatetime` is set only once when first publishing (if missing and not a draft)
 * - `modDatetime` is updated on every commit AFTER the post has been published
 * - All dates are stored in UTC format
 *
 * Usage: node scripts/update-blog-dates.js <file1> [file2] ...
 */

import fs from "node:fs";
import path from "node:path";

const BLOG_PATH = "src/data/blog";

class Logger {
  static info(message) {
    /* eslint-disable-next-line no-console */
    console.log(`[INFO] ${message}`);
  }

  static warn(message) {
    /* eslint-disable-next-line no-console */
    console.warn(`[WARN] ${message}`);
  }

  static error(message) {
    /* eslint-disable-next-line no-console */
    console.error(`[ERROR] ${message}`);
  }
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) return null;

  return {
    frontmatter: match[1],
    restOfFile: content.slice(match[0].length),
  };
}

const hasDraftFlag = frontmatter => /^draft:\s*true\s*$/m.test(frontmatter);

const hasPubDatetime = frontmatter => /^pubDatetime:/m.test(frontmatter);

const isDraft = (filePath, frontmatter) =>
  path.basename(filePath).startsWith("_") || hasDraftFlag(frontmatter);

function upsertDateField(raw, key, value, insertPos = null) {
  const keyRegex = new RegExp(`^${key}:.*$`, "m");

  if (keyRegex.test(raw)) {
    return raw.replace(keyRegex, `${key}: ${value}`);
  }

  if (insertPos !== null) {
    return (
      raw.slice(0, insertPos) + `\n${key}: ${value}` + raw.slice(insertPos)
    );
  }

  return raw + `\n${key}: ${value}`;
}

const getInsertionPosition = (raw, isModification) => {
  const anchorMatch = isModification
    ? raw.match(/^pubDatetime:.*$/m)
    : raw.match(/^description:.*$/m) || raw.match(/^title:.*$/m);

  return anchorMatch ? anchorMatch.index + anchorMatch[0].length : null;
};

function main() {
  const paths = process.argv.slice(2);

  if (!paths.length) {
    Logger.warn(
      "No files provided. Usage: node update-blog-dates.js <file1> [file2] ..."
    );
    process.exit(0);
  }

  paths.forEach(filePath => {
    try {
      const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath);

      if (!absolutePath.includes(BLOG_PATH)) {
        Logger.info(`Skipping (not in blog path): ${absolutePath}`);
        return;
      }

      if (!absolutePath.endsWith(".md")) {
        Logger.info(`Skipping (not markdown): ${absolutePath}`);
        return;
      }

      const content = fs.readFileSync(absolutePath, "utf-8");
      const parsed = extractFrontmatter(content);

      if (!parsed) {
        Logger.info(`Skipping (no frontmatter): ${absolutePath}`);
        return;
      }

      const { frontmatter, restOfFile } = parsed;

      if (isDraft(absolutePath, frontmatter)) {
        Logger.info(`Skipping (draft): ${absolutePath}`);
        return;
      }

      const isModification = hasPubDatetime(frontmatter);

      const updatedFrontmatter = upsertDateField(
        frontmatter,
        isModification ? "modDatetime" : "pubDatetime",
        new Date().toISOString(),
        getInsertionPosition(frontmatter, isModification)
      );

      Logger.info(
        `Setting ${isModification ? "modDatetime" : "pubDatetime"} for: ${absolutePath}`
      );

      const updatedContent = `---\n${updatedFrontmatter}\n---${restOfFile}`;
      fs.writeFileSync(absolutePath, updatedContent, "utf-8");
    } catch (error) {
      Logger.error(`Error processing ${filePath}: ${error.message}`);
    }
  });
}

main();
