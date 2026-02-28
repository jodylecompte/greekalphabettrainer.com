type SessionStatsProps = {
  streak: number;
  accuracy: number;
  total: number;
};

export function SessionStats({ streak, accuracy, total }: SessionStatsProps) {
  if (total === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-xs text-[var(--muted)] mb-3">
      <span>{streak} streak</span>
      <span className="opacity-40">·</span>
      <span>{accuracy}% accuracy</span>
      <span className="opacity-40">·</span>
      <span>{total} answered</span>
    </div>
  );
}
