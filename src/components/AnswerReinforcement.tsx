import type { GreekLetter, PronunciationMode } from "../lib/letterData";

type AnswerReinforcementProps = {
  letter: GreekLetter;
  pronunciationMode: PronunciationMode;
  isVisible: boolean;
};

export function AnswerReinforcement({
  letter,
  pronunciationMode,
  isVisible,
}: AnswerReinforcementProps) {
  return (
    <div
      className={`mt-4 p-3 rounded-xl bg-[var(--button)] border border-[var(--border)] grid gap-1 transition-opacity duration-150 ${
        isVisible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="text-2xl md:text-[28px] font-semibold">
        {letter.upper} {letter.lower}
      </div>
      <div className="text-sm md:text-base capitalize">{letter.name}</div>
      <div className="text-xs md:text-sm text-[var(--muted)]">
        {letter.pronunciations[pronunciationMode]}
      </div>
    </div>
  );
}
