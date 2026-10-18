import type { Programme } from "../content";

/** A programme drawn as its printed workbook: coloured cover, spine, and a binder tab naming the format. */
export function Cover({
  p,
  size = "md",
}: {
  p: Programme;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={`cover cover-${size}`}
      data-tone={p.tone}
      aria-hidden="true"
    >
      <span className="cover-tab">{p.format}</span>
      <span className="cover-length">{p.length}</span>
      <span className="cover-name">{p.name}</span>
      <span className="cover-by">Mentor · Margo Ellery</span>
    </div>
  );
}
