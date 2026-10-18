import { ArrowRight } from "lucide-react";
import { industries } from "../content";
import { Link } from "../router";

export function Industries() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Industries</h1>
        <p className="lede">
          Five industries make up almost everything we ship. Each brings its own
          standards, paperwork and failure modes, and each has a team on the
          floor that knows them.
        </p>
        <div className="jump" role="group" aria-label="Jump to an industry">
          {industries.map((i) => (
            <button
              key={i.id}
              type="button"
              className="chip"
              onClick={() =>
                document.getElementById(`ind-${i.id}`)?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                  block: "start",
                })
              }
            >
              {i.name}
            </button>
          ))}
        </div>
      </header>

      {industries.map((ind, n) => (
        <section
          key={ind.id}
          id={`ind-${ind.id}`}
          className="wrap industry"
          data-flip={n % 2 ? "" : undefined}
          aria-labelledby={`ind-${ind.id}-title`}
        >
          <img
            src={ind.image.src}
            alt={ind.image.alt}
            width={ind.image.w}
            height={ind.image.h}
            loading={n ? "lazy" : undefined}
          />
          <div className="industry-body">
            <h2 id={`ind-${ind.id}-title`}>{ind.name}</h2>
            <p className="lede-sm">{ind.lede}</p>
            <div className="industry-cols">
              <div>
                <h3>Standards we work to</h3>
                <ul>
                  {ind.standards.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Typical parts</h3>
                <ul>
                  {ind.parts.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Common materials</h3>
                <ul className="mono-list">
                  {ind.materials.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="proof">
              <strong>{ind.proof.title}.</strong> {ind.proof.text}
            </p>
          </div>
        </section>
      ))}

      <section className="close wrap" aria-labelledby="ind-close">
        <h2 id="ind-close">Your industry not listed?</h2>
        <p>
          We also make parts for motorsport, scientific instruments and food
          machinery. If the drawing is clear and the material is machinable, we
          will quote it.
        </p>
        <div className="actions">
          <Link to="/rfq" className="btn btn-primary">
            Request a quote <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/quality" className="btn btn-ghost">
            Our certifications
          </Link>
        </div>
      </section>
    </>
  );
}
