import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, jobs, nav } from "../content";
import { useShortlist } from "../lib/shortlist";
import { Wordmark } from "./Marks";

const today = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date());

export function Header() {
  const path = useRoute();
  const count = useShortlist().ids.length;
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap dateline">
        <span>{today}</span>
        <span>
          Today’s column: {jobs.length} listings, every one with a salary
        </span>
      </div>
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Wordmark />
        </Link>

        <nav
          id="site-nav"
          ref={panel}
          className="site-nav"
          data-open={open ? "" : undefined}
          aria-label="Primary"
        >
          <ul>
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link to="/post" className="btn btn-pen nav-cta">
            Post a job
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            to="/shortlist"
            className="shortlist-link"
            aria-label={`Your shortlist: ${count} ${count === 1 ? "job" : "jobs"}`}
          >
            <span>Shortlist</span>
            <span
              key={count}
              className="shortlist-count"
              data-empty={count ? undefined : ""}
            >
              {count}
            </span>
          </Link>
          <Link to="/post" className="btn btn-pen header-cta">
            Post a job
          </Link>
          <button
            ref={button}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {count
          ? `${count} ${count === 1 ? "job" : "jobs"} on your shortlist`
          : ""}
      </p>
    </header>
  );
}
