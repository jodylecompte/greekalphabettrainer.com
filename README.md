# Greek Alphabet Trainer

An interactive quiz app for learning the Greek alphabet — letters, names, and pronunciation.

## Just want to use it?

Head to **[greekalphabettrainer.com](https://greekalphabettrainer.com)** — no install required.

The app presents flashcard-style exercises across several formats:

- **Glyph to Name**: see a Greek letter (e.g. α), pick its name ("alpha")
- **Name to Glyph**: see a name (e.g. "beta"), pick the correct letter (β)
- **Glyph to Pronunciation**: see a letter (e.g. γ), pick how it's pronounced ("gah-muh")
- **Name to Pronunciation**: see a letter name (e.g. "alpha"), pick the correct pronunciation
- **Phonetic Spelling**: see a letter, identify the missing syllable in its phonetic spelling (α → \_\_\_-fuh)
- **Alphabet Sequence**: identify the missing letter in a sequence (β \_\_\_ δ)
- **Spot the Glyph**: pick the correct letter out of a 2×2 grid

If you answer a letter wrong twice in a row, a **Focus Practice** button appears to drill just the letters you're struggling with.

Use the **Settings** button to switch between Modern Greek and Koine (Biblical) pronunciation modes. Your preference is saved automatically.

**Keyboard shortcuts**: press `1`–`4` to select an answer, `Enter` to advance to the next question.

---

## Running locally / Contributing

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/jlecompte/greekalphabettrainer.com.git
cd greekalphabettrainer.com
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Other commands

```bash
npm run build         # Production build (output in dist/)
npm run preview       # Preview the production build locally
npm run lint          # Run ESLint
npm run test          # Run tests in watch mode
npm run test:coverage # Run tests once and report coverage
```

### Testing

Tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Test files live alongside the code they test in `__tests__/` subdirectories:

```
src/
├── lib/__tests__/
│   ├── letterData.test.ts    # Letter data shape and integrity
│   └── exercises.test.ts     # Exercise factory logic
├── hooks/__tests__/          # Custom hook tests (renderHook)
└── components/__tests__/     # Component tests (render + userEvent)
```

Coverage is enforced at 100% for all source files (excluding `main.tsx`).

### Project structure

```
src/
├── App.tsx                     # Root component, two-column layout
├── components/                 # UI components (QuizCard, Sidebar, etc.)
├── hooks/                      # Custom hooks (useQuiz, useTheme, etc.)
└── lib/
    ├── exercises.ts            # Exercise generation logic
    └── letterData.ts           # Greek letter data with pronunciations
```

### Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Radix UI (accessible dialog)

### Contributing

Bug reports, suggestions, and pull requests are welcome. For larger changes, open an issue first to discuss the approach.

### A note on AI-assisted development

This codebase was built largely with AI assistance, and AI-generated contributions are genuinely welcome here, no need to hide it or apologize for it.

That said, please take ownership of what you submit. PRs are reviewed for quality regardless of how the code was produced, and changes that look like unreviewed output (broken logic, unnecessary complexity, irrelevant modifications) will be declined.

The bar is just: does it work, does it fit, did you read it?
