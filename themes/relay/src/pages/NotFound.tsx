import { Link, useRoute } from "../router";
import { nav, notFound } from "../content";
import { Barcode } from "../components/Waybill";

export default function NotFound() {
  const path = useRoute();
  return (
    <section className="wrap not-found" data-not-found>
      <div className="nf-label" aria-hidden="true">
        <span className="num">SCAN · {path}</span>
        <span className="num">EXC · NO MATCH ON MANIFEST</span>
        <Barcode value="RLY-0404-0404" />
      </div>
      <h1>{notFound.h1}</h1>
      <p className="lede">{notFound.text}</p>
      <ul className="nf-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {nav.map((n) => (
          <li key={n.to}>
            <Link to={n.to}>{n.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
