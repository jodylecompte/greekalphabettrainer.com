import type { PronunciationMode } from "../lib/letterData";
import { useExercise } from "./useExercise";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

export function useQuiz(pronunciationMode: PronunciationMode) {
  const exerciseState = useExercise(pronunciationMode);

  useKeyboardNavigation({
    choices: exerciseState.exercise.choices,
    feedback: exerciseState.feedback,
    selected: exerciseState.selected,
    needsAdvance: exerciseState.needsAdvance,
    onAnswer: exerciseState.handleAnswer,
    onNext: exerciseState.resetExercise,
  });

  return exerciseState;
}
