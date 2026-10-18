import { Check } from "lucide-react";
import { features } from "../content";
import { Phone } from "../components/Phone";
import { More, PageHead, StoreButtons } from "../components/Parts";

export default function Features() {
  return (
    <div className="page">
      <PageHead title={features.hero.title} lede={features.hero.lede}>
        <ul className="jump" aria-label="On this page">
          {features.sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </PageHead>

      {features.sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="feature wrap"
          aria-labelledby={`${s.id}-title`}
        >
          <div className="feature-copy">
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <p>{s.text}</p>
            <ul className="ticks">
              {s.points.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="feature-stage">
            <Phone screen={s.screen} label={`Streak app: ${s.title}`} />
          </div>
        </section>
      ))}

      <section className="devices" aria-labelledby="devices-title">
        <div className="wrap">
          <h2 id="devices-title">{features.devices.title}</h2>
          <dl className="device-list">
            {features.devices.items.map((d) => (
              <div key={d.name}>
                <dt>{d.name}</dt>
                <dd>{d.text}</dd>
              </div>
            ))}
          </dl>
          <div className="devices-cta">
            <StoreButtons />
            <More to="/pricing">What's free and what's Plus</More>
          </div>
        </div>
      </section>
    </div>
  );
}
