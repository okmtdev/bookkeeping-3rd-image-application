'use client';

import { useState } from 'react';
import { SubsidiaryLedgerQuestion, SubsidiaryLedgerType, SUBSIDIARY_LEDGER_LABELS } from '@/types';

interface SubsidiaryLedgerWorkspaceProps {
  question: SubsidiaryLedgerQuestion;
  onCorrect?: () => void;
  onAnswer?: (questionId: string, questionTitle: string, isCorrect: boolean) => void;
}

const allLedgerTypes: SubsidiaryLedgerType[] = [
  'cash_book',
  'deposit_journal',
  'purchase_journal',
  'sales_journal',
  'notes_receivable_book',
  'notes_payable_book',
  'accounts_receivable_ledger',
  'accounts_payable_ledger',
];

export default function SubsidiaryLedgerWorkspace({ question, onCorrect, onAnswer }: SubsidiaryLedgerWorkspaceProps) {
  const [selected, setSelected] = useState<Set<SubsidiaryLedgerType>>(new Set());
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const toggle = (ledger: SubsidiaryLedgerType) => {
    if (result === 'correct') return;
    const next = new Set(selected);
    if (next.has(ledger)) {
      next.delete(ledger);
    } else {
      next.add(ledger);
    }
    setSelected(next);
    setResult(null);
  };

  const handleSubmit = () => {
    const correct = new Set(question.correctLedgers);
    const isCorrect =
      selected.size === correct.size &&
      [...selected].every((s) => correct.has(s));
    if (isCorrect) {
      setResult('correct');
      onCorrect?.();
    } else {
      setResult('incorrect');
    }
    onAnswer?.(question.id, question.title, isCorrect);
  };

  const handleShowAnswer = () => {
    setSelected(new Set(question.correctLedgers));
    setResult('correct');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Question */}
      <h3 className="font-bold text-lg text-gray-800 mb-2">{question.title}</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-amber-900">{question.description}</p>
      </div>

      {/* Journal Entry Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-500 mb-2 font-semibold">仕訳:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="text-xs text-blue-600 font-semibold">借方</span>
            <div className="mt-1 bg-blue-50 rounded px-3 py-2">
              <div className="font-medium text-sm">{question.journalEntry.debit.accountName}</div>
              <div className="text-gray-600 text-sm">
                ¥{question.journalEntry.debit.amount.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs text-red-600 font-semibold">貸方</span>
            <div className="mt-1 bg-red-50 rounded px-3 py-2">
              <div className="font-medium text-sm">{question.journalEntry.credit.accountName}</div>
              <div className="text-gray-600 text-sm">
                ¥{question.journalEntry.credit.amount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Selection */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          この取引を記入する補助簿をすべて選びなさい:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {allLedgerTypes.map((ledger) => {
            const isSelected = selected.has(ledger);
            const isCorrectAnswer = question.correctLedgers.includes(ledger);
            let borderColor = 'border-gray-200';
            let bgColor = 'bg-white';

            if (result === 'correct' && isSelected) {
              borderColor = 'border-green-400';
              bgColor = 'bg-green-50';
            } else if (result === 'incorrect' && isSelected && !isCorrectAnswer) {
              borderColor = 'border-red-400';
              bgColor = 'bg-red-50';
            } else if (isSelected) {
              borderColor = 'border-blue-400';
              bgColor = 'bg-blue-50';
            }

            return (
              <button
                key={ledger}
                onClick={() => toggle(ledger)}
                disabled={result === 'correct'}
                className={`border-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${borderColor} ${bgColor} ${
                  result === 'correct' ? 'cursor-default' : 'hover:border-blue-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700">{SUBSIDIARY_LEDGER_LABELS[ledger]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="mb-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
        </button>
        {showHint && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">{question.hint}</p>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div
          className={`mb-4 p-3 rounded-lg text-center font-semibold ${
            result === 'correct'
              ? 'bg-green-50 text-green-700 border border-green-300'
              : 'bg-red-50 text-red-700 border border-red-300'
          }`}
        >
          {result === 'correct' ? '正解です！' : '不正解です。もう一度確認してみましょう。'}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0 || result === 'correct'}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          回答する
        </button>
        {result === 'incorrect' && (
          <button
            onClick={handleShowAnswer}
            className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            正解を見る
          </button>
        )}
      </div>
    </div>
  );
}
