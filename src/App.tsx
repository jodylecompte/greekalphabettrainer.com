import { useEffect, useState } from "react";
import { GREEK_LETTERS } from "./lib/letterData";
import "./App.css";

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
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function answer(choice: string) {
    const correct = choice === exercise.correct;
    setFeedback(correct);

    setTimeout(() => {
      setExercise(generateExercise());
      setFeedback(null);
    }, 600);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Greek Alphabet Trainer</h1>

        <p>
          Learn to recognize and pronounce the Greek alphabet as it is commonly
          taught in biblical and academic contexts.
        </p>

        <p>
          Short, adaptive quizzes mix uppercase, lowercase, names, and
          pronunciations so the letters actually stick.
        </p>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </aside>

      <main className="quiz">
        <div className="card">
          <div className="prompt">{exercise.prompt}</div>

          <div className="choices">
            {exercise.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => answer(choice)}
                disabled={feedback !== null}
              >
                {choice}
              </button>
            ))}
          </div>

          {feedback !== null && (
            <div className={`feedback ${feedback ? "correct" : "incorrect"}`}>
              {feedback ? "Correct" : `Correct answer: ${exercise.correct}`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
