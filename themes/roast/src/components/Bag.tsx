import type { CSSProperties } from "react";

type Props = {
  name: string;
  origin: string;
  color: string;
  weight?: string;
  /** Bag width in rem; everything inside scales with it. */
  size?: number;
  className?: string;
};

/** Authored coffee bag: kraft-white pouch, valve, colour label band. Decorative, so hidden from assistive tech. */
export function Bag({
  name,
  origin,
  color,
  weight = "250 g",
  size = 16,
  className = "",
}: Props) {
  return (
    <div
      className={"bag " + className}
      style={{ "--bag": color, fontSize: size / 16 + "rem" } as CSSProperties}
      aria-hidden="true"
    >
      <div className="bag-crimp" />
      <div className="bag-body">
        <span className="bag-valve" />
        <span className="bag-word">roast</span>
        <svg className="bag-mark" viewBox="0 0 40 40">
          <path d="M13 22a7 7 0 0 1 14 0" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const a = Math.PI + (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={20 + Math.cos(a) * 11}
                y1={22 + Math.sin(a) * 11}
                x2={20 + Math.cos(a) * 16}
                y2={22 + Math.sin(a) * 16}
              />
            );
          })}
          <line x1="4" y1="22" x2="36" y2="22" />
        </svg>
        <div className="bag-label">
          <strong>{name}</strong>
          <span>{origin}</span>
        </div>
        <div className="bag-base">
          <span>Roasted to order</span>
          <span>{weight}</span>
        </div>
      </div>
    </div>
  );
}
