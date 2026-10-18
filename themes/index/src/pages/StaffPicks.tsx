import { useState } from "react";
import { books, booksellers, images } from "../content";
import { ShelfTalker } from "../components/ShelfTalker";

export function StaffPicks() {
  const [who, setWho] = useState("all");
  const shown = booksellers.filter((s) => who === "all" || s.id === who);

  return (
    <div className="page picks">
      <header className="page-head page-head-split">
        <div>
          <h1>Staff picks</h1>
          <p className="lede">
            Every card clipped under a book in the shop is written by hand by
            one of us, usually late, often after an argument. Here they all are,
            by bookseller.
          </p>
        </div>
        <img
          src={images.stairs}
          alt="A narrow carpeted staircase lined with books and framed prints"
          width={1600}
          height={1200}
        />
      </header>

      <div className="chips" role="group" aria-label="Show picks by bookseller">
        <button
          type="button"
          aria-pressed={who === "all"}
          onClick={() => setWho("all")}
        >
          Everyone
        </button>
        {booksellers.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={who === s.id}
            onClick={() => setWho(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {shown.map((s) => {
        const theirs = books.filter((b) => b.pick?.by === s.id);
        return (
          <section
            key={s.id}
            className="seller"
            aria-labelledby={`seller-${s.id}`}
          >
            <div className="seller-card">
              <h2 id={`seller-${s.id}`}>{s.name}</h2>
              <p className="seller-role">
                {s.role}
                <br />
                {s.room}
              </p>
              <p>{s.bio}</p>
              <p className="seller-reads">
                <span>Reads</span> {s.reads}
              </p>
            </div>
            <div className="seller-picks">
              {theirs.map((b) => (
                <ShelfTalker key={b.slug} book={b} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
