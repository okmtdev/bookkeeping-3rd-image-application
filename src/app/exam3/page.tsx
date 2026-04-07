'use client';

import { useState, useCallback } from 'react';
import WorksheetWorkspace from '@/components/WorksheetWorkspace';
import { worksheetQuestions } from '@/data/exam3Questions';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';

export default function Exam3Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const { addRecord } = useAnswerHistory();

  const currentQuestion = worksheetQuestions[currentIndex];

  const handleCorrect = () => {
    setCompleted((prev) => new Set([...prev, currentQuestion.id]));
  };

  const handleAnswer = useCallback(
    (questionId: string, questionTitle: string, isCorrect: boolean) => {
      addRecord({ questionId, questionTitle, category: 'worksheet', isCorrect });
    },
    [addRecord]
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-20 md:pb-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          第三問 対策
        </h1>
        <p className="text-gray-500 mt-1">精算表の作成</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            問題 {currentIndex + 1} / {worksheetQuestions.length}
          </span>
          <span className="text-xs text-gray-500">
            完了: {completed.size}/{worksheetQuestions.length}
          </span>
        </div>
        <div className="flex gap-1">
          {worksheetQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-blue-600'
                  : completed.has(q.id)
                  ? 'bg-green-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Workspace */}
      <WorksheetWorkspace
        key={currentQuestion.id}
        question={currentQuestion}
        onCorrect={handleCorrect}
        onAnswer={handleAnswer}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          前の問題
        </button>
        <button
          onClick={() => setCurrentIndex((i) => Math.min(worksheetQuestions.length - 1, i + 1))}
          disabled={currentIndex === worksheetQuestions.length - 1}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          次の問題
        </button>
      </div>
    </div>
  );
}
