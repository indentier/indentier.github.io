---
title: CLI リファレンス
description: Indentier のコマンドラインオプション全一覧。
---

## 使い方

```sh
indentier [options] [files...]
```

ファイルを指定しない場合は stdin から読み込み、stdout に出力します。

## オプション

| フラグ | 説明 |
|-|-|
| `-w`, `--write` | ファイルを上書きフォーマット |
| `-c`, `--check` | 差分があれば exit 1（CI 向け） |
| `--init` | `.indentierrc.json` と `.indentierignore` を作成 |
| `--mode <mode>` | モードを上書き: `default` または `ruby` |
| `--offset <n>` | オフセット（本文末からの余白カラム数）を上書き |
| `--no-semi` | セミコロンを移動しない |
| `--no-comma` | 行末カンマを移動しない |
| `--version` | バージョンを表示 |
| `--help` | ヘルプを表示 |

## 使用例

```sh
# 単一ファイルを stdout に出力
indentier src/main.ts

# すべての TS ファイルを上書き
indentier --write "src/**/*.ts"

# CI チェック — 未フォーマットがあれば失敗
indentier --check "src/**"

# コマンドラインでモードを上書き
indentier --mode ruby --write src/

# 設定ファイルを生成
indentier --init
```

## 終了コード

| コード | 意味 |
|-|-|
| `0` | 成功（`--check` で差分なし含む） |
| `1` | 差分あり（`--check`）または致命的エラー |
