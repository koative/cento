import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { nav } from "../content";
import { usePlan } from "../lib/schedule";
import { Logo } from "./Logo";

export function Header() {
  const path = useRoute();
  const picks = usePlan().length;
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
        <Logo />
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
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            to="/timetable"
            className="my-plan"
            aria-label={`My timetable: ${picks} ${picks === 1 ? "set" : "sets"}`}
          >
            My timetable{" "}
            <span className="count" data-empty={picks ? undefined : ""}>
              {picks}
            </span>
          </Link>
          <Link to="/tickets" className="btn btn-acid">
            Tickets
          </Link>
        </div>
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
      <p className="sr-only" aria-live="polite">
        {picks
          ? `${picks} ${picks === 1 ? "set" : "sets"} in your timetable`
          : ""}
      </p>
    </header>
  );
}
