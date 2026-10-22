import {
  TrendingUp, Target, BookOpen, RotateCcw, AlertCircle,
  Cloud, Server, Settings, CheckCircle2, XCircle, BarChart3,
} from 'lucide-react';
import type { QuizProgress, QuizTopic } from '@/types';
import { quizTopicLabels } from '@/types';
import { quizQuestions } from '@/data/quizQuestions';

interface ProgressDashboardProps {
  progress: QuizProgress;
  onReset: () => void;
}

const TOPIC_ICONS: Record<QuizTopic, typeof Cloud> = {
  'cloud-concepts': Cloud,
  'azure-architecture': Server,
  'azure-management': Settings,
};

export function ProgressDashboard({ progress, onReset }: ProgressDashboardProps) {
  const accuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.correctAnswers / progress.totalAnswered) * 100)
      : 0;

  const hasData = progress.totalAnswered > 0;

  // Get wrong questions for revision section
  const wrongQuestions = quizQuestions.filter((q) =>
    progress.wrongQuestionIds.includes(q.id),
  );

  // Topic stats with percentages
  const topicData = (Object.keys(quizTopicLabels) as QuizTopic[]).map((topic) => {
    const stats = progress.topicStats[topic];
    const topicAccuracy =
      stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const totalAvailable = quizQuestions.filter((q) => q.topic === topic).length;
    return {
      topic,
      ...stats,
      accuracy: topicAccuracy,
      totalAvailable,
    };
  });

  // Find weakest topic
  const weakestTopic = topicData
    .filter((t) => t.answered > 0)
    .sort((a, b) => a.accuracy - b.accuracy)[0];

  if (!hasData) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="text-center animate-fade-in">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-400 mb-4">
            <BarChart3 className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 font-display mb-2">
            Your Learning Progress
          </h2>
          <p className="text-navy-500 text-sm mb-8 max-w-md mx-auto">
            You have not answered any questions yet. Head to the Study Chat or Practice Quiz to
            start tracking your progress. Your stats will appear here.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {topicData.map((t) => (
              <div key={t.topic} className="card p-4 text-center">
                <div className="text-2xl font-bold text-navy-300">{t.totalAvailable}</div>
                <div className="text-xs text-navy-400 mt-1 leading-tight">
                  {quizTopicLabels[t.topic].replace('Describe ', '')}
                </div>
              </div>
            ))}
            <div className="card p-4 text-center bg-navy-50/50">
              <div className="text-2xl font-bold text-navy-300">{quizQuestions.length}</div>
              <div className="text-xs text-navy-400 mt-1">Total Questions</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 font-display mb-1">
            Your Learning Progress
          </h2>
          <p className="text-sm text-navy-500">
            Track your performance and identify areas to revise.
          </p>
        </div>
        <button
          onClick={onReset}
          className="btn-ghost text-xs"
          title="Clear all progress data"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up">
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Answered"
          value={progress.totalAnswered}
          color="navy"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Correct"
          value={progress.correctAnswers}
          color="success"
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Accuracy"
          value={`${accuracy}%`}
          color="sky"
        />
        <StatCard
          icon={<XCircle className="h-5 w-5" />}
          label="Need Review"
          value={progress.wrongQuestionIds.length}
          color="warning"
        />
      </div>

      {/* Accuracy ring / visual */}
      <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#dbe6f5"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#0d8eeb"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(accuracy / 100) * 264} 264`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-navy-900">{accuracy}%</span>
              <span className="text-[10px] text-navy-400 uppercase tracking-wide">Accuracy</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Overall Performance</h3>
            <p className="text-sm text-navy-500 leading-relaxed">
              {accuracy >= 80
                ? 'Excellent work! You are performing well across topics. Keep practising to maintain your streak.'
                : accuracy >= 60
                  ? 'Good progress! You are getting there. Review the topics below to boost your accuracy.'
                  : 'You are just getting started. Do not worry — every expert was once a beginner. Keep practising!'}
            </p>
            {weakestTopic && (
              <div className="mt-3 flex items-center gap-2 text-xs text-navy-500">
                <AlertCircle className="h-4 w-4 text-warning-500" />
                <span>
                  Focus area: <strong className="text-navy-700">{quizTopicLabels[weakestTopic.topic]}</strong> ({weakestTopic.accuracy}% accuracy)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Per-topic breakdown */}
      <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-sky-500" />
          Topic Breakdown
        </h3>
        {topicData.map((t) => {
          const Icon = TOPIC_ICONS[t.topic];
          return (
            <div key={t.topic} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-navy-900 truncate">
                    {quizTopicLabels[t.topic]}
                  </h4>
                  <p className="text-xs text-navy-400">
                    {t.answered} of {t.totalAvailable} answered • {t.correct} correct
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-lg font-bold ${t.accuracy >= 80 ? 'text-success-600' : t.accuracy >= 60 ? 'text-sky-600' : t.accuracy > 0 ? 'text-warning-600' : 'text-navy-300'}`}>
                    {t.answered > 0 ? `${t.accuracy}%` : '—'}
                  </div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-navy-100 overflow-hidden">
                <div
                  className={[
                    'h-full rounded-full transition-all duration-700',
                    t.accuracy >= 80 ? 'bg-success-500' : t.accuracy >= 60 ? 'bg-sky-500' : 'bg-warning-500',
                  ].filter(Boolean).join(' ')}
                  style={{ width: t.answered > 0 ? `${t.accuracy}%` : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Questions needing revision */}
      {wrongQuestions.length > 0 && (
        <div className="animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-warning-500" />
            Questions to Review ({wrongQuestions.length})
          </h3>
          <div className="space-y-2.5">
            {wrongQuestions.map((q) => (
              <div key={q.id} className="card p-4 border-warning-200/60">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-warning-50 text-warning-600 text-xs font-bold mt-0.5">
                    ?
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-700 leading-relaxed mb-1.5">
                      {q.question}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded bg-success-50 text-success-700 px-2 py-0.5 font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        {q.choices[q.correctIndex]}
                      </span>
                    </div>
                    {q.keyTerm && (
                      <div className="mt-1.5 text-xs text-navy-400">
                        Key term: <strong className="text-navy-600">{q.keyTerm}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'navy' | 'success' | 'sky' | 'warning';
}) {
  const colorMap = {
    navy: 'bg-navy-50 text-navy-600',
    success: 'bg-success-50 text-success-600',
    sky: 'bg-sky-50 text-sky-600',
    warning: 'bg-warning-50 text-warning-600',
  };

  return (
    <div className="card p-4">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${colorMap[color]} mb-2.5`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-navy-900">{value}</div>
      <div className="text-xs text-navy-400 mt-0.5">{label}</div>
    </div>
  );
}
