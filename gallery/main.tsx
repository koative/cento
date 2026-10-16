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
  const [sort, setSort] = useState("collection");
  const [selected, setSelected] = useState<Template | null>(null);
  const [device, setDevice] = useState("desktop");
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = catalog.filter(
    (t) =>
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
          <a href="#collection">Templates</a>
          <a href="#about">About</a>
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
          <h1 id="title">A different starting point.</h1>
          <p>
            {catalog.length} independent website templates. Explore a design.
            Make it yours.
          </p>
          <span className="collection-note">Open source · Free to use</span>
        </section>
        <section
          className="collection"
          id="collection"
          aria-labelledby="collection-title"
        >
          <h2 id="collection-title" className="sr-only">
            The collection
          </h2>
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
                  {c === "All" && <span>{catalog.length}</span>}
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
        <section className="about" id="about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">Yours to make your own.</h2>
            <p>
              Every template has its own folder, design language, and working
              interactions. React, TypeScript, and Vite. MIT licensed source.
            </p>
          </div>
          <div className="about-actions">
            <a className="readme-link" href={`${repo}#readme`}>
              Read the documentation <ArrowUpRight size={16} />
            </a>
            <button className="clone-button" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>
                {copied ? "Clone command copied" : "Copy the clone command"}
              </span>
            </button>
          </div>
        </section>
      </main>
      <footer>
        <a className="footer-brand" href="https://koative.com">
          koative.
        </a>
        <span>Independent ideas, shared openly.</span>
        <a href={repo}>
          GitHub <ArrowUpRight size={14} />
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
