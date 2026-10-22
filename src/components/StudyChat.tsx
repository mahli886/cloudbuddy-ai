import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Sparkles, BookOpen, Lightbulb, GitCompareArrows,
  GraduationCap, Cloud, MessageSquare, RotateCcw, AlertCircle,
} from 'lucide-react';
import type { ChatMessage, LearningMode } from '@/types';
import { learningModeLabels } from '@/types';
import { generateResponse } from '@/utils/chatEngine';
import { SimpleMarkdown } from './SimpleMarkdown';
import { InlineQuiz } from './InlineQuiz';

interface StudyChatProps {
  onQuizAnswer: (questionId: string, topic: string, isCorrect: boolean) => void;
}

const DEMO_QUESTIONS = [
  'What is cloud computing?',
  'Explain IaaS, PaaS, and SaaS.',
  'What is the difference between a region and an availability zone?',
  'Explain Azure in simple English.',
  'What is the shared responsibility model?',
];

const MODE_ICONS: Record<LearningMode, typeof BookOpen> = {
  explain: BookOpen,
  example: Lightbulb,
  compare: GitCompareArrows,
  test: GraduationCap,
};

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '## Welcome to CloudBuddy AI!\n\nI am your friendly guide to understanding Microsoft Azure and cloud computing. I explain concepts in simple English, use relatable African examples, and test your understanding with original practice questions.\n\n### How to get started\n• Click one of the example questions below to ask me something\n• Use the learning mode buttons to choose how I explain things\n• Ask follow-up questions any time — I am here to help!\n\n### What I can help with\n• Cloud computing basics\n• Public, private, and hybrid clouds\n• IaaS, PaaS, and SaaS\n• Azure regions and availability zones\n• Virtual machines and containers\n• Azure storage services\n• Azure networking\n• Identity and access management\n• Security and governance\n• Azure pricing and cost management',
  timestamp: Date.now(),
};

export function StudyChat({ onQuizAnswer }: StudyChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<LearningMode>('explain');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ref to track thinking state without causing stale closures in sendMessage.
  // This is the fix for the bug where the chat stopped responding after the
  // first question: isThinking in the useCallback dependency array caused
  // the guard clause to lock out subsequent messages.
  const isThinkingRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string, activeMode: LearningMode = mode) => {
      const trimmed = text.trim();
      if (!trimmed || isThinkingRef.current) return;

      isThinkingRef.current = true;
      setIsThinking(true);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        mode: activeMode,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');

      // Generate response after a brief delay for a natural feel.
      setTimeout(() => {
        try {
          const response = generateResponse(trimmed, activeMode);
          const assistantMsg: ChatMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: response.content,
            mode: activeMode,
            question: response.question,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } catch {
          const errorMsg: ChatMessage = {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content:
              '## Oops! Something went wrong\n\nI had trouble generating a response for that question. Please try asking again, or rephrase your question. If the problem continues, try resetting the conversation.',
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        } finally {
          isThinkingRef.current = false;
          setIsThinking(false);
          inputRef.current?.focus();
        }
      }, 500);
    },
    [mode],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleDemoQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleModeChange = (newMode: LearningMode) => {
    setMode(newMode);
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.content, newMode);
    }
  };

  const handleReset = () => {
    isThinkingRef.current = false;
    setIsThinking(false);
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setMode('explain');
    inputRef.current?.focus();
  };

  const showDemoQuestions = messages.length === 1;

  return (
    <div className="flex flex-col h-full">
      {/* Learning mode buttons */}
      <div className="border-b border-navy-100 bg-white/80 backdrop-blur-sm px-4 py-3 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-xs font-medium text-navy-400 shrink-0 mr-1">
            Mode:
          </span>
          {(Object.keys(learningModeLabels) as LearningMode[]).map((m) => {
            const Icon = MODE_ICONS[m];
            const isActive = mode === m;
            return (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                disabled={isThinking}
                className={[
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 shrink-0',
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100',
                  isThinking ? 'opacity-50 cursor-not-allowed' : '',
                ].join(' ')}
              >
                <Icon className="h-3.5 w-3.5" />
                {learningModeLabels[m]}
              </button>
            );
          })}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-navy-400 hover:text-navy-600 transition-colors shrink-0 ml-auto"
            title="Start a new conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 space-y-5">
        <div className="max-w-3xl mx-auto w-full">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onQuizAnswer={onQuizAnswer}
            />
          ))}

          {isThinking && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar role="assistant" />
              <div className="flex flex-col gap-1.5 rounded-2xl rounded-tl-sm bg-white border border-navy-100 px-4 py-3 shadow-sm">
                <span className="text-xs text-navy-400 font-medium">
                  CloudBuddy is thinking...
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" style={{ animationDelay: '200ms' }} />
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Demo questions */}
          {showDemoQuestions && !isThinking && (
            <div className="mt-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-medium text-navy-500">
                  Try asking one of these:
                </span>
              </div>
              <div className="grid gap-2.5">
                {DEMO_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleDemoQuestion(q)}
                    disabled={isThinking}
                    className="group flex items-center gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3 text-left text-sm text-navy-700 transition-all duration-200 hover:border-sky-300 hover:bg-sky-50/40 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="h-4 w-4 text-navy-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    <span className="font-medium">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-navy-100 bg-white px-4 py-3 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 rounded-xl border border-navy-200 bg-navy-50/40 focus-within:border-sky-400 focus-within:bg-white transition-colors px-4 py-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Azure or cloud computing..."
              disabled={isThinking}
              className="flex-1 bg-transparent py-2.5 text-sm text-navy-900 placeholder:text-navy-300 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white transition-all duration-200 hover:bg-sky-700 active:scale-95 disabled:bg-navy-200 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Avatar({ role }: { role: 'user' | 'assistant' }) {
  if (role === 'assistant') {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-navy-700 text-white shadow-sm">
        <Cloud className="h-5 w-5" />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-100 text-navy-500">
      <GraduationCap className="h-5 w-5" />
    </div>
  );
}

function MessageBubble({
  message,
  onQuizAnswer,
}: {
  message: ChatMessage;
  onQuizAnswer: (questionId: string, topic: string, isCorrect: boolean) => void;
}) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex gap-3 flex-row-reverse animate-fade-in">
        <Avatar role="user" />
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-sky-600 text-white px-4 py-2.5 shadow-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
          {message.mode && (
            <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wider text-sky-200">
              {learningModeLabels[message.mode]}
            </span>
          )}
        </div>
      </div>
    );
  }

  const isError = message.content.startsWith('## Oops!');

  return (
    <div className="flex gap-3 animate-fade-in-up">
      <Avatar role="assistant" />
      <div
        className={[
          'max-w-[85%] rounded-2xl rounded-tl-sm bg-white border px-5 py-4 shadow-sm',
          isError ? 'border-error-200' : 'border-navy-100',
        ].join(' ')}
      >
        {isError && (
          <div className="flex items-center gap-2 mb-2 text-error-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs font-semibold">Error</span>
          </div>
        )}
        <SimpleMarkdown content={message.content} />
        {message.question && (
          <InlineQuiz
            question={message.question}
            onAnswer={(qId, isCorrect) =>
              onQuizAnswer(qId, message.question!.topic, isCorrect)
            }
          />
        )}
      </div>
    </div>
  );
}
