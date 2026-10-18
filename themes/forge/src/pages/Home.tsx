import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  brand,
  capabilities,
  home,
  images,
  industries,
  quality,
} from "../content";
import { Link } from "../router";
import { PartDrawing } from "../components/PartDrawing";
import { defaultDims, type PartSpec } from "../lib/part";

const teaser: PartSpec = {
  family: "flange",
  dims: defaultDims("flange"),
  material: "al7075",
  finish: "anodize3",
  tol: "precision",
  qty: 120,
};

export function Home() {
  const [industry, setIndustry] = useState(industries[0].id);
  const shown = industries.find((i) => i.id === industry)!;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{brand.tagline}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/rfq" className="btn btn-primary">
              Request a quote <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/configurator" className="btn btn-ghost">
              Configure a part
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={images.spindle.src}
            alt={images.spindle.alt}
            width={images.spindle.w}
            height={images.spindle.h}
            fetchPriority="high"
          />
          <figcaption>{home.heroCallout}</figcaption>
        </figure>
        <dl className="title-block">
          {home.titleBlock.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" aria-labelledby="caps-title">
        <div className="section-head">
          <h2 id="caps-title">Seven processes under one roof</h2>
          <p>
            Milling, turning, EDM, finishing, inspection and assembly in one
            building, so a part crosses one loading dock instead of four.
          </p>
        </div>
        <div className="cap-index-head" aria-hidden="true">
          <span>Process</span>
          <span />
          <span>Work envelope</span>
          <span>Holds</span>
        </div>
        <ul className="cap-index">
          {capabilities.map((c) => (
            <li key={c.slug}>
              <Link to={`/capabilities/${c.slug}`}>
                <span className="cap-name">{c.name}</span>
                <span className="cap-short">{c.short}</span>
                <span className="cap-num">{c.envelopeLabel}</span>
                <span className="cap-num">{c.tolerance}</span>
                <ArrowUpRight aria-hidden="true" className="cap-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-paper" aria-labelledby="cfg-title">
        <div className="wrap teaser">
          <div className="teaser-copy">
            <h2 id="cfg-title">Price a part before you draw it</h2>
            <p>
              Pick a flange, bracket or shaft, drag the dimensions and choose
              material, finish and tolerance. The drawing redraws itself, and
              price breaks and lead time update as you go.
            </p>
            <p>
              When it looks right, send it straight to an estimator as an RFQ
              with the spec attached.
            </p>
            <Link to="/configurator" className="btn btn-primary">
              Open the configurator <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <Link
            to="/configurator"
            className="teaser-sheet"
            aria-label="Open the part configurator"
          >
            <PartDrawing spec={teaser} />
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="process-title">
        <div className="section-head">
          <h2 id="process-title">From RFQ to loading dock</h2>
          <p>
            The same five steps for a single prototype and a 5,000-piece
            release. Only the time between them changes.
          </p>
        </div>
        <ol className="timeline">
          {home.process.map((s) => (
            <li key={s.title}>
              <span className="when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section wrap industries-switch"
        aria-labelledby="ind-title"
      >
        <div className="switch-list">
          <h2 id="ind-title">Built for regulated work</h2>
          <p>
            Five industries make up 90% of what we ship. Each comes with its own
            paperwork, and we already keep it.
          </p>
          <ul>
            {industries.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  aria-pressed={industry === i.id}
                  onClick={() => setIndustry(i.id)}
                  onMouseEnter={() => setIndustry(i.id)}
                >
                  <span>{i.name}</span>
                  <span className="switch-meta">{i.standards[0]}</span>
                </button>
              </li>
            ))}
          </ul>
          <Link to="/industries" className="text-link">
            All industries and the parts we make for them{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <figure className="switch-figure" aria-live="polite">
          <img
            key={shown.id}
            src={shown.image.src}
            alt={shown.image.alt}
            width={shown.image.w}
            height={shown.image.h}
            loading="lazy"
          />
          <figcaption>
            <strong>{shown.proof.title}.</strong> {shown.proof.text}
          </figcaption>
        </figure>
      </section>

      <section className="band-dark" aria-labelledby="quality-title">
        <div className="wrap split">
          <img
            src={images.gaugeBlocks.src}
            alt={images.gaugeBlocks.alt}
            width={images.gaugeBlocks.w}
            height={images.gaugeBlocks.h}
            loading="lazy"
            className="split-img"
          />
          <div className="split-copy">
            <h2 id="quality-title">Inspected by someone who did not make it</h2>
            <p>{quality.lede}</p>
            <ul className="cert-list">
              {quality.certs.map((c) => (
                <li key={c.code}>
                  <strong>{c.code}</strong>
                  <span>{c.scope}</span>
                </li>
              ))}
            </ul>
            <Link to="/quality" className="btn btn-light">
              How we inspect <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap case" aria-labelledby="case-title">
        <div className="case-copy">
          <h2 id="case-title">{home.caseStudy.title}</h2>
          {home.caseStudy.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <blockquote>
            <p>“{home.caseStudy.quote}”</p>
            <footer>
              {home.caseStudy.person}, {home.caseStudy.role}
            </footer>
          </blockquote>
        </div>
        <dl className="spec-list">
          {home.caseStudy.figures.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shop" aria-labelledby="shop-title">
        <img
          src={images.shopFloor.src}
          alt={images.shopFloor.alt}
          width={images.shopFloor.w}
          height={images.shopFloor.h}
          loading="lazy"
          className="shop-img"
        />
        <div className="wrap shop-body">
          <div className="section-head">
            <h2 id="shop-title">{home.shop.title}</h2>
            <p>{home.shop.text}</p>
          </div>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Machine list"
          >
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Machine</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Specification</th>
                  <th scope="col">Used for</th>
                </tr>
              </thead>
              <tbody>
                {capabilities.flatMap((c) =>
                  c.machines.map((m) => (
                    <tr key={m.name}>
                      <th scope="row">{m.name}</th>
                      <td className="num">{m.count}</td>
                      <td>{m.spec}</td>
                      <td>
                        <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="close wrap" aria-labelledby="close-title">
        <h2 id="close-title">
          Send a drawing today. Have a priced quote by 17:00 tomorrow.
        </h2>
        <p>
          STEP and PDF preferred; we also read IGES, Parasolid and DXF. Prefer
          to talk first? Call estimating on{" "}
          <a href={brand.phoneHref}>{brand.phone}</a>.
        </p>
        <div className="actions">
          <Link to="/rfq" className="btn btn-primary">
            Start an RFQ <ArrowRight aria-hidden="true" />
          </Link>
          <a className="btn btn-ghost" href={`mailto:${brand.rfqEmail}`}>
            {brand.rfqEmail}
          </a>
        </div>
      </section>
    </>
  );
}
