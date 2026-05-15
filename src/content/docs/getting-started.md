---
title: Getting Started
description: Install Indentier and format your first file in minutes.
---

## Install

```sh
npm i -D indentier
```

Requires **Node.js 22+**.

## Quick start

```sh
# Scaffold config files
npx indentier --init

# Format a file to stdout
npx indentier src/index.ts

# Format in place
npx indentier --write "src/**/*.ts"

# Check (exits 1 if any file would change — useful in CI)
npx indentier --check "src/**/*.ts"
```

## Your first config

`indentier --init` creates two files:

**`.indentierrc.json`** — options (all optional):

```jsonc
{
  "mode": "default",
  "offset": 20,
  "minColumn": 80,
  "plugins": []
}
```

**`.indentierignore`** — paths to skip (`.gitignore` syntax):

```
node_modules/
dist/
coverage/
```

## Adding language plugins

The core package handles **JavaScript, TypeScript, and the JSON family** (`.json`, `.jsonc`, `.json5`) natively. For JSX / TSX, install [`@indentier/plugin-jsx`](https://github.com/indentier/plugin-jsx). For other languages install a plugin:

```sh
npm i -D @indentier/plugin-rust
```

```jsonc
// .indentierrc.json
{
  "plugins": ["@indentier/plugin-rust"]
}
```

See [Plugins](/plugins/) for the full list.
