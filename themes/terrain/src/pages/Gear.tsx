import { useState } from "react";
import { Link } from "../router";
import {
  brand,
  gear,
  images,
  kits,
  provided,
  trips,
  type GearItem,
  type KitId,
} from "../content";
import { eur, query } from "../lib/trips";
import { useStored } from "../lib/store";

const groups: GearItem["group"][] = [
  "On your feet",
  "Layers",
  "Carrying",
  "Sleeping",
  "Small things",
];

export function Gear() {
  const fromQuery = query().get("kit");
  const [kit, setKit] = useState<KitId>(
    kits.some((k) => k.id === fromQuery) ? (fromQuery as KitId) : "hut",
  );
  const [packed, setPacked] = useStored<Record<KitId, string[]>>(
    "terrain.packed",
    { daypack: [], hut: [], storm: [] },
  );

  const items = gear.filter((g) => g.kits.includes(kit));
  const mine = packed[kit] ?? [];
  const done = items.filter((g) => mine.includes(g.id));
  const kg = (list: GearItem[]) =>
    (list.reduce((s, g) => s + g.grams, 0) / 1000).toFixed(1);
  const current = kits.find((k) => k.id === kit)!;
  const toggle = (id: string) =>
    setPacked((p) => ({
      ...p,
      [kit]: mine.includes(id) ? mine.filter((x) => x !== id) : [...mine, id],
    }));
  return (
    <>
      <header className="page-head wrap">
        <h1>Gear list</h1>
        <p className="lede">
          What to bring, matched to how your trip is walked. Tick things off as
          they go in the pack; this page remembers your list on this device.
        </p>
      </header>

      <div className="wrap gear-page">
        <div className="gear-main">
          <fieldset className="kit-pick">
            <legend>How is your trip walked?</legend>
            {kits.map((k) => (
              <label key={k.id}>
                <input
                  type="radio"
                  name="kit"
                  checked={kit === k.id}
                  onChange={() => setKit(k.id)}
                />
                <span>
                  <strong>{k.name}</strong>
                  <small>{k.pack}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <p className="kit-text">
            {current.text} Trips:{" "}
            {trips
              .filter((t) => t.kit === kit)
              .map((t, i, a) => (
                <span key={t.slug}>
                  <Link to={`/trips/${t.slug}`}>{t.name}</Link>
                  {i < a.length - 1 ? ", " : "."}
                </span>
              ))}
          </p>

          <div className="pack-meter">
            <p aria-live="polite">
              <strong>
                {done.length} of {items.length}
              </strong>{" "}
              packed • {kg(done)} of {kg(items)} kg
            </p>
            <div className="meter" aria-hidden="true">
              <span
                style={{ width: `${(done.length / items.length) * 100}%` }}
              />
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={done.length === 0}
              onClick={() => setPacked((p) => ({ ...p, [kit]: [] }))}
            >
              Unpack all
            </button>
          </div>

          {groups.map((group) => {
            const rows = items.filter((g) => g.group === group);
            return rows.length === 0 ? null : (
              <fieldset key={group} className="pack-group">
                <legend>{group}</legend>
                <ul>
                  {rows.map((g) => (
                    <li key={g.id}>
                      <label className="pack-item">
                        <input
                          type="checkbox"
                          checked={mine.includes(g.id)}
                          onChange={() => toggle(g.id)}
                        />
                        <span className="pack-name">{g.name}</span>
                        <span className="pack-note">{g.note}</span>
                        <span className="pack-meta">
                          {g.grams > 0 && (
                            <span className="num">{g.grams} g</span>
                          )}
                          {g.hire && (
                            <span className="hire">Hire {eur(g.hire)}</span>
                          )}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            );
          })}
        </div>

        <aside className="gear-aside">
          <img
            src={images.camp}
            alt="A yellow tent pitched on a grassy knoll above a sea of cloud and forested ridges"
            loading="lazy"
            width={1600}
            height={1066}
          />
          <h2>What we carry for you</h2>
          <ul className="ticks">
            {provided.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2>Hiring from us</h2>
          <p>
            Items marked “Hire” can be added when you book and are handed over
            at the trip start. Boots we never hire: they need to be your own and
            broken in.
          </p>
          <p>
            Questions about a specific item? Write to{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a> and Mateo in our
            gear store will answer.
          </p>
        </aside>
      </div>
    </>
  );
}
