import type { PronunciationMode } from "../lib/letterData";
import { useLocalStorage } from "./useLocalStorage";

export function usePronunciationMode() {
  const [pronunciationMode, setPronunciationMode] =
    useLocalStorage<PronunciationMode>("pronunciationMode", "erasmian");

  return { pronunciationMode, setPronunciationMode };
}
