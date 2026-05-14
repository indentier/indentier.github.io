---
title: CLI Reference
description: All Indentier command-line options.
---

## Usage

```sh
indentier [options] [files...]
```

When no files are given, reads from stdin and writes to stdout.

## Options

| Flag | Description |
|-|-|
| `-w`, `--write` | Format files in place |
| `-c`, `--check` | Exit 1 if any file would change (CI-friendly) |
| `--init` | Create `.indentierrc.json` and `.indentierignore` |
| `--mode <mode>` | Override mode: `default` or `ruby` |
| `--offset <n>` | Override the offset (columns after longest body) |
| `--no-semi` | Do not move semicolons |
| `--no-comma` | Do not move trailing commas |
| `--version` | Print version |
| `--help` | Print help |

## Examples

```sh
# Format a single file to stdout
indentier src/main.ts

# Format all TS files in place
indentier --write "src/**/*.ts"

# CI check — fails if anything is unformatted
indentier --check "src/**"

# Override mode on the command line
indentier --mode ruby --write src/

# Scaffold config files
indentier --init
```

## Exit codes

| Code | Meaning |
|-|-|
| `0` | Success (or no changes needed for `--check`) |
| `1` | Files would change (`--check`) or fatal error |
