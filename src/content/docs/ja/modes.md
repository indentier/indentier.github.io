---
title: モード
description: Indentier の default モードと ruby モードの違い。
---

## default モード

`{`・`}`・`;`・行末の `,` を右端へ移動します。**ソースの意味は一切変わりません** — フォーマット済みファイルの動作はオリジナルと完全に同一です。

```js
// 入力
function greet(name) {
  if (!name) {
    return "hello";
  }
  return `hi, ${name}`;
}
```

```js
// default モード 出力
function greet(name)                                        {
  if (!name)                                                {
    return "hello"                                          ;}
  return `hi, ${name}`                                      ;}
```

## ruby モード

`default` の処理に**加えて**:

1. 各閉じ括弧の後ろに、対応するブロックのインデントに揃えた擬似 `end` 行を挿入します。
2. 最初の `{` の直後に変数宣言を注入します（ファイルをそのまま実行できる状態に保つため）。

```js
// ruby モード 出力
                                                            let end=null;
function greet(name)                                        {
  if (!name)                                                {
    return "hello"                                          ;}
  end
  return `hi, ${name}`                                      ;}
end
```

### smartEnd

`ruby.smartEnd` が `true`（デフォルト）のとき、以下のキーワードの直前では `end` を**挿入しません**:

- `else`
- `catch`
- `finally`
- `while`（do…while）

### variableName

注入する識別子を変更できます:

```jsonc
{ "ruby": { "variableName": "_end" } }
```

### injectDeclaration

`false` にすると変数宣言の注入をスキップします（スタンドアロンファイルでないスニペットをフォーマットする場合などに便利）。

### プラグインの ruby モード

各プラグインが ruby モード対応を宣言しています。対応プラグインでは言語に合った宣言テンプレートが使われます:

| プラグイン | 宣言 |
|-|-|
| *(コア)* | `let end=null;` |
| `@indentier/plugin-rust` | `const end:()=();` |
| `@indentier/plugin-go` | `var end any=nil` |
| `@indentier/plugin-c` | `void*end=0;` |
| `@indentier/plugin-php` | `$end=null;` |
