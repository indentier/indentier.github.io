---
title: はじめに
description: Indentier をインストールして最初のファイルをフォーマットするまでの手順。
---

## インストール

```sh
npm i -D indentier
```

**Node.js 22 以降** が必要です。

## クイックスタート

```sh
# 設定ファイルを生成
npx indentier --init

# ファイルを stdout に出力
npx indentier src/index.ts

# ファイルを上書き
npx indentier --write "src/**/*.ts"

# CI チェック（差分があれば exit 1）
npx indentier --check "src/**/*.ts"
```

## 最初の設定

`indentier --init` が 2 つのファイルを作成します。

**`.indentierrc.json`** — オプション（すべて省略可）:

```jsonc
{
  "mode": "default",
  "offset": 20,
  "minColumn": 80,
  "plugins": []
}
```

**`.indentierignore`** — スキップするパス（`.gitignore` 構文）:

```
node_modules/
dist/
coverage/
```

## 言語プラグインを追加する

コアパッケージは **JavaScript と TypeScript** のみをネイティブにサポートします。  
他の言語にはプラグインをインストールしてください:

```sh
npm i -D @indentier/plugin-rust
```

```jsonc
// .indentierrc.json
{
  "plugins": ["@indentier/plugin-rust"]
}
```

全一覧は [プラグイン](/ja/plugins/) を参照してください。
