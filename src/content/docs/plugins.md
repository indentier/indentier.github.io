---
title: Plugins
description: Extend Indentier to support more languages via plugins.
---

The core `indentier` package handles **JavaScript and TypeScript** natively. All other languages are supported through plugin packages.

## Supported languages

| Plugin | Languages | Extensions | Ruby mode | Declaration |
|-|-|-|-|-|
| *(core)* | JavaScript / TypeScript | `.js` `.cjs` `.mjs` `.jsx` `.ts` `.cts` `.mts` `.tsx` | ✅ | `let end=null;` |
| [`@indentier/plugin-rust`](https://github.com/indentier/plugin-rust) | Rust | `.rs` | ✅ | `const end:()=();` |
| [`@indentier/plugin-go`](https://github.com/indentier/plugin-go) | Go | `.go` | ✅ | `var end any=nil` |
| [`@indentier/plugin-c`](https://github.com/indentier/plugin-c) | C / C++ | `.c` `.h` `.cpp` `.hpp` | ✅ | `void*end=0;` |
| [`@indentier/plugin-php`](https://github.com/indentier/plugin-php) | PHP | `.php` | ✅ | `$end=null;` |
| [`@indentier/plugin-java`](https://github.com/indentier/plugin-java) | Java | `.java` | ❌ | — |
| [`@indentier/plugin-cs`](https://github.com/indentier/plugin-cs) | C# | `.cs` | ❌ | — |
| [`@indentier/plugin-css`](https://github.com/indentier/plugin-css) | CSS / SCSS / Less | `.css` `.scss` `.less` | ❌ | — |

## Installing a plugin

```sh
# install the plugin alongside indentier
npm i -D @indentier/plugin-rust @indentier/plugin-go

# then declare it in your config
```

```jsonc
// .indentierrc.json
{
  "plugins": ["@indentier/plugin-rust", "@indentier/plugin-go"]
}
```

The CLI loads plugins automatically from the config. When using the API, call `loadPlugins()` manually:

```ts
import { format, loadPlugins, getPlugin } from 'indentier'

await loadPlugins(['@indentier/plugin-rust'])
const plugin = getPlugin('.rs')
const output = format(source, options, '.rs', plugin)
```

## Writing a plugin

A plugin is a plain object that implements the `IndentierPlugin` interface:

```ts
import type { IndentierPlugin } from 'indentier'

const plugin: IndentierPlugin = {
  // File extensions this plugin handles (lowercase, with leading dot)
  extensions: ['.rs'],

  // Whether ruby mode is meaningful for this language
  rubyCompatible: true,

  // Declaration injected at the top of the file in ruby mode
  declarationTemplate: 'const end:()=();',

  // (optional) Custom end-statement body. Defaults to variableName.
  getEndStatement: (variableName) => variableName,

  // (optional) Where to splice the declaration line.
  // Receives the parsed lines array; return the insertion index.
  // Default: 0 (very top of file). Example below: insert after the first `<?` line.
  declarationInsertIndex: (lines) => {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].body.trimStart().startsWith('<?')) return i + 1
    }
    return 0
  },
}

export default plugin
```

Publish as `@indentier/plugin-<name>` or any package name and add it to `plugins` in your config.
