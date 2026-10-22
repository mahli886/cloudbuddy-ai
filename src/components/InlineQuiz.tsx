import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '@/types';
import { SimpleMarkdown } from './SimpleMarkdown';

interface InlineQuizProps {
  question: QuizQuestion;
  onAnswer?: (questionId: string, isCorrect: boolean) => void;
}

export function InlineQuiz({ question, onAnswer }: InlineQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const isCorrect = index === question.correctIndex;
    onAnswer?.(question.id, isCorrect);
  };

  const handleReset = () => {
    setSelected(null);
    setAnswered(false);
  };

  const letters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-600 text-white text-xs font-bold">
          Q
        </div>
        <span className="text-sm font-semibold text-navy-800">
          Quick Check
        </span>
      </div>

      <p className="text-sm text-navy-800 font-medium mb-3 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-2">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={[
                'flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all duration-200',
                !answered &&
                  'border-navy-200 bg-white hover:border-sky-400 hover:bg-sky-50/40 cursor-pointer',
                showCorrect && 'border-success-500 bg-success-50',
                showWrong && 'border-error-500 bg-error-50',
                answered && !showCorrect && !showWrong && 'border-navy-100 bg-white opacity-60',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors',
                  !answered && 'bg-navy-100 text-navy-600',
                  showCorrect && 'bg-success-500 text-white',
                  showWrong && 'bg-error-500 text-white',
                  answered && !showCorrect && !showWrong && 'bg-navy-100 text-navy-400',
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
              <span className={[
                'text-navy-700 leading-relaxed',
                showCorrect && 'font-medium text-success-700',
                showWrong && 'text-error-700',
              ].filter(Boolean).join(' ')}>
                {choice}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 animate-fade-in-up">
          <div
            className={[
              'flex items-start gap-2.5 rounded-lg p-3',
              selected === question.correctIndex
                ? 'bg-success-50 border border-success-200'
                : 'bg-error-50 border border-error-200',
            ].join(' ')}
          >
            {selected === question.correctIndex ? (
              <CheckCircle2 className="h-5 w-5 text-success-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-error-500 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold mb-1">
                {selected === question.correctIndex
                  ? 'Correct!'
                  : 'Not quite — but great effort!'}
              </p>
              <div className="text-sm text-navy-700 leading-relaxed">
                <SimpleMarkdown content={question.explanation} />
              </div>
            </div>
          </div>

          {question.keyTerm && (
            <div className="mt-2.5 flex items-center gap-2 text-xs text-navy-500">
              <Lightbulb className="h-3.5 w-3.5 text-warning-500" />
              <span>
                Key term: <strong className="text-navy-700">{question.keyTerm}</strong>
              </span>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
