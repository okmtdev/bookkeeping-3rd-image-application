'use client';

import { useCallback } from 'react';
import { AnswerRecord } from '@/types';
import { useLocalStorage } from './useLocalStorage';

export function useAnswerHistory() {
  const [history, setHistory, isLoaded] = useLocalStorage<AnswerRecord[]>(
    'boki-answer-history',
    []
  );

  const addRecord = useCallback(
    (record: Omit<AnswerRecord, 'answeredAt'>) => {
      setHistory((prev) => [
        ...prev,
        { ...record, answeredAt: new Date().toISOString() },
      ]);
    },
    [setHistory]
  );

  const getRecordsForTransaction = useCallback(
    (transactionId: string): AnswerRecord[] => {
      return history.filter((r) => r.transactionId === transactionId);
    },
    [history]
  );

  const getLastRecord = useCallback(
    (transactionId: string): AnswerRecord | undefined => {
      const records = history.filter((r) => r.transactionId === transactionId);
      return records.length > 0 ? records[records.length - 1] : undefined;
    },
    [history]
  );

  const getStats = useCallback(() => {
    const total = history.length;
    const correct = history.filter((r) => r.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, incorrect, accuracy };
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addRecord,
    getRecordsForTransaction,
    getLastRecord,
    getStats,
    clearHistory,
    isLoaded,
  };
}
