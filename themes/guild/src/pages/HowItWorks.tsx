import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "../router";
import {
  faqs,
  findCraft,
  findTalent,
  howItWorks,
  type Talent,
} from "../content";
import { Hallmark, initialsOf } from "../components/Hallmark";
import { Faqs } from "../components/Faqs";

type Track = keyof typeof howItWorks.tracks;
const trackIds = Object.keys(howItWorks.tracks) as Track[];

export function HowItWorks() {
  const [track, setTrack] = useState<Track>("hire");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const chain = ["gustav-brenner", "ines-duarte", "hanna-lindqvist"]
    .map(findTalent)
    .filter((t): t is Talent => !!t);

  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (i + step + trackIds.length) % trackIds.length;
    setTrack(trackIds[next]);
    tabs.current[next]?.focus();
  };

  const current = howItWorks.tracks[track];

  return (
    <>
      <section className="page-head wrap hiw-head">
        <div>
          <h1>{howItWorks.title}</h1>
          <p className="lede">{howItWorks.lede}</p>
        </div>
        <img
          src={howItWorks.image}
          alt={howItWorks.imageAlt}
          width={1600}
          height={1067}
        />
      </section>

      <section className="section wrap" aria-label="Steps">
        <div className="tabs" role="tablist" aria-label="Choose your side">
          {trackIds.map((id, i) => (
            <button
              key={id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${id}`}
              role="tab"
              type="button"
              aria-selected={track === id}
              aria-controls="track-panel"
              tabIndex={track === id ? 0 : -1}
              onClick={() => setTrack(id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {howItWorks.tracks[id].label}
            </button>
          ))}
        </div>
        <div id="track-panel" role="tabpanel" aria-labelledby={`tab-${track}`}>
          <ol className="steps steps-long" key={track}>
            {current.steps.map((s) => (
              <li key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link
            to={track === "hire" ? "/post" : "/signup"}
            className="btn btn-seal"
          >
            {track === "hire" ? "Post a project" : "Start an application"}
          </Link>
        </div>
      </section>

      <section className="band-green" aria-labelledby="vouch-h">
        <div className="wrap vouching">
          <div>
            <h2 id="vouch-h">{howItWorks.vouching.title}</h2>
            <p>{howItWorks.vouching.text}</p>
          </div>
          <ol className="chain" aria-label="An example chain of vouches">
            {chain.map((t, i) => (
              <li key={t.id}>
                <Hallmark
                  initials={initialsOf(t.name)}
                  register={t.register}
                  craft={findCraft(t.craft)?.name ?? ""}
                  size={104}
                />
                <Link to={`/talent/${t.id}`}>{t.name}</Link>
                <span>
                  No. {String(t.register).padStart(4, "0")} · joined {t.since}
                </span>
                {i < chain.length - 1 && (
                  <span className="chain-link">vouched for</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="protect-h">
        <h2 id="protect-h">What protects both sides</h2>
        <dl className="protections">
          {howItWorks.protections.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap faq-section" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions people ask first</h2>
        <Faqs items={faqs} />
      </section>
    </>
  );
}
