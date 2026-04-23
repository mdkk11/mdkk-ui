# AGENTS.md

このリポジトリにおける実装・提案・レビューは、以下の原則に従うこと。  
目的は、保守予測性の向上、安全な API 進化、一貫したアクセシビリティの担保である。

## 1. 基本方針

- 実装は、見た目だけでなく **公開 API の安定性** と **アクセシビリティ** を重視する
- 依存ライブラリ都合の API をそのまま露出しない
- 一時的な実装容易性よりも、将来の保守性・移行容易性を優先する
- アプリケーション側ページでデザインシステムの責務を持たせない

## 2. 3 層アーキテクチャ

すべてのコンポーネントは、原則として次の 3 層構造に従う。

1. Public layer: `Component.tsx`
2. Adapter layer: `ComponentAdapter.tsx`
3. Primitive layer: `ComponentPrimitive.tsx`

### Public layer の責務

- 公開 API を定義し、その互換性を守る
- 人間にわかりやすい props / events を提供する
- compound component の文脈では slot や context を公開側で構成する
- 低レベル依存の型や概念をなるべく露出しない

### Adapter layer の責務

- `variant` / `size` / `tone` などのデザイン意図を見た目に変換する
- `cva` や class 合成を適用する
- 必要に応じて visual sub-structure を組み立てる

### Primitive layer の責務

- DOM または `react-aria-components` のプリミティブを包む
- ロジックは最小限にとどめる
- スタイリングは最小限にとどめる

## 3. 依存境界

- `react-aria-components` の直接利用は Primitive layer、必要に応じて一部 Adapter layer に限定する
- Public layer では依存ライブラリの生の prop 型を直接公開しない
- 依存ライブラリ更新時も、Public API は可能な限り安定させる

## 4. Public API の原則

- dependency 内部都合の props をそのまま公開しない
- boolean state は `isXxx` で命名する
- event は可能な限り intent-level で表現する
- デザイン意図は `variant` / `size` / `tone` で表現する
- `className` は基本的に許可する
- `style` は動的 runtime style が本当に必要な場合のみ許可する
- ref は最も意味のある DOM 要素へ forward する

## 5. Compound Component の判断基準

compound pattern を使うのは、以下のいずれかに当てはまる場合。

- 複数 slot に構造ルールや順序制約がある
- slot 間で内部 state / context を共有する
- 視覚的コンテナの外にある control が内部状態へ作用する

以下なら flat export を優先する。

- 各パーツが主に視覚的な分割である
- shared runtime state / context が不要である
- namespaced API にするより単純な export の方が理解しやすい

## 6. Styling の原則

スタイリングは次の 2 層で扱う。

1. foundation token / semantic variable
2. component-level variant mapping

ルール:

- デザインシステム上の見た目は token / semantic variable を優先する
- アプリページで一発値を直接持ち込まない
- component variant は adapter で吸収する

## 7. API 進化

Public API は契約として扱う。

breaking change の例:

- prop の rename / removal
- event contract の変更
- 構造的な挙動変更

non-breaking change の例:

- 新しい optional prop の追加
- additive variant の追加
- 意味を変えない visual polish

## 8. 詳細参照

実装時の具体手順は `skills/` を参照すること。

- 新規コンポーネント作成: `skills/create-component.md`
- Public API 設計: `skills/design-public-api.md`
- Compound Component 設計: `skills/build-compound-component.md`
- `react-aria-components` 更新: `skills/upgrade-react-aria-components.md`

## 9. Icon 運用ルール

- `Icon` は Lucide を唯一の定義源として扱う
- `src/components/Icons/assets` には Lucide canonical 名 (`kebab-case`) の SVG のみを置く
- assets の SVG を手編集しない（必要な変更は Lucide 側のアイコン差し替えで対応する）
- Icon 追加・更新時は必ず `pnpm -s generate:icons` を実行し、生成物を更新する
- `pnpm -s check` の Lucide 検証を通すこと（非Lucide混入・改変SVGは不可）
- `Sidebar` / `Story` / `Checkbox` を含む内部実装でも、独自SVGより共通 `Icon` 利用を優先する

設計背景や詳細仕様は `docs/` を参照すること。

- `docs/DESIGN_SYSTEM.md`
- `docs/DEPENDENCY_POLICY.md`
