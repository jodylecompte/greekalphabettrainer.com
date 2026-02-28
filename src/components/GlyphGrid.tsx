type GlyphGridProps = {
  choices: string[];
  correct: string;
  selected: string | null;
  hasFeedback: boolean;
  onSelect: (choice: string) => void;
};

export function GlyphGrid({
  choices,
  correct,
  selected,
  hasFeedback,
  onSelect,
}: GlyphGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {choices.map((choice, index) => {
        const isCorrect = hasFeedback && choice === correct;
        const isIncorrect =
          hasFeedback && choice === selected && choice !== correct;

        return (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            disabled={hasFeedback}
            type="button"
            className={[
              "relative flex items-center justify-center h-24 md:h-28 text-5xl md:text-6xl rounded-xl border transition-colors cursor-pointer disabled:cursor-default",
              isCorrect
                ? "border-green-500 bg-green-500/15 animate-correct"
                : isIncorrect
                  ? "border-red-500 bg-red-500/15"
                  : "bg-[var(--button)] border-[var(--border)] hover:bg-[var(--button-hover)]",
            ].join(" ")}
          >
            <span className="absolute top-1.5 left-2.5 text-xs text-[var(--muted)]">
              {index + 1}
            </span>
            {choice}
          </button>
        );
      })}
    </div>
  );
}
