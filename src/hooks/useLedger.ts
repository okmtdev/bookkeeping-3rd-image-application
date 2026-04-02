'use client';

import { useCallback } from 'react';
import { LedgerState, LearningProgress, AccountCategory, CATEGORY_POSITIONS } from '@/types';
import { getAccount } from '@/data/accounts';
import { useLocalStorage } from './useLocalStorage';

const initialProgress: LearningProgress = {
  completedTransactions: [],
  currentChapter: 0,
  ledgerState: {},
};

export function useLedger() {
  const [progress, setProgress, isLoaded] = useLocalStorage<LearningProgress>(
    'boki-progress',
    initialProgress
  );

  const applyEntry = useCallback(
    (debitAccountId: string, creditAccountId: string, amount: number, transactionId: string) => {
      setProgress((prev) => {
        const newLedger = { ...prev.ledgerState };
        const debitAccount = getAccount(debitAccountId);
        const creditAccount = getAccount(creditAccountId);
        if (!debitAccount || !creditAccount) return prev;

        // Debit side: assets and expenses increase, others decrease
        if (CATEGORY_POSITIONS[debitAccount.category] === 'left') {
          newLedger[debitAccountId] = (newLedger[debitAccountId] || 0) + amount;
        } else {
          newLedger[debitAccountId] = (newLedger[debitAccountId] || 0) - amount;
        }

        // Credit side: liabilities, equity, and revenue increase, others decrease
        if (CATEGORY_POSITIONS[creditAccount.category] === 'right') {
          newLedger[creditAccountId] = (newLedger[creditAccountId] || 0) + amount;
        } else {
          newLedger[creditAccountId] = (newLedger[creditAccountId] || 0) - amount;
        }

        return {
          ...prev,
          ledgerState: newLedger,
          completedTransactions: prev.completedTransactions.includes(transactionId)
            ? prev.completedTransactions
            : [...prev.completedTransactions, transactionId],
        };
      });
    },
    [setProgress]
  );

  const getTotalByCategory = useCallback(
    (category: AccountCategory): number => {
      return Object.entries(progress.ledgerState).reduce((sum, [accountId, balance]) => {
        const account = getAccount(accountId);
        if (account && account.category === category) {
          return sum + balance;
        }
        return sum;
      }, 0);
    },
    [progress.ledgerState]
  );

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [setProgress]);

  return {
    progress,
    setProgress,
    applyEntry,
    getTotalByCategory,
    resetProgress,
    isLoaded,
  };
}
