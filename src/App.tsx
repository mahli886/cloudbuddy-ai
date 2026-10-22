import { useState, useCallback } from 'react';
import {
  Cloud, MessageSquare, Trophy, BarChart3, Sparkles,
  Shield, BookOpen,
} from 'lucide-react';
import type { QuizTopic } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { StudyChat } from '@/components/StudyChat';
import { PracticeQuiz } from '@/components/PracticeQuiz';
import { ProgressDashboard } from '@/components/ProgressDashboard';

type Tab = 'chat' | 'quiz' | 'progress';

const TABS: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Study Chat', icon: MessageSquare },
  { id: 'quiz', label: 'Practice Quiz', icon: Trophy },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const { progress, recordAnswer, resetProgress } = useProgress();

  const handleQuizAnswer = useCallback(
    (questionId: string, topic: string, isCorrect: boolean) => {
      recordAnswer(questionId, topic as QuizTopic, isCorrect);
    },
    [recordAnswer],
  );

  return (
    <div className="flex flex-col h-screen bg-[#f0f4fa]">
      {/* ─── Header ─── */}
      <header className="shrink-0 border-b border-navy-100 bg-white/90 backdrop-blur-md z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-sky-600 to-navy-700 text-white shadow-md">
                <Cloud className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-accent-400 border-2 border-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-navy-900 font-display leading-none">
                CloudBuddy <span className="text-sky-600">AI</span>
              </h1>
              <p className="text-[11px] text-navy-400 mt-0.5 leading-none">
                Your friendly guide to understanding Azure
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1 bg-navy-50 rounded-xl p-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-navy-500 hover:text-navy-700',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {tab.id === 'progress' && progress.totalAnswered > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-100 px-1.5 text-[10px] font-bold text-sky-700">
                      {progress.totalAnswered}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Hackathon badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-50 to-accent-50 border border-sky-100 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-medium text-navy-600">#1MillionDevs</span>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="sm:hidden flex items-center justify-around border-t border-navy-100 px-2 py-1.5 bg-white">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all',
                  isActive ? 'text-sky-600' : 'text-navy-400',
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ─── Main content ─── */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' && (
          <StudyChat onQuizAnswer={handleQuizAnswer} />
        )}
        {activeTab === 'quiz' && (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <PracticeQuiz
              onAnswer={handleQuizAnswer}
              answeredIds={progress.answeredIds}
            />
          </div>
        )}
        {activeTab === 'progress' && (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <ProgressDashboard progress={progress} onReset={resetProgress} />
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="shrink-0 border-t border-navy-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-navy-400 text-center sm:text-left leading-relaxed max-w-2xl">
              CloudBuddy AI is an independent educational project. It is not affiliated with or
              endorsed by Microsoft. Practice content is original and is not taken from actual
              certification exams.
            </p>
            <div className="flex items-center gap-3 text-xs text-navy-300 shrink-0">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Educational use
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                AZ-900 Study Buddy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
