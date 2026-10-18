import { Minus, Plus, RefreshCw } from "lucide-react";
import { brand, type People, type Recipe } from "../content";
import { money } from "../lib/box";

export function Qty({
  value,
  onChange,
  min = 1,
  max,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max: number;
  label: string;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={"Fewer: " + label}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={"More: " + label}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Top-down view of the open delivery box: one numbered paper bag per recipe slot. */
export function BoxDiagram({
  items,
  size,
  people,
  onSwap,
}: {
  items: (Recipe | undefined)[];
  size: number;
  people: People;
  onSwap?: (slot: number) => void;
}) {
  return (
    <figure className="crate" data-size={size}>
      <div className="crate-box">
        <div className="crate-inner">
          <ol className="crate-bags">
            {Array.from({ length: size }, (_, i) => {
              const r = items[i];
              return (
                <li
                  key={i + (r?.slug ?? "-")}
                  className="bag"
                  data-empty={r ? undefined : ""}
                >
                  <span className="bag-label">
                    Bag {String(i + 1).padStart(2, "0")}
                  </span>
                  {r ? (
                    <>
                      <img
                        src={r.image.src}
                        alt=""
                        width={r.image.w}
                        height={r.image.h}
                      />
                      <span className="bag-name">{r.name}</span>
                      {onSwap && (
                        <button
                          type="button"
                          className="bag-swap"
                          onClick={() => onSwap(i)}
                        >
                          <RefreshCw size={14} aria-hidden="true" /> Swap
                          <span className="visually-hidden"> {r.name}</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="bag-name">
                      No match. Loosen your tastes or pick from the menu.
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <figcaption>
        {size} recipes × {people} servings = <b>{size * people} dinners</b>
      </figcaption>
    </figure>
  );
}

/** Authored gift card faces. */
export function GiftCardArt({
  design,
  amount,
  to,
  from,
  message,
}: {
  design: string;
  amount: number;
  to?: string;
  from?: string;
  message?: string;
}) {
  return (
    <div className="giftcard" data-design={design}>
      <svg className="giftcard-motif" viewBox="0 0 120 120" aria-hidden="true">
        {design === "tomato" && (
          <>
            <circle cx="60" cy="66" r="44" />
            <path
              className="leaf"
              d="M60 22l7 12 13-4-8 11 12 6-14 2 1 13-11-9-11 9 1-13-14-2 12-6-8-11 13 4Z"
            />
          </>
        )}
        {design === "herb" && (
          <>
            <path className="stem" d="M60 112V18" />
            {[30, 50, 70, 90].map((y, i) => (
              <g key={y}>
                <path
                  className="leaf"
                  d={`M60 ${y + 8}C${40 - i * 2} ${y + 6} ${34 - i * 2} ${y - 8} ${36} ${y - 12}C${52} ${y - 10} ${60} ${y - 2} 60 ${y + 8}Z`}
                />
                <path
                  className="leaf"
                  d={`M60 ${y + 14}C${80 + i * 2} ${y + 12} ${86 + i * 2} ${y - 2} ${84} ${y - 6}C${68} ${y - 4} ${60} ${y + 4} 60 ${y + 14}Z`}
                />
              </g>
            ))}
          </>
        )}
        {design === "kraft" && (
          <>
            <rect x="14" y="34" width="92" height="66" rx="4" />
            <path
              className="leaf"
              d="M14 34l18-16h56l18 16M60 18v16M14 54h92"
            />
          </>
        )}
      </svg>
      <span className="giftcard-brand">{brand.name}</span>
      <span className="giftcard-amount">
        {money(amount).replace(".00", "")}
      </span>
      <span className="giftcard-to">
        {to ? `For ${to}` : "For someone hungry"}
        {from ? `, from ${from}` : ""}
      </span>
      {message && <span className="giftcard-msg">“{message}”</span>}
    </div>
  );
}
