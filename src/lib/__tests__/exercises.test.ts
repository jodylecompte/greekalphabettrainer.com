import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateExercise } from '../exercises';
import { GREEK_LETTERS } from '../letterData';

// Helper: force Math.random to always return a fixed value
function mockRandom(value: number) {
  return vi.spyOn(Math, 'random').mockReturnValue(value);
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── Shared structural assertions ───────────────────────────────────────────

function assertExerciseShape(exercise: ReturnType<typeof generateExercise>) {
  expect(exercise.prompt).toBeTruthy();
  expect(exercise.choices).toHaveLength(4);
  expect(exercise.choices).toContain(exercise.correct);
  expect(exercise.letterId).toBeTruthy();
  expect(GREEK_LETTERS.some((l) => l.id === exercise.letterId)).toBe(true);
}

// ── generateExercise — factory selection via Math.random ──────────────────
//
// factories array index:
//   0 → glyphToName
//   1 → nameToGlyph
//   2 → glyphToPronunciation
//   3 → nameToPronunciation
//   4 → phoneticSpelling
//   5 → alphabetSequence
//   6 → spotTheGlyph
//
// Math.random() drives both:
//   - factory selection: Math.floor(random * 7)
//   - letter selection inside the factory
//
// We mock Math.random with a sequence so we can target specific factories.

describe('generateExercise', () => {
  it('returns a valid exercise with default pool', () => {
    mockRandom(0);
    const ex = generateExercise('erasmian');
    assertExerciseShape(ex);
  });

  it('respects allowedIds — only picks from the filtered pool', () => {
    // Force factory index 0 (glyphToName) and letter index 0 within pool
    mockRandom(0);
    const ex = generateExercise('erasmian', ['alpha', 'beta', 'gamma']);
    expect(['alpha', 'beta', 'gamma']).toContain(ex.letterId);
  });

  it('falls back to full pool when allowedIds is empty', () => {
    mockRandom(0);
    const ex = generateExercise('erasmian', []);
    assertExerciseShape(ex);
  });

  // ── glyphToName (factory 0) ──────────────────────────────────────────────

  describe('glyphToName', () => {
    it('prompt is a glyph, correct answer is the letter name', () => {
      // random=0 → factory 0, letter 0 (alpha), lower case (0 < 0.5 is false with 0)
      const spy = vi.spyOn(Math, 'random');
      // sequence: factory pick=0, letter pick=0, case pick=0 (lower)
      spy.mockReturnValueOnce(0)   // factory index → floor(0*7)=0
         .mockReturnValueOnce(0)   // letter index → alpha
         .mockReturnValueOnce(0)   // randomCase → lower
         .mockReturnValue(0);      // rest (shuffle, distractors)

      const ex = generateExercise('erasmian');
      expect(ex.letterId).toBe('alpha');
      expect(ex.prompt).toBe('α');
      expect(ex.correct).toBe('alpha');
      expect(ex.choices).toHaveLength(4);
    });
  });

  // ── nameToGlyph (factory 1) ──────────────────────────────────────────────

  describe('nameToGlyph', () => {
    it('prompt is the letter name, correct is a glyph', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(1 / 7)  // factory index → floor((1/7)*7)=1
         .mockReturnValueOnce(0)      // letter index → alpha
         .mockReturnValueOnce(0)      // randomCase correct → lower 'α'
         .mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.letterId).toBe('alpha');
      expect(ex.prompt).toBe('alpha');
      expect(['α', 'Α']).toContain(ex.correct);
    });
  });

  // ── glyphToPronunciation (factory 2) ────────────────────────────────────

  describe('glyphToPronunciation', () => {
    it('correct answer is the pronunciation in erasmian mode', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(2 / 7)
         .mockReturnValueOnce(0)   // alpha
         .mockReturnValueOnce(0)   // lower
         .mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.letterId).toBe('alpha');
      expect(ex.correct).toBe('AL-fuh');
    });

    it('correct answer is the pronunciation in modern mode', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(2 / 7)
         .mockReturnValueOnce(0)   // alpha
         .mockReturnValueOnce(0)   // lower
         .mockReturnValue(0);

      const ex = generateExercise('modern');
      expect(ex.correct).toBe('AHL-fah');
    });

    it('correct answer is the pronunciation in english mode', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(2 / 7)
         .mockReturnValueOnce(0)   // alpha
         .mockReturnValueOnce(0)
         .mockReturnValue(0);

      const ex = generateExercise('english');
      expect(ex.correct).toBe('AL-fuh');
    });
  });

  // ── nameToPronunciation (factory 3) ─────────────────────────────────────

  describe('nameToPronunciation', () => {
    it('prompt is the letter name, correct is the pronunciation', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(3 / 7)
         .mockReturnValueOnce(0)   // alpha
         .mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.letterId).toBe('alpha');
      expect(ex.prompt).toBe('alpha');
      expect(ex.correct).toBe('AL-fuh');
    });
  });

  // ── phoneticSpelling (factory 4) ────────────────────────────────────────

  describe('phoneticSpelling', () => {
    it('prompt contains ___ for multi-syllable letters', () => {
      // alpha erasmian = "AL-fuh" (2 syllables) → will produce a blank
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(4 / 7)  // factory 4
         .mockReturnValueOnce(0)      // alpha
         .mockReturnValueOnce(0)      // blankIdx=0 → blank first syllable "AL"
         .mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.prompt).toContain('___');
      expect(ex.correct).toBeTruthy();
    });

    it('falls back to glyphToPronunciation for 1-syllable letters', () => {
      // mu erasmian = "myoo" (no dash → 1 syllable) → falls back to glyphToPronunciation
      // The fallback picks a new random letter; with remaining mocks = 0 it picks alpha.
      const muIndex = GREEK_LETTERS.findIndex((l) => l.id === 'mu');
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(4 / 7)                          // factory 4
         .mockReturnValueOnce(muIndex / GREEK_LETTERS.length) // pick mu → 1-syllable → fallback
         .mockReturnValue(0);                                  // fallback picks alpha (index 0)

      const ex = generateExercise('erasmian');
      // fallback: prompt is a glyph (no "___"), correct is a pronunciation
      expect(ex.prompt).not.toContain('___');
      expect(ex.correct).toBe('AL-fuh'); // alpha's erasmian pronunciation
    });
  });

  // ── alphabetSequence (factory 5) ────────────────────────────────────────

  describe('alphabetSequence', () => {
    it('prompt matches "X ___ Y" pattern', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(5 / 7)  // factory 5
         .mockReturnValue(0);         // always pick index 0 from validIndices → letter[1] = beta

      const ex = generateExercise('erasmian');
      expect(ex.prompt).toMatch(/\S+ ___ \S+/);
      expect(ex.letterId).toBe('beta'); // first valid middle letter
    });

    it('excludes first and last letters (alpha, omega) as targets', () => {
      // Run many times; alpha and omega should never be the letterId target
      vi.restoreAllMocks();
      for (let i = 0; i < 50; i++) {
        // force factory 5 but let letter be random
        const spy = vi.spyOn(Math, 'random');
        spy.mockReturnValueOnce(5 / 7).mockReturnValue(Math.random());
        const ex = generateExercise('erasmian');
        expect(ex.letterId).not.toBe('alpha');
        expect(ex.letterId).not.toBe('omega');
        vi.restoreAllMocks();
      }
    });

    it('respects allowedIds filtering', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(5 / 7).mockReturnValue(0);
      // only beta is allowed (index 1 = valid middle letter)
      const ex = generateExercise('erasmian', ['beta']);
      expect(ex.letterId).toBe('beta');
    });
  });

  // ── spotTheGlyph (factory 6) ─────────────────────────────────────────────

  describe('spotTheGlyph', () => {
    it('returns variant "glyph-grid"', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(6 / 7).mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.variant).toBe('glyph-grid');
    });

    it('prompt is the letter name (nameToGlyph base)', () => {
      const spy = vi.spyOn(Math, 'random');
      spy.mockReturnValueOnce(6 / 7)
         .mockReturnValueOnce(0)   // alpha
         .mockReturnValue(0);

      const ex = generateExercise('erasmian');
      expect(ex.prompt).toBe('alpha');
    });
  });
});
