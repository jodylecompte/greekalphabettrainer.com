# Greek Alphabet Trainer - Project Guide

## Project Overview

**greek-abc** is an interactive web application for learning the Greek alphabet through a quiz-based trainer. Users can practice identifying Greek letters, learn their names, and master pronunciation through three exercise types, with support for different pronunciation modes (modern vs. koine).

**Tech Stack:**
- React 19 with TypeScript
- Vite (build tool)
- Tailwind CSS 4 with Vite integration
- Radix UI (for accessible dialog component)
- React Icons

## Project Structure

```
src/
├── App.tsx                 # Main app component with two-column layout
├── main.tsx               # Vite entry point
├── components/            # Reusable React components
│   ├── QuizCard.tsx       # Main quiz display component
│   ├── ChoiceButton.tsx   # Answer option buttons
│   ├── AnswerReinforcement.tsx  # Feedback display
│   ├── Sidebar.tsx        # Left sidebar with letter display
│   ├── SettingsDialog.tsx # Settings/pronunciation mode dialog
│   ├── Footer.tsx         # Footer with links
│   └── index.ts           # Component exports
├── hooks/                 # Custom React hooks
│   ├── useQuiz.ts         # Quiz state and logic
│   ├── useExercise.ts     # Exercise generation wrapper
│   ├── usePronunciationMode.ts  # Pronunciation mode state
│   ├── useTheme.ts        # Dark/light theme state
│   ├── useLocalStorage.ts # localStorage persistence
│   ├── useKeyboardNavigation.ts  # Keyboard controls
│   └── index.ts           # Hook exports
├── lib/                   # Utilities and data
│   ├── exercises.ts       # Exercise factory functions
│   │   - glyphToName()
│   │   - nameToGlyph()
│   │   - glyphToPronunciation()
│   │   - generateExercise()
│   └── letterData.ts      # GREEK_LETTERS data with pronunciations
└── index.css             # Tailwind styles
```

## Exercise Types

The app generates three types of exercises that cycle randomly:

1. **Glyph to Name**: Shows a Greek letter (α), user selects its name ("alpha")
2. **Name to Glyph**: Shows a letter name ("beta"), user selects the glyph (β)
3. **Glyph to Pronunciation**: Shows a Greek letter (γ), user selects pronunciation ("gah-muh")

Each exercise provides 4 choices: 1 correct answer + 3 random distractors.

## Key Features

- **Dual Pronunciation Modes**: Modern Greek vs. Koine Greek pronunciations
- **Responsive Design**: Two-column layout on desktop, single column on mobile
- **Keyboard Navigation**: Number keys (1-4) to select answers, Enter to advance
- **Theme Toggle**: Dark/light mode support
- **Persistent State**: User preferences stored in localStorage
- **Accessible UI**: Radix UI dialog for accessible settings

## Development Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Compile TypeScript & build with Vite
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Important Implementation Details

### Quiz State Flow (useQuiz.ts)
- Manages current exercise, letter metadata, feedback state
- Handles answer submission and validation
- Controls feedback visibility and "next" button enabling

### Theme & Persistence (useTheme.ts, usePronunciationMode.ts)
- State stored in localStorage to persist across sessions
- Theme class applied to document root for Tailwind styling

### Layout Strategy (App.tsx)
- Grid-based responsive layout: `grid-cols-1 md:grid-cols-2`
- Sidebar always visible on desktop, quiz centered
- Mobile optimized with appropriate padding/sizing

## Code Style & Patterns

- **TypeScript**: Strict mode enabled, types defined in files
- **Component Structure**: Functional components with hooks
- **Naming**: camelCase for functions/variables, PascalCase for components
- **Exports**: Use index.ts files for cleaner imports from directories
- **Utility Functions**: Keep exercise logic pure (in exercises.ts)

## Recent Changes (from git log)
- GA4 analytics integration
- Mobile layout fixes and quiz recentering
- Quiz logic refactored out of main App
- Showtime refactor (multiple commits)

## Common Tasks

### Adding a New Pronunciation Mode
1. Update `PronunciationMode` type in `letterData.ts`
2. Add pronunciation field to each letter in `GREEK_LETTERS`
3. Update `glyphToPronunciation()` in `exercises.ts` if needed
4. Update `SettingsDialog` UI in `components/`

### Modifying Exercise Difficulty
- Adjust distractors in `pickDistractors()` - currently picks 3 random non-matching letters
- Change exercise factory distribution in `generateExercise()` to weight certain types

### Styling Changes
- Uses Tailwind CSS 4 - utilities in component className props
- Dark mode uses `dark:` prefix (theme toggle sets `dark` class on root)
- Responsive with `md:` breakpoint for tablet/desktop

## Notes for Future Work

- Consider adding spaced repetition or progress tracking
- Keyboard shortcuts for navigation are implemented but could be documented better in UI
- Mobile responsiveness could be tested more thoroughly
- Letter data is currently hard-coded - could be external data source
