export function Footer() {
  return (
    <div className="mb-2.5 mt-2">
      <div className="text-xs text-[var(--muted)] text-center">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://jodylecompte.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] no-underline border-b border-transparent hover:border-[var(--accent)]"
        >
          Jody LeCompte
        </a>
      </div>
    </div>
  );
}
