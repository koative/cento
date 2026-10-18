import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { usePlan } from "../lib/plan";

export function Logo() {
  return (
    <>
      <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M6 23c4-9 13-13 19-13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="2.4 2.6"
          strokeLinecap="round"
        />
        <circle cx="6" cy="23" r="2.6" fill="currentColor" />
        <circle cx="25" cy="10" r="3.2" className="logo-dot" />
      </svg>
      <span>{brand.name}</span>
    </>
  );
}

export function Header() {
  const path = useRoute();
  const stops = usePlan().stops.length;
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

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
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Logo />
        </Link>
        <div
          id="site-nav"
          ref={panel}
          className="nav-panel"
          data-open={open ? "" : undefined}
        >
          <nav aria-label="Primary">
            <ul>
              {nav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>
                    {l.label}
                    {l.to === "/planner" && stops > 0 && (
                      <span className="route-count">{stops}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="nav-contact">
            <a href={brand.phoneHref}>{brand.phone}</a>
            <span>Mon–Fri 9–6, Sat 10–2 ET</span>
          </p>
        </div>
        <div className="header-actions">
          <Link to="/enquire" className="btn btn-accent header-cta">
            Enquire
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
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {stops
          ? `Your route has ${stops} ${stops === 1 ? "stop" : "stops"}.`
          : ""}
      </p>
    </header>
  );
}
