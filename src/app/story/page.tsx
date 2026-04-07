'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { storyChapters } from '@/data/stories';
import { useLedger } from '@/hooks/useLedger';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';
import JournalEntryWorkspace from '@/components/JournalEntryWorkspace';
import FinancialStatements from '@/components/FinancialStatements';

function StoryContent() {
  const searchParams = useSearchParams();
  const chapterParam = searchParams.get('chapter');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [showStatements, setShowStatements] = useState(false);
  const { progress, applyEntry, isLoaded } = useLedger();
  const { addRecord } = useAnswerHistory();

  useEffect(() => {
    if (chapterParam !== null) {
      const idx = parseInt(chapterParam);
      if (!isNaN(idx) && idx >= 0 && idx < storyChapters.length) {
        setCurrentChapter(idx);
        setCurrentTransaction(0);
      }
    }
  }, [chapterParam]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  const chapter = storyChapters[currentChapter];
  const transaction = chapter.transactions[currentTransaction];

  const handleComplete = (transactionId: string) => {
    const tx = chapter.transactions.find((t) => t.id === transactionId);
    if (!tx) return;
    applyEntry(
      tx.correctEntry.debit.accountId,
      tx.correctEntry.credit.accountId,
      tx.correctEntry.debit.amount,
      transactionId
    );
  };

  const handleAnswer = useCallback(
    (questionId: string, questionTitle: string, isCorrect: boolean) => {
      addRecord({ questionId, questionTitle, category: 'journal', isCorrect });
    },
    [addRecord]
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📖 ストーリーモード
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          お店を経営しながら仕訳を学ぼう
        </p>
      </div>

      {/* Chapter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {storyChapters.map((ch, idx) => {
          const chCompleted = ch.transactions.every((t) =>
            progress.completedTransactions.includes(t.id)
          );
          return (
            <button
              key={ch.id}
              onClick={() => {
                setCurrentChapter(idx);
                setCurrentTransaction(0);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentChapter === idx
                  ? 'bg-blue-600 text-white'
                  : chCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ch.icon} {ch.title}
              {chCompleted && ' ✅'}
            </button>
          );
        })}
      </div>

      {/* Chapter description */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">{chapter.description}</p>
      </div>

      {/* Transaction tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {chapter.transactions.map((tx, idx) => {
          const done = progress.completedTransactions.includes(tx.id);
          return (
            <button
              key={tx.id}
              onClick={() => setCurrentTransaction(idx)}
              className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                currentTransaction === idx
                  ? 'bg-slate-700 text-white'
                  : done
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {idx + 1}. {tx.title} {done && '✅'}
            </button>
          );
        })}
      </div>

      {/* Journal entry workspace */}
      <JournalEntryWorkspace
        key={transaction.id}
        transaction={transaction}
        onComplete={handleComplete}
        isCompleted={progress.completedTransactions.includes(transaction.id)}
        onAnswer={handleAnswer}
      />

      {/* Financial statements toggle */}
      <div className="mt-6">
        <button
          onClick={() => setShowStatements(!showStatements)}
          className="w-full py-3 bg-white border rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {showStatements ? '📊 財務諸表を隠す ▲' : '📊 財務諸表を表示 ▼'}
        </button>
        {showStatements && (
          <div className="mt-4">
            <FinancialStatements ledgerState={progress.ledgerState} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            if (currentTransaction > 0) {
              setCurrentTransaction(currentTransaction - 1);
            } else if (currentChapter > 0) {
              setCurrentChapter(currentChapter - 1);
              setCurrentTransaction(
                storyChapters[currentChapter - 1].transactions.length - 1
              );
            }
          }}
          disabled={currentChapter === 0 && currentTransaction === 0}
          className="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 前の取引
        </button>
        <button
          onClick={() => {
            if (currentTransaction < chapter.transactions.length - 1) {
              setCurrentTransaction(currentTransaction + 1);
            } else if (currentChapter < storyChapters.length - 1) {
              setCurrentChapter(currentChapter + 1);
              setCurrentTransaction(0);
            }
          }}
          disabled={
            currentChapter === storyChapters.length - 1 &&
            currentTransaction === chapter.transactions.length - 1
          }
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次の取引 →
        </button>
      </div>
    </div>
  );
}

export default function StoryPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-pulse text-gray-400">読み込み中...</div></div>}>
      <StoryContent />
    </Suspense>
  );
}
