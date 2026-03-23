#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { extractFrontmatter, extractField, extractMetadataField } = require('./shared');

const SKILLS_DIR = path.join(__dirname, '..', '..', 'skills');
const NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 1024;

function validate() {
  // Discover skill directories
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log('⚠️  No skills/ directory found. Nothing to validate.');
    process.exit(0);
  }

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skillDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

  if (skillDirs.length === 0) {
    console.log('⚠️  No skill directories found in skills/. Nothing to validate.');
    process.exit(0);
  }

  let hasErrors = false;

  for (const dirName of skillDirs) {
    const skillFile = path.join(SKILLS_DIR, dirName, 'SKILL.md');
    const label = `skills/${dirName}/SKILL.md`;
    let skillHasErrors = false;

    // Check SKILL.md exists
    if (!fs.existsSync(skillFile)) {
      console.log(`❌ ${label} — file not found`);
      hasErrors = true;
      continue;
    }

    const content = fs.readFileSync(skillFile, 'utf-8');

    // Check frontmatter exists
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter) {
      console.log(`❌ ${label} — missing YAML frontmatter (must start with ---)`);
      hasErrors = true;
      continue;
    }

    // Check name field
    const name = extractField(frontmatter, 'name');
    if (!name) {
      console.log(`❌ ${label} — missing "name" field in frontmatter`);
      hasErrors = true;
      continue;
    }

    // Check name matches folder
    if (name !== dirName) {
      console.log(`❌ ${label} — name "${name}" does not match folder "${dirName}"`);
      skillHasErrors = true;
    }

    // Check name format
    if (!NAME_PATTERN.test(name)) {
      console.log(`❌ ${label} — name "${name}" must be lowercase alphanumeric with hyphens (e.g., "my-skill")`);
      skillHasErrors = true;
    }

    // Check name length
    if (name.length > MAX_NAME_LENGTH) {
      console.log(`❌ ${label} — name exceeds ${MAX_NAME_LENGTH} characters (got ${name.length})`);
      skillHasErrors = true;
    }

    // Check description field
    const description = extractField(frontmatter, 'description');
    if (!description) {
      console.log(`❌ ${label} — missing "description" field in frontmatter`);
      skillHasErrors = true;
    } else if (description.length > MAX_DESCRIPTION_LENGTH) {
      console.log(`❌ ${label} — description exceeds ${MAX_DESCRIPTION_LENGTH} characters (got ${description.length})`);
      skillHasErrors = true;
    }

    // Validate benefits-from references (warning only, not error)
    const benefitsFrom = extractMetadataField(frontmatter, 'benefits-from');
    if (benefitsFrom) {
      const deps = benefitsFrom.split(',').map(d => d.trim()).filter(d => d);
      for (const dep of deps) {
        if (!skillDirs.includes(dep)) {
          console.log(`⚠️  ${label} — benefits-from references "${dep}" which does not exist (yet)`);
        }
      }
    }

    if (skillHasErrors) {
      hasErrors = true;
    } else {
      console.log(`✅ ${label} — valid (name: "${name}", description: ${description.length} chars)`);
    }
  }

  console.log('');
  if (hasErrors) {
    console.log(`❌ Validation failed. Fix the errors above and try again.`);
    process.exit(1);
  } else {
    console.log(`✅ All ${skillDirs.length} skills valid.`);
  }
}

validate();
