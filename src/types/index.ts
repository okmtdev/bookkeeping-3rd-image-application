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

// 第二問: 勘定記入 (T-Account)
export interface TAccountEntry {
  date: string;
  description: string;
  amount: number;
}

export interface TAccountQuestion {
  id: string;
  title: string;
  description: string;
  hint: string;
  accountName: string;
  accountId: string;
  correctDebitEntries: TAccountEntry[];
  correctCreditEntries: TAccountEntry[];
}

// 第二問: 補助簿選択
export type SubsidiaryLedgerType =
  | 'cash_book'
  | 'deposit_journal'
  | 'purchase_journal'
  | 'sales_journal'
  | 'notes_receivable_book'
  | 'notes_payable_book'
  | 'accounts_receivable_ledger'
  | 'accounts_payable_ledger';

export const SUBSIDIARY_LEDGER_LABELS: Record<SubsidiaryLedgerType, string> = {
  cash_book: '現金出納帳',
  deposit_journal: '当座預金出納帳',
  purchase_journal: '仕入帳',
  sales_journal: '売上帳',
  notes_receivable_book: '受取手形記入帳',
  notes_payable_book: '支払手形記入帳',
  accounts_receivable_ledger: '売掛金元帳',
  accounts_payable_ledger: '買掛金元帳',
};

export interface SubsidiaryLedgerQuestion {
  id: string;
  title: string;
  description: string;
  hint: string;
  journalEntry: {
    debit: { accountName: string; amount: number };
    credit: { accountName: string; amount: number };
  };
  correctLedgers: SubsidiaryLedgerType[];
}

// 第三問: 精算表
export interface TrialBalanceRow {
  accountId: string;
  accountName: string;
  trialDebit: number;
  trialCredit: number;
  adjustDebit: number;
  adjustCredit: number;
  plDebit: number;
  plCredit: number;
  bsDebit: number;
  bsCredit: number;
}

export interface WorksheetQuestion {
  id: string;
  title: string;
  description: string;
  hint: string;
  adjustingEntries: {
    description: string;
    debit: { accountName: string; amount: number };
    credit: { accountName: string; amount: number };
  }[];
  trialBalance: {
    accountName: string;
    debit: number;
    credit: number;
    category: AccountCategory;
  }[];
  // 精算表の正解（整理記入・P/L・B/S列の金額）
  correctAnswers: {
    accountName: string;
    adjustDebit: number;
    adjustCredit: number;
    plDebit: number;
    plCredit: number;
    bsDebit: number;
    bsCredit: number;
  }[];
}

export const CATEGORY_POSITIONS: Record<AccountCategory, 'left' | 'right'> = {
  asset: 'left',
  liability: 'right',
  equity: 'right',
  revenue: 'right',
  expense: 'left',
};
