import { useState, useMemo, useCallback } from 'react';
import {
  CheckCircle2, XCircle, Lightbulb, RotateCcw, ChevronRight,
  Cloud, Server, Settings, Trophy, Play, Award,
} from 'lucide-react';
import type { QuizQuestion, QuizTopic } from '@/types';
import { quizTopicLabels } from '@/types';
import { quizQuestions } from '@/data/quizQuestions';

interface PracticeQuizProps {
  onAnswer: (questionId: string, topic: QuizTopic, isCorrect: boolean) => void;
  answeredIds: string[];
}

const TOPIC_ICONS: Record<QuizTopic, typeof Cloud> = {
  'cloud-concepts': Cloud,
  'azure-architecture': Server,
  'azure-management': Settings,
};

const TOPIC_COLORS: Record<QuizTopic, { bg: string; text: string; border: string; iconBg: string }> = {
  'cloud-concepts': {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    iconBg: 'bg-sky-500',
  },
  'azure-architecture': {
    bg: 'bg-navy-50',
    text: 'text-navy-700',
    border: 'border-navy-200',
    iconBg: 'bg-navy-600',
  },
  'azure-management': {
    bg: 'bg-accent-50',
    text: 'text-accent-700',
    border: 'border-accent-200',
    iconBg: 'bg-accent-600',
  },
};

type QuizState = 'selection' | 'question' | 'feedback' | 'complete';

