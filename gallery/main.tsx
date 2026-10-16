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
  Bookmark,
  Shuffle,
} from "lucide-react";
import { catalog, type Template } from "./catalog";
import "./styles.css";
import LiquidArtwork from "./LiquidArtwork";
const base = import.meta.env.BASE_URL;
const repo = "https://github.com/koative/templates";
const demo = (slug: string) => `${base}themes/${slug}/`;
function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M13 8h22v10H23v6h12v10H13V8Z"
        fill="currentColor"
        opacity=".35"
      />
      <path
        d="M8 14h22v10H18v6h12v10H8V14Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function App() {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const data: unknown = JSON.parse(
        localStorage.getItem("elseform-saved") || "[]",
      );
      return Array.isArray(data)
        ? data.filter(
            (slug): slug is string =>
              typeof slug === "string" && catalog.some((t) => t.slug === slug),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [copyFailed, setCopyFailed] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("elseform-saved", JSON.stringify(saved));
    } catch {
      setStorageAvailable(false);
    }
  }, [saved]);
  const toggleSaved = (slug: string) =>
    setSaved((items) =>
      items.includes(slug)
        ? items.filter((item) => item !== slug)
        : [...items, slug],
    );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("collection");
  const [selected, setSelected] = useState<Template | null>(null);
  const [device, setDevice] = useState("desktop");
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = catalog.filter(
    (t) =>
      (!savedOnly || saved.includes(t.slug)) &&
      (category === "All" || t.category === category) &&
      `${t.name} ${t.sector} ${t.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const shown = [...filtered].sort((a, b) =>
    sort === "newest"
      ? Number(b.number) - Number(a.number)
      : sort === "name"
        ? a.name.localeCompare(b.name)
        : Number(a.number) - Number(b.number),
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
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }
  return (
    <>
      <a className="skip-link" href="#collection">
        Skip to templates
      </a>
      <div className="ambient-field" aria-hidden="true" />
      <header className="masthead">
        <a href={base} className="brand" aria-label="Elseform home">
          <BrandMark />
          <span>elseform</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#collection">Collection</a>
          <a href="#about">The idea</a>
        </nav>
        <a className="nav-source" href={repo} target="_blank" rel="noreferrer">
          Get the source <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="opening" aria-labelledby="title">
          <div className="artwork-stage">
            <LiquidArtwork paused={Boolean(selected)} />
          </div>
          <div className="opening-copy">
            <h1 id="title">
              Start with
              <br />
              something <em>else.</em>
            </h1>
            <p>
              {catalog.length} distinct website templates for your next idea.
              <br className="desktop-break" /> Beautifully different. Open
              source. Entirely yours.
            </p>
            <div className="opening-actions">
              <a className="primary-action" href="#collection">
                Explore the collection <ArrowRight size={18} />
              </a>
              <button
                className="discovery-action"
                onClick={() =>
                  preview(catalog[Math.floor(Math.random() * catalog.length)])
                }
              >
                <Shuffle size={17} /> Surprise me
              </button>
            </div>
          </div>
          <button
            className="featured-peek"
            onClick={() => preview(catalog[1])}
            aria-label="Discover Orbit"
          >
            <img src={`${base}previews/orbit.webp`} alt="" />
            <span>
              <strong>Orbit</strong>
              <span>A different perspective.</span>
            </span>
            <ArrowUpRight size={20} />
          </button>
          <div className="opening-foot">
            <span>
              An independent collection by{" "}
              <a href="https://koative.com">Koative</a>
            </span>
            <span>Free to explore. Free to make your own.</span>
          </div>
        </section>
        <section
          className="collection"
          id="collection"
          aria-labelledby="collection-title"
        >
          <div className="collection-heading">
            <div>
              <h2 id="collection-title">
                Find your starting point<span>.</span>
              </h2>
              <p>A hundred different worlds. Follow your curiosity.</p>
            </div>
            <button
              className="saved-toggle"
              aria-label="Saved templates"
              aria-pressed={savedOnly}
              onClick={() => {
                setSavedOnly(!savedOnly);
                setCategory("All");
                setQuery("");
              }}
            >
              <Bookmark size={17} fill={savedOnly ? "currentColor" : "none"} />{" "}
              Saved <span>{saved.length}</span>
            </button>
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
              {shown.length}{" "}
              {savedOnly ? "saved templates" : "templates to explore"}
              {savedOnly && (
                <span className="storage-note">
                  {" "}
                  · {storageAvailable ? "On this device" : "For this visit"}
                </span>
              )}
            </span>
            <label className="sort-control">
              <SlidersHorizontal size={13} />
              <span className="sr-only">Sort templates</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="collection">Collection order</option>
                <option value="newest">Newest first</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
          <div className="template-grid">
            {shown.map((t) => (
              <article id={t.slug} key={t.slug} className="template-entry">
                <div className="specimen-frame">
                  <button
                    className="template-visual"
                    onClick={() => preview(t)}
                    aria-label={`Preview ${t.name}`}
                  >
                    <img
                      loading="lazy"
                      src={`${base}previews/${t.slug}.webp`}
                      alt={`${t.name} ${t.sector.toLowerCase()} website screenshot`}
                    />
                    <span className="preview-label">
                      Preview {t.name}
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                  <button
                    className="save-template"
                    aria-label={`${saved.includes(t.slug) ? "Unsave" : "Save"} ${t.name}`}
                    aria-pressed={saved.includes(t.slug)}
                    onClick={() => toggleSaved(t.slug)}
                  >
                    <Bookmark
                      size={16}
                      fill={saved.includes(t.slug) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="entry-details">
                  <div className="entry-meta">
                    <h3>
                      <button onClick={() => preview(t)}>{t.name}</button>
                    </h3>
                    <p className="entry-sector">{t.sector}</p>
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
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>
                {savedOnly && !query
                  ? "Your shortlist starts here."
                  : "No match, yet."}
              </h3>
              <p>
                {savedOnly && !query
                  ? "Save the designs that catch your eye. Come back when inspiration calls."
                  : "Try a name, an industry, or a different category."}
              </p>
              <button
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                  setSavedOnly(false);
                }}
              >
                Show all templates <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>
        <section className="about" id="about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">
              A starting point.
              <br />
              <em>Never a finishing line.</em>
            </h2>
            <p>
              Elseform is a collection for people who like to make things their
              own. Every design has its own character, working interactions, and
              source folder. Pick one. Take it apart. Make something only you
              would make.
            </p>
          </div>
          <div className="about-actions">
            <p className="build-note">
              React · TypeScript · Vite · MIT licensed
            </p>
            <a className="readme-link" href={`${repo}#readme`}>
              Read the documentation <ArrowUpRight size={16} />
            </a>
            <button className="clone-button" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>
                {copied ? "Clone command copied" : "Copy the clone command"}
              </span>
            </button>
            {copyFailed && (
              <p role="status" className="copy-error">
                Copy is unavailable. Open the documentation for the clone
                command.
              </p>
            )}
          </div>
        </section>
      </main>
      <footer>
        <a className="footer-brand" href={base}>
          <BrandMark />
          elseform
        </a>
        <span>Different by design. Open by nature.</span>
        <a href="https://koative.com">
          A Koative project <ArrowUpRight size={14} />
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="preview-dialog"
        aria-label={
          selected ? `${selected.name} template preview` : "Template preview"
        }
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
