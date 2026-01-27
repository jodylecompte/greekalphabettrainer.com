import { useCallback, useEffect, useState } from "react";
import { generateExercise, type Exercise } from "../lib/exercises";
import { GREEK_LETTERS, type GreekLetter, type PronunciationMode } from "../lib/letterData";

const AUTO_ADVANCE_DELAY = 1500;

export function useExercise(pronunciationMode: PronunciationMode) {
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(pronunciationMode),
  );
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [needsAdvance, setNeedsAdvance] = useState(false);

  const letter = GREEK_LETTERS.find((l) => l.id === exercise.letterId) as GreekLetter;

  useEffect(() => {
    const isPronunciationBased =
      exercise.correct === letter.pronunciations.erasmian ||
      exercise.correct === letter.pronunciations.english ||
      exercise.correct === letter.pronunciations.modern;

    if (isPronunciationBased) {
      setExercise(generateExercise(pronunciationMode));
      setFeedback(null);
      setSelected(null);
      setNeedsAdvance(false);
    }
  }, [pronunciationMode, exercise.correct, letter.pronunciations]);

  const resetExercise = useCallback(() => {
    setExercise(generateExercise(pronunciationMode));
    setFeedback(null);
    setSelected(null);
    setNeedsAdvance(false);
  }, [pronunciationMode]);

  const handleAnswer = useCallback(
    (choice: string) => {
      const isCorrect = choice === exercise.correct;
      setSelected(choice);
      setFeedback(isCorrect);

      if (isCorrect) {
        setTimeout(resetExercise, AUTO_ADVANCE_DELAY);
      } else {
        setNeedsAdvance(true);
      }
    },
    [exercise.correct, resetExercise],
  );

  return {
    exercise,
    letter,
    feedback,
    selected,
    needsAdvance,
    resetExercise,
    handleAnswer,
  };
}
