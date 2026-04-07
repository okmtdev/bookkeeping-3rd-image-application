'use client';

import { useState, useMemo } from 'react';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';
import {
  QuestionCategory,
  QUESTION_CATEGORY_LABELS,
  AnswerRecord,
} from '@/types';

type FilterCategory = 'all' | QuestionCategory;

export default function HistoryPage() {
  const { records, getCategoryStats, getLastResult, clearHistory, isLoaded } =
    useAnswerHistory();
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

  const categories: QuestionCategory[] = [
    'journal',
    't-account',
    'subsidiary-ledger',
    'worksheet',
  ];

  const filteredRecords = useMemo(() => {
    const sorted = [...records].reverse();
    if (filterCategory === 'all') return sorted;
    return sorted.filter((r) => r.category === filterCategory);
  }, [records, filterCategory]);

  // Build per-question summary (latest result + stats)
  const questionSummary = useMemo(() => {
    const map = new Map<
      string,
      {
        questionId: string;
        questionTitle: string;
        category: QuestionCategory;
        total: number;
        correct: number;
        lastResult: boolean;
        lastAnsweredAt: string;
      }
    >();

    for (const r of records) {
      const existing = map.get(r.questionId);
      if (existing) {
        existing.total++;
        if (r.isCorrect) existing.correct++;
        existing.lastResult = r.isCorrect;
        existing.lastAnsweredAt = r.answeredAt;
      } else {
        map.set(r.questionId, {
          questionId: r.questionId,
          questionTitle: r.questionTitle,
          category: r.category,
          total: 1,
          correct: r.isCorrect ? 1 : 0,
          lastResult: r.isCorrect,
          lastAnsweredAt: r.answeredAt,
        });
      }
    }

    let summaries = [...map.values()];
    if (filterCategory !== 'all') {
      summaries = summaries.filter((s) => s.category === filterCategory);
    }
    summaries.sort(
      (a, b) =>
        new Date(b.lastAnsweredAt).getTime() -
        new Date(a.lastAnsweredAt).getTime()
    );
    return summaries;
  }, [records, filterCategory]);

  const [viewMode, setViewMode] = useState<'summary' | 'log'>('summary');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">...</div>
      </div>
    );
  }

  const totalAnswers = records.length;
  const totalCorrect = records.filter((r) => r.isCorrect).length;
  const overallRate =
    totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20 md:pb-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          回答履歴
        </h1>
        <p className="text-gray-500 mt-1">
          復習に役立てましょう
        </p>
      </div>

      {/* Overall stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          全体の成績
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {totalAnswers}
            </div>
            <div className="text-xs text-gray-500">総回答数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {totalCorrect}
            </div>
            <div className="text-xs text-gray-500">正解数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {overallRate}%
            </div>
            <div className="text-xs text-gray-500">正答率</div>
          </div>
        </div>

        {/* Per-category stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const stats = getCategoryStats(cat);
            const rate =
              stats.total > 0
                ? Math.round((stats.correct / stats.total) * 100)
                : 0;
            return (
              <div
                key={cat}
                className="border rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {QUESTION_CATEGORY_LABELS[cat]}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {stats.correct}/{stats.total} 正解
                    {stats.uniqueQuestions > 0 && (
                      <span className="ml-2">
                        (最終正解: {stats.lastCorrectCount}/{stats.uniqueQuestions}問)
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`text-lg font-bold ${
                    rate >= 80
                      ? 'text-green-600'
                      : rate >= 50
                      ? 'text-yellow-600'
                      : stats.total === 0
                      ? 'text-gray-400'
                      : 'text-red-600'
                  }`}
                >
                  {stats.total > 0 ? `${rate}%` : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & view toggle */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {QUESTION_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setViewMode('summary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'summary'
                ? 'bg-slate-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            問題別
          </button>
          <button
            onClick={() => setViewMode('log')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'log'
                ? 'bg-slate-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            回答ログ
          </button>
        </div>
      </div>

      {/* Content */}
      {records.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
          <p className="text-lg mb-2">まだ回答履歴がありません</p>
          <p className="text-sm">問題を解くと、ここに履歴が表示されます</p>
        </div>
      ) : viewMode === 'summary' ? (
        <div className="space-y-2">
          {questionSummary.map((q) => {
            const rate =
              q.total > 0
                ? Math.round((q.correct / q.total) * 100)
                : 0;
            return (
              <div
                key={q.questionId}
                className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    q.lastResult
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {q.lastResult ? 'O' : 'X'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {q.questionTitle}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {QUESTION_CATEGORY_LABELS[q.category]} ・ {q.correct}/{q.total}回正解 ({rate}%) ・ 最終: {formatDate(q.lastAnsweredAt)}
                  </div>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    q.lastResult
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {q.lastResult ? '正解' : '不正解'}
                </div>
              </div>
            );
          })}
          {questionSummary.length === 0 && (
            <div className="text-center text-gray-400 py-8 text-sm">
              該当する履歴がありません
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          {filteredRecords.map((r, idx) => (
            <div
              key={`${r.questionId}-${r.answeredAt}-${idx}`}
              className="bg-white rounded-lg shadow-sm px-4 py-3 flex items-center gap-3"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                  r.isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {r.isCorrect ? 'O' : 'X'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-800 truncate">
                  {r.questionTitle}
                </div>
                <div className="text-xs text-gray-400">
                  {QUESTION_CATEGORY_LABELS[r.category]}
                </div>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">
                {formatDate(r.answeredAt)}
              </div>
            </div>
          ))}
          {filteredRecords.length === 0 && (
            <div className="text-center text-gray-400 py-8 text-sm">
              該当する履歴がありません
            </div>
          )}
        </div>
      )}

      {/* Clear history */}
      {records.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('回答履歴をすべて削除しますか？')) {
                clearHistory();
              }
            }}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            回答履歴をリセット
          </button>
        </div>
      )}
    </div>
  );
}
