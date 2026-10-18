import { useState } from "react";
import { Link } from "../router";
import {
  brand,
  coasts,
  guidePage,
  placeKinds,
  places,
  type PlaceKind,
} from "../content";
import { IslandMap } from "../components/IslandMap";

export function Guide() {
  const [kind, setKind] = useState<PlaceKind | "all">("all");
  const [active, setActive] = useState<string>();
  const shown = places.filter((p) => kind === "all" || p.kind === kind);

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{guidePage.title}</h1>
        <p className="lede">{guidePage.lede}</p>
      </header>

      <div className="wrap guide-top">
        <fieldset className="chips">
          <legend>Show</legend>
          {(["all", ...placeKinds] as (PlaceKind | "all")[]).map((k) => (
            <label key={k} className="chip">
              <input
                type="radio"
                name="kind"
                checked={kind === k}
                onChange={() => setKind(k)}
              />
              <span>{k === "all" ? "Everything" : k}</span>
            </label>
          ))}
        </fieldset>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "place" : "places"}
        </p>
        <IslandMap
          label={`Map of ${brand.island} with the places in the guide`}
          active={active}
          onActive={setActive}
          pins={shown.map((p) => ({
            id: p.slug,
            to: `/guide/${p.slug}`,
            label: p.name,
            detail: p.kind,
            kind: "place" as const,
            ...p.map,
          }))}
        />
      </div>

      <ol className="wrap guide-list">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className="guide-entry"
            data-on={active === p.slug ? "" : undefined}
            onPointerEnter={() => setActive(p.slug)}
            onPointerLeave={() => setActive(undefined)}
          >
            <img
              src={p.image}
              alt={p.alt}
              loading={i < 2 ? "eager" : "lazy"}
              width={1280}
              height={854}
            />
            <div>
              <h2>
                <Link to={`/guide/${p.slug}`}>{p.name}</Link>
              </h2>
              <p className="guide-meta">
                {p.kind} · {coasts[p.coast].label}
              </p>
              <p>{p.lede}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
