'use client';

import { useState, useMemo } from 'react';
import { storyChapters } from '@/data/stories';
import { useLedger } from '@/hooks/useLedger';
import JournalEntryWorkspace from '@/components/JournalEntryWorkspace';
import FinancialStatements from '@/components/FinancialStatements';
import { Transaction } from '@/types';

export default function PracticePage() {
  const { progress, applyEntry, isLoaded } = useLedger();
  const [mode, setMode] = useState<'sequential' | 'random'>('sequential');
  const [currentIndex, setCurrentIndex] = useState(0);

  const allTransactions = useMemo(
    () => storyChapters.flatMap((ch) => ch.transactions),
    []
  );

  const shuffled = useMemo(() => {
    const arr = [...allTransactions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [allTransactions]);

  const transactions = mode === 'random' ? shuffled : allTransactions;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  const currentTx = transactions[currentIndex];

  const handleComplete = (transactionId: string) => {
    const tx = allTransactions.find((t) => t.id === transactionId);
    if (!tx) return;
    applyEntry(
      tx.correctEntry.debit.accountId,
      tx.correctEntry.credit.accountId,
      tx.correctEntry.debit.amount,
      transactionId
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">✏️ 仕訳練習</h1>
        <p className="text-gray-500 text-sm mt-1">
          ドラッグ&ドロップで仕訳を組み立てよう
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setMode('sequential');
            setCurrentIndex(0);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'sequential'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          順番に練習
        </button>
        <button
          onClick={() => {
            setMode('random');
            setCurrentIndex(0);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'random'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ランダム
        </button>
      </div>

      {/* Progress indicator */}
      <div className="text-sm text-gray-500 mb-4">
        問題 {currentIndex + 1} / {transactions.length}
      </div>

      {/* Workspace */}
      {currentTx && (
        <JournalEntryWorkspace
          key={currentTx.id + mode}
          transaction={currentTx}
          onComplete={handleComplete}
          isCompleted={progress.completedTransactions.includes(currentTx.id)}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 前の問題
        </button>
        <button
          onClick={() =>
            setCurrentIndex(Math.min(transactions.length - 1, currentIndex + 1))
          }
          disabled={currentIndex === transactions.length - 1}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次の問題 →
        </button>
      </div>

      {/* Financial statements */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          リアルタイム財務諸表
        </h2>
        <FinancialStatements ledgerState={progress.ledgerState} />
      </div>
    </div>
  );
}
