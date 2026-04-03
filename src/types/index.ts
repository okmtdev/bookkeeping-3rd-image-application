export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';

export interface Account {
  id: string;
  name: string;
  category: AccountCategory;
  description: string;
}

export interface JournalEntry {
  debit: { accountId: string; amount: number } | null;
  credit: { accountId: string; amount: number } | null;
}

export interface Transaction {
  id: string;
  title: string;
  description: string;
  story: string;
  hint: string;
  correctEntry: {
    debit: { accountId: string; amount: number };
    credit: { accountId: string; amount: number };
  };
}

export interface StoryChapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  transactions: Transaction[];
}

export interface AnswerRecord {
  transactionId: string;
  isCorrect: boolean;
  answeredAt: string; // ISO 8601
  debitAccountId: string | null;
  creditAccountId: string | null;
  debitAmount: number;
  creditAmount: number;
}

export interface LedgerState {
  [accountId: string]: number;
}

export interface LearningProgress {
  completedTransactions: string[];
  currentChapter: number;
  ledgerState: LedgerState;
}

export const CATEGORY_COLORS: Record<AccountCategory, string> = {
  asset: '#3B82F6',
  liability: '#EF4444',
  equity: '#EAB308',
  revenue: '#F97316',
  expense: '#22C55E',
};

export const CATEGORY_BG: Record<AccountCategory, string> = {
  asset: 'bg-asset',
  liability: 'bg-liability',
  equity: 'bg-equity',
  revenue: 'bg-revenue',
  expense: 'bg-expense',
};

export const CATEGORY_LABELS: Record<AccountCategory, string> = {
  asset: '資産',
  liability: '負債',
  equity: '純資産',
  revenue: '収益',
  expense: '費用',
};

export const CATEGORY_POSITIONS: Record<AccountCategory, 'left' | 'right'> = {
  asset: 'left',
  liability: 'right',
  equity: 'right',
  revenue: 'right',
  expense: 'left',
};
