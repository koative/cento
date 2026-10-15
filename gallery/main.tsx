import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Search,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Copy,
  SlidersHorizontal,
} from "lucide-react";
import { catalog, type Template } from "./catalog";
import "./styles.css";
const base = import.meta.env.BASE_URL;
const repo = "https://github.com/koative/templates";
const demo = (slug: string) => `${base}themes/${slug}/`;
function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Template | null>(null);
  const [device, setDevice] = useState("desktop");
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = catalog.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      `${t.name} ${t.sector} ${t.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  const preview = (t: Template) => {
    setDevice("desktop");
    setLoaded(false);
    setSelected(t);
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        "git clone https://github.com/koative/templates.git",
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <a className="skip-link" href="#collection">
        Skip to templates
      </a>
      <header className="masthead">
        <a href={base} className="brand" aria-label="Koative Templates home">
          <span className="brand-symbol" aria-hidden="true">
            k.
          </span>
          koative
          <span className="brand-divider" />
          templates
        </a>
        <nav aria-label="Main navigation">
          <a href="#collection">
            The collection <span>12</span>
          </a>
          <a href="#about">The idea</a>
          <a
            className="github-link"
            href={repo}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="opening" aria-labelledby="title">
          <div className="opening-copy">
            <h1 id="title">
              A different
              <br />
              starting <span>point.</span>
              <svg
                viewBox="0 0 100 100"
                className="asterisk"
                aria-hidden="true"
              >
                <path
                  d="M50 0v100M0 50h100M15 15l70 70M15 85l70-70"
                  stroke="currentColor"
                  strokeWidth="13"
                />
              </svg>
            </h1>
            <div className="opening-bottom">
              <p>
                Twelve independent design worlds.
                <br />
                Built to be explored. Made to be yours.
              </p>
              <a
                href="#collection"
                className="round-link"
                aria-label="Explore the collection"
              >
                <ArrowRight size={28} />
              </a>
            </div>
          </div>
          <div className="specimen-stack">
            <div className="stack-note">
              Good things start with a little curiosity.
            </div>
            <button
              className="specimen specimen-back"
              onClick={() => preview(catalog[3])}
              aria-label="Preview Pulse festival template"
            >
              <img
                src={`${base}previews/pulse.webp`}
                alt="Pulse festival website preview"
              />
              <span>
                PULSE — MUSIC & EVENTS <ArrowUpRight size={17} />
              </span>
            </button>
            <button
              className="specimen specimen-front"
              onClick={() => preview(catalog[0])}
              aria-label="Preview Forma architecture template"
            >
              <img
                src={`${base}previews/forma.webp`}
                alt="Forma architecture website preview"
              />
              <span>
                FORMA — ARCHITECTURE <ArrowUpRight size={17} />
              </span>
            </button>
            <div className="stack-caption">
              <span className="live-dot" /> Open source. Open possibilities.
            </div>
          </div>
        </section>
        <div className="collection-ribbon" aria-label="Collection features">
          <span>Distinct by design</span>
          <span>React + Vite</span>
          <span>Responsive by nature</span>
          <span>
            Free to make your own <ArrowUpRight size={16} />
          </span>
        </div>
        <section
          className="collection"
          id="collection"
          aria-labelledby="collection-title"
        >
          <div className="collection-heading">
            <h2 id="collection-title">
              Find your next
              <br />
              <em>what if.</em>
            </h2>
            <p>
              Different industries. Different personalities.
              <br />
              Zero copy-and-paste identities.
            </p>
          </div>
          <div className="collection-tools">
            <div className="filters" aria-label="Filter templates">
              {[
                "All",
                "Studio",
                "Commerce",
                "Lifestyle",
                "Technology",
                "Culture",
              ].map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  {c === "All" && <span>12</span>}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={18} />
              <span className="sr-only">Search templates</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a template"
                type="search"
              />
            </label>
          </div>
          <div className="results-line" aria-live="polite">
            <span>
              {String(shown.length).padStart(2, "0")} templates to explore
            </span>
            <span>
              <SlidersHorizontal size={13} /> Twelve perspectives. One
              collection.
            </span>
          </div>
          <div className="template-grid">
            {shown.map((t) => (
              <article key={t.slug} className="template-entry">
                <button
                  className="template-visual"
                  style={{ background: t.color, color: t.ink }}
                  onClick={() => preview(t)}
                  aria-label={`Preview ${t.name}`}
                >
                  <div className="browser-chrome">
                    <span />
                    <span />
                    <span />
                    <small>{t.name.toLowerCase()}.design</small>
                    <ArrowUpRight size={14} />
                  </div>
                  <img
                    loading="lazy"
                    src={`${base}previews/${t.slug}.webp`}
                    alt={`${t.name} ${t.sector.toLowerCase()} website screenshot`}
                  />
                  <span className="preview-label">
                    Explore {t.name}
                    <ArrowUpRight size={17} />
                  </span>
                </button>
                <div className="entry-meta">
                  <div>
                    <p className="entry-sector">{t.sector}</p>
                    <h3>
                      <button onClick={() => preview(t)}>
                        {t.name}
                        <ArrowUpRight size={24} />
                      </button>
                    </h3>
                  </div>
                  <div className="entry-tags">
                    {t.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="entry-description">{t.description}</p>
                <div className="entry-links">
                  <a href={demo(t.slug)} target="_blank" rel="noreferrer">
                    Live demo <ArrowUpRight size={15} />
                  </a>
                  <a
                    href={`${repo}/tree/main/themes/${t.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get the code <Github size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No match, yet.</h3>
              <p>Try a name, an industry, or a different category.</p>
              <button
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Show all templates <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>
        <section className="about" id="about">
          <div>
            <h2>
              Not another
              <br />
              blank canvas.
            </h2>
            <p>
              A starting point should give you a point of view.
              <br />
              Then get out of your way.
            </p>
          </div>
          <div className="about-details">
            <p>
              Every template lives in its own folder, with its own design
              language and working interactions. Keep what you love. Change what
              you don't. Build something we haven't imagined.
            </p>
            <dl>
              <div>
                <dt>The foundation</dt>
                <dd>React · TypeScript · Vite · Bun</dd>
              </div>
              <div>
                <dt>The approach</dt>
                <dd>Independent folders. No UI kit lock-in.</dd>
              </div>
              <div>
                <dt>The freedom</dt>
                <dd>MIT licensed source code.</dd>
              </div>
            </dl>
            <button className="clone-button" onClick={copy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>
                {copied ? "Clone command copied" : "Copy the clone command"}
              </span>
            </button>
            <a className="readme-link" href={`${repo}#readme`}>
              Read the documentation <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section className="closing">
          <p>
            Take a starting point.
            <br />
            <em>Make it a statement.</em>
          </p>
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="closing-link"
            aria-label="Explore the source on GitHub"
          >
            <ArrowUpRight />
          </a>
        </section>
      </main>
      <footer>
        <a className="footer-brand" href="https://koative.com">
          koative.
        </a>
        <span>Independent ideas, shared openly.</span>
        <a href={repo}>
          Made together. Built to be remixed. <Github size={16} />
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="preview-dialog"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
      >
        {selected && (
          <>
            <div className="preview-toolbar">
              <div className="preview-name">
                <strong>{selected.name}</strong>
                <span>{selected.sector}</span>
              </div>
              <div className="device-controls" aria-label="Preview viewport">
                {[
                  { id: "desktop", Icon: Monitor },
                  { id: "tablet", Icon: Tablet },
                  { id: "mobile", Icon: Smartphone },
                ].map(({ id, Icon }) => (
                  <button
                    key={id}
                    aria-label={`${id} preview`}
                    aria-pressed={device === id}
                    onClick={() => setDevice(id)}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
              <div className="preview-actions">
                <a href={demo(selected.slug)} target="_blank" rel="noreferrer">
                  Open demo <ArrowUpRight size={16} />
                </a>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close preview"
                >
                  <X size={21} />
                </button>
              </div>
            </div>
            <div className={`preview-canvas ${device}`}>
              <span className="preview-loading" role="status">
                {!loaded ? "Opening your next starting point…" : ""}
              </span>
              <iframe
                title={`${selected.name} interactive template preview`}
                src={demo(selected.slug)}
                onLoad={() => setLoaded(true)}
              />
            </div>
            <div className="preview-foot">
              <span>Fictional brand · Interactive front-end demo</span>
              <a
                href={`${repo}/tree/main/themes/${selected.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                Use this template <Github size={15} />
              </a>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
