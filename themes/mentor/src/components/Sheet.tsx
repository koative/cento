import type { Resource } from "../content";

/** The printed worksheet itself: ruled paper, margin rule, the real prompts. */
export function Sheet({ r, full = false }: { r: Resource; full?: boolean }) {
  const sections = full ? r.sections : r.sections.slice(0, 2);
  return (
    <div
      className="sheet"
      data-type={r.type}
      data-full={full ? "" : undefined}
      aria-hidden={full ? undefined : "true"}
    >
      <div className="sheet-head">
        <span className="sheet-type">{r.type}</span>
        <span className="sheet-brand">Mentor</span>
      </div>
      <p className="sheet-title">{r.title}</p>
      {sections.map((s) => (
        <div key={s.heading} className="sheet-section">
          {full ? <h2>{s.heading}</h2> : <p className="sheet-h">{s.heading}</p>}
          <ul>
            {(full ? s.items : s.items.slice(0, 2)).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
