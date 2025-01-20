# アンケート作成診断アプリ

## 仕様

- アンケートを追加できる
- アンケートを削除できる
- アンケートを更新する際は DFD のように更新可能

## 採用 tech

- React

## フォルダ構成

Ballet-proof 構成を採用

### 前提: Ballet-proof 構成の概要

Ballet-proof 構成では、以下のようなフォルダを使ってアプリケーションをモジュール化します。

- components/: 再利用可能な小さな UI コンポーネント（例: ボタン、モーダル）。
- features/: 特定の機能や画面に関連するコンポーネント（例: ReactFlow のような特化したもの）。
- hooks/: カスタムフック。
- utils/: ユーティリティ関数。
- contexts/: コンテキストプロバイダーや状態管理用のファイル。

features

- api:
- Index.tsx:

## 命名規則

1. **フォルダ名**: 単数形
   - 例: `component/`, `service/`
2. **ファイル名**: 機能を表す名前
   - React コンポーネント: `UserCard.tsx`（パスカルケース）
   - ユーティリティ関数: `calculateTotal.ts`（キャメルケース）
3. **変数名**: キャメルケース
   - 例: `userName`, `orderList`
4. **クラス名**: パスカルケース
   - 例: `UserService`, `OrderManager`
5. **関数名**: 動詞＋名詞のキャメルケース
   - 例: `getUserData`, `calculateTotal`
