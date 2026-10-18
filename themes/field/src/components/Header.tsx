import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { fmtDate, teamOf, upcoming } from "../lib/club";
import { Crest } from "./Kit";

const nextHome = upcoming().find(
  (f) => f.home && teamOf(f.team)?.group === "Senior",
);

export function Header() {
  const path = useRoute();
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
      {nextHome && (
        <Link to="/fixtures" className="matchday-strip">
          <span className="wrap">
            <b>Next at {brand.ground}</b>
            <span>
              {teamOf(nextHome.team)?.short} v {nextHome.opp}
            </span>
            <span className="num">
              {fmtDate(nextHome.date)}, {nextHome.ko}
            </span>
          </span>
        </Link>
      )}
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Crest size={34} />
          <span className="logo-word">
            Field United
            <small>
              Est. {brand.founded} · {brand.town}
            </small>
          </span>
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
          <Link to="/join" className="btn btn-primary nav-cta">
            Join the club
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/join" className="btn btn-primary header-cta">
            Join the club
          </Link>
          <button
            ref={button}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
