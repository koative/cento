import { useState } from "react";
import { Link } from "../router";
import { models, type Model } from "../content";
import { Elevation } from "../components/Elevation";
import { longestRange, paintHex } from "../lib/build";
import { money, winterRange } from "../lib/calc";

const sorts = {
  price: { label: "Price, low to high", by: (m: Model) => m.trims[0].price },
  range: {
    label: "Winter range, longest first",
    by: (m: Model) => -winterRange(longestRange(m)),
  },
  size: { label: "Length, shortest first", by: (m: Model) => m.profile.length },
  seats: {
    label: "Seats, most first",
    by: (m: Model) => -parseInt(m.seats.split(" ").pop() ?? "0"),
  },
};
type Sort = keyof typeof sorts;

const budgets = [
  { id: "any", label: "Any price", max: Infinity },
  { id: "40", label: "Under $40,000", max: 40000 },
  { id: "55", label: "Under $55,000", max: 55000 },
  { id: "70", label: "Under $70,000", max: 70000 },
];

export function Models() {
  const [budget, setBudget] = useState("any");
  const [seven, setSeven] = useState(false);
  const [awd, setAwd] = useState(false);
  const [tow, setTow] = useState(false);
  const [sort, setSort] = useState<Sort>("price");

  const max = budgets.find((b) => b.id === budget)?.max ?? Infinity;
  const shown = models
    .filter((m) => m.trims[0].price < max)
    .filter((m) => !seven || m.seats.includes("7"))
    .filter((m) => !awd || m.trims.some((t) => t.drive === "AWD"))
    .filter((m) => !tow || m.towing)
    .sort((a, b) => sorts[sort].by(a) - sorts[sort].by(b));

  const reset = () => {
    setBudget("any");
    setSeven(false);
    setAwd(false);
    setTow(false);
  };

  return (
    <>
      <header className="page-head sheet">
        <div className="wrap">
          <h1>Models</h1>
          <p className="lede">
            Six cars on one platform, all built at Plant One. Every price is the
            price; every range comes with its winter figure.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <form
            className="filters"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Filter models"
          >
            <label className="select">
              <span>Starting price</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {budgets.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={seven}
                onChange={(e) => setSeven(e.target.checked)}
              />
              Seven seats
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={awd}
                onChange={(e) => setAwd(e.target.checked)}
              />
              All-wheel drive available
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={tow}
                onChange={(e) => setTow(e.target.checked)}
              />
              Can tow
            </label>
            <label className="select sort">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {(Object.keys(sorts) as Sort[]).map((k) => (
                  <option key={k} value={k}>
                    {sorts[k].label}
                  </option>
                ))}
              </select>
            </label>
          </form>
          <p className="count" aria-live="polite">
            {shown.length === models.length
              ? `All ${models.length} models`
              : `${shown.length} of ${models.length} models`}
          </p>

          {shown.length === 0 ? (
            <div className="empty">
              <p>
                No Vector matches every filter. The closest is usually Field —
                seven seats, AWD, 5,000 lb towing.
              </p>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="model-rows">
              {shown.map((m) => {
                const t = longestRange(m);
                return (
                  <li key={m.slug} className="model-row">
                    <Link
                      to={`/models/${m.slug}`}
                      className="model-row-art"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Elevation
                        profile={m.profile}
                        paint={paintHex(m.color)}
                        label=""
                      />
                    </Link>
                    <div className="model-row-text">
                      <h2>
                        <Link to={`/models/${m.slug}`}>{m.name}</Link>{" "}
                        <span>{m.body}</span>
                      </h2>
                      <p>{m.line}</p>
                      <dl className="facts">
                        <div>
                          <dt>From</dt>
                          <dd className="num">{money(m.trims[0].price)}</dd>
                        </div>
                        <div>
                          <dt>Range</dt>
                          <dd className="num">up to {t.range} mi</dd>
                        </div>
                        <div>
                          <dt>At 20 °F, 70 mph</dt>
                          <dd className="num">{winterRange(t)} mi</dd>
                        </div>
                        <div>
                          <dt>Seats</dt>
                          <dd className="num">{m.seats}</dd>
                        </div>
                      </dl>
                      <div className="actions">
                        <Link
                          to={`/models/${m.slug}`}
                          className="btn btn-ghost"
                        >
                          View {m.name}
                        </Link>
                        <Link to={`/configure/${m.slug}`} className="text-link">
                          Configure
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
