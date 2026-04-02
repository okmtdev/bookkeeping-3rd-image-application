# ⚖️ Boki-Visualizer（ボキ・ビジュアライザー）

仕訳の「なぜ？」が図解でわかる。動く財務諸表でビジネスの流れを掴む **簿記3級ビジュアル学習アプリ** です。

## 主な機能

- **インタラクティブ仕訳モジュール** - 勘定科目をドラッグ＆ドロップで仕訳を組み立て。天秤アニメーションで貸借一致を視覚化
- **リアルタイム財務諸表** - 仕訳を切った瞬間にB/S（貸借対照表）とP/L（損益計算書）がアニメーション付きで変化
- **ストーリーモード** - お店を開店→仕入→販売→決算まで、ビジネスの流れに沿って学習
- **勘定科目ガイド** - 5大要素（資産・負債・純資産・収益・費用）を色分けで理解
- **学習進捗管理** - ローカルストレージに保存（ログイン不要）
- **レスポンシブ対応** - PC・タブレット・スマホすべてに対応

## 技術スタック

- [Next.js](https://nextjs.org/) 14 (App Router, Static Export)
- [React](https://react.dev/) 18
- [Tailwind CSS](https://tailwindcss.com/) 3
- TypeScript

## ローカル開発手順

### 前提条件

- Node.js 18 以上
- npm 9 以上

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/okmtdev/bookkeeping-3rd-image-application.git
cd bookkeeping-3rd-image-application

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### その他のコマンド

```bash
# プロダクションビルド（静的エクスポート）
npm run build

# ビルドしたファイルをローカルで確認
npx serve out

# リント
npm run lint
```

## Google Cloud Storage へのデプロイ

このアプリは `next export` で静的HTMLとして出力されるため、Cloud Storage の静的ウェブサイトホスティングでデプロイできます。

### 1. GCS バケットの作成

```bash
# プロジェクトIDを設定
export PROJECT_ID=your-gcp-project-id
export BUCKET_NAME=your-bucket-name

# バケットを作成
gsutil mb -p $PROJECT_ID -l asia-northeast1 gs://$BUCKET_NAME

# 静的ウェブサイトの設定
gsutil web set -m index.html -e 404.html gs://$BUCKET_NAME

# 公開アクセスを許可
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME
```

### 2. ビルドとデプロイ

```bash
# ビルド（out/ ディレクトリに静的ファイルが生成されます）
npm run build

# Cloud Storage にアップロード
gsutil -m rsync -r -d out/ gs://$BUCKET_NAME
```

### 3. アクセス

デプロイ後、以下のURLでアクセスできます：

```
https://storage.googleapis.com/$BUCKET_NAME/index.html
```

### カスタムドメインを使う場合（オプション）

1. Cloud DNS でドメインを設定
2. ロードバランサを作成し、バケットをバックエンドに設定
3. SSL証明書を設定

詳細は [Cloud Storage 静的ウェブサイトのホスティング](https://cloud.google.com/storage/docs/hosting-static-website) を参照してください。

### Cloud Run を使ったデプロイ（代替案）

SSRが必要な場合やカスタムドメインを簡単に設定したい場合は Cloud Run も選択肢です：

```bash
# Dockerfile は不要（Cloud Build が自動検出）
gcloud run deploy boki-visualizer \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated
```

## プロジェクト構成

```
src/
├── app/                  # Next.js App Router ページ
│   ├── layout.tsx        # 共通レイアウト
│   ├── page.tsx          # ダッシュボード
│   ├── guide/page.tsx    # 勘定科目ガイド
│   ├── practice/page.tsx # 仕訳練習
│   ├── statements/page.tsx # 財務諸表
│   └── story/page.tsx    # ストーリーモード
├── components/           # UIコンポーネント
│   ├── AccountBlock.tsx  # 勘定科目ブロック（D&D対応）
│   ├── BalanceScale.tsx  # 天秤アニメーション
│   ├── FinancialStatements.tsx # B/S・P/L表示
│   ├── JournalEntryWorkspace.tsx # 仕訳ワークスペース
│   └── Navigation.tsx    # ナビゲーション
├── data/                 # 学習コンテンツデータ
│   ├── accounts.ts       # 勘定科目一覧
│   └── stories.ts        # ストーリーチャプター
├── hooks/                # カスタムフック
│   ├── useLedger.ts      # 元帳管理
│   └── useLocalStorage.ts # ローカルストレージ
└── types/                # TypeScript型定義
    └── index.ts
```

## ライセンス

MIT
