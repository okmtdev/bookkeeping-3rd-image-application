'use client';

import { useState, useCallback } from 'react';
import TAccountWorkspace from '@/components/TAccountWorkspace';
import SubsidiaryLedgerWorkspace from '@/components/SubsidiaryLedgerWorkspace';
import { tAccountQuestions, subsidiaryLedgerQuestions } from '@/data/exam2Questions';
import { useAnswerHistory } from '@/hooks/useAnswerHistory';
import { QuestionCategory } from '@/types';

type QuestionType = 't-account' | 'subsidiary-ledger';

export default function Exam2Page() {
  const [questionType, setQuestionType] = useState<QuestionType>('t-account');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTA, setCompletedTA] = useState<Set<string>>(new Set());
  const [completedSL, setCompletedSL] = useState<Set<string>>(new Set());
  const { addRecord } = useAnswerHistory();

  const questions = questionType === 't-account' ? tAccountQuestions : subsidiaryLedgerQuestions;
  const currentQuestion = questions[currentIndex];
  const completed = questionType === 't-account' ? completedTA : completedSL;

  const handleCorrect = () => {
    if (questionType === 't-account') {
      setCompletedTA((prev) => new Set([...prev, currentQuestion.id]));
    } else {
      setCompletedSL((prev) => new Set([...prev, currentQuestion.id]));
    }
  };

  const handleAnswer = useCallback(
    (questionId: string, questionTitle: string, isCorrect: boolean) => {
      const category: QuestionCategory = questionType === 't-account' ? 't-account' : 'subsidiary-ledger';
      addRecord({ questionId, questionTitle, category, isCorrect });
    },
    [addRecord, questionType]
  );

  const switchType = (type: QuestionType) => {
    setQuestionType(type);
    setCurrentIndex(0);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20 md:pb-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          第二問 対策
        </h1>
        <p className="text-gray-500 mt-1">勘定記入・補助簿の選択</p>
      </div>

      {/* Question Type Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => switchType('t-account')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            questionType === 't-account'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          勘定記入（T勘定）
          <span className="ml-1 text-xs opacity-75">
            {completedTA.size}/{tAccountQuestions.length}
          </span>
        </button>
        <button
          onClick={() => switchType('subsidiary-ledger')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            questionType === 'subsidiary-ledger'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          補助簿選択
          <span className="ml-1 text-xs opacity-75">
            {completedSL.size}/{subsidiaryLedgerQuestions.length}
          </span>
        </button>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            問題 {currentIndex + 1} / {questions.length}
          </span>
          {completed.has(currentQuestion.id) && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              正解済み
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {questions.map((q, idx) => (
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
      {questionType === 't-account' ? (
        <TAccountWorkspace
          key={currentQuestion.id}
          question={tAccountQuestions[currentIndex]}
          onCorrect={handleCorrect}
          onAnswer={handleAnswer}
        />
      ) : (
        <SubsidiaryLedgerWorkspace
          key={currentQuestion.id}
          question={subsidiaryLedgerQuestions[currentIndex]}
          onCorrect={handleCorrect}
          onAnswer={handleAnswer}
        />
      )}

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
          onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          disabled={currentIndex === questions.length - 1}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          次の問題
        </button>
      </div>
    </div>
  );
}
