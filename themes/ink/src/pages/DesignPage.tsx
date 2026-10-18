import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import {
  artistById,
  availabilityLabel,
  flash,
  placementById,
  type Design,
} from "../content";
import { money } from "../lib/ink";
import { FlashArt } from "../components/FlashArt";
import { FlashCard } from "../components/FlashCard";
import { StencilSizer } from "../components/StencilSizer";

export function DesignPage({ design: d }: { design: Design }) {
  const artist = artistById(d.artist)!;
  const related = [
    ...flash.filter((f) => f.id !== d.id && f.artist === d.artist),
    ...flash.filter(
      (f) =>
        f.id !== d.id &&
        f.artist !== d.artist &&
        f.styles.some((s) => d.styles.includes(s)),
    ),
  ].slice(0, 4);

  return (
    <div className="page">
      <div className="wrap">
        <Link to="/flash" className="back-link">
          <ArrowLeft aria-hidden="true" /> Flash book
        </Link>
      </div>

      <section className="wrap design-top">
        <figure className="design-sheet" data-availability={d.availability}>
          <span className="flash-no">No. {d.no}</span>
          <FlashArt
            art={d.id}
            label={`Flash sheet: ${d.name}`}
            strokeWidth={1.3}
          />
          {d.availability === "claimed" && (
            <span className="stamp">Claimed</span>
          )}
          <figcaption>
            Drawn by {artist.name} · {d.styles.join(", ")}
          </figcaption>
        </figure>

        <div className="design-info">
          <h1>{d.name}</h1>
          <p className="lede">{d.blurb}</p>
          <dl className="spec">
            <div>
              <dt>Price</dt>
              <dd>
                {d.availability === "claimed"
                  ? "Claimed"
                  : `from ${money(d.price)} at ${d.minCm} cm`}
              </dd>
            </div>
            <div>
              <dt>Sizes</dt>
              <dd>
                {d.minCm} – {d.maxCm} cm
              </dd>
            </div>
            <div>
              <dt>Sheet</dt>
              <dd>{availabilityLabel[d.availability]}</dd>
            </div>
            <div>
              <dt>Artist</dt>
              <dd>
                <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
              </dd>
            </div>
            <div>
              <dt>Sits well on</dt>
              <dd>
                {d.placements.map((p) => placementById(p)?.label).join(", ")}
              </dd>
            </div>
          </dl>
          <ul className="notes">
            {d.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="wrap">
        <StencilSizer design={d} />
      </div>

      <section className="wrap section related">
        <h2>More from the wall</h2>
        <div className="flash-grid">
          {related.map((f) => (
            <FlashCard key={f.id} design={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
