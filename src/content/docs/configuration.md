---
title: Configuration
description: All Indentier options explained.
---

Indentier is [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig)-powered. It auto-discovers config from:

- `package.json` → `"indentier"` field
- `.indentierrc.json` / `.indentierrc.yaml` / `.indentierrc.yml`
- `.indentierrc.js` / `.indentierrc.cjs` / `.indentierrc.mjs`
- `.indentierrc.ts` / `.indentierrc.cts` / `.indentierrc.mts`
- `indentier.config.{js,cjs,mjs,ts,cts,mts}`

## Full example

```jsonc
// .indentierrc.json
{
  "mode": "default",
  "tabWidth": 2,
  "useTabs": false,
  "offset": 20,
  "minColumn": 80,
  "brackets": true,
  "semicolon": true,
  "comma": true,
  "ruby": {
    "variableName": "end",
    "injectDeclaration": true,
    "smartEnd": true
  },
  "overrides": [
    {
      "files": ["**/*.ts"],
      "options": { "offset": 30 }
    }
  ],
  "plugins": ["@indentier/plugin-rust"]
}
```

## Options

| Key | Type | Default | Description |
|-|-|-|-|
| `mode` | `"default" \| "ruby"` | `"default"` | Formatting mode |
| `tabWidth` | `number` | `2` | Indent width for normalization |
| `useTabs` | `boolean` | `false` | Use tabs for body indent (padding stays spaces) |
| `offset` | `number` | `20` | Extra columns added after the longest body |
| `minColumn` | `number` | `80` | Minimum column for floated symbols |
| `brackets` | `boolean` | `true` | Move `{` and `}` to the right margin |
| `semicolon` | `boolean` | `true` | Move `;` to the right margin |
| `comma` | `boolean` | `true` | Move trailing `,` on multi-line expressions |
| `ruby.variableName` | `string` | `"end"` | Identifier used as synthetic terminator |
| `ruby.injectDeclaration` | `boolean` | `true` | Inject a variable declaration right after the first `{` |
| `ruby.smartEnd` | `boolean` | `true` | Skip `end` before `else` / `catch` / `finally` / `while` |
| `overrides` | `Override[]` | `[]` | Per-glob option overrides |
| `plugins` | `string[]` | `[]` | Plugin package names to load |

## `.indentierignore`

`.gitignore`-compatible globs. No paths are ignored implicitly — create the file yourself or run `indentier --init`.

```
node_modules/
dist/
coverage/
```

## TypeScript config

`.indentierrc.ts` works out of the box:

```ts
import type { IndentierOptions } from 'indentier'

export default {
  mode: 'ruby',
  offset: 30,
} satisfies IndentierOptions
```
