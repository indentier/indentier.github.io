---
title: API Reference
description: Indentier Node.js API.
---

## `format(input, options, ext?, plugin?)`

Formats a source string and returns the formatted string.

```ts
import { format } from 'indentier'

const output = format(source, resolvedOptions, '.ts')
```

| Parameter | Type | Description |
|-|-|-|
| `input` | `string` | Source code to format |
| `options` | `ResolvedOptions` | Resolved config options |
| `ext` | `string` | File extension (e.g. `'.ts'`). Defaults to `'.js'` |
| `plugin` | `IndentierPlugin \| undefined` | Plugin instance for non-core languages |

Returns `string`.

---

## `loadConfig(cwd?)`

Loads the nearest `.indentierrc.*` / `indentier.config.*` / `package.json#indentier` config using cosmiconfig.

```ts
import { loadConfig } from 'indentier'

const { options, filepath } = await loadConfig()
// options is ResolvedOptions (defaults filled in)
```

Returns `Promise<{ options: ResolvedOptions, filepath: string | null }>`.

---

## `loadPlugins(names)`

Dynamically imports plugin packages and registers them in the global registry.

```ts
import { loadPlugins } from 'indentier'

await loadPlugins(['@indentier/plugin-rust', '@indentier/plugin-go'])
```

| Parameter | Type | Description |
|-|-|-|
| `names` | `string[]` | Package names to import |

Returns `Promise<void>`.

---

## `registerPlugin(plugin)`

Manually registers a plugin instance.

```ts
import { registerPlugin } from 'indentier'

registerPlugin({
  extensions: ['.mylang'],
  rubyCompatible: false,
})
```

---

## `getPlugin(ext)`

Returns the registered plugin for a file extension, or `undefined`.

```ts
import { getPlugin } from 'indentier'

const plugin = getPlugin('.rs') // IndentierPlugin | undefined
```

---

## `isPluginExt(ext)`

Returns `true` if a plugin is registered for the given extension.

---

## `clearPlugins()`

Clears all registered plugins. Useful in tests.

---

## Types

```ts
interface IndentierOptions {
  mode?: 'default' | 'ruby'
  tabWidth?: number
  useTabs?: boolean
  offset?: number
  minColumn?: number
  brackets?: boolean
  semicolon?: boolean
  comma?: boolean
  ruby?: {
    variableName?: string
    injectDeclaration?: boolean
    smartEnd?: boolean
  }
  overrides?: Override[]
  plugins?: string[]
}

interface IndentierPlugin {
  extensions: string[]
  rubyCompatible?: boolean
  declarationTemplate?: string | null
  getEndStatement?: (variableName: string) => string
  declarationInsertIndex?: (lines: readonly PluginLine[]) => number
}

interface PluginLine {
  readonly body: string
}
```
