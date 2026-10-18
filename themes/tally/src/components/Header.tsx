import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { rulesFor, upcoming, useSavedProfile } from "../lib/deadlines";
import { fmt, inDays } from "../lib/format";
import { TallyMark } from "./Marks";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const profile = useSavedProfile();
  const next = upcoming(rulesFor(profile))[0];

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
      {next && (
        <div className="due-bar">
          <div className="wrap due-row">
            <p>
              <span className="due-label">
                {profile ? "Your next deadline" : "Next deadline"}
              </span>
              <span className="due-what">
                <span className="due-title">{next.rule.title} · </span>
                <time dateTime={next.date.toISOString().slice(0, 10)}>
                  {fmt.short.format(next.date)}
                </time>
              </span>
              <span className="due-days">{inDays(next.days)}</span>
            </p>
            <Link to="/calendar" className="due-link">
              <span className="due-link-long">
                {profile ? "Your tax calendar" : "Build your tax calendar"}
              </span>
              <span className="due-link-short">Calendar</span>
            </Link>
          </div>
        </div>
      )}
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <TallyMark />
          <span>{brand.name}</span>
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
          <div className="nav-foot">
            <Link to="/book" className="btn btn-primary">
              Book a call
            </Link>
            <a href={brand.phoneHref} className="nav-phone">
              {brand.phone}
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/book" className="btn btn-primary header-cta">
            Book a call
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
