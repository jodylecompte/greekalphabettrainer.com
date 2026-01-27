import { FaKeyboard } from "react-icons/fa6";

type SidebarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const SIDEBAR_CLASSES =
  "overflow-hidden md:h-full p-6 md:p-12 bg-[var(--panel)] flex flex-col justify-center gap-3.5 md:gap-5 border-r-0 md:border-r border-b md:border-b-0 border-[var(--border)] items-center md:items-start text-center md:text-left";

const PARAGRAPH_CLASSES =
  "text-[15px] md:text-lg leading-normal md:leading-relaxed text-[var(--muted)] max-w-[320px] md:max-w-[520px] m-0";

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  return (
    <aside className={SIDEBAR_CLASSES}>
      <h1 className="text-[28px] md:text-[44px] font-semibold m-0 leading-tight max-w-[320px] md:max-w-none">
        Greek Alphabet Trainer
      </h1>

      <p className={PARAGRAPH_CLASSES}>
        Learn to recognize and pronounce the Greek alphabet using short,
        adaptive quizzes.
      </p>

      <p className={PARAGRAPH_CLASSES}>
        Spend just 5–10 minutes a day for a week or two and you'll confidently
        recognize both uppercase and lowercase letters as they appear in
        biblical Greek texts.
      </p>

      <button
        className="mt-1.5 md:mt-8 self-center md:self-start bg-transparent border border-[var(--border)] px-3 py-1.5 md:px-3.5 md:py-2 text-sm md:text-base rounded-lg cursor-pointer text-[var(--muted)] hover:bg-[var(--button-hover)] transition-colors"
        onClick={onToggleTheme}
        type="button"
      >
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>

      <div className="mt-3 text-[13px] text-[var(--muted)] flex items-center gap-1.5">
        <FaKeyboard /> Tip: Keyboard control equipped for number and enter keys
      </div>
    </aside>
  );
}
