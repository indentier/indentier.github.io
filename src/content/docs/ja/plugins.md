---
title: プラグイン
description: プラグインで Indentier に言語サポートを追加する。
---

コア `indentier` パッケージは **JavaScript / TypeScript / JSON 系** (`.json`, `.jsonc`, `.json5`) をネイティブにサポートします。その他の言語はプラグインパッケージで対応します。

## 対応言語一覧

| プラグイン | 言語 | 拡張子 | ruby モード | 宣言 |
|-|-|-|-|-|
| *(コア)* | JavaScript / TypeScript | `.js` `.cjs` `.mjs` `.jsx` `.ts` `.cts` `.mts` `.tsx` | ✅ | `let end=null;` |
| *(コア)* | JSON 系 | `.json` `.jsonc` `.json5` | ❌ | — |
| [`@indentier/plugin-rust`](https://github.com/indentier/plugin-rust) | Rust | `.rs` | ✅ | `const end:()=();` |
| [`@indentier/plugin-go`](https://github.com/indentier/plugin-go) | Go | `.go` | ✅ | `var end any=nil` |
| [`@indentier/plugin-c`](https://github.com/indentier/plugin-c) | C / C++ | `.c` `.h` `.cpp` `.hpp` | ✅ | `void*end=0;` |
| [`@indentier/plugin-php`](https://github.com/indentier/plugin-php) | PHP | `.php` | ✅ | `$end=null;` |
| [`@indentier/plugin-java`](https://github.com/indentier/plugin-java) | Java | `.java` | ❌ | — |
| [`@indentier/plugin-cs`](https://github.com/indentier/plugin-cs) | C# | `.cs` | ❌ | — |
| [`@indentier/plugin-css`](https://github.com/indentier/plugin-css) | CSS / SCSS / Less | `.css` `.scss` `.less` | ❌ | — |

## プラグインをインストールする

```sh
# Indentier と一緒にプラグインをインストール
npm i -D @indentier/plugin-rust @indentier/plugin-go

# 設定ファイルに追記
```

```jsonc
// .indentierrc.json
{
  "plugins": ["@indentier/plugin-rust", "@indentier/plugin-go"]
}
```

CLI は設定から自動的にプラグインを読み込みます。API から使う場合は `loadPlugins()` を手動で呼び出してください:

```ts
import { format, loadPlugins, getPlugin } from 'indentier'

await loadPlugins(['@indentier/plugin-rust'])
const plugin = getPlugin('.rs')
const output = format(source, options, '.rs', plugin)
```

## プラグインを自作する

プラグインは `IndentierPlugin` インターフェースを実装したシンプルなオブジェクトです:

```ts
import type { IndentierPlugin } from 'indentier'

const plugin: IndentierPlugin = {
  // このプラグインが処理する拡張子（小文字、先頭にドット）
  extensions: ['.rs'],

  // ruby モードが有効かどうか
  rubyCompatible: true,

  // ruby モード時にファイル先頭に注入する宣言文
  declarationTemplate: 'const end:()=();',

  // （省略可）end 文の本体をカスタマイズ。デフォルトは variableName。
  getEndStatement: (variableName) => variableName,

  // （省略可）宣言行を挿入する位置。
  // パース済み行配列を受け取り挿入インデックスを返す。
  // デフォルト: 0（ファイル先頭）。下の例は最初の `<?` 行の直後に挿入。
  declarationInsertIndex: (lines) => {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].body.trimStart().startsWith('<?')) return i + 1
    }
    return 0
  },
}

export default plugin
```

`@indentier/plugin-<name>` または任意のパッケージ名で公開し、設定の `plugins` に追加するだけで使えます。
