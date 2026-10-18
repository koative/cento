import { useEffect, useRef, useState } from "react";
import { ListMusic, Menu as MenuIcon, X } from "lucide-react";
import { brand, episodes, nav } from "../content";
import { Link, useRoute } from "../router";
import { usePlayer } from "../lib/player";

export function Wordmark() {
  return (
    <span className="wordmark">
      chapter<span className="wordmark-dot">.</span>
    </span>
  );
}

export function Header() {
  const path = useRoute();
  const count = usePlayer().queue.length;
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const listLabel = `${count} ${count === 1 ? "episode" : "episodes"} on your listening list`;

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
          <Link
            to={`/episodes/${episodes[0].id}`}
            className="btn btn-ink nav-cta"
          >
            Hear the newest episode
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            to="/listening-list"
            className="list-link"
            aria-label={`Listening list: ${listLabel}`}
          >
            <ListMusic aria-hidden="true" />
            <span className="list-count" data-empty={count ? undefined : ""}>
              {count}
            </span>
          </Link>
          <Link
            to={`/episodes/${episodes[0].id}`}
            className="btn btn-ink header-cta"
          >
            Listen now
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
        {count ? listLabel : ""}
      </p>
    </header>
  );
}
