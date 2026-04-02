import { Account } from '@/types';

export const accounts: Account[] = [
  // 資産
  { id: 'cash', name: '現金', category: 'asset', description: '手元にあるお金' },
  { id: 'deposit', name: '普通預金', category: 'asset', description: '銀行に預けているお金' },
  { id: 'accounts_receivable', name: '売掛金', category: 'asset', description: '商品を売ったがまだもらっていないお金' },
  { id: 'notes_receivable', name: '受取手形', category: 'asset', description: '手形で受け取る予定のお金' },
  { id: 'merchandise', name: '商品', category: 'asset', description: '販売するために持っている商品' },
  { id: 'supplies', name: '消耗品', category: 'asset', description: '事務用品など消耗するもの' },
  { id: 'equipment', name: '備品', category: 'asset', description: 'パソコンや机などの設備' },
  { id: 'building', name: '建物', category: 'asset', description: '店舗や事務所の建物' },
  { id: 'land', name: '土地', category: 'asset', description: '所有している土地' },
  { id: 'electronic_receivable', name: '電子記録債権', category: 'asset', description: '電子的に記録された債権' },

  // 負債
  { id: 'accounts_payable', name: '買掛金', category: 'liability', description: '商品を買ったがまだ払っていないお金' },
  { id: 'notes_payable', name: '支払手形', category: 'liability', description: '手形で支払う予定のお金' },
  { id: 'borrowing', name: '借入金', category: 'liability', description: '銀行などから借りたお金' },
  { id: 'unearned_revenue', name: '前受金', category: 'liability', description: '商品を渡す前にもらったお金' },
  { id: 'electronic_payable', name: '電子記録債務', category: 'liability', description: '電子的に記録された債務' },

  // 純資産
  { id: 'capital', name: '資本金', category: 'equity', description: 'オーナーが出したお金（元手）' },
  { id: 'retained_earnings', name: '繰越利益剰余金', category: 'equity', description: '過去の利益の蓄積' },

  // 収益
  { id: 'sales', name: '売上', category: 'revenue', description: '商品を売って得た収入' },
  { id: 'interest_income', name: '受取利息', category: 'revenue', description: '預金などから得た利息' },
  { id: 'fee_income', name: '受取手数料', category: 'revenue', description: 'サービス提供で得た手数料' },

  // 費用
  { id: 'purchases', name: '仕入', category: 'expense', description: '商品を買うための費用' },
  { id: 'salary', name: '給料', category: 'expense', description: '従業員に払う給料' },
  { id: 'rent', name: '支払家賃', category: 'expense', description: '店舗や事務所の家賃' },
  { id: 'utilities', name: '水道光熱費', category: 'expense', description: '電気・ガス・水道の料金' },
  { id: 'communication', name: '通信費', category: 'expense', description: '電話やインターネット代' },
  { id: 'depreciation', name: '減価償却費', category: 'expense', description: '固定資産の価値減少分の費用' },
  { id: 'supplies_expense', name: '消耗品費', category: 'expense', description: '使った消耗品の費用' },
  { id: 'interest_expense', name: '支払利息', category: 'expense', description: '借入金にかかる利息' },
];

export const getAccount = (id: string): Account | undefined =>
  accounts.find((a) => a.id === id);

export const getAccountsByCategory = (category: Account['category']): Account[] =>
  accounts.filter((a) => a.category === category);
