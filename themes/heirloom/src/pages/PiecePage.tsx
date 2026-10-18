import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  chainLengths,
  collections,
  gems,
  metals,
  pieces,
  ringSizes,
  type Metal,
  type Piece,
} from "../content";
import { addLine, maxQty, money } from "../lib/cart";
import { Plate } from "../components/Plate";
import { MetalPicker, Qty } from "../components/Bits";
import { FieldNote, describedBy } from "../components/Field";
import { PieceCard } from "../components/PieceCard";

const NOT_SURE = "Not sure: send a sizing set";

export function PiecePage({ piece }: { piece: Piece }) {
  const collection = collections.find((c) => c.id === piece.collection)!;
  const [metal, setMetal] = useState<Metal>(piece.metals[0]);
  const [size, setSize] = useState(
    piece.sizing === "chain" ? chainLengths[1] : "",
  );
  const [engraving, setEngraving] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");

  const unit = piece.price + metals[metal].surcharge;
  const face = piece.engraving === "face";
  const limit = face ? 3 : 18;
  const related = [
    ...pieces.filter((p) => p.collection === piece.collection && p !== piece),
    ...pieces.filter((p) => p.collection !== piece.collection),
  ].slice(0, 3);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (piece.sizing === "ring" && !size) {
      setError(
        "Choose a ring size, or pick “Not sure” and we will post you a free sizing set.",
      );
      e.currentTarget.querySelector("select")?.focus();
      return;
    }
    setError("");
    const details = [
      piece.sizing === "ring" &&
        (size === NOT_SURE ? "Size to follow (sizing set)" : `US size ${size}`),
      piece.sizing === "chain" && `${size} chain`,
      engraving &&
        (face ? `Initials “${engraving}”` : `Engraved “${engraving}”`),
    ].filter((d): d is string => !!d);
    addLine({
      slug: piece.slug,
      name: piece.name,
      metal,
      art: piece.art,
      details,
      unit,
      qty,
    });
    setAdded(
      `${qty === 1 ? piece.name : `${qty} × ${piece.name}`} in ${metals[metal].name} added to your bag.`,
    );
  }

  return (
    <div className="wrap page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/collections">Collections</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
      </nav>

      <div className="product">
        <div className="product-plate tray lamp">
          <Plate
            art={piece.art}
            metal={metal}
            initials={face ? engraving : undefined}
            title={`Drawing of ${piece.name} in ${metals[metal].name}`}
          />
          <p className="plate-note">
            Drawn at the bench, shown approximately twice life size.
          </p>
        </div>

        <div className="product-info">
          <h1>{piece.name}</h1>
          <p className="lede">{piece.summary}</p>
          <p className="price price-large">{money(unit)}</p>

          <form className="buy" onSubmit={submit} noValidate>
            <MetalPicker
              name="metal"
              options={piece.metals}
              value={metal}
              onChange={(m) => (setMetal(m), setAdded(""))}
            />

            {piece.sizing !== "none" && (
              <div className="field">
                <label htmlFor="f-size">
                  {piece.sizing === "ring" ? "Ring size (US)" : "Chain length"}
                </label>
                <select
                  id="f-size"
                  name="size"
                  value={size}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy(
                    "size",
                    piece.sizing === "ring",
                    error,
                  )}
                  onChange={(e) => (setSize(e.target.value), setError(""))}
                >
                  {piece.sizing === "ring" && (
                    <option value="">Choose a size</option>
                  )}
                  {(piece.sizing === "ring"
                    ? [...ringSizes, NOT_SURE]
                    : chainLengths
                  ).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <FieldNote
                  name="size"
                  hint={
                    piece.sizing === "ring" && (
                      <Link to="/care">Find your size with our chart</Link>
                    )
                  }
                  error={error}
                />
              </div>
            )}

            {piece.engraving && (
              <div className="field">
                <label htmlFor="f-engraving">
                  {face
                    ? "Initials for the face (optional)"
                    : "Inside engraving (optional)"}
                </label>
                <input
                  id="f-engraving"
                  name="engraving"
                  value={engraving}
                  maxLength={limit}
                  autoComplete="off"
                  placeholder={face ? "e.g. MAH" : "e.g. 14 · VI · 2025"}
                  aria-describedby="f-engraving-hint"
                  onChange={(e) =>
                    setEngraving(
                      face
                        ? e.target.value.toUpperCase().replace(/[^A-Z]/g, "")
                        : e.target.value,
                    )
                  }
                />
                <p className="field-hint" id="f-engraving-hint">
                  {engraving.length}/{limit}{" "}
                  {face ? "letters, hand-cut" : "characters, complimentary"}
                </p>
                {!face && (
                  <div
                    className="inscription"
                    data-metal={metal}
                    aria-hidden="true"
                  >
                    <span>{engraving || "Your words, inside the band"}</span>
                  </div>
                )}
              </div>
            )}

            <div className="buy-row">
              <Qty
                value={qty}
                onChange={setQty}
                label={piece.name}
                max={maxQty}
              />
              <button className="btn btn-wide" type="submit">
                Add to bag · {money(unit * qty)}
              </button>
            </div>
            <div aria-live="polite">
              {added && (
                <p className="success">
                  <Check size={18} aria-hidden="true" /> {added}{" "}
                  <Link to="/cart">View bag</Link> or{" "}
                  <Link to="/checkout">check out</Link>.
                </p>
              )}
            </div>
            <p className="field-hint">
              {piece.lead}. Free insured delivery in the US.
            </p>
          </form>
        </div>
      </div>

      <section className="product-story">
        <div>
          <h2>About the piece</h2>
          <p>{piece.story}</p>
          <p>{metals[metal].note}</p>
          {piece.art.gem && <p>{gems[piece.art.gem].note}</p>}
        </div>
        <div>
          <h2>Specifications</h2>
          <dl className="specs">
            <div>
              <dt>Metal</dt>
              <dd>{metals[metal].name}</dd>
            </div>
            {piece.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div>
              <dt>Lead time</dt>
              <dd>{piece.lead}</dd>
            </div>
          </dl>
          <Link to="/appointments" className="text-link">
            See it in person at the atelier{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Worn alongside</h2>
        </div>
        <div className="piece-grid piece-grid-3">
          {related.map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
