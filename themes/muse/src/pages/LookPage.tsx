import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { looks, lookPath, products, type Look } from "../content";
import { addLine, money } from "../lib/cart";
import { DayLine } from "../components/DayLine";

const pad = (n: number) => String(n).padStart(2, "0");

export function LookPage({ look }: { look: Look }) {
  const i = looks.indexOf(look);
  const prev = looks[(i - 1 + looks.length) % looks.length];
  const next = looks[(i + 1) % looks.length];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        el.closest("input, select, textarea")
      )
        return;
      if (e.key === "ArrowLeft") navigate(lookPath(prev.n));
      if (e.key === "ArrowRight") navigate(lookPath(next.n));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prev.n, next.n]);

  return (
    <div className="page look-page">
      <div className="look-stage">
        <figure className="look-figure">
          <img
            key={look.n}
            src={look.image}
            alt={look.alt}
            className="look-image"
          />
        </figure>

        <div className="look-panel">
          <h1>
            <span className="look-hour">{look.hour}</span> {look.title}
          </h1>
          <p className="look-count">
            Look {pad(look.n)} of {pad(looks.length)}
          </p>
          <p className="look-note">{look.note}</p>

          <ShopTheLook look={look} key={look.n} />

          <div className="look-nav">
            <Link to={lookPath(prev.n)} className="btn btn-line" rel="prev">
              <ArrowLeft size={16} aria-hidden="true" /> Look {pad(prev.n)}
            </Link>
            <Link to={lookPath(next.n)} className="btn btn-line" rel="next">
              Look {pad(next.n)} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="fine look-keys">
            Use the arrow keys to walk through the day.
          </p>
        </div>
      </div>

      <DayLine current={look.n} />

      <ol className="look-thumbs" aria-label="All looks">
        {looks.map((l) => (
          <li key={l.n}>
            <Link
              to={lookPath(l.n)}
              aria-label={`Look ${pad(l.n)}, ${l.title}`}
            >
              <img src={l.image} alt="" loading="lazy" />
              <span aria-hidden="true">{pad(l.n)}</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="back-link">
        <Link to="/collection">All ten looks on one page</Link>
      </p>
    </div>
  );
}

/** Pick a size for each piece in the look and add the ones you want in one go. */
function ShopTheLook({ look }: { look: Look }) {
  const pieces = look.pieces.map((id) => products.find((p) => p.id === id)!);
  const [chosen, setChosen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pieces.map((p) => [p.id, true])),
  );
  const [sizes, setSizes] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      pieces.map((p) => [p.id, p.sizes.length === 1 ? p.sizes[0] : ""]),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const selected = pieces.filter((p) => chosen[p.id]);
  const total = selected.reduce((s, p) => s + p.price, 0);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const p of selected)
      if (!sizes[p.id])
        next[p.id] = `Choose a size for the ${p.name}, or untick it.`;
    setErrors(next);
    setStatus("");
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`look-size-${first}`)?.focus();
      return;
    }
    for (const p of selected) addLine(p.id, p.colours[0].name, sizes[p.id]);
    setStatus(
      `${selected.length} ${selected.length === 1 ? "piece" : "pieces"} from look ${pad(look.n)} added to your bag.`,
    );
  }

  return (
    <form className="look-shop" onSubmit={submit} noValidate>
      <h2>Pieces in this look</h2>
      <ul>
        {pieces.map((p) => (
          <li key={p.id} data-off={!chosen[p.id] || undefined}>
            <input
              type="checkbox"
              id={`look-pick-${p.id}`}
              checked={chosen[p.id]}
              onChange={(e) =>
                setChosen({ ...chosen, [p.id]: e.target.checked })
              }
              aria-label={`Include the ${p.name}`}
            />
            <img src={p.images[0]} alt="" width={64} height={80} />
            <div className="look-piece">
              <Link to={`/shop/${p.id}`}>{p.name}</Link>
              <span className="fine">
                {p.colours[0].name} ·{" "}
                <span className="price">{money(p.price)}</span>
              </span>
            </div>
            {p.sizes.length > 1 ? (
              <div className="look-size">
                <label
                  htmlFor={`look-size-${p.id}`}
                  className="visually-hidden"
                >
                  Size for the {p.name}
                </label>
                <select
                  id={`look-size-${p.id}`}
                  value={sizes[p.id]}
                  disabled={!chosen[p.id]}
                  aria-invalid={errors[p.id] ? true : undefined}
                  aria-describedby={
                    errors[p.id] ? `look-err-${p.id}` : undefined
                  }
                  onChange={(e) => {
                    setSizes({ ...sizes, [p.id]: e.target.value });
                    setErrors({ ...errors, [p.id]: "" });
                  }}
                >
                  <option value="">Size</option>
                  {p.sizes.map((s) => (
                    <option key={s} value={s} disabled={p.soldOut?.includes(s)}>
                      {s}
                      {p.soldOut?.includes(s) ? " (sold out)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <span className="look-size fine">One size</span>
            )}
            {errors[p.id] && (
              <p className="field-error" id={`look-err-${p.id}`}>
                {errors[p.id]}
              </p>
            )}
          </li>
        ))}
      </ul>
      <button
        type="submit"
        className="btn btn-ink btn-wide"
        disabled={!selected.length}
      >
        {selected.length
          ? `Add ${selected.length} ${selected.length === 1 ? "piece" : "pieces"}, ${money(total)}`
          : "Tick a piece to add it"}
      </button>
      <p className="look-status" aria-live="polite">
        {status && (
          <>
            <Check size={16} aria-hidden="true" /> {status}{" "}
            <Link to="/bag">View bag</Link>
          </>
        )}
      </p>
    </form>
  );
}
