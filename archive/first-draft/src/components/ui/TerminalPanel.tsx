export function TerminalPanel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`terminal-panel ${className}`}>
      <header className="terminal-titlebar">{title}</header>
      <div className="p-5 md:p-8 text-sm leading-relaxed text-ink/80">{children}</div>
    </section>
  );
}
