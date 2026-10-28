import { SOURCES } from "../sources";

/** Where the outside facts on this page come from, numbered like the marks in the copy. */
export function Sources() {
  return (
    <section id="sources" className="border-t border-divider" style={{ padding: "56px var(--content-px) 72px" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <h2 className="font-display font-semibold text-white text-[20px] tracking-[-0.02em]">Sources</h2>
        <p className="text-text-muted text-[13px] mt-1">
          Facts about other companies, checked October 2026. Everything about Unis comes from how the app works today.
        </p>
        <ol className="mt-6 grid gap-x-10 gap-y-2 md:grid-cols-2 text-[13px] leading-[1.6]">
          {SOURCES.map((s) => (
            <li key={s.n} id={`source-${s.n}`} className="grid grid-cols-[1.75rem_minmax(0,1fr)] scroll-mt-[calc(var(--nav-h)+24px)]">
              <span className="text-text-subtle tabular-nums">{s.n}</span>
              <span className="text-text-muted">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary underline decoration-white/20 underline-offset-4 hover:text-white"
                >
                  {s.title}
                </a>
                , {s.publisher}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
