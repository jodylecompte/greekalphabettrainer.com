import { useEffect } from "react";

type KeyboardNavParams = {
  choices: string[];
  feedback: boolean | null;
  selected: string | null;
  needsAdvance: boolean;
  onAnswer: (choice: string) => void;
  onNext: () => void;
};

export function useKeyboardNavigation({
  choices,
  feedback,
  selected,
  needsAdvance,
  onAnswer,
  onNext,
}: KeyboardNavParams) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (needsAdvance) {
          onNext();
          return;
        }
        if (selected !== null && feedback === null) {
          onAnswer(selected);
          return;
        }
      }

      if (feedback !== null) return;

      const index = Number(e.key) - 1;
      if (index >= 0 && index < choices.length) {
        onAnswer(choices[index]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [choices, feedback, selected, needsAdvance, onAnswer, onNext]);
}
