import { useState } from "react";
import { ArrowLeftRight, Check, X } from "lucide-react";

/** WCAG 2.2 relative luminance of a #rrggbb colour. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const HEX = /^#[0-9a-f]{6}$/i;

export function ContrastCheck() {
  const [fg, setFg] = useState("#c58b14");
  const [bg, setBg] = useState("#16181b");
  const [la, lb] = [luminance(fg), luminance(bg)];
  const ratio = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  const checks = [
    { label: "Body text, AA", need: 4.5 },
    { label: "Large text, AA", need: 3 },
    { label: "Body text, AAA", need: 7 },
  ];

  return (
    <div className="tool contrast">
      <div className="contrast-inputs">
        <ColourField label="Text" value={fg} onChange={setFg} />
        <button
          type="button"
          className="icon-btn"
          aria-label="Swap text and background"
          onClick={() => {
            setFg(bg);
            setBg(fg);
          }}
        >
          <ArrowLeftRight size={18} aria-hidden="true" />
        </button>
        <ColourField label="Background" value={bg} onChange={setBg} />
      </div>
      <div className="contrast-sample" style={{ color: fg, background: bg }}>
        <p className="contrast-big">3 loads unassigned</p>
        <p>
          52 minutes to the 22:40 cut-off. Assign drivers before the board
          locks.
        </p>
      </div>
      <p className="contrast-ratio" aria-live="polite">
        <span className="num">{ratio.toFixed(2)}</span> : 1
      </p>
      <ul className="contrast-checks">
        {checks.map((c) => {
          const pass = ratio >= c.need;
          return (
            <li key={c.label} data-pass={pass || undefined}>
              {pass ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <X size={16} aria-hidden="true" />
              )}
              {c.label} <span className="num">({c.need} : 1)</span> —{" "}
              {pass ? "passes" : "fails"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ColourField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [seen, setSeen] = useState(value);
  if (seen !== value) {
    setSeen(value);
    setDraft(value);
  }
  const id = "c-" + label.toLowerCase();
  return (
    <div className="colour-field">
      <label htmlFor={id}>{label}</label>
      <span className="colour-row">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} colour picker`}
        />
        <input
          id={id}
          value={draft}
          spellCheck={false}
          aria-invalid={!HEX.test(draft) || undefined}
          onChange={(e) => {
            setDraft(e.target.value);
            if (HEX.test(e.target.value))
              onChange(e.target.value.toLowerCase());
          }}
        />
      </span>
    </div>
  );
}
