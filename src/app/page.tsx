'use client';

import Link from 'next/link';
import { useLedger } from '@/hooks/useLedger';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';
import { storyChapters } from '@/data/stories';
import { CATEGORY_LABELS, CATEGORY_COLORS, AccountCategory, QuestionCategory, QUESTION_CATEGORY_LABELS } from '@/types';

const totalTransactions = storyChapters.reduce(
  (sum, ch) => sum + ch.transactions.length,
  0
);

export default function Dashboard() {
  const { progress, getTotalByCategory, resetProgress, isLoaded } = useLedger();
  const { records, getCategoryStats } = useAnswerHistory();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  const completedCount = progress.completedTransactions.length;
  const progressPercent = totalTransactions > 0 ? Math.round((completedCount / totalTransactions) * 100) : 0;

  const categories: AccountCategory[] = ['asset', 'liability', 'equity', 'revenue', 'expense'];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          ⚖️ Boki-Visualizer
        </h1>
        <p className="text-gray-500 mt-1">
          仕訳の「なぜ？」が図解でわかる簿記3級学習アプリ
        </p>
      </div>

      {/* Progress overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">学習進捗</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600 min-w-[4rem] text-right">
            {completedCount}/{totalTransactions}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {progressPercent === 100
            ? '🎉 全ての取引を完了しました！おめでとうございます！'
            : progressPercent > 50
            ? '📈 順調に進んでいます！あと少し！'
            : progressPercent > 0
            ? '💪 良いスタートです！続けていきましょう！'
            : '📖 ストーリーモードから始めてみましょう！'}
        </p>
      </div>

      {/* Chapter progress */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">チャプター</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {storyChapters.map((chapter, idx) => {
            const chCompleted = chapter.transactions.filter((t) =>
              progress.completedTransactions.includes(t.id)
            ).length;
            const chTotal = chapter.transactions.length;
            const chDone = chCompleted === chTotal;
            return (
              <Link
                key={chapter.id}
                href={`/story?chapter=${idx}`}
                className={`block p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  chDone
                    ? 'border-green-300 bg-green-50'
                    : chCompleted > 0
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{chapter.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm truncate">
                      {chapter.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{
                            width: `${chTotal > 0 ? (chCompleted / chTotal) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {chCompleted}/{chTotal}
                      </span>
                    </div>
                  </div>
                  {chDone && <span className="text-xl">✅</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Current financial state */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          現在の財務状態（あなたのお店）
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const total = getTotalByCategory(cat);
            return (
              <div
                key={cat}
                className="rounded-lg p-3 text-white text-center"
                style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              >
                <div className="text-xs opacity-90">{CATEGORY_LABELS[cat]}</div>
                <div className="text-lg font-bold mt-1">
                  ¥{total.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer History Summary */}
      {records.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">回答成績</h2>
            <Link
              href="/history"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              詳細を見る →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['journal', 't-account', 'subsidiary-ledger', 'worksheet'] as QuestionCategory[]).map(
              (cat) => {
                const stats = getCategoryStats(cat);
                const rate =
                  stats.total > 0
                    ? Math.round((stats.correct / stats.total) * 100)
                    : 0;
                return (
                  <div key={cat} className="rounded-lg border p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {QUESTION_CATEGORY_LABELS[cat]}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        stats.total === 0
                          ? 'text-gray-300'
                          : rate >= 80
                          ? 'text-green-600'
                          : rate >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stats.total > 0 ? `${rate}%` : '-'}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {stats.total > 0
                        ? `${stats.correct}/${stats.total}回`
                        : '未回答'}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Exam sections */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">試験対策</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/practice"
            className="block p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">✏️</span>
              <div>
                <h3 className="font-bold text-gray-800">第一問</h3>
                <p className="text-xs text-gray-500">仕訳問題</p>
              </div>
            </div>
          </Link>
          <Link
            href="/exam2"
            className="block p-4 rounded-lg border-2 border-indigo-200 bg-indigo-50 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="font-bold text-gray-800">第二問</h3>
                <p className="text-xs text-gray-500">勘定記入・補助簿選択</p>
              </div>
            </div>
          </Link>
          <Link
            href="/exam3"
            className="block p-4 rounded-lg border-2 border-orange-200 bg-orange-50 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-gray-800">第三問</h3>
                <p className="text-xs text-gray-500">精算表の作成</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/story"
          className="block bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">📖</div>
          <h3 className="font-bold text-lg">ストーリーモード</h3>
          <p className="text-blue-100 text-sm mt-1">
            お店を開いて、仕訳を学ぼう
          </p>
        </Link>
        <Link
          href="/practice"
          className="block bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">✏️</div>
          <h3 className="font-bold text-lg">第一問 仕訳練習</h3>
          <p className="text-green-100 text-sm mt-1">
            ドラッグ&ドロップで仕訳を組み立てよう
          </p>
        </Link>
        <Link
          href="/exam2"
          className="block bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-bold text-lg">第二問 勘定記入</h3>
          <p className="text-indigo-100 text-sm mt-1">
            T勘定への記入と補助簿の選択を練習
          </p>
        </Link>
        <Link
          href="/exam3"
          className="block bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-bold text-lg">第三問 精算表</h3>
          <p className="text-orange-100 text-sm mt-1">
            決算整理仕訳から精算表を完成させよう
          </p>
        </Link>
        <Link
          href="/statements"
          className="block bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-bold text-lg">財務諸表を見る</h3>
          <p className="text-purple-100 text-sm mt-1">
            B/SとP/Lをリアルタイムで確認
          </p>
        </Link>
        <Link
          href="/guide"
          className="block bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">📚</div>
          <h3 className="font-bold text-lg">勘定科目ガイド</h3>
          <p className="text-amber-100 text-sm mt-1">
            5要素の色分けで理解しよう
          </p>
        </Link>
      </div>

      {/* Reset button */}
      {completedCount > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('学習データをすべてリセットしますか？')) {
                resetProgress();
              }
            }}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            🔄 学習データをリセット
          </button>
        </div>
      )}
    </div>
  );
}
