export type LearningMode = 'explain' | 'example' | 'compare' | 'test';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  mode?: LearningMode;
  question?: QuizQuestion;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  keyTerm?: string;
}

export type QuizTopic =
  | 'cloud-concepts'
  | 'azure-architecture'
  | 'azure-management';

export interface QuizProgress {
  totalAnswered: number;
  correctAnswers: number;
  topicStats: Record<QuizTopic, { answered: number; correct: number }>;
  wrongQuestionIds: string[];
  answeredIds: string[];
}

export interface KnowledgeEntry {
  keywords: string[];
  topic: string;
  explain: string;
  example: string;
  africanExample: string;
  keyTerms: { term: string; definition: string }[];
  compareConcepts?: { conceptA: string; conceptB: string; comparison: string };
  inlineQuestion: QuizQuestion;
}

export const quizTopicLabels: Record<QuizTopic, string> = {
  'cloud-concepts': 'Describe Cloud Concepts',
  'azure-architecture': 'Describe Azure Architecture & Services',
  'azure-management': 'Describe Azure Management & Governance',
};

export const quizTopicIcons: Record<QuizTopic, string> = {
  'cloud-concepts': 'Cloud',
  'azure-architecture': 'Server',
  'azure-management': 'Settings',
};

export const learningModeLabels: Record<LearningMode, string> = {
  explain: 'Explain Simply',
  example: 'Give Me an Example',
  compare: 'Compare Concepts',
  test: 'Test My Knowledge',
};
