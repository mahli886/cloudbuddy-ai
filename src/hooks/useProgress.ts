import { useState, useEffect, useCallback } from 'react';
import type { QuizProgress, QuizTopic } from '@/types';

const STORAGE_KEY = 'cloudbuddy-progress';

const defaultProgress: QuizProgress = {
  totalAnswered: 0,
  correctAnswers: 0,
  topicStats: {
    'cloud-concepts': { answered: 0, correct: 0 },
    'azure-architecture': { answered: 0, correct: 0 },
    'azure-management': { answered: 0, correct: 0 },
  },
  wrongQuestionIds: [],
  answeredIds: [],
};

function loadProgress(): QuizProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as QuizProgress;
    // Merge with defaults to handle new topics
    return {
      ...defaultProgress,
      ...parsed,
      topicStats: { ...defaultProgress.topicStats, ...parsed.topicStats },
    };
  } catch {
    return defaultProgress;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<QuizProgress>(defaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const recordAnswer = useCallback(
    (questionId: string, topic: QuizTopic, isCorrect: boolean) => {
      setProgress((prev) => {
        // Don't double-count the same question
        if (prev.answeredIds.includes(questionId)) return prev;

        const updated: QuizProgress = {
          totalAnswered: prev.totalAnswered + 1,
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          topicStats: {
            ...prev.topicStats,
            [topic]: {
              answered: prev.topicStats[topic].answered + 1,
              correct: prev.topicStats[topic].correct + (isCorrect ? 1 : 0),
            },
          },
          wrongQuestionIds: isCorrect
            ? prev.wrongQuestionIds.filter((id) => id !== questionId)
            : [...prev.wrongQuestionIds, questionId],
          answeredIds: [...prev.answeredIds, questionId],
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage errors
        }

        return updated;
      });
    },
    [],
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return { progress, recordAnswer, resetProgress };
}
