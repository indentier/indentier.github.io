---
title: Modes
description: Indentier's default mode vs ruby mode.
---

## default mode

Moves `{`, `}`, `;`, and trailing `,` to the right margin. Source semantics are **completely untouched** — the formatted file is identical in behaviour to the original.

```js
// input
function greet(name) {
  if (!name) {
    return "hello";
  }
  return `hi, ${name}`;
}
```

```js
// default mode output
function greet(name)                                        {
  if (!name)                                                {
    return "hello"                                          ;}
  return `hi, ${name}`                                      ;}
```

## ruby mode

Everything `default` does, **plus**:

1. A synthetic `end` line is injected after each closing brace, matching the indentation of the block it closes.
2. A variable declaration is injected right after the first `{` (so the file still executes without errors).

```js
// ruby mode output
                                                            let end=null;
function greet(name)                                        {
  if (!name)                                                {
    return "hello"                                          ;}
  end
  return `hi, ${name}`                                      ;}
end
```

### smartEnd

When `ruby.smartEnd` is `true` (the default), `end` is **not** inserted before these continuation keywords:

- `else`
- `catch`
- `finally`
- `while` (do…while)

### variableName

Change the injected identifier via `ruby.variableName`:

```jsonc
{ "ruby": { "variableName": "_end" } }
```

### injectDeclaration

Set to `false` to skip the variable declaration injection (useful if you're formatting a snippet that isn't a standalone file).

### Plugin ruby mode

Each plugin declares whether it supports ruby mode. For plugins that do, the declaration template is language-appropriate:

| Plugin | Declaration |
|-|-|
| *(core)* | `let end=null;` |
| `@indentier/plugin-jsx` | `let end=null;` |
| `@indentier/plugin-rust` | `const end:()=();` |
| `@indentier/plugin-go` | `var end any=nil` |
| `@indentier/plugin-c` | `void*end=0;` |
| `@indentier/plugin-php` | `$end=null;` |
