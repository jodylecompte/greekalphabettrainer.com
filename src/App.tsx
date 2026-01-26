import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaGear, FaKeyboard } from "react-icons/fa6";

import { generateExercise, type Exercise } from "./lib/exercises";
import { GREEK_LETTERS, type PronunciationMode } from "./lib/letterData";

import "./App.css";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark",
  );

  const [pronunciationMode, setPronunciationMode] = useState<PronunciationMode>(
    () =>
      (localStorage.getItem("pronunciationMode") as PronunciationMode) ||
      "erasmian",
  );

  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(pronunciationMode),
  );

  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [needsAdvance, setNeedsAdvance] = useState(false);

  const letter = GREEK_LETTERS.find((l) => l.id === exercise.letterId)!;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("pronunciationMode", pronunciationMode);

    // If current exercise is pronunciation-based, regenerate it
    if (
      exercise.correct === letter.pronunciations.erasmian ||
      exercise.correct === letter.pronunciations.english ||
      exercise.correct === letter.pronunciations.modern
    ) {
      setExercise(generateExercise(pronunciationMode));
      setFeedback(null);
      setSelected(null);
      setNeedsAdvance(false);
    }
  }, [pronunciationMode]);

  function nextExercise() {
    setExercise(generateExercise(pronunciationMode));
    setFeedback(null);
    setSelected(null);
    setNeedsAdvance(false);
  }

  function answer(choice: string) {
    const correct = choice === exercise.correct;
    setSelected(choice);
    setFeedback(correct);

    if (correct) {
      setTimeout(() => {
        nextExercise();
      }, 1500);
    } else {
      setNeedsAdvance(true);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (needsAdvance) {
          nextExercise();
          return;
        }
        if (selected !== null && feedback === null) {
          answer(selected);
          return;
        }
      }

      if (feedback !== null) return;

      const index = Number(e.key) - 1;
      if (index >= 0 && index < exercise.choices.length) {
        answer(exercise.choices[index]);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exercise, feedback, selected, needsAdvance]);

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Greek Alphabet Trainer</h1>

        <p>
          Learn to recognize and pronounce the Greek alphabet using short,
          adaptive quizzes.
        </p>

        <p>
          Spend just 5–10 minutes a day for a week or two and you’ll confidently
          recognize both uppercase and lowercase letters as they appear in
          biblical Greek texts.
        </p>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        <div className="keyboard-hint">
          <FaKeyboard /> Tip: Keyboard control equipped for number and enter
          keys
        </div>
      </aside>

      <main className="quiz">
        <div className={`card ${feedback !== null ? "card-answered" : ""}`}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="settings-button">
                <FaGear />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Dialog.Title className="dialog-title">
                  Pronunciation
                </Dialog.Title>

                <select
                  className="pronunciation-select"
                  value={pronunciationMode}
                  onChange={(e) =>
                    setPronunciationMode(e.target.value as PronunciationMode)
                  }
                >
                  <option value="erasmian">
                    Erasmian (Biblical / Academic)
                  </option>
                  <option value="english">English / Math</option>
                  <option value="modern">Modern Greek</option>
                </select>

                <Dialog.Close asChild>
                  <button className="dialog-close">Save</button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <div className="prompt">{exercise.prompt}</div>

          <div className="choices">
            {exercise.choices.map((choice, i) => {
              const state =
                feedback === null
                  ? ""
                  : choice === exercise.correct
                    ? "correct-choice"
                    : choice === selected
                      ? "incorrect-choice"
                      : "";

              return (
                <button
                  key={choice}
                  className={state}
                  onClick={() => answer(choice)}
                  disabled={feedback !== null}
                >
                  <span className="choice-index">{i + 1}</span>
                  <span className="choice-label">{choice}</span>
                </button>
              );
            })}
          </div>

          <div className={`reinforce ${feedback !== null ? "visible" : ""}`}>
            <div className="reinforce-glyphs">
              {letter.upper} {letter.lower}
            </div>
            <div className="reinforce-name">{letter.name}</div>
            <div className="reinforce-pronunciation">
              {letter.pronunciations[pronunciationMode]}
            </div>
          </div>

          <button
            className={`next-button ${needsAdvance ? "visible" : ""}`}
            onClick={nextExercise}
          >
            Next →
          </button>
        </div>

        <div className="attribution" style={{ marginBottom: "10px" }}>
          <p style={{ marginBottom: "20px" }}>
            Adaptive quizes is a simple weighing of which questions you get
            right and which you get wrong. All data is stored in your browser
            and it's{" "}
            <a href="https://github.com/jodylecompte/greekalphabettrainer.com">
              entirely open source.
            </a>
          </p>
          <p style={{ marginBottom: "10px" }}>
            This site does't track you or use analytics. So if this blesses you
            by helping you take the first step of learning Koine Greek, I'm
            relying on you to let me know. ❤️
          </p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://jodylecompte.com"
            target="_blank"
            style={{ marginBottom: "10px" }}
          >
            Jody LeCompte
          </a>
        </div>
      </main>
    </div>
  );
}
