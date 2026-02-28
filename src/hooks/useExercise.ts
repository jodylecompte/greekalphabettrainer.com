import { useCallback, useEffect, useRef, useState } from "react";
import { generateExercise, type Exercise } from "../lib/exercises";
import {
  GREEK_LETTERS,
  type GreekLetter,
  type PronunciationMode,
} from "../lib/letterData";

const AUTO_ADVANCE_DELAY = 1500;

export function useExercise(pronunciationMode: PronunciationMode) {
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(pronunciationMode),
  );
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [needsAdvance, setNeedsAdvance] = useState(false);

  // Phase 3: session stats
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Phase 7: tough letter tracking + focus mode
  const [wrongCounts, setWrongCounts] = useState<Record<string, number>>({});
  const [focusMode, setFocusMode] = useState(false);

  const toughLetterIds = Object.entries(wrongCounts)
    .filter(([, count]) => count >= 2)
    .map(([id]) => id);
  const hasToughLetters = toughLetterIds.length > 0;

  // Refs so resetExercise always reads the latest values without re-creating
  const focusModeRef = useRef(focusMode);
  const toughLetterIdsRef = useRef(toughLetterIds);
  focusModeRef.current = focusMode;
  toughLetterIdsRef.current = toughLetterIds;

  const letter = GREEK_LETTERS.find(
    (l) => l.id === exercise.letterId,
  ) as GreekLetter;

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
    const ids = focusModeRef.current ? toughLetterIdsRef.current : undefined;
    setExercise(generateExercise(pronunciationMode, ids));
    setFeedback(null);
    setSelected(null);
    setNeedsAdvance(false);
  }, [pronunciationMode]);

  const handleAnswer = useCallback(
    (choice: string) => {
      const isCorrect = choice === exercise.correct;
      setSelected(choice);
      setFeedback(isCorrect);
      setTotalAnswered((prev) => prev + 1);

      if (isCorrect) {
        setStreak((prev) => prev + 1);
        setTotalCorrect((prev) => prev + 1);
        setTimeout(resetExercise, AUTO_ADVANCE_DELAY);
      } else {
        setStreak(0);
        setWrongCounts((prev) => ({
          ...prev,
          [exercise.letterId]: (prev[exercise.letterId] || 0) + 1,
        }));
        setNeedsAdvance(true);
      }
    },
    [exercise.correct, exercise.letterId, resetExercise],
  );

  const clearToughLetters = useCallback(() => {
    setWrongCounts({});
    setFocusMode(false);
  }, []);

  return {
    exercise,
    letter,
    feedback,
    selected,
    needsAdvance,
    resetExercise,
    handleAnswer,
    // Phase 3
    streak,
    totalAnswered,
    totalCorrect,
    // Phase 7
    focusMode,
    setFocusMode,
    toughLetterIds,
    hasToughLetters,
    clearToughLetters,
  };
}
