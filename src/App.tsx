import { usePronunciationMode, useQuiz, useTheme } from "./hooks";
import { Footer, QuizCard, Sidebar } from "./components";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { pronunciationMode, setPronunciationMode } = usePronunciationMode();
  const {
    exercise,
    letter,
    feedback,
    selected,
    needsAdvance,
    resetExercise,
    handleAnswer,
  } = useQuiz(pronunciationMode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen md:h-screen md:overflow-hidden">
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />

      <main className="overflow-hidden md:h-full md:overflow-y-auto flex flex-col items-start md:items-center md:justify-center pt-4 md:pt-0 px-4 pb-4 md:pb-0">
        <div className="w-full md:w-auto flex flex-col items-center md:min-h-[630px] md:justify-center">
          <QuizCard
            exercise={exercise}
            letter={letter}
            pronunciationMode={pronunciationMode}
            feedback={feedback}
            selected={selected}
            needsAdvance={needsAdvance}
            onAnswer={handleAnswer}
            onNext={resetExercise}
            onPronunciationModeChange={setPronunciationMode}
          />

          <Footer />
        </div>
      </main>
    </div>
  );
}
