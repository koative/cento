import { Link } from "../router";
import { imageAlt, images, roadmap } from "../content";
import { PageHead } from "../components/PageHead";

export default function Roadmap() {
  return (
    <>
      <PageHead title={roadmap.heading} lead={roadmap.lead}>
        <p className="revision">{roadmap.revision}</p>
      </PageHead>

      <section className="wrap timeline-wrap" aria-label="Milestones by year">
        <ol className="timeline">
          {roadmap.milestones.map((m) => (
            <li key={m.year} className="milestone" data-state={m.state}>
              <span className="milestone-node" aria-hidden="true" />
              <div className="milestone-year">
                <span>{m.year}</span>
                <span className="milestone-state">{m.state}</span>
              </div>
              <div className="milestone-body">
                <h2>{m.title}</h2>
                <p className="milestone-metric">{m.metric}</p>
                <ul>
                  {m.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <figure className="photo-band wrap">
        <img
          src={images.wafer}
          alt={imageAlt.wafer}
          loading="lazy"
          width={1800}
          height={1200}
        />
        <figcaption>
          <strong>Fig. 1.</strong> Roadmaps are won or lost in fabrication:
          every milestone above began as a patterned wafer under the inspection
          lamp.
        </figcaption>
      </figure>

      <section className="section wrap principles" aria-labelledby="pr-h">
        <h2 id="pr-h">How we keep this page honest</h2>
        <dl>
          {roadmap.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          The data behind every completed milestone is in the{" "}
          <Link to="/research">papers library</Link>.
        </p>
      </section>
    </>
  );
}
