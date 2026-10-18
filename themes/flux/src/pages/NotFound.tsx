import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <svg viewBox="0 0 120 160" width="120" height="160" aria-hidden="true">
        <path
          d="M60 20v60"
          stroke="var(--plum)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M60 92v40"
          stroke="var(--line-strong)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />
        <circle cx="60" cy="16" r="9" fill="var(--plum)" />
        <circle
          cx="60"
          cy="144"
          r="9"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="3"
        />
      </svg>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.text}</p>
      <div className="actions">
        <Link to="/" className="btn btn-plum">
          Home
        </Link>
        <Link to="/templates" className="btn btn-line">
          Templates
        </Link>
        <Link to="/app" className="btn btn-line">
          Demo workspace
        </Link>
      </div>
    </section>
  );
}
