'use client';

import { accounts } from '@/data/accounts';
import {
  AccountCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_POSITIONS,
} from '@/types';

const categoryInfo: {
  category: AccountCategory;
  description: string;
  rule: string;
  examples: string;
  icon: string;
}[] = [
  {
    category: 'asset',
    description:
      '会社が持っている「財産」です。現金、預金、売掛金、建物など、将来お金に換えられるものや、お金そのものが含まれます。',
    rule: '増えたら左（借方）、減ったら右（貸方）に記入',
    examples: '現金を受け取った → 借方に現金 / 現金を支払った → 貸方に現金',
    icon: '💎',
  },
  {
    category: 'liability',
    description:
      '会社が将来支払う義務のある「借金」です。買掛金、借入金、前受金など、他の人や会社に返さなければいけないものです。',
    rule: '増えたら右（貸方）、減ったら左（借方）に記入',
    examples: 'お金を借りた → 貸方に借入金 / 借金を返した → 借方に借入金',
    icon: '📋',
  },
  {
    category: 'equity',
    description:
      'オーナーが会社に出した「元手」と、これまでに稼いだ利益の蓄積です。資産から負債を引いた「正味の財産」とも言えます。',
    rule: '増えたら右（貸方）、減ったら左（借方）に記入',
    examples: 'オーナーが出資 → 貸方に資本金',
    icon: '👑',
  },
  {
    category: 'revenue',
    description:
      '商品を売ったり、サービスを提供したりして得た「収入」です。売上、受取利息、受取手数料などが含まれます。',
    rule: '発生したら右（貸方）に記入',
    examples: '商品を販売 → 貸方に売上',
    icon: '📈',
  },
  {
    category: 'expense',
    description:
      '収益を得るためにかかった「支出」です。仕入、給料、家賃、水道光熱費などが含まれます。',
    rule: '発生したら左（借方）に記入',
    examples: '商品を仕入れ → 借方に仕入 / 家賃を支払い → 借方に支払家賃',
    icon: '💸',
  },
];

export default function GuidePage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">📚 勘定科目ガイド</h1>
        <p className="text-gray-500 text-sm mt-1">
          会計の5大要素と勘定科目の「定位置」を理解しよう
        </p>
      </div>

      {/* Position overview diagram */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          仕訳の基本ルール
        </h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600 mb-3">
              借方（左側）= 増加する場所
            </div>
            <div className="space-y-2">
              <div
                className="py-2 px-4 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: CATEGORY_COLORS.asset }}
              >
                💎 資産
              </div>
              <div
                className="py-2 px-4 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: CATEGORY_COLORS.expense }}
              >
                💸 費用
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600 mb-3">
              貸方（右側）= 増加する場所
            </div>
            <div className="space-y-2">
              <div
                className="py-2 px-4 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: CATEGORY_COLORS.liability }}
              >
                📋 負債
              </div>
              <div
                className="py-2 px-4 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: CATEGORY_COLORS.equity }}
              >
                👑 純資産
              </div>
              <div
                className="py-2 px-4 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: CATEGORY_COLORS.revenue }}
              >
                📈 収益
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
          <p className="text-sm text-yellow-800">
            ポイント：借方と貸方の金額は必ず一致します（貸借平均の原理）
          </p>
        </div>
      </div>

      {/* Category detail cards */}
      <div className="space-y-6">
        {categoryInfo.map((info) => {
          const categoryAccounts = accounts.filter(
            (a) => a.category === info.category
          );
          return (
            <div
              key={info.category}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div
                className="p-4 md:p-6 text-white"
                style={{ backgroundColor: CATEGORY_COLORS[info.category] }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{info.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">
                      {CATEGORY_LABELS[info.category]}
                    </h3>
                    <span className="text-sm opacity-90">
                      定位置：
                      {CATEGORY_POSITIONS[info.category] === 'left'
                        ? '借方（左側）'
                        : '貸方（右側）'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {info.description}
                </p>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-blue-800">
                    📝 記入ルール
                  </p>
                  <p className="text-sm text-blue-700 mt-1">{info.rule}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    💡 具体例
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{info.examples}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    主な勘定科目：
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryAccounts.map((a) => (
                      <div
                        key={a.id}
                        className="group relative"
                      >
                        <span
                          className="inline-block px-3 py-1.5 rounded-lg text-white text-sm font-medium cursor-help"
                          style={{
                            backgroundColor: CATEGORY_COLORS[info.category],
                            opacity: 0.85,
                          }}
                        >
                          {a.name}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          {a.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick reference table */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            早見表：増減と借方・貸方の関係
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    要素
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">
                    色
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">
                    増加 →
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">
                    減少 →
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryInfo.map((info) => (
                  <tr key={info.category} className="border-t">
                    <td className="px-4 py-3 font-medium">
                      {info.icon} {CATEGORY_LABELS[info.category]}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-block w-6 h-6 rounded"
                        style={{
                          backgroundColor: CATEGORY_COLORS[info.category],
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 text-center font-medium">
                      {CATEGORY_POSITIONS[info.category] === 'left'
                        ? '借方（左）'
                        : '貸方（右）'}
                    </td>
                    <td className="px-4 py-3 text-center font-medium">
                      {CATEGORY_POSITIONS[info.category] === 'left'
                        ? '貸方（右）'
                        : '借方（左）'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
