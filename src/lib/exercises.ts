import { GREEK_LETTERS, type PronunciationMode } from "./letterData";

export type Exercise = {
  prompt: string;
  choices: string[];
  correct: string;
  letterId: string;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandomLetter() {
  return GREEK_LETTERS[Math.floor(Math.random() * GREEK_LETTERS.length)];
}

function pickDistractors(
  correctId: string,
  map: (l: (typeof GREEK_LETTERS)[number]) => string,
) {
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

  return {
    prompt,
    choices,
    correct: letter.name,
    letterId: letter.id,
  };
}

function nameToGlyph(): Exercise {
  const letter = pickRandomLetter();
  const correct = randomCase(letter);
  const choices = shuffle([
    correct,
    ...pickDistractors(letter.id, (l) => randomCase(l)),
  ]);

  return {
    prompt: letter.name,
    choices,
    correct,
    letterId: letter.id,
  };
}

function glyphToPronunciation(mode: PronunciationMode): Exercise {
  const letter = pickRandomLetter();
  const prompt = randomCase(letter);
  const choices = shuffle([
    letter.pronunciations[mode],
    ...pickDistractors(letter.id, (l) => l.pronunciations[mode]),
  ]);

  return {
    prompt,
    choices,
    correct: letter.pronunciations[mode],
    letterId: letter.id,
  };
}

export function generateExercise(
  pronunciationMode: PronunciationMode,
): Exercise {
  const factories = [
    () => glyphToName(),
    () => nameToGlyph(),
    () => glyphToPronunciation(pronunciationMode),
  ];

  const factory = factories[Math.floor(Math.random() * factories.length)];

  return factory();
}
