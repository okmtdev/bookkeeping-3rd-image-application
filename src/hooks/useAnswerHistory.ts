'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AnswerRecord, AnswerHistoryData, QuestionCategory } from '@/types';

const STORAGE_KEY = 'boki-answer-history';

const initialData: AnswerHistoryData = { records: [] };

export function useAnswerHistory() {
  const [data, setData, isLoaded] = useLocalStorage<AnswerHistoryData>(STORAGE_KEY, initialData);

  const addRecord = useCallback(
    (params: {
      questionId: string;
      questionTitle: string;
      category: QuestionCategory;
      isCorrect: boolean;
    }) => {
      const record: AnswerRecord = {
        ...params,
        answeredAt: new Date().toISOString(),
      };
      setData((prev) => ({
        records: [...prev.records, record],
      }));
    },
    [setData]
  );

  const getLastResult = useCallback(
    (questionId: string): boolean | null => {
      for (let i = data.records.length - 1; i >= 0; i--) {
        if (data.records[i].questionId === questionId) {
          return data.records[i].isCorrect;
        }
      }
      return null;
    },
    [data.records]
  );

  const getQuestionStats = useCallback(
    (questionId: string) => {
      const questionRecords = data.records.filter((r) => r.questionId === questionId);
      const correct = questionRecords.filter((r) => r.isCorrect).length;
      const incorrect = questionRecords.length - correct;
      return { total: questionRecords.length, correct, incorrect };
    },
    [data.records]
  );

  const getCategoryStats = useCallback(
    (category: QuestionCategory) => {
      const categoryRecords = data.records.filter((r) => r.category === category);
      const correct = categoryRecords.filter((r) => r.isCorrect).length;
      const incorrect = categoryRecords.length - correct;
      const uniqueQuestions = new Set(categoryRecords.map((r) => r.questionId));
      const lastCorrectQuestions = new Set(
        [...uniqueQuestions].filter((qid) => {
          for (let i = data.records.length - 1; i >= 0; i--) {
            if (data.records[i].questionId === qid) {
              return data.records[i].isCorrect;
            }
          }
          return false;
        })
      );
      return {
        total: categoryRecords.length,
        correct,
        incorrect,
        uniqueQuestions: uniqueQuestions.size,
        lastCorrectCount: lastCorrectQuestions.size,
      };
    },
    [data.records]
  );

  const clearHistory = useCallback(() => {
    setData(initialData);
  }, [setData]);

  return {
    records: data.records,
    addRecord,
    getLastResult,
    getQuestionStats,
    getCategoryStats,
    clearHistory,
    isLoaded,
  };
}
