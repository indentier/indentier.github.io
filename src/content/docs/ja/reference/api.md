---
title: API リファレンス
description: Indentier の Node.js API。
---

## `format(input, options, ext?, plugin?)`

ソース文字列をフォーマットして返します。

```ts
import { format } from 'indentier'

const output = format(source, resolvedOptions, '.ts')
```

| パラメーター | 型 | 説明 |
|-|-|-|
| `input` | `string` | フォーマットするソースコード |
| `options` | `ResolvedOptions` | 解決済みの設定オプション |
| `ext` | `string` | ファイル拡張子（例: `'.ts'`）。省略時は `'.js'` |
| `plugin` | `IndentierPlugin \| undefined` | コア非対応言語用のプラグインインスタンス |

`string` を返します。

---

## `loadConfig(cwd?)`

cosmiconfig を使って最寄りの設定ファイルを読み込みます。

```ts
import { loadConfig } from 'indentier'

const { options, filepath } = await loadConfig()
// options は ResolvedOptions（デフォルト値補完済み）
```

`Promise<{ options: ResolvedOptions, filepath: string | null }>` を返します。

---

## `loadPlugins(names)`

プラグインパッケージを動的にインポートしてグローバルレジストリに登録します。

```ts
import { loadPlugins } from 'indentier'

await loadPlugins(['@indentier/plugin-rust', '@indentier/plugin-go'])
```

| パラメーター | 型 | 説明 |
|-|-|-|
| `names` | `string[]` | インポートするパッケージ名 |

`Promise<void>` を返します。

---

## `registerPlugin(plugin)`

プラグインインスタンスを手動で登録します。

```ts
import { registerPlugin } from 'indentier'

registerPlugin({
  extensions: ['.mylang'],
  rubyCompatible: false,
})
```

---

## `getPlugin(ext)`

指定した拡張子のプラグインを返します。登録されていなければ `undefined`。

```ts
import { getPlugin } from 'indentier'

const plugin = getPlugin('.rs') // IndentierPlugin | undefined
```

---

## `isPluginExt(ext)`

指定した拡張子のプラグインが登録されていれば `true` を返します。

---

## `clearPlugins()`

登録済みのすべてのプラグインをクリアします。テスト時に便利です。

---

## 型定義

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
