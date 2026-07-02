import { GREEK_LETTERS, type PronunciationMode } from "./letterData";

export type Exercise = {
  prompt: string;
  choices: string[];
  correct: string;
  letterId: string;
  variant?: "standard" | "glyph-grid";
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandomLetterFrom(pool: typeof GREEK_LETTERS) {
  return pool[Math.floor(Math.random() * pool.length)];
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

function glyphToName(letterPool = GREEK_LETTERS): Exercise {
  const letter = pickRandomLetterFrom(letterPool);
  const prompt = randomCase(letter);
  const choices = shuffle([
    letter.name,
    ...pickDistractors(letter.id, (l) => l.name),
  ]);
  return { prompt, choices, correct: letter.name, letterId: letter.id };
}

function nameToGlyph(letterPool = GREEK_LETTERS): Exercise {
  const letter = pickRandomLetterFrom(letterPool);
  const correct = randomCase(letter);
  const choices = shuffle([
    correct,
    ...pickDistractors(letter.id, (l) => randomCase(l)),
  ]);
  return { prompt: letter.name, choices, correct, letterId: letter.id };
}

function glyphToPronunciation(
  mode: PronunciationMode,
  letterPool = GREEK_LETTERS,
): Exercise {
  const letter = pickRandomLetterFrom(letterPool);
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

// Phase 1: name given, pick pronunciation
function nameToPronunciation(
  mode: PronunciationMode,
  letterPool = GREEK_LETTERS,
): Exercise {
  const letter = pickRandomLetterFrom(letterPool);
  const correct = letter.pronunciations[mode];
  const choices = shuffle([
    correct,
    ...pickDistractors(letter.id, (l) => l.pronunciations[mode]),
  ]);
  return { prompt: letter.name, choices, correct, letterId: letter.id };
}

// Phase 4: show glyph + partially-blanked pronunciation, pick the missing syllable
function phoneticSpelling(
  mode: PronunciationMode,
  letterPool = GREEK_LETTERS,
): Exercise {
  const letter = pickRandomLetterFrom(letterPool);
  const pronunciation = letter.pronunciations[mode];
  const syllables = pronunciation.split("-");

  if (syllables.length < 2) {
    return glyphToPronunciation(mode, letterPool);
  }

  const blankIdx = Math.floor(Math.random() * syllables.length);
  const masked = syllables.map((s, i) => (i === blankIdx ? "___" : s)).join("-");
  const prompt = `${randomCase(letter)} → ${masked}`;
  const correct = syllables[blankIdx];

  const allSyllables = GREEK_LETTERS.filter((l) => l.id !== letter.id).flatMap(
    (l) => l.pronunciations[mode].split("-"),
  );
  const uniqueSyllables = [...new Set(allSyllables)].filter((s) => s !== correct);
  const distractors = shuffle(uniqueSyllables).slice(0, 3);

  if (distractors.length < 3) {
    return glyphToPronunciation(mode, letterPool);
  }

  return {
    prompt,
    choices: shuffle([correct, ...distractors]),
    correct,
    letterId: letter.id,
  };
}

// Phase 6: name shown, pick from a 2×2 large glyph grid
function spotTheGlyph(letterPool = GREEK_LETTERS): Exercise {
  const exercise = nameToGlyph(letterPool);
  return { ...exercise, variant: "glyph-grid" };
}

export function generateExercise(
  pronunciationMode: PronunciationMode,
  allowedIds?: string[],
): Exercise {
  const pool =
    allowedIds && allowedIds.length > 0
      ? GREEK_LETTERS.filter((l) => allowedIds.includes(l.id))
      : GREEK_LETTERS;

  const safePool = pool.length > 0 ? pool : GREEK_LETTERS;

  const factories = [
    () => glyphToName(safePool),
    () => nameToGlyph(safePool),
    () => glyphToPronunciation(pronunciationMode, safePool),
    () => nameToPronunciation(pronunciationMode, safePool),
    () => phoneticSpelling(pronunciationMode, safePool),
    () => spotTheGlyph(safePool),
  ];

  const factory = factories[Math.floor(Math.random() * factories.length)];
  return factory();
}