export function PracticeQuiz({ onAnswer, answeredIds }: PracticeQuizProps) {
  const [state, setState] = useState<QuizState>('selection');
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [questionQueue, setQuestionQueue] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const currentQuestion = questionQueue[currentIdx];

  const topicCounts = useMemo(() => {
    const counts: Record<QuizTopic, { total: number; answered: number }> = {
      'cloud-concepts': { total: 0, answered: 0 },
      'azure-architecture': { total: 0, answered: 0 },
      'azure-management': { total: 0, answered: 0 },
    };
    for (const q of quizQuestions) {
      counts[q.topic].total++;
      if (answeredIds.includes(q.id)) counts[q.topic].answered++;
    }
    return counts;
  }, [answeredIds]);

  const startTopic = useCallback(
    (topic: QuizTopic) => {
      const questions = quizQuestions.filter((q) => q.topic === topic);
      // Shuffle for variety
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setSelectedTopic(topic);
      setQuestionQueue(shuffled);
      setCurrentIdx(0);
      setSessionCorrect(0);
      setSessionTotal(0);
      setSelectedAnswer(null);
      setState('question');
    },
    [],
  );

  const handleSelectAnswer = (index: number) => {
    if (state !== 'question') return;
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctIndex;
    onAnswer(currentQuestion.id, currentQuestion.topic, isCorrect);
    setSessionTotal((n) => n + 1);
    if (isCorrect) setSessionCorrect((n) => n + 1);
    setState('feedback');
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questionQueue.length) {
      setState('complete');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setState('question');
    }
  };

  const handleBackToTopics = () => {
    setState('selection');
    setSelectedTopic(null);
    setQuestionQueue([]);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setSessionCorrect(0);
    setSessionTotal(0);
  };

  const letters = ['A', 'B', 'C', 'D', 'E'];

  // ─── Topic Selection Screen ──────────────────────────────────────
  if (state === 'selection') {
    return (
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-navy-700 text-white shadow-lg mb-4">
            <Trophy className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 font-display mb-2">
            Practice Quiz
          </h2>
          <p className="text-navy-500 text-sm max-w-lg mx-auto">
            Test your knowledge with original questions based on the AZ-900 skills outline.
            Choose a topic to begin. You will get immediate feedback and explanations for each answer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {(Object.keys(quizTopicLabels) as QuizTopic[]).map((topic, i) => {
            const Icon = TOPIC_ICONS[topic];
            const colors = TOPIC_COLORS[topic];
            const counts = topicCounts[topic];
            const progress = counts.total > 0 ? (counts.answered / counts.total) * 100 : 0;

            return (
              <button
                key={topic}
                onClick={() => startTopic(topic)}
                className={`group text-left rounded-2xl border-2 ${colors.border} ${colors.bg} p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-fade-in-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.iconBg} text-white mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1.5 leading-snug">
                  {quizTopicLabels[topic]}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-navy-400 mb-3">
                  <span>{counts.total} questions</span>
                  <span>•</span>
                  <span>{counts.answered} answered</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${colors.iconBg} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-navy-600 group-hover:text-navy-800 transition-colors">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Start quiz
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Completion Screen ───────────────────────────────────────────
  if (state === 'complete') {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success-400 to-success-600 text-white shadow-lg mb-4">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 font-display mb-2">
            Quiz Complete!
          </h2>
          <p className="text-navy-500 text-sm mb-6">
            {selectedTopic && quizTopicLabels[selectedTopic]}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card p-4">
              <div className="text-2xl font-bold text-navy-900">{sessionTotal}</div>
              <div className="text-xs text-navy-400 mt-1">Questions</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-bold text-success-600">{sessionCorrect}</div>
              <div className="text-xs text-navy-400 mt-1">Correct</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-bold text-sky-600">{accuracy}%</div>
              <div className="text-xs text-navy-400 mt-1">Accuracy</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button onClick={() => selectedTopic && startTopic(selectedTopic)} className="btn-primary">
              <RotateCcw className="h-4 w-4" />
              Retry Topic
            </button>
            <button onClick={handleBackToTopics} className="btn-secondary">
              Choose Another Topic
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Question / Feedback Screen ──────────────────────────────────
  if (!currentQuestion) return null;

  const progressPercent = ((currentIdx + 1) / questionQueue.length) * 100;
  const isCorrect = state === 'feedback' && selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="max-w-2xl mx-auto px-5 py-6">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handleBackToTopics}
            className="text-xs font-medium text-navy-400 hover:text-navy-600 transition-colors"
          >
            ← All topics
          </button>
          <span className="text-xs font-medium text-navy-400">
            Question {currentIdx + 1} of {questionQueue.length}
          </span>
        </div>
        <div className="h-2 rounded-full bg-navy-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-navy-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="card p-6 animate-fade-in-up">
        {currentQuestion.keyTerm && (
          <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 mb-3">
            <Lightbulb className="h-3.5 w-3.5" />
            {currentQuestion.keyTerm}
          </div>
        )}

        <p className="text-base font-medium text-navy-900 leading-relaxed mb-5">
          {currentQuestion.question}
        </p>

        <div className="space-y-2.5">
          {currentQuestion.choices.map((choice, i) => {
            const correct = i === currentQuestion.correctIndex;
            const isSelected = i === selectedAnswer;
            const showCorrect = state === 'feedback' && correct;
            const showWrong = state === 'feedback' && isSelected && !correct;

            return (
              <button
                key={i}
                onClick={() => handleSelectAnswer(i)}
                disabled={state === 'feedback'}
                className={[
                  'flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200',
                  state === 'question' &&
                    'border-navy-150 bg-white hover:border-sky-400 hover:bg-sky-50/30 cursor-pointer',
                  showCorrect && 'border-success-500 bg-success-50',
                  showWrong && 'border-error-500 bg-error-50',
                  state === 'feedback' && !showCorrect && !showWrong && 'border-navy-100 bg-white opacity-50',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span
                  className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                    state === 'question' && 'bg-navy-100 text-navy-500',
                    showCorrect && 'bg-success-500 text-white',
                    showWrong && 'bg-error-500 text-white',
                    state === 'feedback' && !showCorrect && !showWrong && 'bg-navy-100 text-navy-300',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {showCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : showWrong ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    letters[i]
                  )}
                </span>
                <span
                  className={[
                    'text-navy-700 leading-relaxed pt-0.5',
                    showCorrect && 'font-medium text-success-700',
                    showWrong && 'text-error-700',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {choice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {state === 'feedback' && (
        <div className="mt-4 animate-fade-in-up">
          <div
            className={[
              'card p-5',
              isCorrect ? 'border-success-200' : 'border-error-200',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-success-600" />
              ) : (
                <XCircle className="h-5 w-5 text-error-500" />
              )}
              <h3 className={`text-sm font-bold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </h3>
            </div>
            <p className="text-sm text-navy-700 leading-relaxed mb-2">
              {currentQuestion.explanation}
            </p>
            {currentQuestion.keyTerm && (
              <div className="flex items-center gap-2 text-xs text-navy-500 mt-3 pt-3 border-t border-navy-100">
                <Lightbulb className="h-3.5 w-3.5 text-warning-500" />
                <span>
                  Key term: <strong className="text-navy-700">{currentQuestion.keyTerm}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={handleNext} className="btn-primary">
              {currentIdx + 1 >= questionQueue.length ? 'See Results' : 'Next Question'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
