'use client';

import { useState } from 'react';
import { TAccountQuestion, TAccountEntry } from '@/types';

interface TAccountWorkspaceProps {
  question: TAccountQuestion;
  onCorrect?: () => void;
}

interface EntryInput {
  date: string;
  description: string;
  amount: string;
}

const emptyEntry = (): EntryInput => ({ date: '', description: '', amount: '' });

export default function TAccountWorkspace({ question, onCorrect }: TAccountWorkspaceProps) {
  const maxRows = Math.max(question.correctDebitEntries.length, question.correctCreditEntries.length);
  const [debitInputs, setDebitInputs] = useState<EntryInput[]>(
    Array.from({ length: question.correctDebitEntries.length }, emptyEntry)
  );
  const [creditInputs, setCreditInputs] = useState<EntryInput[]>(
    Array.from({ length: question.correctCreditEntries.length }, emptyEntry)
  );
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const updateDebit = (idx: number, field: keyof EntryInput, value: string) => {
    const next = [...debitInputs];
    next[idx] = { ...next[idx], [field]: value };
    setDebitInputs(next);
    setResult(null);
  };

  const updateCredit = (idx: number, field: keyof EntryInput, value: string) => {
    const next = [...creditInputs];
    next[idx] = { ...next[idx], [field]: value };
    setCreditInputs(next);
    setResult(null);
  };

  const checkMatch = (inputs: EntryInput[], correct: TAccountEntry[]): boolean => {
    if (inputs.length !== correct.length) return false;
    const sortedCorrect = [...correct].sort((a, b) => a.date.localeCompare(b.date) || a.amount - b.amount);
    const sortedInputs = [...inputs].sort((a, b) => a.date.localeCompare(b.date) || Number(a.amount) - Number(b.amount));

    return sortedInputs.every((input, i) => {
      const c = sortedCorrect[i];
      return (
        input.date.trim() === c.date &&
        input.description.trim() === c.description &&
        Number(input.amount) === c.amount
      );
    });
  };

  const handleSubmit = () => {
    const debitOk = checkMatch(debitInputs, question.correctDebitEntries);
    const creditOk = checkMatch(creditInputs, question.correctCreditEntries);
    if (debitOk && creditOk) {
      setResult('correct');
      onCorrect?.();
    } else {
      setResult('incorrect');
    }
  };

  const handleShowAnswer = () => {
    setDebitInputs(
      question.correctDebitEntries.map((e) => ({
        date: e.date,
        description: e.description,
        amount: String(e.amount),
      }))
    );
    setCreditInputs(
      question.correctCreditEntries.map((e) => ({
        date: e.date,
        description: e.description,
        amount: String(e.amount),
      }))
    );
    setResult('correct');
  };

  const renderEntryRow = (
    input: EntryInput,
    idx: number,
    update: (idx: number, field: keyof EntryInput, value: string) => void,
    isCorrect: boolean | null
  ) => (
    <div key={idx} className="grid grid-cols-[60px_1fr_100px] gap-1">
      <input
        type="text"
        placeholder="日付"
        value={input.date}
        onChange={(e) => update(idx, 'date', e.target.value)}
        className={`border rounded px-2 py-1.5 text-sm text-center ${
          result === 'correct' ? 'border-green-400 bg-green-50' : 'border-gray-300'
        }`}
        disabled={result === 'correct'}
      />
      <input
        type="text"
        placeholder="相手勘定科目"
        value={input.description}
        onChange={(e) => update(idx, 'description', e.target.value)}
        className={`border rounded px-2 py-1.5 text-sm ${
          result === 'correct' ? 'border-green-400 bg-green-50' : 'border-gray-300'
        }`}
        disabled={result === 'correct'}
      />
      <input
        type="text"
        placeholder="金額"
        value={input.amount}
        onChange={(e) => update(idx, 'amount', e.target.value)}
        className={`border rounded px-2 py-1.5 text-sm text-right ${
          result === 'correct' ? 'border-green-400 bg-green-50' : 'border-gray-300'
        }`}
        disabled={result === 'correct'}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Question */}
      <h3 className="font-bold text-lg text-gray-800 mb-2">{question.title}</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-amber-900 whitespace-pre-line">{question.description}</p>
      </div>

      {/* T-Account */}
      <div className="border-2 border-gray-800 rounded-lg overflow-hidden mb-4">
        {/* Account Title */}
        <div className="bg-gray-800 text-white text-center py-2 font-bold text-lg">
          {question.accountName}
        </div>

        <div className="grid grid-cols-2 divide-x-2 divide-gray-800">
          {/* Debit side */}
          <div className="p-3">
            <div className="text-center text-sm font-semibold text-blue-600 mb-2 border-b border-gray-300 pb-1">
              借方（デビット）
            </div>
            <div className="space-y-2">
              {debitInputs.map((input, idx) =>
                renderEntryRow(input, idx, updateDebit, result === 'correct')
              )}
            </div>
          </div>

          {/* Credit side */}
          <div className="p-3">
            <div className="text-center text-sm font-semibold text-red-600 mb-2 border-b border-gray-300 pb-1">
              貸方（クレジット）
            </div>
            <div className="space-y-2">
              {creditInputs.map((input, idx) =>
                renderEntryRow(input, idx, updateCredit, result === 'correct')
              )}
            </div>
          </div>
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
          disabled={result === 'correct'}
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
