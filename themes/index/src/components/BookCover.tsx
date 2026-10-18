import type { CSSProperties } from "react";
import type { Book, Motif } from "../content";

/* Covers are typeset, not photographed: one geometric motif per book in a 100×100 field. */
function MotifArt({ motif }: { motif: Motif }) {
  switch (motif) {
    case "rings":
      return (
        <g fill="none" strokeWidth="1.4">
          {[7, 14, 21, 28, 35, 42].map((r) => (
            <circle key={r} cx="50" cy="56" r={r} />
          ))}
        </g>
      );
    case "window":
      return (
        <g fill="none" strokeWidth="1.6">
          <path d="M28 96V44a22 22 0 0 1 44 0v52Z" />
          <path d="M50 22v74M28 60h44M28 78h44" />
          <circle cx="50" cy="40" r="6" fill="currentColor" stroke="none" />
        </g>
      );
    case "bands":
      return (
        <g stroke="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="0"
              y={44 + i * 12}
              width="100"
              height={5 + i}
              opacity={0.35 + i * 0.16}
              fill="currentColor"
            />
          ))}
        </g>
      );
    case "sun":
      return (
        <g fill="none" strokeWidth="1.4">
          <path d="M22 96a28 28 0 0 1 56 0" fill="currentColor" stroke="none" />
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI - (i * Math.PI) / 10;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 34}
                y1={96 - Math.sin(a) * 34}
                x2={50 + Math.cos(a) * 46}
                y2={96 - Math.sin(a) * 46}
              />
            );
          })}
        </g>
      );
    case "field":
      return (
        <g strokeWidth="1.3" strokeLinecap="round">
          {Array.from({ length: 48 }, (_, i) => {
            const x = 6 + (i % 12) * 8;
            const row = Math.floor(i / 12);
            const h = 6 + ((i * 7) % 5) * 2;
            const y = 58 + row * 11;
            return (
              <line
                key={i}
                x1={x}
                y1={y + 8}
                x2={x + ((i % 3) - 1)}
                y2={y + 8 - h}
              />
            );
          })}
        </g>
      );
    case "dots":
      return (
        <g stroke="none" fill="currentColor">
          {Array.from({ length: 36 }, (_, i) => (
            <circle
              key={i}
              cx={20 + (i % 6) * 12}
              cy={36 + Math.floor(i / 6) * 11}
              r={i === 21 ? 4.2 : 1.6}
            />
          ))}
        </g>
      );
    case "arch":
      return (
        <g fill="none" strokeWidth="1.6">
          {[40, 30, 20, 10].map((r) => (
            <path
              key={r}
              d={`M${50 - r} 98V${92 - r}a${r} ${r} 0 0 1 ${r * 2} 0V98`}
            />
          ))}
        </g>
      );
    case "wave":
      return (
        <g fill="none" strokeWidth="1.4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M-4 ${48 + i * 9} q13 -8 26 0 t26 0 t26 0 t26 0`}
            />
          ))}
        </g>
      );
    case "initial":
      return null;
  }
}

type Props = { book: Book; className?: string };

export function BookCover({ book, className = "" }: Props) {
  const { cover } = book;
  const style = {
    "--cover-bg": cover.bg,
    "--cover-ink": cover.ink,
    "--cover-accent": cover.accent,
  } as CSSProperties;
  return (
    <div
      className={`cover ${className}`}
      style={style}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      {/* The face sits inside the size container so its cqi padding resolves against the cover itself. */}
      <div className="cover-face">
        <span className="cover-author">{book.author}</span>
        <span className="cover-title">{book.title}</span>
        {book.subtitle && <span className="cover-sub">{book.subtitle}</span>}
        {cover.motif === "initial" ? (
          <span className="cover-initial" aria-hidden="true">
            {book.title.replace(/^(The|A) /, "").charAt(0)}
          </span>
        ) : (
          <svg
            className="cover-art"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            <g stroke="currentColor">
              <MotifArt motif={cover.motif} />
            </g>
          </svg>
        )}
        <span className="cover-imprint">{book.publisher}</span>
      </div>
    </div>
  );
}
