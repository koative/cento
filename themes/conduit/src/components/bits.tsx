import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { wireOf, type Connector } from "../content";

/** A connector's port label: its two-letter code on its category's cable colour. */
export function Mark({
  connector,
  size = "md",
}: {
  connector: Connector;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={`mark mark-${size}`}
      data-wire={wireOf[connector.category]}
      aria-hidden="true"
    >
      {connector.code}
    </span>
  );
}

/** Pretty-printed JSON with token colours. */
export function Json({ value }: { value: unknown }) {
  const parts = JSON.stringify(value, null, 2).split(
    /("(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?|\btrue\b|\bfalse\b|\bnull\b)/g,
  );
  return (
    <code>
      {parts.map((p, i) => {
        if (i % 2 === 0) return p;
        const kind = p.startsWith('"')
          ? parts[i + 1]?.startsWith(":")
            ? "k"
            : "s"
          : /\d/.test(p)
            ? "n"
            : "b";
        return (
          <span key={i} className={`tok-${kind}`}>
            {p}
          </span>
        );
      })}
    </code>
  );
}

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

export function CodeTabs({
  tabs,
}: {
  tabs: { label: string; code: string }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="codeblock">
      <div className="codeblock-bar">
        <div role="tablist" aria-label="Language">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={tabs[active].code} />
      </div>
      <pre
        role="tabpanel"
        tabIndex={0}
        aria-label={`${tabs[active].label} example`}
      >
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
