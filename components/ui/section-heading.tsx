export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-8 h-0.5 mb-3 rounded-full bg-[var(--accent)]" />
      <h2 className="text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--text)] text-balance">
        {children}
      </h2>
    </div>
  );
}
