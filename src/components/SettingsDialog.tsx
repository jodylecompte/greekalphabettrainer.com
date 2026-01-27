import * as Dialog from "@radix-ui/react-dialog";
import { FaGear } from "react-icons/fa6";
import type { PronunciationMode } from "../lib/letterData";

type SettingsDialogProps = {
  pronunciationMode: PronunciationMode;
  onPronunciationModeChange: (mode: PronunciationMode) => void;
};

const PRONUNCIATION_OPTIONS: { value: PronunciationMode; label: string }[] = [
  { value: "erasmian", label: "Erasmian (Biblical / Academic)" },
  { value: "english", label: "English / Math" },
  { value: "modern", label: "Modern Greek" },
];

export function SettingsDialog({
  pronunciationMode,
  onPronunciationModeChange,
}: SettingsDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="absolute top-4 right-4 w-9 h-9 p-0 inline-flex items-center justify-center bg-[var(--button)] border border-[var(--border)] rounded-lg cursor-pointer hover:bg-[var(--button-hover)] transition-colors"
          type="button"
          aria-label="Pronunciation settings"
        >
          <FaGear />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/45 z-[1000]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 min-w-[280px] z-[1001] grid gap-4">
          <Dialog.Title className="text-lg font-semibold">
            Pronunciation
          </Dialog.Title>

          <select
            className="appearance-none w-full px-3 py-2.5 text-sm bg-[var(--button)] text-[var(--text)] border border-[var(--border)] rounded-lg cursor-pointer hover:bg-[var(--button-hover)] transition-colors"
            value={pronunciationMode}
            onChange={(e) =>
              onPronunciationModeChange(e.target.value as PronunciationMode)
            }
            aria-label="Pronunciation mode"
          >
            {PRONUNCIATION_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <Dialog.Close asChild>
            <button
              className="mt-2 px-2.5 py-2.5 bg-[var(--button)] border border-[var(--border)] rounded-lg cursor-pointer hover:bg-[var(--button-hover)] transition-colors"
              type="button"
            >
              Save
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
