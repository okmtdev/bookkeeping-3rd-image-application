'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';
import { storyChapters } from '@/data/stories';
import { getAccount } from '@/data/accounts';
import { Transaction } from '@/types';

const allTransactions = storyChapters.flatMap((ch) => ch.transactions);

function getTransaction(id: string): Transaction | undefined {
  return allTransactions.find((t) => t.id === id);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryPage() {
  const { history, getStats, clearHistory, isLoaded } = useAnswerHistory();

  const reversedHistory = useMemo(() => [...history].reverse(), [history]);

  const transactionSummary = useMemo(() => {
    const map = new Map<
      string,
      { total: number; correct: number; lastCorrect: boolean | null; title: string }
    >();
    for (const tx of allTransactions) {
      map.set(tx.id, { total: 0, correct: 0, lastCorrect: null, title: tx.title });
    }
    for (const record of history) {
      const entry = map.get(record.transactionId);
      if (entry) {
        entry.total++;
        if (record.isCorrect) entry.correct++;
        entry.lastCorrect = record.isCorrect;
      }
    }
    return map;
  }, [history]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📋 回答履歴</h1>
        <p className="text-gray-500 text-sm mt-1">
          過去の回答を振り返って復習に役立てよう
        </p>
      </div>

      {/* Stats overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">回答統計</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg p-3 bg-gray-50 text-center">
            <div className="text-xs text-gray-500">総回答数</div>
            <div className="text-xl font-bold text-gray-800 mt-1">{stats.total}</div>
          </div>
          <div className="rounded-lg p-3 bg-green-50 text-center">
            <div className="text-xs text-green-600">正解</div>
            <div className="text-xl font-bold text-green-700 mt-1">{stats.correct}</div>
          </div>
          <div className="rounded-lg p-3 bg-red-50 text-center">
            <div className="text-xs text-red-600">不正解</div>
            <div className="text-xl font-bold text-red-700 mt-1">{stats.incorrect}</div>
          </div>
          <div className="rounded-lg p-3 bg-blue-50 text-center">
            <div className="text-xs text-blue-600">正答率</div>
            <div className="text-xl font-bold text-blue-700 mt-1">{stats.accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Per-transaction summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">問題別サマリー</h2>
        {stats.total === 0 ? (
          <p className="text-sm text-gray-400">まだ回答がありません。問題を解いてみましょう！</p>
        ) : (
          <div className="space-y-2">
            {Array.from(transactionSummary.entries()).map(([txId, summary]) => {
              if (summary.total === 0) return null;
              const accuracy =
                summary.total > 0
                  ? Math.round((summary.correct / summary.total) * 100)
                  : 0;
              return (
                <div
                  key={txId}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      summary.lastCorrect === true
                        ? 'bg-green-500'
                        : summary.lastCorrect === false
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                    title={
                      summary.lastCorrect === true
                        ? '前回正解'
                        : summary.lastCorrect === false
                        ? '前回不正解'
                        : '未回答'
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {summary.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {summary.correct}/{summary.total} 正解 ({accuracy}%)
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {summary.lastCorrect === true && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        前回正解
                      </span>
                    )}
                    {summary.lastCorrect === false && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        前回不正解
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed history */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">回答詳細履歴</h2>
        {reversedHistory.length === 0 ? (
          <p className="text-sm text-gray-400">まだ回答がありません。</p>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {reversedHistory.map((record, idx) => {
              const tx = getTransaction(record.transactionId);
              const debitAccount = record.debitAccountId
                ? getAccount(record.debitAccountId)
                : null;
              const creditAccount = record.creditAccountId
                ? getAccount(record.creditAccountId)
                : null;
              return (
                <div
                  key={`${record.answeredAt}-${idx}`}
                  className={`p-3 rounded-lg border ${
                    record.isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          record.isCorrect
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {record.isCorrect ? '正解' : '不正解'}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {tx?.title ?? record.transactionId}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(record.answeredAt)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    借方: {debitAccount?.name ?? '?'} ¥{record.debitAmount.toLocaleString()}
                    {' / '}
                    貸方: {creditAccount?.name ?? '?'} ¥{record.creditAmount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← ダッシュボードに戻る
        </Link>
        {history.length > 0 && (
          <button
            onClick={() => {
              if (confirm('回答履歴をすべて削除しますか？')) {
                clearHistory();
              }
            }}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            履歴をクリア
          </button>
        )}
      </div>
    </div>
  );
}
