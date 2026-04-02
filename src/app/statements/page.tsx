'use client';

import { useLedger } from '@/hooks/useLedger';
import { accounts, getAccount } from '@/data/accounts';
import { CATEGORY_LABELS, CATEGORY_COLORS, AccountCategory, CATEGORY_POSITIONS } from '@/types';
import FinancialStatements from '@/components/FinancialStatements';

export default function StatementsPage() {
  const { progress, isLoaded } = useLedger();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  const categories: AccountCategory[] = ['asset', 'liability', 'equity', 'revenue', 'expense'];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📊 財務諸表</h1>
        <p className="text-gray-500 text-sm mt-1">
          あなたのお店の財務状態をリアルタイムで確認
        </p>
      </div>

      <FinancialStatements ledgerState={progress.ledgerState} />

      {/* Detail ledger */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">勘定科目残高一覧</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">科目</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">分類</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">定位置</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">残高</th>
                </tr>
              </thead>
              <tbody>
                {accounts
                  .filter((a) => (progress.ledgerState[a.id] || 0) !== 0)
                  .map((a) => (
                    <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-white text-xs"
                          style={{ backgroundColor: CATEGORY_COLORS[a.category] }}
                        >
                          {CATEGORY_LABELS[a.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {CATEGORY_POSITIONS[a.category] === 'left' ? '借方（左）' : '貸方（右）'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        ¥{(progress.ledgerState[a.id] || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                {Object.values(progress.ledgerState).every((v) => v === 0) && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      まだ取引がありません。ストーリーモードで取引を始めましょう！
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
