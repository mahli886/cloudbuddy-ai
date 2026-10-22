import type { LearningMode, QuizQuestion } from '@/types';
import { findKnowledgeEntry, knowledgeBase } from '@/data/knowledgeBase';
import { quizQuestions } from '@/data/quizQuestions';

const MICROSOFT_LEARN_NOTE =
  '\n\n_For official and always up-to-date Azure documentation, please refer to [Microsoft Learn](https://learn.microsoft.com)._';

const UNCERTAIN_NOTE =
  '\n\n_I am not fully certain about this topic. I recommend checking the official [Microsoft Learn](https://learn.microsoft.com) documentation for accurate information._';

export interface ChatResponse {
  content: string;
  question?: QuizQuestion;
}

// Generate a simple inline quiz question from the quiz pool for a given topic
function pickQuizQuestion(topic?: string): QuizQuestion | undefined {
  // Try to find questions related to the topic keyword
  const normalizedTopic = (topic || '').toLowerCase();
  let candidates = quizQuestions;

  if (normalizedTopic) {
    const matched = quizQuestions.filter(
      (q) =>
        q.question.toLowerCase().includes(normalizedTopic) ||
        q.keyTerm?.toLowerCase().includes(normalizedTopic),
    );
    if (matched.length > 0) {
      candidates = matched;
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

// Pick a question related to a knowledge entry
function pickRelatedQuestion(entryTopic: string): QuizQuestion | undefined {
  const normalized = entryTopic.toLowerCase();

  // Map knowledge topics to quiz topics
  const topicMap: Record<string, string> = {
    'cloud computing': 'cloud-concepts',
    'cloud models': 'cloud-concepts',
    'iaas, paas, and saas': 'cloud-concepts',
    'azure regions and availability zones': 'azure-architecture',
    'azure virtual machines and containers': 'azure-architecture',
    'azure storage services': 'azure-architecture',
    'azure networking': 'azure-architecture',
    'identity and access management': 'azure-management',
    'security and governance': 'azure-management',
    'azure pricing and cost management': 'azure-management',
  };

  const quizTopic = topicMap[normalized];
  if (quizTopic) {
    const candidates = quizQuestions.filter((q) => q.topic === quizTopic);
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  return pickQuizQuestion(normalized);
}

function formatKeyTerms(
  terms: { term: string; definition: string }[],
): string {
  return terms
    .map((t) => `**${t.term}**: ${t.definition}`)
    .join('\n\n');
}

export function generateResponse(
  userMessage: string,
  mode: LearningMode = 'explain',
): ChatResponse {
  const entry = findKnowledgeEntry(userMessage);

  if (!entry) {
    // Check if user is asking about something we do not cover
    return {
      content:
        `I am not sure I have a detailed explanation for that specific question yet. Here are the topics I can help you with:\n\n` +
        knowledgeBase.map((e) => `• ${e.topic}`).join('\n') +
        `\n\nTry asking about one of these topics, or click one of the example questions below to get started.` +
        UNCERTAIN_NOTE,
    };
  }

  switch (mode) {
    case 'explain':
      return {
        content:
          `## ${entry.topic}\n\n` +
          `### Simple Explanation\n${entry.explain}\n\n` +
          `### Real-Life Example\n${entry.example}\n\n` +
          `### African Example\n${entry.africanExample}\n\n` +
          `### Key AZ-900 Terms\n${formatKeyTerms(entry.keyTerms)}` +
          MICROSOFT_LEARN_NOTE,
        question: entry.inlineQuestion,
      };

    case 'example':
      return {
        content:
          `## ${entry.topic} — Examples\n\n` +
          `### Real-Life Example\n${entry.example}\n\n` +
          `### African Example\n${entry.africanExample}` +
          MICROSOFT_LEARN_NOTE,
      };

    case 'compare':
      if (entry.compareConcepts) {
        return {
          content:
            `## Comparing: ${entry.compareConcepts.conceptA} vs ${entry.compareConcepts.conceptB}\n\n` +
            entry.compareConcepts.comparison +
            `\n\n### Key Terms Recap\n${formatKeyTerms(entry.keyTerms)}` +
            MICROSOFT_LEARN_NOTE,
        };
      }
      // If no comparison available, fall back to explain
      return {
        content:
          `## ${entry.topic}\n\n` +
          `I do not have a specific side-by-side comparison for this topic, but here is a simple explanation:\n\n` +
          entry.explain +
          MICROSOFT_LEARN_NOTE,
      };

    case 'test': {
      const question = pickRelatedQuestion(entry.topic);
      return {
        content:
          `## Test Your Knowledge: ${entry.topic}\n\n` +
          `Here is a practice question for you. Read it carefully and select your answer:`,
        question,
      };
    }

    default:
      return {
        content:
          `## ${entry.topic}\n\n${entry.explain}` + MICROSOFT_LEARN_NOTE,
      };
  }
}

// Get a random quiz question for the "Test My Knowledge" mode without a specific topic
export function getRandomQuizQuestion(): QuizQuestion {
  return quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
}
