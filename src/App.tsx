import { useState } from "react";
import { GREEK_LETTERS } from "./lib/letterData";

type Exercise = {
  prompt: string;
  choices: string[];
  correct: string;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandomLetter() {
  return GREEK_LETTERS[Math.floor(Math.random() * GREEK_LETTERS.length)];
}

function pickDistractors(correctId: string, map: (l: any) => string) {
  return shuffle(
    GREEK_LETTERS.filter((l) => l.id !== correctId).map(map),
  ).slice(0, 3);
}

function randomCase(letter: { upper: string; lower: string }) {
  return Math.random() < 0.5 ? letter.lower : letter.upper;
}

function glyphToName(): Exercise {
  const letter = pickRandomLetter();
  const prompt = randomCase(letter);

  const choices = shuffle([
    letter.name,
    ...pickDistractors(letter.id, (l) => l.name),
  ]);

  return { prompt, choices, correct: letter.name };
}

function nameToGlyph(): Exercise {
  const letter = pickRandomLetter();
  const correct = randomCase(letter);

  const choices = shuffle([
    correct,
    ...pickDistractors(letter.id, (l) => randomCase(l)),
  ]);

  return { prompt: letter.name, choices, correct };
}

function glyphToPronunciation(): Exercise {
  const letter = pickRandomLetter();
  const prompt = randomCase(letter);

  const choices = shuffle([
    letter.pronunciation,
    ...pickDistractors(letter.id, (l) => l.pronunciation),
  ]);

  return { prompt, choices, correct: letter.pronunciation };
}

const EXERCISE_FACTORIES = [glyphToName, nameToGlyph, glyphToPronunciation];

function generateExercise(): Exercise {
  const factory =
    EXERCISE_FACTORIES[Math.floor(Math.random() * EXERCISE_FACTORIES.length)];

  return factory();
}

export default function App() {
  const [exercise, setExercise] = useState(generateExercise());
  const [feedback, setFeedback] = useState<null | boolean>(null);

  function answer(choice: string) {
    const correct = choice === exercise.correct;
    setFeedback(correct);

    setTimeout(() => {
      setExercise(generateExercise());
      setFeedback(null);
    }, 600);
  }

  return (
    <div style={{ padding: 32, fontFamily: "system-ui" }}>
      <div style={{ fontSize: 96, textAlign: "center" }}>{exercise.prompt}</div>

      <div style={{ marginTop: 32, display: "grid", gap: 12 }}>
        {exercise.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => answer(choice)}
            disabled={feedback !== null}
            style={{
              padding: 16,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {choice}
          </button>
        ))}
      </div>

      {feedback !== null && (
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: feedback ? "green" : "red",
            textAlign: "center",
          }}
        >
          {feedback ? "Correct" : `Correct answer: ${exercise.correct}`}
        </div>
      )}
    </div>
  );
}
