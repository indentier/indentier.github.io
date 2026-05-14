# Indentier docs

[Astro Starlight](https://starlight.astro.build) で構築された [Indentier](https://github.com/indentier/indentier) の公式ドキュメントサイト。本番デプロイ先は **<https://indentier.github.io>**。

## 構成

```
src/
├── assets/         サイドバーロゴ等
└── content/
    └── docs/
        ├── *.md        英語 (root) のページ
        └── ja/*.md     日本語 (/ja/) のページ
public/              favicon などの静的アセット
astro.config.mjs     Starlight 設定 (favicon / logo / head)
```

Starlight は `src/content/docs/` 配下の `.md` / `.mdx` を自動的にルーティングする。

## 開発

```sh
pnpm install         # 依存をインストール
pnpm dev             # localhost:4321 で開発サーバー起動
pnpm build           # ./dist/ に本番ビルドを出力
pnpm preview         # ビルド結果をローカル確認
```

## 参考

- [Starlight ドキュメント](https://starlight.astro.build/)
- [Astro ドキュメント](https://docs.astro.build)
