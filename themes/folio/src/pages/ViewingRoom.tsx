import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { artists, images, works } from "../content";
import { shortlist } from "../lib/store";
import { SaveButton, WorkCard } from "../components/WorkCard";

const bands = [
  { key: "all", label: "Any price", test: () => true },
  {
    key: "under10",
    label: "Under $10,000",
    test: (p: number | null) => p !== null && p < 10000,
  },
  {
    key: "10to25",
    label: "$10,000 – $25,000",
    test: (p: number | null) => p !== null && p >= 10000 && p <= 25000,
  },
  {
    key: "over25",
    label: "Over $25,000 or on request",
    test: (p: number | null) => p === null || p > 25000,
  },
];

const sorts = {
  featured: "Gallery order",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  size: "Size, small to large",
} as const;

type Sort = keyof typeof sorts;

export function ViewingRoom() {
  const room = works.filter((w) => w.viewingRoom);
  const [artist, setArtist] = useState("all");
  const [band, setBand] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const saved = shortlist.use();

  const test = bands.find((b) => b.key === band)!.test;
  const value = (p: number | null) => p ?? Infinity;
  const shown = room
    .filter((w) => (artist === "all" || w.artist === artist) && test(w.price))
    .sort((a, b) =>
      sort === "price-asc"
        ? value(a.price) - value(b.price)
        : sort === "price-desc"
          ? value(b.price) - value(a.price)
          : sort === "size"
            ? a.w * a.h - b.w * b.h
            : 0,
    );

  const reset = () => {
    setArtist("all");
    setBand("all");
    setSort("featured");
  };

  return (
    <div className="page">
      <header className="page-head vr-head">
        <div>
          <h1 className="display">Viewing room</h1>
          <p className="lede">
            {room.length} works from this season's exhibitions and the coming
            ones, each with its price on the label. Save the ones you want to
            see in person and send a single enquiry; a director replies within
            one working day.
          </p>
        </div>
        <img
          src={images.galleryThree}
          alt="A large numeral three painted on the wall of an empty white gallery"
          width={1276}
          height={1800}
        />
      </header>

      <div className="vr-tools">
        <div className="vr-filters">
          <label className="select">
            <span>Artist</span>
            <select value={artist} onChange={(e) => setArtist(e.target.value)}>
              <option value="all">All artists</option>
              {artists
                .filter((a) => room.some((w) => w.artist === a.slug))
                .map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
            </select>
          </label>
          <label className="select">
            <span>Price</span>
            <select value={band} onChange={(e) => setBand(e.target.value)}>
              {bands.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              {Object.entries(sorts).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="vr-list" aria-live="polite">
          <p>
            <strong>{shown.length}</strong>{" "}
            {shown.length === 1 ? "work" : "works"} shown ·{" "}
            <strong>{saved.length}</strong> saved
          </p>
          {saved.length > 0 && (
            <Link to="/enquire" className="btn btn-small">
              Enquire about {saved.length}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="empty">
          <h2>Nothing at that price by that artist right now</h2>
          <p>
            Try another price range, or ask us: many artists have works in the
            stockroom that are not online.
          </p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Show all works
          </button>
        </div>
      ) : (
        <div className="work-grid work-grid-vr">
          {shown.map((w) => (
            <WorkCard key={w.id} work={w} as="h2">
              <SaveButton work={w} />
            </WorkCard>
          ))}
        </div>
      )}
    </div>
  );
}
