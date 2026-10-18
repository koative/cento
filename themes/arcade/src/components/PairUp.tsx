import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { games } from "../content";
import {
  SPRITES,
  colorsFor,
  type Colors,
  type SpriteName,
} from "../lib/pixels";
import { PixelArt } from "./PixelArt";

const palette = (slug: string) =>
  colorsFor(games.find((g) => g.slug === slug)!.palette);

/** Six studio characters, each in its own game's colours. */
const FACES: { name: string; sprite: SpriteName; colors: Colors }[] = [
  { name: "Blob", sprite: "blob", colors: palette("blob-hop") },
  {
    name: "Pim's ship",
    sprite: "ship",
    colors: { ...palette("orbital-delivery"), k: "#110c2c" },
  },
  {
    name: "Lighthouse",
    sprite: "lighthouse",
    colors: palette("lantern-keeper"),
  },
  { name: "Fish", sprite: "fish", colors: palette("tiny-tide") },
  { name: "Kite", sprite: "kite", colors: palette("kite-season") },
  { name: "Star", sprite: "star", colors: palette("pair-up") },
];

function deal() {
  const cards = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function PairUp() {
  const [cards, setCards] = useState(deal);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const complete = matched.length === cards.length;

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const t = setTimeout(
      () => {
        if (cards[a] === cards[b]) setMatched((m) => [...m, a, b]);
        setOpen([]);
      },
      cards[a] === cards[b] ? 350 : 850,
    );
    return () => clearTimeout(t);
  }, [open, cards]);

  useEffect(() => {
    if (complete) setBest((b) => (b === null ? moves : Math.min(b, moves)));
  }, [complete, moves]);

  function flip(i: number) {
    if (open.length === 2 || open.includes(i) || matched.includes(i)) return;
    setOpen((o) => [...o, i]);
    if (open.length === 1) setMoves((m) => m + 1);
  }

  function reset() {
    setCards(deal());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }

  const status = complete
    ? `All six pairs in ${moves} moves.${best !== null && moves <= best ? " That's your best this visit." : ""}`
    : open.length === 2
      ? cards[open[0]] === cards[open[1]]
        ? `A pair of ${FACES[cards[open[0]]].name}s.`
        : "Not quite. Remember where those were."
      : `${matched.length / 2} of 6 pairs found.`;

  return (
    <div className="pairup">
      <div
        className="pairup-board"
        role="group"
        aria-label="Pair Up! board, 12 cards"
      >
        {cards.map((face, i) => {
          const isMatched = matched.includes(i);
          const shown = isMatched || open.includes(i);
          return (
            <button
              key={i}
              type="button"
              className="pairup-card"
              data-shown={shown ? "" : undefined}
              data-matched={isMatched ? "" : undefined}
              aria-label={`Card ${i + 1}: ${shown ? FACES[face].name : "face down"}${isMatched ? ", matched" : ""}`}
              aria-disabled={isMatched || open.length === 2}
              onClick={() => flip(i)}
            >
              <span className="pairup-back" aria-hidden="true">
                <PixelArt
                  grid={SPRITES.blob}
                  colors={{
                    h: "#edc6e6",
                    d: "#c9a0c4",
                    w: "#faf2de",
                    k: "#6848bd",
                    a: "#e98c5d",
                  }}
                />
              </span>
              <span className="pairup-face" aria-hidden="true">
                <PixelArt
                  grid={SPRITES[FACES[face].sprite]}
                  colors={FACES[face].colors}
                />
              </span>
            </button>
          );
        })}
      </div>
      <div className="pairup-side">
        <dl className="pairup-stats">
          <div>
            <dt>Moves</dt>
            <dd className="num">{String(moves).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Pairs</dt>
            <dd className="num">{matched.length / 2}/6</dd>
          </div>
          <div>
            <dt>Best</dt>
            <dd className="num">{best ?? "–"}</dd>
          </div>
        </dl>
        <p className="pairup-status" role="status">
          {status}
        </p>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          <RotateCcw aria-hidden="true" /> Deal again
        </button>
        <p className="small">
          Tab to a card, then press Enter or Space to flip it.
        </p>
      </div>
    </div>
  );
}
