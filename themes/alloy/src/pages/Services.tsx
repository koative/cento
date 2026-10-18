import { useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { projects, routes, services } from "../content";

const jump = (
  id: string,
  smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches,
) =>
  document.getElementById(`svc-${id}`)?.scrollIntoView({
    behavior: smooth ? "smooth" : "instant",
    block: "start",
  });

export function Services() {
  // Links like #/services?s=civils land on that service once the page has scrolled to the top.
  useEffect(() => {
    const id = new URLSearchParams(window.location.hash.split("?")[1]).get("s");
    if (!id) return;
    const t = setTimeout(() => jump(id, false), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <header className="page-head wrap">
        <h1>Services</h1>
        <p className="lede">
          Six services, one company. We self-perform the concrete, formwork and
          groundworks that decide whether a programme holds, and manage
          everything else open-book.
        </p>
      </header>

      <div className="wrap services-layout">
        <nav className="services-index" aria-label="Services on this page">
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => jump(s.id)}>
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
          <Link to="/tender" className="btn btn-signal">
            Ask for a budget estimate
          </Link>
        </nav>

        <div className="services-body">
          {services.map((s) => (
            <section
              key={s.id}
              id={`svc-${s.id}`}
              className="service"
              aria-labelledby={`svc-${s.id}-h`}
            >
              <div className="service-top">
                <h2 id={`svc-${s.id}-h`}>{s.name}</h2>
                <p className="service-value num">{s.value}</p>
              </div>
              <p className="service-body">{s.body}</p>
              {s.image && (
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  width={s.image.w}
                  height={s.image.h}
                  loading="lazy"
                  className="service-img"
                />
              )}
              <h3>What it covers</h3>
              <ul className="ticks">
                {s.includes.map((i) => (
                  <li key={i}>
                    <Check aria-hidden="true" size={18} />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="service-proof">
                <span>Recent examples:</span>
                {s.projects.map((slug) => {
                  const p = projects.find((x) => x.slug === slug)!;
                  return (
                    <Link key={slug} to={`/projects/${slug}`}>
                      {p.name}
                    </Link>
                  );
                })}
              </p>
            </section>
          ))}
        </div>
      </div>

      <section className="section wrap">
        <div className="row-head">
          <div>
            <h2>{routes.title}</h2>
            <p>{routes.intro}</p>
          </div>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Delivery routes compared"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Route</th>
                <th scope="col">Best when</th>
                <th scope="col">Price risk</th>
                <th scope="col">Our role</th>
              </tr>
            </thead>
            <tbody>
              {routes.rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>{r.when}</td>
                  <td>{r.risk}</td>
                  <td>{r.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="close-panel">
        <div className="wrap close-grid">
          <div>
            <h2>Not sure which route fits?</h2>
            <p>
              Send us the drawings you have. A pre-construction lead will
              recommend a route and explain the trade-offs on a call.
            </p>
          </div>
          <div className="close-actions">
            <Link to="/tender" className="btn btn-ink">
              Talk to pre-construction{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
