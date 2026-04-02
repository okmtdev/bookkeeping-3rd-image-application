'use client';

import { useMemo } from 'react';
import { LedgerState, AccountCategory, CATEGORY_COLORS, CATEGORY_LABELS } from '@/types';
import { accounts, getAccount } from '@/data/accounts';

interface FinancialStatementsProps {
  ledgerState: LedgerState;
}

interface BarEntry {
  accountId: string;
  name: string;
  amount: number;
  color: string;
}

function StatementBar({ entries, maxTotal, title }: { entries: BarEntry[]; maxTotal: number; title: string }) {
  const total = entries.reduce((s, e) => s + e.amount, 0);
  return (
    <div className="flex-1">
      <div className="text-xs font-medium text-gray-500 mb-1 text-center">{title}</div>
      <div className="text-center font-bold text-sm mb-2">¥{total.toLocaleString()}</div>
      <div className="relative h-48 md:h-64 bg-gray-50 rounded-lg overflow-hidden border flex flex-col-reverse">
        {entries
          .filter((e) => e.amount > 0)
          .map((entry) => {
            const pct = maxTotal > 0 ? (entry.amount / maxTotal) * 100 : 0;
            return (
              <div
                key={entry.accountId}
                className="w-full flex items-center justify-center text-white text-xs font-medium animate-bar-grow"
                style={{
                  height: `${pct}%`,
                  backgroundColor: entry.color,
                  minHeight: entry.amount > 0 ? '20px' : '0',
                }}
              >
                <span className="truncate px-1">
                  {entry.name} ¥{entry.amount.toLocaleString()}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function FinancialStatements({ ledgerState }: FinancialStatementsProps) {
  const { bsData, plData, maxBsTotal, maxPlTotal } = useMemo(() => {
    const getEntries = (category: AccountCategory, color: string): BarEntry[] =>
      accounts
        .filter((a) => a.category === category && (ledgerState[a.id] || 0) > 0)
        .map((a) => ({
          accountId: a.id,
          name: a.name,
          amount: ledgerState[a.id] || 0,
          color,
        }));

    const assetEntries = getEntries('asset', CATEGORY_COLORS.asset);
    const liabilityEntries = getEntries('liability', CATEGORY_COLORS.liability);
    const equityEntries = getEntries('equity', CATEGORY_COLORS.equity);
    const revenueEntries = getEntries('revenue', CATEGORY_COLORS.revenue);
    const expenseEntries = getEntries('expense', CATEGORY_COLORS.expense);

    const assetTotal = assetEntries.reduce((s, e) => s + e.amount, 0);
    const liabEquityTotal =
      liabilityEntries.reduce((s, e) => s + e.amount, 0) +
      equityEntries.reduce((s, e) => s + e.amount, 0);
    const revenueTotal = revenueEntries.reduce((s, e) => s + e.amount, 0);
    const expenseTotal = expenseEntries.reduce((s, e) => s + e.amount, 0);

    // Net income goes into equity side of B/S
    const netIncome = revenueTotal - expenseTotal;

    return {
      bsData: {
        left: assetEntries,
        rightLiab: liabilityEntries,
        rightEquity: equityEntries,
        netIncome,
      },
      plData: { left: expenseEntries, right: revenueEntries },
      maxBsTotal: Math.max(assetTotal, liabEquityTotal + Math.max(0, netIncome)),
      maxPlTotal: Math.max(revenueTotal, expenseTotal),
    };
  }, [ledgerState]);

  const hasData = Object.values(ledgerState).some((v) => v !== 0);

  if (!hasData) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">📊</div>
        <p>仕訳を作成すると、ここに財務諸表が表示されます</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* B/S */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">B/S</span>
          貸借対照表
        </h3>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex gap-4">
            <StatementBar
              entries={bsData.left}
              maxTotal={maxBsTotal}
              title="資産（借方）"
            />
            <div className="w-px bg-gray-300 self-stretch" />
            <StatementBar
              entries={[
                ...bsData.rightLiab,
                ...bsData.rightEquity,
                ...(bsData.netIncome > 0
                  ? [
                      {
                        accountId: 'net_income',
                        name: '当期純利益',
                        amount: bsData.netIncome,
                        color: '#A855F7',
                      },
                    ]
                  : []),
              ]}
              maxTotal={maxBsTotal}
              title="負債・純資産（貸方）"
            />
          </div>
        </div>
      </div>

      {/* P/L */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">P/L</span>
          損益計算書
        </h3>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex gap-4">
            <StatementBar
              entries={plData.left}
              maxTotal={maxPlTotal}
              title="費用（借方）"
            />
            <div className="w-px bg-gray-300 self-stretch" />
            <StatementBar
              entries={plData.right}
              maxTotal={maxPlTotal}
              title="収益（貸方）"
            />
          </div>
          {(() => {
            const rev = plData.right.reduce((s, e) => s + e.amount, 0);
            const exp = plData.left.reduce((s, e) => s + e.amount, 0);
            const net = rev - exp;
            return (
              <div className={`mt-4 text-center p-3 rounded-lg ${net >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className="text-sm text-gray-600">当期純利益: </span>
                <span className={`font-bold ${net >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ¥{net.toLocaleString()}
                </span>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
