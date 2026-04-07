'use client';

import { useState } from 'react';
import { WorksheetQuestion } from '@/types';

interface WorksheetWorkspaceProps {
  question: WorksheetQuestion;
  onCorrect?: () => void;
  onAnswer?: (questionId: string, questionTitle: string, isCorrect: boolean) => void;
}

interface CellInputs {
  [key: string]: string; // key = `${rowIdx}_${column}`, value = user input
}

type Column = 'adjustDebit' | 'adjustCredit' | 'plDebit' | 'plCredit' | 'bsDebit' | 'bsCredit';

const COLUMNS: { key: Column; label: string; group: string }[] = [
  { key: 'adjustDebit', label: '借方', group: '整理記入' },
  { key: 'adjustCredit', label: '貸方', group: '整理記入' },
  { key: 'plDebit', label: '借方', group: '損益計算書' },
  { key: 'plCredit', label: '貸方', group: '損益計算書' },
  { key: 'bsDebit', label: '借方', group: '貸借対照表' },
  { key: 'bsCredit', label: '貸方', group: '貸借対照表' },
];

export default function WorksheetWorkspace({ question, onCorrect, onAnswer }: WorksheetWorkspaceProps) {
  const [inputs, setInputs] = useState<CellInputs>({});
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());

  const getInputKey = (rowIdx: number, col: Column) => `${rowIdx}_${col}`;

  const getValue = (rowIdx: number, col: Column): string => {
    return inputs[getInputKey(rowIdx, col)] ?? '';
  };

  const setValue = (rowIdx: number, col: Column, value: string) => {
    setInputs((prev) => ({ ...prev, [getInputKey(rowIdx, col)]: value }));
    setResult(null);
    setErrorCells((prev) => {
      const next = new Set(prev);
      next.delete(getInputKey(rowIdx, col));
      return next;
    });
  };

  const handleSubmit = () => {
    const errors = new Set<string>();
    let allCorrect = true;

    question.correctAnswers.forEach((answer, rowIdx) => {
      COLUMNS.forEach(({ key }) => {
        const correctVal = answer[key];
        if (correctVal === 0) {
          // 0 cells don't need to be filled
          const userVal = getValue(rowIdx, key).trim();
          if (userVal !== '' && Number(userVal) !== 0) {
            errors.add(getInputKey(rowIdx, key));
            allCorrect = false;
          }
        } else {
          const userVal = Number(getValue(rowIdx, key));
          if (userVal !== correctVal) {
            errors.add(getInputKey(rowIdx, key));
            allCorrect = false;
          }
        }
      });
    });

    setErrorCells(errors);
    if (allCorrect) {
      setResult('correct');
      onCorrect?.();
    } else {
      setResult('incorrect');
    }
    onAnswer?.(question.id, question.title, allCorrect);
  };

  const handleShowAnswer = () => {
    const newInputs: CellInputs = {};
    question.correctAnswers.forEach((answer, rowIdx) => {
      COLUMNS.forEach(({ key }) => {
        const val = answer[key];
        if (val !== 0) {
          newInputs[getInputKey(rowIdx, key)] = String(val);
        }
      });
    });
    setInputs(newInputs);
    setErrorCells(new Set());
    setResult('correct');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Question */}
      <h3 className="font-bold text-lg text-gray-800 mb-2">{question.title}</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-amber-900 whitespace-pre-line">{question.description}</p>
      </div>

      {/* Adjusting Entries Reference */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-500 font-semibold mb-2">決算整理仕訳（参考）:</p>
        <div className="space-y-2">
          {question.adjustingEntries.map((entry, idx) => (
            <div key={idx} className="text-xs text-gray-700 bg-white rounded px-3 py-2 border border-gray-200">
              <div className="font-medium text-gray-500 mb-1">{entry.description}</div>
              <div className="flex gap-4">
                <span className="text-blue-600">
                  (借) {entry.debit.accountName} {entry.debit.amount.toLocaleString()}
                </span>
                <span className="text-red-600">
                  (貸) {entry.credit.accountName} {entry.credit.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worksheet Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 px-2 py-1.5 text-center" rowSpan={2}>
                勘定科目
              </th>
              <th className="border border-gray-600 px-2 py-1.5 text-center" colSpan={2}>
                残高試算表
              </th>
              <th className="border border-gray-600 px-2 py-1.5 text-center bg-indigo-700" colSpan={2}>
                整理記入
              </th>
              <th className="border border-gray-600 px-2 py-1.5 text-center bg-orange-700" colSpan={2}>
                損益計算書
              </th>
              <th className="border border-gray-600 px-2 py-1.5 text-center bg-blue-700" colSpan={2}>
                貸借対照表
              </th>
            </tr>
            <tr className="bg-gray-700 text-white text-xs">
              <th className="border border-gray-600 px-2 py-1">借方</th>
              <th className="border border-gray-600 px-2 py-1">貸方</th>
              <th className="border border-gray-600 px-2 py-1 bg-indigo-600">借方</th>
              <th className="border border-gray-600 px-2 py-1 bg-indigo-600">貸方</th>
              <th className="border border-gray-600 px-2 py-1 bg-orange-600">借方</th>
              <th className="border border-gray-600 px-2 py-1 bg-orange-600">貸方</th>
              <th className="border border-gray-600 px-2 py-1 bg-blue-600">借方</th>
              <th className="border border-gray-600 px-2 py-1 bg-blue-600">貸方</th>
            </tr>
          </thead>
          <tbody>
            {question.trialBalance.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-2 py-1.5 font-medium text-gray-800 whitespace-nowrap">
                  {row.accountName}
                </td>
                {/* Trial Balance - read only */}
                <td className="border border-gray-300 px-2 py-1.5 text-right text-gray-700">
                  {row.debit > 0 ? row.debit.toLocaleString() : ''}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-right text-gray-700">
                  {row.credit > 0 ? row.credit.toLocaleString() : ''}
                </td>
                {/* Editable columns */}
                {COLUMNS.map(({ key }) => {
                  const inputKey = getInputKey(rowIdx, key);
                  const hasError = errorCells.has(inputKey);
                  return (
                    <td key={key} className="border border-gray-300 p-0">
                      <input
                        type="text"
                        value={getValue(rowIdx, key)}
                        onChange={(e) => setValue(rowIdx, key, e.target.value)}
                        disabled={result === 'correct'}
                        className={`w-full px-2 py-1.5 text-right text-sm border-0 outline-none ${
                          result === 'correct'
                            ? 'bg-green-50 text-green-800'
                            : hasError
                            ? 'bg-red-50 text-red-800'
                            : 'bg-transparent'
                        }`}
                        placeholder=""
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Totals row for P/L and B/S */}
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-600">
                当期純利益（損失）
              </td>
              <td className="border border-gray-300" colSpan={4}></td>
              <td className="border border-gray-300 px-2 py-1.5 text-right text-xs text-gray-500" colSpan={2}>
                貸借差額で算出
              </td>
              <td className="border border-gray-300 px-2 py-1.5 text-right text-xs text-gray-500" colSpan={2}>
                貸借差額で算出
              </td>
            </tr>
          </tbody>
        </table>
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
          {result === 'correct'
            ? '正解です！精算表が正しく完成しました！'
            : `不正解です。赤くなっているセルを確認してみましょう。（${errorCells.size}箇所の誤り）`}
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
