import { useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  books,
  booksellers,
  formatLabels,
  fromPrice,
  sections,
  type Section,
} from "../content";
import { Link } from "../router";
import { money } from "../lib/format";

/** "Ines Varga" → "Varga, Ines." as a catalogue main entry. */
const invert = (name: string) => {
  const parts = name.split(" ");
  return `${parts.pop()}, ${parts.join(" ")}.`;
};

/**
 * The signature: the shop's card catalogue. Subject dividers choose a drawer; the cards
 * riffle forward and back (buttons or arrow keys), and the front card is a real link.
 */
export function CardDrawer() {
  const [section, setSection] = useState<Section>("Fiction");
  const [index, setIndex] = useState(0);
  const cards = books
    .filter((b) => b.section === section)
    .sort((a, b) => a.shelf.localeCompare(b.shelf));
  const current = cards[index];

  function choose(s: Section) {
    setSection(s);
    setIndex(0);
  }

  const go = (step: number) =>
    setIndex((i) => Math.min(Math.max(i + step, 0), cards.length - 1));

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    else return;
    e.preventDefault();
  }

  return (
    <div className="drawer">
      <div className="drawer-tabs" role="group" aria-label="Catalogue drawers">
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={s === section}
            onClick={() => choose(s)}
          >
            {s}
            <span>{books.filter((b) => b.section === s).length}</span>
          </button>
        ))}
      </div>

      <div
        className="drawer-well"
        role="group"
        aria-roledescription="card catalogue"
        aria-label={`${section} drawer`}
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div className="drawer-stack">
          {cards.map((b, i) => {
            const d = i - index;
            const by = b.pick && booksellers.find((s) => s.id === b.pick?.by);
            return (
              <article
                key={b.slug}
                className="catalogue-card"
                data-depth={d < 0 ? "past" : d > 3 ? "deep" : d}
                inert={d !== 0}
                aria-hidden={d !== 0}
              >
                <p className="cc-shelf">{b.shelf}</p>
                <div className="cc-body">
                  <p className="cc-entry">{invert(b.author)}</p>
                  <h3 className="cc-title">
                    {b.title}
                    {b.subtitle && (
                      <span>: {b.subtitle.toLowerCase()}</span>
                    )} / {b.author}
                    {b.translator && (
                      <span>; translated by {b.translator}</span>
                    )}
                    . — Halden : {b.publisher}, {b.published.slice(0, 4)}.
                  </h3>
                  <p className="cc-collation">
                    {b.pages} p. ; {b.size.split(" × ")[1]} ·{" "}
                    {b.formats.map((f) => formatLabels[f.id]).join(", ")} · from{" "}
                    {money(fromPrice(b))}
                  </p>
                  {b.pick && by && (
                    <p className="cc-note">
                      “{b.pick.note.split(". ")[0].replace(/\.$/, "")}.”{" "}
                      <span>— {by.name.split(" ")[0]}</span>
                    </p>
                  )}
                  <p className="cc-tracings">
                    {b.tracings.map((t, n) => `${n + 1}. ${t}.`).join(" ")} I.
                    Title.
                  </p>
                  <Link to={`/books/${b.slug}`} className="cc-link">
                    Take it off the shelf{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <span className="cc-hole" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>

      <div className="drawer-controls">
        <button
          type="button"
          className="icon-btn"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous card"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <p aria-live="polite">
          Card {index + 1} of {cards.length}
          <span className="visually-hidden">: {current?.title}</span>
        </p>
        <button
          type="button"
          className="icon-btn"
          onClick={() => go(1)}
          disabled={index >= cards.length - 1}
          aria-label="Next card"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <span className="drawer-hint">Arrow keys leaf through the drawer</span>
      </div>
    </div>
  );
}
