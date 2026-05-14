---
title: 設定
description: Indentier の全オプション解説。
---

Indentier は [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig) ベースです。以下の場所から設定を自動探索します:

- `package.json` → `"indentier"` フィールド
- `.indentierrc.json` / `.indentierrc.yaml` / `.indentierrc.yml`
- `.indentierrc.js` / `.indentierrc.cjs` / `.indentierrc.mjs`
- `.indentierrc.ts` / `.indentierrc.cts` / `.indentierrc.mts`
- `indentier.config.{js,cjs,mjs,ts,cts,mts}`

## 設定例（全オプション）

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

## オプション一覧

| キー | 型 | デフォルト | 説明 |
|-|-|-|-|
| `mode` | `"default" \| "ruby"` | `"default"` | フォーマットモード |
| `tabWidth` | `number` | `2` | インデント幅（正規化時） |
| `useTabs` | `boolean` | `false` | 本文インデントをタブで構成（右パディングはスペース） |
| `offset` | `number` | `20` | 最長行末から記号配置までの余白 |
| `minColumn` | `number` | `80` | 記号を配置する最低カラム |
| `brackets` | `boolean` | `true` | `{` `}` を右端へ移動 |
| `semicolon` | `boolean` | `true` | `;` を右端へ移動 |
| `comma` | `boolean` | `true` | 行末の `,` を右端へ移動（マルチライン時のみ） |
| `ruby.variableName` | `string` | `"end"` | 擬似終端識別子 |
| `ruby.injectDeclaration` | `boolean` | `true` | 最初の `{` の直後に変数宣言を注入 |
| `ruby.smartEnd` | `boolean` | `true` | `else` / `catch` / `finally` / `while` の前で `end` 挿入を抑制 |
| `overrides` | `Override[]` | `[]` | glob 単位の設定上書き |
| `plugins` | `string[]` | `[]` | 読み込むプラグインパッケージ名 |

## `.indentierignore`

`.gitignore` 互換のグロブ構文。**暗黙的な除外はありません** — `node_modules` などを除外したい場合はファイルを作成するか `indentier --init` で雛形を生成してください。

```
node_modules/
dist/
coverage/
```

## TypeScript 設定ファイル

`.indentierrc.ts` はそのまま使えます:

```ts
import type { IndentierOptions } from 'indentier'

export default {
  mode: 'ruby',
  offset: 30,
} satisfies IndentierOptions
```
