type ChoiceButtonProps = {
  choice: string;
  index: number;
  isCorrect: boolean;
  isIncorrect: boolean;
  isDisabled: boolean;
  onSelect: () => void;
};

const BASE_CLASSES =
  "relative px-3 py-2.5 text-sm md:text-base bg-[var(--button)] border border-[var(--border)] rounded-[10px] cursor-pointer text-[var(--text)] hover:bg-[var(--button-hover)] transition-colors flex items-center gap-3 disabled:opacity-60 disabled:cursor-default";

function getButtonClassName(isCorrect: boolean, isIncorrect: boolean): string {
  if (isCorrect) return `${BASE_CLASSES} border-green-500 bg-green-500/15`;
  if (isIncorrect) return `${BASE_CLASSES} border-red-500 bg-red-500/15`;
  return BASE_CLASSES;
}

export function ChoiceButton({
  choice,
  index,
  isCorrect,
  isIncorrect,
  isDisabled,
  onSelect,
}: ChoiceButtonProps) {
  return (
    <button
      className={getButtonClassName(isCorrect, isIncorrect)}
      onClick={onSelect}
      disabled={isDisabled}
      type="button"
    >
      <span className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-sm text-[var(--muted)] flex-shrink-0">
        {index + 1}
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
        {choice}
      </span>
    </button>
  );
}
