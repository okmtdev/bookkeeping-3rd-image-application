'use client';

import { useState, useCallback } from 'react';
import { Account, Transaction, AnswerRecord, CATEGORY_COLORS, CATEGORY_LABELS } from '@/types';
import { accounts, getAccount } from '@/data/accounts';
import AccountBlock from './AccountBlock';
import BalanceScale from './BalanceScale';

interface JournalEntryWorkspaceProps {
  transaction: Transaction;
  onComplete: (transactionId: string) => void;
  onAnswer?: (record: Omit<AnswerRecord, 'answeredAt'>) => void;
  isCompleted: boolean;
  lastResult?: 'correct' | 'incorrect';
  attemptCount?: number;
}

interface DroppedItem {
  account: Account;
  amount: number;
}

export default function JournalEntryWorkspace({
  transaction,
  onComplete,
  onAnswer,
  isCompleted,
  lastResult,
  attemptCount,
}: JournalEntryWorkspaceProps) {
  const [debitItem, setDebitItem] = useState<DroppedItem | null>(null);
  const [creditItem, setCreditItem] = useState<DroppedItem | null>(null);
  const [debitAmount, setDebitAmount] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedForMobile, setSelectedForMobile] = useState<Account | null>(null);
  const [mobileTarget, setMobileTarget] = useState<'debit' | 'credit' | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, account: Account) => {
    e.dataTransfer.setData('text/plain', account.id);
  }, []);

  const handleDrop = useCallback(
    (side: 'debit' | 'credit') => (e: React.DragEvent) => {
      e.preventDefault();
      const accountId = e.dataTransfer.getData('text/plain');
      const account = getAccount(accountId);
      if (!account) return;
      if (side === 'debit') {
        setDebitItem({ account, amount: 0 });
      } else {
        setCreditItem({ account, amount: 0 });
      }
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleMobileTap = useCallback(
    (account: Account) => {
      if (mobileTarget === 'debit') {
        setDebitItem({ account, amount: 0 });
        setMobileTarget(null);
        setSelectedForMobile(null);
      } else if (mobileTarget === 'credit') {
        setCreditItem({ account, amount: 0 });
        setMobileTarget(null);
        setSelectedForMobile(null);
      } else {
        setSelectedForMobile(account);
      }
    },
    [mobileTarget]
  );

  const checkAnswer = () => {
    if (!debitItem || !creditItem) return;
    const da = parseInt(debitAmount) || 0;
    const ca = parseInt(creditAmount) || 0;
    const correct =
      debitItem.account.id === transaction.correctEntry.debit.accountId &&
      creditItem.account.id === transaction.correctEntry.credit.accountId &&
      da === transaction.correctEntry.debit.amount &&
      ca === transaction.correctEntry.credit.amount;
    setResult(correct ? 'correct' : 'incorrect');
    onAnswer?.({
      transactionId: transaction.id,
      isCorrect: correct,
      debitAccountId: debitItem.account.id,
      creditAccountId: creditItem.account.id,
      debitAmount: da,
      creditAmount: ca,
    });
    if (correct) {
      onComplete(transaction.id);
    }
  };

  const resetEntry = () => {
    setDebitItem(null);
    setCreditItem(null);
    setDebitAmount('');
    setCreditAmount('');
    setResult(null);
    setSelectedForMobile(null);
    setMobileTarget(null);
  };

  const debitNum = parseInt(debitAmount) || 0;
  const creditNum = parseInt(creditAmount) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Transaction description */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 md:p-6">
        <h3 className="font-bold text-lg">{transaction.title}</h3>
        <p className="text-slate-200 mt-1 text-sm">{transaction.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {isCompleted && (
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              完了済み
            </span>
          )}
          {lastResult === 'correct' && (
            <span className="inline-block bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
              前回正解
            </span>
          )}
          {lastResult === 'incorrect' && (
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              前回不正解
            </span>
          )}
          {attemptCount !== undefined && attemptCount > 0 && (
            <span className="inline-block bg-slate-500 text-white text-xs px-2 py-1 rounded-full">
              回答回数: {attemptCount}
            </span>
          )}
        </div>
      </div>

      {/* Story */}
      <div className="p-4 md:p-6 bg-amber-50 border-b border-amber-100">
        <p className="text-sm text-amber-900 leading-relaxed">{transaction.story}</p>
      </div>

      {/* Balance scale */}
      <div className="flex justify-center border-b">
        <BalanceScale debitAmount={debitNum} creditAmount={creditNum} />
      </div>

      {/* Drop zones */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Debit side */}
          <div>
            <div className="text-sm font-semibold text-blue-600 mb-2">
              借方（左側）
            </div>
            <div
              onDrop={handleDrop('debit')}
              onDragOver={handleDragOver}
              onClick={() => {
                if (selectedForMobile) {
                  setDebitItem({ account: selectedForMobile, amount: 0 });
                  setSelectedForMobile(null);
                  setMobileTarget(null);
                } else {
                  setMobileTarget('debit');
                }
              }}
              className={`drop-zone min-h-[80px] p-3 flex flex-col items-center justify-center gap-2 ${
                mobileTarget === 'debit' ? 'drop-zone-active' : ''
              }`}
            >
              {debitItem ? (
                <div className="flex flex-col items-center gap-2 w-full">
                  <AccountBlock account={debitItem.account} size="sm" />
                  <input
                    type="number"
                    value={debitAmount}
                    onChange={(e) => setDebitAmount(e.target.value)}
                    placeholder="金額を入力"
                    className="w-full max-w-[200px] border rounded-lg px-3 py-2 text-center text-sm"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDebitItem(null);
                      setDebitAmount('');
                    }}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    取り消す
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  {mobileTarget === 'debit'
                    ? '👇 下から科目を選んでください'
                    : 'ここに科目をドロップ（またはタップ）'}
                </p>
              )}
            </div>
          </div>

          {/* Credit side */}
          <div>
            <div className="text-sm font-semibold text-red-600 mb-2">
              貸方（右側）
            </div>
            <div
              onDrop={handleDrop('credit')}
              onDragOver={handleDragOver}
              onClick={() => {
                if (selectedForMobile) {
                  setCreditItem({ account: selectedForMobile, amount: 0 });
                  setSelectedForMobile(null);
                  setMobileTarget(null);
                } else {
                  setMobileTarget('credit');
                }
              }}
              className={`drop-zone min-h-[80px] p-3 flex flex-col items-center justify-center gap-2 ${
                mobileTarget === 'credit' ? 'drop-zone-active' : ''
              }`}
            >
              {creditItem ? (
                <div className="flex flex-col items-center gap-2 w-full">
                  <AccountBlock account={creditItem.account} size="sm" />
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    placeholder="金額を入力"
                    className="w-full max-w-[200px] border rounded-lg px-3 py-2 text-center text-sm"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCreditItem(null);
                      setCreditAmount('');
                    }}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    取り消す
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  {mobileTarget === 'credit'
                    ? '👇 下から科目を選んでください'
                    : 'ここに科目をドロップ（またはタップ）'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Account blocks to choose from */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">
            勘定科目（ドラッグまたはタップして選択）
          </h4>
          <div className="flex flex-wrap gap-2">
            {accounts
              .filter((a) => {
                const relevantIds = [
                  transaction.correctEntry.debit.accountId,
                  transaction.correctEntry.credit.accountId,
                ];
                // Show correct accounts + some distractors
                const distractorIds = accounts
                  .filter((x) => !relevantIds.includes(x.id))
                  .slice(0, 6)
                  .map((x) => x.id);
                return relevantIds.includes(a.id) || distractorIds.includes(a.id);
              })
              .sort(() => 0.5 - Math.random())
              .map((account) => (
                <AccountBlock
                  key={account.id}
                  account={account}
                  onDragStart={handleDragStart}
                  onTouchStart={handleMobileTap}
                  size="sm"
                />
              ))}
          </div>
        </div>

        {/* Result display */}
        {result && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              result === 'correct'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {result === 'correct' ? (
              <div>
                <p className="font-bold text-green-700">🎉 正解！</p>
                <p className="text-sm text-green-600 mt-1">
                  仕訳が正しく完成しました。財務諸表に反映されています。
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-red-700">❌ 不正解</p>
                <p className="text-sm text-red-600 mt-1">
                  もう一度考えてみましょう。ヒントを見てもOKです！
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={checkAnswer}
            disabled={!debitItem || !creditItem || !debitAmount || !creditAmount}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm
              hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            回答する
          </button>
          <button
            onClick={resetEntry}
            className="px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm
              hover:bg-gray-50 transition-colors"
          >
            やり直し
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2.5 border border-amber-300 text-amber-600 rounded-lg text-sm
              hover:bg-amber-50 transition-colors"
          >
            {showHint ? 'ヒントを隠す' : '💡 ヒント'}
          </button>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">{transaction.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
