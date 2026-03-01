import { describe, it, expect } from 'vitest';
import { GREEK_LETTERS } from '../letterData';

describe('GREEK_LETTERS', () => {
  it('contains exactly 24 letters', () => {
    expect(GREEK_LETTERS).toHaveLength(24);
  });

  it('each letter has upper, lower, name, and id', () => {
    for (const letter of GREEK_LETTERS) {
      expect(letter.id).toBeTruthy();
      expect(letter.name).toBeTruthy();
      expect(letter.upper).toBeTruthy();
      expect(letter.lower).toBeTruthy();
    }
  });

  it('each letter has all three pronunciation modes', () => {
    for (const letter of GREEK_LETTERS) {
      expect(letter.pronunciations.erasmian).toBeTruthy();
      expect(letter.pronunciations.english).toBeTruthy();
      expect(letter.pronunciations.modern).toBeTruthy();
    }
  });

  it('has no duplicate ids', () => {
    const ids = GREEK_LETTERS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('starts with alpha and ends with omega', () => {
    expect(GREEK_LETTERS[0].id).toBe('alpha');
    expect(GREEK_LETTERS[23].id).toBe('omega');
  });
});
