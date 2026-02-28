import { useEffect, useRef, useState } from "react";
import type { Exercise } from "../lib/exercises";
import type { GreekLetter, PronunciationMode } from "../lib/letterData";
import { AnswerReinforcement } from "./AnswerReinforcement";
import { ChoiceButton } from "./ChoiceButton";
import { GlyphGrid } from "./GlyphGrid";
import { SessionStats } from "./SessionStats";
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
  // Phase 3
  streak: number;
  totalAnswered: number;
  totalCorrect: number;
  // Phase 7
  hasToughLetters: boolean;
  focusMode: boolean;
  onSetFocusMode: (v: boolean) => void;
  toughLetterIds: string[];
  onClearToughLetters: () => void;
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
  streak,
  totalAnswered,
  totalCorrect,
  hasToughLetters,
  focusMode,
  onSetFocusMode,
  toughLetterIds,
  onClearToughLetters,
}: QuizCardProps) {
  const hasFeedback = feedback !== null;
  const accuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Phase 2: keyboard hint — show until 3 digit key presses
  const [showKeyHint, setShowKeyHint] = useState(true);
  const keyPressCount = useRef(0);

  useEffect(() => {
    if (!showKeyHint) return;

    const handler = (e: KeyboardEvent) => {
      const num = Number(e.key);
      if (num >= 1 && num <= 4) {
        keyPressCount.current += 1;
        if (keyPressCount.current >= 3) {
          setShowKeyHint(false);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showKeyHint]);

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

      {/* Phase 3: session stats */}
      <SessionStats streak={streak} accuracy={accuracy} total={totalAnswered} />

      {/* Phase 7: focus mode controls */}
      {hasToughLetters && (
        <div className="flex items-center justify-center gap-2 mb-3">
          {!focusMode ? (
            <button
              onClick={() => onSetFocusMode(true)}
              type="button"
              className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              Focus Practice ({toughLetterIds.length}{" "}
              {toughLetterIds.length === 1 ? "letter" : "letters"})
            </button>
          ) : (
            <>
              <span className="text-xs text-amber-500 font-medium">
                Focus Mode — {toughLetterIds.length}{" "}
                {toughLetterIds.length === 1 ? "letter" : "letters"}
              </span>
              <button
                onClick={onClearToughLetters}
                type="button"
                className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              >
                Clear
              </button>
            </>
          )}
        </div>
      )}

      {/* Phase 6: glyph grid vs standard choice list */}
      {exercise.variant === "glyph-grid" ? (
        <GlyphGrid
          choices={exercise.choices}
          correct={exercise.correct}
          selected={selected}
          hasFeedback={hasFeedback}
          onSelect={onAnswer}
        />
      ) : (
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
      )}

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

      {/* Phase 2: keyboard hint pill */}
      <div
        className={`mt-2 text-xs text-[var(--muted)] transition-opacity duration-500 ${
          showKeyHint ? "opacity-60" : "opacity-0 pointer-events-none"
        }`}
      >
        Tip: use keys 1–4
      </div>
    </div>
  );
}
