'use strict';

/**
 * Shared frontmatter extraction functions for build and validate scripts.
 * Zero external dependencies — uses only built-in RegExp.
 */

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

function extractField(frontmatter, fieldName) {
  // Multi-line folded scalar: "fieldName: >-" followed by indented lines
  // Must check this BEFORE inline to avoid matching ">-" as an inline value
  const foldedMatch = frontmatter.match(
    new RegExp(`^${fieldName}:\\s*>-?\\s*\\r?\\n(([ \\t]+.+\\r?\\n?)+)`, 'm')
  );
  if (foldedMatch) {
    return foldedMatch[1]
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join(' ');
  }

  // Single-line value: "fieldName: value"
  const inlineMatch = frontmatter.match(
    new RegExp(`^${fieldName}:\\s*(.+)$`, 'm')
  );
  if (inlineMatch) return inlineMatch[1].trim();

  return null;
}

function extractMetadataField(frontmatter, fieldName) {
  const match = frontmatter.match(
    new RegExp(`^\\s+${fieldName}:\\s*"?([^"\\n]*)"?`, 'm')
  );
  return match ? match[1].trim() : null;
}

module.exports = { extractFrontmatter, extractField, extractMetadataField };
