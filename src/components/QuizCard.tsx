import type { Exercise } from "../lib/exercises";
import type { GreekLetter, PronunciationMode } from "../lib/letterData";
import { AnswerReinforcement } from "./AnswerReinforcement";
import { ChoiceButton } from "./ChoiceButton";
import { SettingsDialog } from "./SettingsDialog";

type QuizCardProps = {
  exercise: Exercise;
  letter: GreekLetter;
  pronunciationMode: PronunciationMode;
  feedback: boolean | null;
  selected: string | null;
  needsAdvance: boolean;
  onAnswer: (choice: string) => void;
  onNext: () => void;
  onPronunciationModeChange: (mode: PronunciationMode) => void;
};

export function QuizCard({
  exercise,
  letter,
  pronunciationMode,
  feedback,
  selected,
  needsAdvance,
  onAnswer,
  onNext,
  onPronunciationModeChange,
}: QuizCardProps) {
  const hasFeedback = feedback !== null;

  return (
    <div
      className={`bg-[var(--panel)] p-6 md:p-8 rounded-2xl border border-[var(--border)] w-full md:w-auto md:min-w-[380px] text-center flex flex-col justify-start transition-all duration-200 ${
        hasFeedback ? "scale-[0.98] opacity-95" : ""
      } relative mt-2 md:mt-0`}
    >
      <SettingsDialog
        pronunciationMode={pronunciationMode}
        onPronunciationModeChange={onPronunciationModeChange}
      />

      <div className="text-[56px] md:text-[72px] mb-4 md:mb-5">
        {exercise.prompt}
      </div>

      <div className="grid gap-2 md:gap-2.5">
        {exercise.choices.map((choice, index) => {
          const isCorrect = hasFeedback && choice === exercise.correct;
          const isIncorrect =
            hasFeedback &&
            choice === selected &&
            choice !== exercise.correct;

          return (
            <ChoiceButton
              key={choice}
              choice={choice}
              index={index}
              isCorrect={isCorrect}
              isIncorrect={isIncorrect}
              isDisabled={hasFeedback}
              onSelect={() => onAnswer(choice)}
            />
          );
        })}
      </div>

      <AnswerReinforcement
        letter={letter}
        pronunciationMode={pronunciationMode}
        isVisible={hasFeedback}
      />

      <button
        className={`mt-3 w-full px-3 py-2.5 text-sm md:text-base font-medium bg-[var(--next-bg)] text-[var(--next-text)] border border-[var(--border)] rounded-[10px] cursor-pointer transition-opacity duration-150 ${
          needsAdvance ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={onNext}
        type="button"
      >
        Next →
      </button>
    </div>
  );
}
