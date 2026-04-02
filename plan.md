# 🧠 ナレッジサイト仕様（ブログ + ドキュメント + スクラップ）

## 🎯 概要

ブログ・ドキュメント・スクラップ（メモ）を統合したナレッジ管理サイトを構築する。
エディタは CodeMirror を使用し、Markdown（または MDX）でコンテンツを管理する。

---

## 🧱 データモデル

### Article（中核モデル）

* すべてのコンテンツ（blog / doc / scrap）は単一の Article テーブルで管理する
* type によって振る舞いを切り替える

```ts
Article {
  id: string (uuid)
  title: string
  slug: string                // URL用ユニークスラッグ
  fullSlug: string (unique)  // "blog/react-hooks" のような完全パス

  content: string            // Markdown or MDX

  type: 'blog' | 'doc' | 'scrap'
  status: 'draft' | 'published' | 'archived'
  visibility: 'public' | 'private' | 'unlisted'

  pinned: boolean            // 主に scrap 用

  createdAt: datetime
  updatedAt: datetime
  publishedAt: datetime?

  authorId: string
}
```

---

### Tag

```ts
Tag {
  id: string
  name: string
  slug: string
}
```

### ArticleTag（中間テーブル）

```ts
ArticleTag {
  articleId: string
  tagId: string
}
```

---

## 🧠 設計方針

### 1. コンテンツ統一モデル

* blog / doc / scrap を分けず Article に統合
* UIで振る舞いを分岐する

---

### 2. Scrapの扱い

* Scrapは専用テーブルを作らない
* `type: 'scrap'` の Article として扱う

例：

```md
# CSS Grid メモ
- auto-fit と auto-fill の違い
- gap は margin ではない
```

---

### 3. Doc構造

* 階層構造は持たない
* タグによる分類のみ（フラット構造）

---

### 4. タグ設計

* 完全フラット（階層なし）
* 例：

  * react
  * typescript
  * css
  * infra

---

### 5. URL設計

`fullSlug` を使用する：

例：

```
/blog/react-hooks
/docs/typescript-generics
/scrap/css-memo
```

* type を prefix に含める
* URLとDBを1:1で対応させる

---

### 6. 公開範囲

```ts
visibility:
  - public    // 全体公開
  - private   // 自分のみ
  - unlisted  // URL知ってる人のみ
```

---

### 7. エディタ

* CodeMirror を使用
* Markdown（または MDX）で保存
* ブロックエディタ（Notion型）は採用しない

理由：

* 実装コスト削減
* Shikiとの相性が良い
* 差分管理が容易

---

### 8. 検索（将来対応）

PostgreSQL を使用する場合：

```sql
search_vector tsvector
```

対象：

* title
* content

---

## 🚀 将来拡張（今は実装しない）

### リビジョン履歴

```ts
ArticleRevision {
  id: string
  articleId: string
  content: string
  createdAt: datetime
}
```

---

### お気に入り

```ts
Favorite {
  userId: string
  articleId: string
}
```

---

### OGP取得（Scrap強化）

* URLを貼った際にOGPを取得してカード表示

---

## ⚠️ 非採用設計

以下は採用しない：

* ブロックベースエディタ（Notion型）
* Scrap専用テーブル
* Docの階層構造
* JSONコンテンツ保存

---

## 🧩 フロントエンド要件（軽く）

* エディタ：CodeMirror
* プレビュー：Markdown + Shiki
* ルーティング：`/[...fullSlug]`
* フィルタ：

  * type
  * tag
  * visibility

---

## 🧠 UXのイメージ

### Scrap

* 一覧でサクッと見れる
* ピン留めあり
* ラフに書く

### Blog

* 公開前提
* OGP / サムネあり（将来）

### Doc

* タグベースでナレッジ整理
* 検索重視

---

## 🎯 開発優先順位

1. Article CRUD
2. タグ機能
3. Markdownエディタ（CodeMirror）
4. 表示ページ（fullSlugベース）
5. visibility制御
6. 検索（後回し）

---

## ✅ ゴール

* 「書く・貯める・探す」が高速にできること
* Scrap感覚で雑に書けること
* Blogとしても公開できること

---
