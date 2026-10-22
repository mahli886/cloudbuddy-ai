# CloudBuddy AI

> **Your friendly guide to understanding Azure.**
>
> A beginner-friendly learning assistant that explains Azure concepts in simple English, uses relatable African examples, and tests learners' understanding through original practice questions.

---

## The Problem

Beginners preparing for the **Microsoft Azure Fundamentals (AZ-900)** certification often struggle to understand cloud computing terminology and Azure services. Traditional memorisation does not always help learners truly understand the concepts — they need simple explanations, real-world analogies, and active practice to build lasting knowledge.

## The Solution

CloudBuddy AI is a beginner-friendly learning assistant built for the **#1MillionDevs Vibe Coding Hackathon** (AI Study Buddy challenge). It:

- Explains Azure and cloud computing concepts in **simple English**
- Provides **real-world examples** and **relatable African examples** for every topic
- Highlights important **AZ-900 terminology** with clear definitions
- Tests understanding with **original multiple-choice questions**
- Tracks **learning progress** over time
- Is structured so a real AI API can be connected later through a secure server-side endpoint

## Target Audience

- Beginners preparing for the AZ-900 certification
- Students and professionals new to cloud computing
- Learners in Africa and beyond who benefit from contextual, relatable examples
- Anyone who wants to understand Azure concepts in plain, jargon-free language

## Features

### 1. Study Chat

An interactive chat interface where learners can ask questions about:

- Cloud computing fundamentals
- Public, private, and hybrid clouds
- IaaS, PaaS, and SaaS service models
- Azure regions and availability zones
- Azure virtual machines and containers
- Azure storage services
- Azure networking
- Identity and access management (Microsoft Entra ID, RBAC, MFA)
- Security and governance (Azure Policy, Key Vault, resource locks)
- Azure pricing and cost management

Every explanation follows a structured format:
1. **Simple explanation** in plain English
2. **Real-life example** for context
3. **African example** for relatability
4. **Key AZ-900 terms** with definitions
5. **An original multiple-choice question** to test understanding

### 2. Learning Modes

Four buttons let learners control how the assistant responds:

| Mode | Description |
|------|-------------|
| **Explain Simply** | Full structured explanation with examples and key terms |
| **Give Me an Example** | Focuses on real-world and African examples |
| **Compare Concepts** | Side-by-side comparison of related concepts |
| **Test My Knowledge** | Generates a practice question on the current topic |

### 3. Practice Quiz

An interactive quiz with **30 original questions** based on the public AZ-900 skills outline, organised into three domains:

- **Describe Cloud Concepts** (8 questions)
- **Describe Azure Architecture & Services** (10 questions)
- **Describe Azure Management & Governance** (12 questions)

Each question provides:
- Four answer choices
- Immediate correct/incorrect feedback
- A detailed explanation of why the answer is correct
- The key AZ-900 term being tested

### 4. Learning Progress

Progress is tracked and saved in the browser's local storage:

- Total questions answered
- Correct answers
- Overall accuracy percentage
- Per-topic breakdown with accuracy bars
- Questions that need revision (wrong answers are collected for review)
- Weakest topic identification

### 5. Beginner-Friendly Experience

- Clear, simple English throughout
- Technical jargon is always explained
- Learners can ask follow-up questions in the chat
- Example questions are provided to help learners start
- A disclaimer directs learners to official Microsoft Learn documentation

## AI Behaviour & Integrity

CloudBuddy AI is designed with educational integrity in mind:

- **No fabricated facts**: The assistant uses a curated knowledge base and does not invent Azure features, pricing, certification rules, or technical facts
- **Honesty about uncertainty**: When the assistant does not have information on a topic, it says so and directs learners to [Microsoft Learn](https://learn.microsoft.com)
- **Educational vs official**: The assistant clearly distinguishes educational examples from official Azure terminology
- **Original content**: All practice questions are original and are not taken from actual certification exams
- **No fake AI**: The first version uses a local knowledge base — it does not pretend a live AI model is connected. The architecture is designed so a real AI API can be connected later through a secure server-side endpoint without exposing API keys in frontend code

## Technology

| Layer | Technology |
|-------|-----------|
| Framework | React 18 with TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Fonts | Inter + Plus Jakarta Sans (Google Fonts) |
| Data persistence | Browser local storage |
| Knowledge base | Curated TypeScript data modules (no external AI dependency) |

## Project Structure

```
src/
├── App.tsx                      # Main app shell with navigation
├── main.tsx                     # React entry point
├── index.css                    # Global styles + Tailwind
├── types.ts                     # Shared TypeScript types
├── data/
│   ├── knowledgeBase.ts         # Curated Azure concept explanations
│   └── quizQuestions.ts         # Original AZ-900 practice questions
├── hooks/
│   └── useProgress.ts           # Progress tracking with localStorage
├── utils/
│   └── chatEngine.ts            # Response generation logic
└── components/
    ├── StudyChat.tsx            # Chat interface with learning modes
    ├── PracticeQuiz.tsx         # Interactive quiz with feedback
    ├── ProgressDashboard.tsx    # Progress tracking visualisation
    ├── InlineQuiz.tsx           # Inline quiz widget for chat messages
    └── SimpleMarkdown.tsx       # Lightweight markdown renderer
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run type checking:**
   ```bash
   npm run typecheck
   ```

## Limitations

- The study assistant uses a **curated local knowledge base** rather than a live AI model. It can answer questions about the specific topics listed above but may not have answers for very specific or advanced questions outside that scope.
- The practice quiz contains **30 original questions**. While these cover the three AZ-900 domains, a real exam would have more questions and may cover additional subtopics.
- Progress is stored in **browser local storage**, so it is tied to the specific browser and device. Clearing browser data will reset progress.
- The application does **not use Microsoft logos** and is **not affiliated with or endorsed by Microsoft**.
- Practice content is **original** and is **not taken from actual certification exams**.

## Future Improvements

- **Connect a real AI API** (e.g., Azure OpenAI) through a secure server-side endpoint for more dynamic and comprehensive explanations
- **Expand the knowledge base** to cover all AZ-900 subtopics in greater depth
- **Add more practice questions** with difficulty levels (beginner, intermediate, advanced)
- **Spaced repetition** for questions that learners got wrong
- **Progress syncing** across devices using a backend database
- **Multi-language support** for learners who prefer French, Portuguese, Swahili, or other languages
- **Voice interaction** for accessibility
- **Study plans** with daily goals and streak tracking
- **Glossary search** for quick look-up of AZ-900 terms

## Disclaimer

CloudBuddy AI is an independent educational project. It is not affiliated with or endorsed by Microsoft. Practice content is original and is not taken from actual certification exams. For official and up-to-date Azure documentation, always refer to [Microsoft Learn](https://learn.microsoft.com).

---

Built for the **#1MillionDevs Vibe Coding Hackathon** — AI Study Buddy challenge.
