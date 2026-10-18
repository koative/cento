import {
  Apple,
  Feather,
  Fish,
  Flower2,
  Leaf,
  Moon,
  Snail,
  Star,
  Sun,
  TreePine,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { PegSymbol } from "../content";

const symbols = {
  sun: Sun,
  leaf: Leaf,
  moon: Moon,
  snail: Snail,
  flower: Flower2,
  star: Star,
  feather: Feather,
  fish: Fish,
  apple: Apple,
  tree: TreePine,
};

/** A coat-peg label: every child and grown-up at Nest has a symbol on their peg. */
export function Peg({
  symbol,
  color,
  name,
  size = "md",
}: {
  symbol: PegSymbol;
  color: string;
  name: string;
  size?: "md" | "lg";
}) {
  const Icon = symbols[symbol];
  return (
    <span
      className={`peg peg-${size}`}
      style={{ "--peg": color } as CSSProperties}
    >
      <span className="peg-hole" aria-hidden="true" />
      <Icon aria-hidden="true" strokeWidth={2.2} />
      <span className="peg-name">{name.split(" ")[0]}</span>
    </span>
  );
}
