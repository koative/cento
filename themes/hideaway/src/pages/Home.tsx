import { useState, type CSSProperties, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  brand,
  coasts,
  home,
  months,
  monthSeason,
  places,
  services,
  servicePhotos,
  testimonials,
  villas,
  type Coast,
} from "../content";
import { addDays, today } from "../lib/dates";
import { validate } from "../lib/form";
import { money, setStay, useStay } from "../lib/stay";
import { Field, useErrors } from "../components/Field";
import { IslandMap } from "../components/IslandMap";
import { VillaCard } from "../components/VillaCard";

const featured = ["sa-talaia", "can-estel", "es-moli-blanc", "sa-caseta"].map(
  (s) => villas.find((v) => v.slug === s)!,
);
const guidePicks = ["cala-morella", "cami-de-ronda", "far-de-tramuntana"].map(
  (s) => places.find((p) => p.slug === s)!,
);
const ledger = [
  "provisioning",
  "chef",
  "boat",
  "breakfast",
  "transfer",
  "bikes",
].map((id) => services.find((s) => s.id === id)!);
const maxSea = Math.max(...months.map((m) => m.sea));

function StaySearch() {
  const stay = useStay();
  const { errors, setErrors, onChange } = useErrors();
  const [arrival, setArrival] = useState(stay.arrival);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      arrival: "Choose the day you arrive, from today onwards.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setStay({
      arrival,
      departure: addDays(arrival, Number(data.get("nights"))),
      adults: Number(data.get("guests")),
      children: 0,
    });
    navigate("/villas");
  };

  return (
    <form
      className="stay-search"
      noValidate
      onSubmit={submit}
      onChange={onChange}
      aria-label="Find a free house"
    >
      <Field
        label="Arrive"
        name="arrival"
        type="date"
        required
        min={today()}
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        error={errors.arrival}
      />
      <Field label="Nights" name="nights">
        <select defaultValue="7">
          {[3, 4, 5, 7, 10, 14, 21].map((n) => (
            <option key={n} value={n}>
              {n} nights
            </option>
          ))}
        </select>
      </Field>
      <Field label="Guests" name="guests">
        <select defaultValue={String(stay.adults)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} {i ? "guests" : "guest"}
            </option>
          ))}
        </select>
      </Field>
      <button className="btn btn-primary" type="submit">
        See free houses
      </button>
    </form>
  );
}

export function Home() {
  const [activePin, setActivePin] = useState<string>();
  const hero = home.heroPhoto;

  return (
    <>
      <section className="home-hero wrap">
        <div className="home-hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <StaySearch />
        </div>
        <figure className="home-hero-photo arch">
          <img
            src={hero.src}
            alt={hero.alt}
            width={1800}
            height={1200}
            fetchPriority="high"
          />
          <figcaption>
            <Link to="/villas/sa-talaia" className="plaque plaque-float">
              Sa Talaia
            </Link>
            <span>{hero.caption}</span>
          </figcaption>
        </figure>
      </section>

      <section className="section wrap" aria-labelledby="h-houses">
        <div className="section-head">
          <h2 id="h-houses">The houses</h2>
          <Link to="/villas" className="text-link">
            All eight villas <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="villa-row">
          {featured.map((v) => (
            <VillaCard key={v.slug} villa={v} />
          ))}
        </div>
      </section>

      <section className="section map-band" aria-labelledby="h-map">
        <div className="wrap map-band-grid">
          <div>
            <h2 id="h-map">{home.mapTitle}</h2>
            <p className="measure">{home.mapText}</p>
            <dl className="coast-list">
              {(Object.keys(coasts) as Coast[]).map((c) => (
                <div key={c}>
                  <dt>{coasts[c].label}</dt>
                  <dd>
                    {coasts[c].text}{" "}
                    <span className="coast-houses">
                      {villas
                        .filter((v) => v.coast === c)
                        .map((v) => v.name)
                        .join(", ")}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <IslandMap
            label={`Map of ${brand.island} with the eight houses`}
            active={activePin}
            onActive={setActivePin}
            pins={villas.map((v) => ({
              id: v.slug,
              to: `/villas/${v.slug}`,
              label: v.name,
              detail: `sleeps ${v.sleeps}`,
              ...v.map,
            }))}
          />
        </div>
      </section>

      <section className="section keys wrap" aria-labelledby="h-keys">
        <h2 id="h-keys" className="display-quiet">
          {home.keysTitle}
        </h2>
        <div className="keys-text">
          {home.keysText.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link to="/about" className="text-link">
            Meet the team <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="section wrap concierge-band"
        aria-labelledby="h-concierge"
      >
        <figure className="concierge-band-photo">
          <img
            src={servicePhotos["On the water"].src}
            alt={servicePhotos["On the water"].alt}
            loading="lazy"
            width={1280}
            height={853}
          />
          <figcaption>{servicePhotos["On the water"].caption}</figcaption>
        </figure>
        <div>
          <h2 id="h-concierge">{home.conciergeTitle}</h2>
          <p className="measure">{home.conciergeText}</p>
          <ul className="ledger">
            {ledger.map((s) => (
              <li key={s.id}>
                <span className="ledger-name">{s.name}</span>
                <span className="ledger-dots" aria-hidden="true" />
                <span className="ledger-price">
                  {money(s.price)} <small>{s.unit}</small>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/concierge" className="btn btn-quiet">
            Everything the concierge arranges
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-guide">
        <div className="section-head">
          <div>
            <h2 id="h-guide">{home.guideTitle}</h2>
            <p className="measure">{home.guideText}</p>
          </div>
          <Link to="/guide" className="text-link">
            The whole guide <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="guide-trio">
          {guidePicks.map((p, i) => (
            <article
              key={p.slug}
              className="guide-pick"
              data-lead={i === 0 ? "" : undefined}
            >
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                width={1280}
                height={854}
              />
              <h3>
                <Link to={`/guide/${p.slug}`}>{p.name}</Link>
              </h3>
              <p>{p.lede}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section months-band" aria-labelledby="h-months">
        <div className="wrap">
          <h2 id="h-months">{home.monthsTitle}</h2>
          <p className="measure">{home.monthsText}</p>
          <ol className="months">
            {months.map((m, i) => (
              <li key={m.name} data-season={monthSeason[i]}>
                <span className="month-name">{m.name}</span>
                <span className="month-track" aria-hidden="true">
                  <span
                    className="month-bar"
                    style={{ "--v": m.sea / maxSea } as CSSProperties}
                  />
                </span>
                <span className="month-sea">
                  {m.sea}°<span className="sr-only"> sea</span>
                </span>
                <span className="month-air">
                  <span className="sr-only">air </span>
                  {m.air}°
                </span>
                <span className="month-note">{m.note}</span>
              </li>
            ))}
          </ol>
          <p className="months-key">
            Sea and air temperatures are monthly averages in °C. Bar colour
            shows the price season: winter, shoulder, summer, high summer.
          </p>
        </div>
      </section>

      <section className="section wrap voices" aria-labelledby="h-voices">
        <h2 id="h-voices">{home.voicesTitle}</h2>
        <div className="voices-grid">
          {testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                {t.name}, <span>{t.stay}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="close" aria-labelledby="h-close">
        <img
          src={home.moon.src}
          alt=""
          loading="lazy"
          width={1280}
          height={858}
        />
        <div className="wrap close-inner">
          <h2 id="h-close">{home.closeTitle}</h2>
          <p className="measure">{home.closeText}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-light">
              Check dates and book
            </Link>
            <a className="btn btn-outline-light" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
