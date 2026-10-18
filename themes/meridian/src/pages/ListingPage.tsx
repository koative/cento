import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Bike,
  Bus,
  Check,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Mail,
  Phone,
  Ship,
} from "lucide-react";
import { Link } from "../router";
import { listings, type Listing } from "../content";
import {
  agentOf,
  areaOf,
  date,
  money,
  monthlyPayment,
  price,
} from "../lib/format";
import { CityMap } from "../components/CityMap";
import { FloorPlan } from "../components/FloorPlan";
import { Facts, ListingCard, SaveButton } from "../components/ListingCard";
import {
  Choices,
  Field,
  TextField,
  validate,
  type Errors,
} from "../components/Field";

const travel = { walk: Footprints, bike: Bike, bus: Bus, ferry: Ship };

export function ListingPage({ listing: l }: { listing: Listing }) {
  const area = areaOf(l.area);
  const similar = listings
    .filter((x) => x.id !== l.id && x.mode === l.mode)
    .sort(
      (a, b) =>
        Number(b.area === l.area) - Number(a.area === l.area) ||
        Math.abs(a.price - l.price) - Math.abs(b.price - l.price),
    )
    .slice(0, 3);

  const particulars: [string, string][] = [
    ["Type", l.type],
    ["Built", String(l.built)],
    ["Interior", `${l.sqft.toLocaleString("en-US")} sq ft`],
    ...(l.lot ? [["Plot", l.lot] as [string, string]] : []),
    ...(l.mode === "buy"
      ? [
          ["Price per sq ft", money(Math.round(l.price / l.sqft))] as [
            string,
            string,
          ],
        ]
      : []),
    ...(l.taxYear
      ? [["Property tax", `${money(l.taxYear)} / year`] as [string, string]]
      : []),
    ...(l.fees
      ? [
          [l.mode === "rent" ? "Deposit" : "Building fees", l.fees] as [
            string,
            string,
          ],
        ]
      : []),
    ["Listed", date(l.listed)],
  ];

  return (
    <article className="listing">
      <div className="wrap crumbs">
        <Link to="/homes" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> Back to search
        </Link>
        <span aria-hidden="true">/</span>
        <Link to={"/neighborhoods/" + area.slug} className="text-link">
          {area.name}
        </Link>
      </div>

      <Gallery listing={l} />

      <header className="wrap listing-head">
        <div>
          {l.status && <span className="tag">{l.status}</span>}
          <h1>{l.address}</h1>
          <p className="listing-area">
            {area.name}, Port Ellery ·{" "}
            {l.mode === "buy" ? "For sale" : "To rent"}
          </p>
        </div>
        <div className="listing-price">
          <p className="num">{price(l)}</p>
          <Facts listing={l} />
          <SaveButton listing={l} label />
        </div>
      </header>

      <div className="wrap listing-body">
        <div className="listing-main">
          <p className="listing-lede">{l.headline}</p>
          {l.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          <h2>Particulars</h2>
          <dl className="particulars num">
            {particulars.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="features">
            {l.features.map((f) => (
              <li key={f}>
                <Check size={16} aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>

          <h2>Floor plan</h2>
          <p className="muted">
            Main floor. Measurements are taken by our surveyor and are
            approximate; hover or focus a room to find it on the plan.
          </p>
          <FloorPlan rooms={l.plan} title={l.address} />

          <h2>Location</h2>
          <div className="location">
            <CityMap
              label={`Map showing ${l.address} in ${area.name}`}
              listings={[l]}
              activeArea={l.area}
              highlight={l.id}
            />
            <ul className="nearby">
              {l.nearby.map((n) => {
                const Icon = travel[n.by];
                return (
                  <li key={n.place}>
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    <span>{n.place}</span>
                    <span className="num">
                      {n.minutes} min {n.by === "walk" ? "walk" : "by " + n.by}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {l.mode === "buy" ? <Mortgage listing={l} /> : <MoveIn listing={l} />}
        </div>

        <aside className="listing-aside" aria-label="Arrange a viewing">
          <Viewing listing={l} />
        </aside>
      </div>

      <section className="wrap section">
        <div className="section-head">
          <h2>
            {l.mode === "buy"
              ? "Similar homes for sale"
              : "Other homes to rent"}
          </h2>
        </div>
        <div className="card-grid card-grid-3">
          {similar.map((x) => (
            <ListingCard key={x.id} listing={x} />
          ))}
        </div>
      </section>
    </article>
  );
}

function Gallery({ listing }: { listing: Listing }) {
  const [i, setI] = useState(0);
  const n = listing.images.length;
  const img = listing.images[i];
  return (
    <section
      className="wrap gallery"
      aria-label="Photographs"
      aria-roledescription="carousel"
    >
      <div className="gallery-main">
        <img key={img.src} src={img.src} alt={img.alt} />
        <div className="gallery-nav">
          <button
            type="button"
            className="icon-btn"
            aria-label="Previous photo"
            onClick={() => setI((i - 1 + n) % n)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span className="num" aria-live="polite">
            {i + 1} / {n}
          </span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Next photo"
            onClick={() => setI((i + 1) % n)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="gallery-thumbs">
        {listing.images.map((im, k) => (
          <button
            key={im.src}
            type="button"
            aria-pressed={k === i}
            aria-label={`Show photo ${k + 1}: ${im.alt}`}
            onClick={() => setI(k)}
          >
            <img src={im.src} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}

function Mortgage({ listing }: { listing: Listing }) {
  const [deposit, setDeposit] = useState(20);
  const [rate, setRate] = useState(6.25);
  const [years, setYears] = useState(30);
  const loan = listing.price * (1 - deposit / 100);
  const validRate = rate > 0 && rate <= 15;
  const repay = validRate ? monthlyPayment(loan, rate, years) : 0;
  const tax = (listing.taxYear ?? 0) / 12;

  return (
    <section className="calc" aria-labelledby="calc-title">
      <h2 id="calc-title">What it could cost each month</h2>
      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="field">
            <label htmlFor="c-dep">
              Down payment{" "}
              <span className="num">
                {deposit}% · {money(listing.price * (deposit / 100))}
              </span>
            </label>
            <input
              id="c-dep"
              type="range"
              min={5}
              max={50}
              step={1}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="c-rate">Interest rate (%)</label>
            <input
              id="c-rate"
              type="number"
              min={0.1}
              max={15}
              step={0.05}
              value={rate || ""}
              aria-invalid={!validRate || undefined}
              aria-describedby={validRate ? undefined : "c-rate-error"}
              onChange={(e) => setRate(Number(e.target.value))}
            />
            {!validRate && (
              <p className="field-error" id="c-rate-error">
                Enter a rate between 0.1% and 15%.
              </p>
            )}
          </div>
          <Choices
            legend="Term"
            name="term"
            value={String(years)}
            onChange={(v) => setYears(Number(v))}
            options={[15, 20, 30].map((y) => ({
              value: String(y),
              label: `${y} years`,
            }))}
          />
        </div>
        <output
          className="calc-out num"
          aria-live="polite"
          htmlFor="c-dep c-rate"
        >
          <span className="calc-total">
            {validRate ? money(Math.round(repay + tax)) : "—"}
          </span>
          <span className="muted">per month</span>
          <dl>
            <div>
              <dt>Loan</dt>
              <dd>{money(loan)}</dd>
            </div>
            <div>
              <dt>Principal & interest</dt>
              <dd>{validRate ? money(Math.round(repay)) : "—"}</dd>
            </div>
            <div>
              <dt>Property tax</dt>
              <dd>{money(Math.round(tax))}</dd>
            </div>
          </dl>
        </output>
      </div>
      <p className="fine">
        An illustration, not a mortgage offer. Insurance and building fees are
        not included.
      </p>
    </section>
  );
}

function MoveIn({ listing }: { listing: Listing }) {
  const rows: [string, number][] = [
    ["First month's rent", listing.price],
    ["Security deposit, returned at the end", listing.price],
    ["Referencing & inventory", 0],
  ];
  return (
    <section className="calc" aria-labelledby="calc-title">
      <h2 id="calc-title">Due when you move in</h2>
      <div className="calc-grid">
        <dl className="calc-rows num">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v ? money(v) : "No fee"}</dd>
            </div>
          ))}
        </dl>
        <div className="calc-out num">
          <span className="calc-total">
            {money(rows.reduce((s, [, v]) => s + v, 0))}
          </span>
          <span className="muted">in total, before you get the keys</span>
          <p className="fine">
            Applicants usually earn about {money(listing.price * 36)} a year,
            three times the annual rent.
          </p>
        </div>
      </div>
    </section>
  );
}

function nextDays() {
  const out: { value: string; label: string; note: string }[] = [];
  const d = new Date();
  while (out.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    out.push({
      value: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      note: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  return out;
}

function Viewing({ listing }: { listing: Listing }) {
  const agent = agentOf(listing.agent);
  const [days] = useState(nextDays);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [summary, setSummary] = useState({ day: "", time: "", name: "" });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      day: { missing: "Choose a day for the viewing." },
      time: { missing: "Choose a time of day." },
      "v-name": {
        missing: "Enter your name so the agent knows who to expect.",
      },
      "v-email": {
        missing: "Enter your email for the confirmation.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
      "v-phone": {
        missing: "",
        invalid: "Use digits, spaces and an optional +, at least 7 digits.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    const day = days.find((d) => d.value === data.get("day"));
    setSummary({
      day: `${day?.label} ${day?.note}`,
      time: String(data.get("time")),
      name: String(data.get("v-name")).split(" ")[0],
    });
    setState("sending");
    window.setTimeout(() => setState("done"), 900);
  }

  return (
    <div className="viewing">
      <div className="agent-mini">
        <img src={agent.photo} alt="" />
        <div>
          <p className="agent-mini-name">
            <Link to={"/agents/" + agent.id}>{agent.name}</Link>
          </p>
          <p className="muted">{agent.role}</p>
          <p className="agent-mini-contact">
            <a href={agent.phoneHref}>
              <Phone size={14} aria-hidden="true" /> {agent.phone}
            </a>
            <a href={"mailto:" + agent.email}>
              <Mail size={14} aria-hidden="true" /> Email
            </a>
          </p>
        </div>
      </div>

      <div aria-live="polite">
        {state === "done" ? (
          <div className="success-panel">
            <Check size={22} aria-hidden="true" />
            <h2>Viewing requested</h2>
            <p>
              Thanks, {summary.name}. {agent.name.split(" ")[0]} will confirm a{" "}
              {summary.time.toLowerCase()} slot on {summary.day} at{" "}
              {listing.address} by email within two working hours.
            </p>
            <button
              type="button"
              className="text-btn"
              onClick={() => setState("idle")}
            >
              Request another time
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="viewing-form">
            <h2>Book a viewing</h2>
            <Choices
              legend="Day"
              name="day"
              required
              options={days}
              error={errors.day}
            />
            <Choices
              legend="Time"
              name="time"
              required
              error={errors.time}
              options={[
                { value: "Morning", label: "Morning", note: "9–12" },
                { value: "Afternoon", label: "Afternoon", note: "12–4" },
                { value: "Evening", label: "Evening", note: "4–7" },
              ]}
            />
            <Field
              label="Full name"
              name="v-name"
              autoComplete="name"
              required
              error={errors["v-name"]}
            />
            <Field
              label="Email"
              name="v-email"
              type="email"
              autoComplete="email"
              required
              error={errors["v-email"]}
            />
            <Field
              label="Phone (optional)"
              name="v-phone"
              type="tel"
              autoComplete="tel"
              pattern={"\\+?[0-9 \\-\\(\\)]{7,}"}
              error={errors["v-phone"]}
            />
            <TextField
              label="Anything we should know? (optional)"
              name="v-note"
              rows={3}
              placeholder="e.g. we have a home to sell, or need step-free access"
            />
            <button
              className="btn btn-accent btn-block"
              type="submit"
              disabled={state === "sending"}
            >
              {state === "sending" ? "Sending request…" : "Request viewing"}
            </button>
            <p className="fine">
              Demo form: nothing is sent and no viewing is booked.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
