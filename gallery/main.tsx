import { StrictMode, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Copy,
  Eye,
  Github,
  Heart,
  Menu as MenuIcon,
  Monitor,
  Moon,
  Search,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { TemplateCard } from "./Card";
import { Preview } from "./Preview";
import {
  catalog,
  categories,
  degit,
  liveUrl,
  preview,
  repo,
  type Template,
} from "./catalog";
import { copyText } from "./clipboard";
import { useAppearance, type Appearance } from "./useAppearance";
import "./styles.css";

const SAVED_KEY = "cento-saved";
const RUN_COMMAND = "cd my-site && bun install && bun run dev";
const featuredSlugs = ["haven", "ledger", "ember", "signal"];
const featured = featuredSlugs
  .map((slug) => catalog.find((t) => t.slug === slug))
  .filter((t): t is Template => Boolean(t));
const shortcuts = ["Food & Drink", "Travel & Stay", "Technology", "Creative"];
const sorts = {
  number: "Catalogue order",
  name: "Name, A–Z",
  pages: "Most pages",
} as const;
type Sort = keyof typeof sorts;
type Notice = { ok: boolean; text: string } | null;

const haystack = new Map(
  catalog.map((t) => [
    t.slug,
    [t.name, t.sector, t.category, t.tagline, t.description, ...t.tags]
      .join(" ")
      .toLowerCase(),
  ]),
);

function loadSaved() {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]");
    return new Set(
      Array.isArray(stored)
        ? stored.filter((s) => haystack.has(s as string))
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 26 26" aria-hidden>
      <rect width="26" height="26" rx="7" className="mark-tile" />
      <path d="M17.6 9.2a6 6 0 1 0 0 7.6" className="mark-c" />
      <circle cx="18.6" cy="13" r="1.7" className="mark-dot" />
    </svg>
  );
}

const appearances = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

function AppearanceControl() {
  const { appearance, setPreference } = useAppearance();
  return (
    <div className="appearance" role="radiogroup" aria-label="Appearance">
      {appearances.map(({ value, label, icon: Icon }) => (
        <label key={value} title={label}>
          <input
            type="radio"
            name="appearance"
            value={value}
            checked={appearance === value}
            onChange={() => setPreference(value as Appearance)}
            aria-label={label}
          />
          <Icon aria-hidden />
        </label>
      ))}
    </div>
  );
}

function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("number");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState(loadSaved);
  const [feature, setFeature] = useState(0);
  const [open, setOpen] = useState<Template | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [command, setCommand] = useState("");
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const [section, setSection] = useState<"templates" | "how">("templates");
  const [edges, setEdges] = useState({ prev: false, next: false });
  const heroEnd = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLElement>(null);
  const how = useRef<HTMLElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const heroSearch = useRef<HTMLInputElement>(null);
  const barSearch = useRef<HTMLInputElement>(null);

  const list = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const found = catalog.filter(
      (t) =>
        (category === "All" || t.category === category) &&
        (!savedOnly || saved.has(t.slug)) &&
        words.every((w) => haystack.get(t.slug)!.includes(w)),
    );
    if (sort === "name") found.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "pages")
      found.sort(
        (a, b) => b.pages.length - a.pages.length || a.number - b.number,
      );
    return found;
  }, [category, query, sort, savedOnly, saved]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((c) => [
          c,
          catalog.filter((t) => t.category === c).length,
        ]),
      ),
    [],
  );

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...saved]));
    } catch {
      /* Without storage, saving still works for this visit. */
    }
  }, [saved]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), notice.ok ? 3200 : 9000);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setStuck(!entry.isIntersecting),
    );
    observer.observe(heroEnd.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSection(entry.isIntersecting ? "how" : "templates"),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(how.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = chips.current!;
    const update = () =>
      setEdges({
        prev: rail.scrollLeft > 4,
        next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
      });
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(rail);
    return () => {
      rail.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(false);
      menuButton.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest(".menu, .menu-button"))
        setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [menu]);

  useEffect(() => {
    const focusSearch = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        e.key !== "/" ||
        e.metaKey ||
        e.ctrlKey ||
        target.closest("input, select, textarea, dialog")
      )
        return;
      e.preventDefault();
      (stuck ? barSearch : heroSearch).current?.focus();
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, [stuck]);

  /** Brings the top of the results under the sticky bar after a filter change from far away. */
  function toResults(always = false) {
    const top = results.current!.getBoundingClientRect().top;
    if (!always && top >= 0) return;
    results.current!.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  async function copyCommand(text: string, subject: string) {
    const ok = await copyText(text);
    setCommand(text);
    setNotice(
      ok
        ? { ok, text: `Copied the command for ${subject}` }
        : {
            ok,
            text: "Couldn’t reach the clipboard. Select the command and copy it:",
          },
    );
  }

  function scrollChips(direction: 1 | -1) {
    const rail = chips.current!;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.7,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function toggleSave(slug: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });
  }

  function resetAll() {
    setCategory("All");
    setQuery("");
    setSavedOnly(false);
  }

  const lead = featured[feature] ?? catalog[0];
  const scope = savedOnly
    ? "Saved templates"
    : category === "All"
      ? "All templates"
      : category;

  return (
    <>
      <a className="skip" href="#templates">
        Skip to templates
      </a>
      <header className="wrap top">
        <a className="logo" href="./" aria-label="Cento, home">
          <Mark />
          Cento
        </a>
        <nav className="nav" aria-label="Primary">
          <a
            href="#templates"
            aria-current={section === "templates" ? "true" : undefined}
          >
            Templates
          </a>
          <a href="#how" aria-current={section === "how" ? "true" : undefined}>
            How to use
          </a>
          <a href={`${repo}#readme`} target="_blank" rel="noreferrer">
            Docs
          </a>
        </nav>
        <div className="top-tools">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setSavedOnly(true);
              requestAnimationFrame(() => toResults(true));
            }}
          >
            <Heart aria-hidden />
            <span className="hide-sm">Saved</span>
            <span className="count num">{saved.size}</span>
          </button>
          <AppearanceControl />
          <a
            className="btn btn-line btn-sm top-github"
            href={repo}
            target="_blank"
            rel="noreferrer"
            aria-label="Cento on GitHub"
          >
            <Github aria-hidden />
            <span className="hide-sm">GitHub</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            className="btn btn-ghost btn-icon btn-sm menu-button"
            aria-label="Menu"
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X aria-hidden /> : <MenuIcon aria-hidden />}
          </button>
        </div>
        <nav
          id="site-menu"
          className="menu"
          aria-label="Menu"
          hidden={!menu}
          onClick={(e) =>
            (e.target as HTMLElement).closest("a") && setMenu(false)
          }
        >
          <a
            href="#templates"
            aria-current={section === "templates" ? "true" : undefined}
          >
            Templates
          </a>
          <a href="#how" aria-current={section === "how" ? "true" : undefined}>
            How to use
          </a>
          <a href={`${repo}#readme`} target="_blank" rel="noreferrer">
            Docs <ArrowUpRight aria-hidden />
          </a>
          <a href={repo} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        <section className="wrap hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">100 websites, ready to borrow.</h1>
            <p className="lede">
              Complete, multi-page templates for real kinds of business. Browse
              them live, pick one, and take the code with a single command.
            </p>
            <label className="search search-lg">
              <span className="visually-hidden">Search templates</span>
              <Search aria-hidden />
              <input
                ref={heroSearch}
                type="search"
                value={query}
                placeholder={`Search ${catalog.length} templates`}
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && toResults(true)}
              />
              <kbd aria-hidden>/</kbd>
            </label>
            <div className="shortcuts">
              <span>Browse</span>
              {shortcuts.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    setSavedOnly(false);
                    toResults(true);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <ul className="facts">
              <li>
                <b className="num">{catalog.length}</b> templates
              </li>
              <li>
                <b className="num">{categories.length}</b> categories
              </li>
              <li>React + Vite</li>
              <li>MIT licence</li>
            </ul>
          </div>

          <div className="feature">
            <div className="feature-main">
              <a
                className="frame"
                href={liveUrl(lead)}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(lead);
                }}
                aria-label={`Preview ${lead.name}`}
              >
                <span className="chrome" aria-hidden>
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="url">themes/{lead.slug}</span>
                </span>
                <span className="viewport">
                  {featured.map((t, i) => (
                    <img
                      key={t.slug}
                      src={preview(t)}
                      alt=""
                      width={1200}
                      height={750}
                      data-active={i === feature}
                      fetchPriority={i === 0 ? "high" : "low"}
                    />
                  ))}
                </span>
              </a>
              <div className="feature-bar">
                <div className="feature-id" aria-live="polite">
                  <strong className="feature-name">{lead.name}</strong>
                  <span>
                    {lead.sector} ·{" "}
                    <span className="num">{lead.pages.length}</span> pages
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={() => setOpen(lead)}
                >
                  <Eye aria-hidden />
                  Preview
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => copyCommand(degit(lead), lead.name)}
                >
                  <Terminal aria-hidden />
                  Get the code
                </button>
              </div>
            </div>
            <div className="rail" role="group" aria-label="Featured templates">
              {featured.map((t, i) => (
                <button
                  key={t.slug}
                  type="button"
                  aria-pressed={i === feature}
                  aria-label={`Feature ${t.name}`}
                  onClick={() => setFeature(i)}
                >
                  <img src={preview(t)} alt="" width={1200} height={750} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div ref={heroEnd} className="hero-end" aria-hidden />
        </section>

        <div className="bar" data-stuck={stuck}>
          <div className="wrap bar-in">
            <div
              className="chip-rail"
              data-prev={edges.prev}
              data-next={edges.next}
            >
              {edges.prev && (
                <button
                  type="button"
                  className="chip-scroll chip-prev"
                  aria-label="Show previous categories"
                  onClick={() => scrollChips(-1)}
                >
                  <ChevronLeft aria-hidden />
                </button>
              )}
              <div
                ref={chips}
                className="chips"
                role="group"
                aria-label="Category"
              >
                {["All", ...categories].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="chip"
                    aria-pressed={category === c}
                    onClick={(e) => {
                      setCategory(c);
                      e.currentTarget.scrollIntoView({
                        block: "nearest",
                        inline: "nearest",
                      });
                      toResults();
                    }}
                  >
                    {c}
                    <span className="chip-n num">
                      {c === "All" ? catalog.length : counts[c]}
                    </span>
                  </button>
                ))}
              </div>
              {edges.next && (
                <button
                  type="button"
                  className="chip-scroll chip-next"
                  aria-label="Show more categories"
                  onClick={() => scrollChips(1)}
                >
                  <ChevronRight aria-hidden />
                </button>
              )}
            </div>
            <div className="bar-tools">
              <label className="search search-sm">
                <span className="visually-hidden">Search templates</span>
                <Search aria-hidden />
                <input
                  ref={barSearch}
                  type="search"
                  value={query}
                  placeholder="Search"
                  autoComplete="off"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    toResults();
                  }}
                />
              </label>
              <button
                type="button"
                className="btn btn-line btn-sm saved-toggle"
                aria-pressed={savedOnly}
                onClick={() => {
                  setSavedOnly((v) => !v);
                  toResults();
                }}
              >
                <Heart aria-hidden />
                Saved
                <span className="count num">{saved.size}</span>
              </button>
            </div>
          </div>
        </div>

        <section
          ref={results}
          className="wrap results"
          id="templates"
          aria-labelledby="results-title"
        >
          <div className="results-head">
            <h2 id="results-title" className="results-title">
              {scope}
              {query.trim() && <> matching “{query.trim()}”</>}{" "}
              <span className="num" aria-live="polite">
                {list.length}
              </span>
            </h2>
            <label className="select sort">
              <span className="select-label">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden />
            </label>
          </div>
          {list.length ? (
            <ul className="grid">
              {list.map((t) => (
                <li key={t.slug}>
                  <TemplateCard
                    template={t}
                    saved={saved.has(t.slug)}
                    onSave={() => toggleSave(t.slug)}
                    onPreview={() => setOpen(t)}
                    onCopy={() => copyCommand(degit(t), t.name)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <span className="empty-icon">
                {savedOnly && !saved.size ? (
                  <Heart aria-hidden />
                ) : (
                  <Search aria-hidden />
                )}
              </span>
              <h3>
                {savedOnly && !saved.size
                  ? "Nothing saved yet"
                  : "No templates match that"}
              </h3>
              <p>
                {savedOnly && !saved.size
                  ? "Use the heart on any template to keep it here. Saved templates stay in this browser."
                  : `Nothing in ${category === "All" ? "the catalogue" : category} fits ${query.trim() ? `“${query.trim()}”` : "these filters"}. Try a broader word or another category.`}
              </p>
              <button type="button" className="btn btn-ink" onClick={resetAll}>
                Show all {catalog.length} templates
              </button>
            </div>
          )}
        </section>

        <section
          ref={how}
          className="wrap how"
          id="how"
          aria-labelledby="how-title"
        >
          <div className="how-intro">
            <h2 id="how-title">How to use a template</h2>
            <p>
              Every template is a standalone Vite + React app. No account, no
              build service, nothing to install globally.
            </p>
          </div>
          <ol className="steps">
            <li>
              <h3>Copy one folder</h3>
              <p>
                degit fetches a single template without the rest of the
                repository. Swap <code>{lead.slug}</code> for any template’s
                folder name.
              </p>
              <div className="cmd">
                <code>{degit(lead)}</code>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon btn-sm"
                  aria-label={`Copy the command for ${lead.name}`}
                  onClick={() => copyCommand(degit(lead), lead.name)}
                >
                  <Copy aria-hidden />
                </button>
              </div>
            </li>
            <li>
              <h3>Install and run</h3>
              <p>npm, pnpm and yarn work too.</p>
              <div className="cmd">
                <code>{RUN_COMMAND}</code>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon btn-sm"
                  aria-label="Copy the install and run command"
                  onClick={() =>
                    copyCommand(RUN_COMMAND, "installing and running")
                  }
                >
                  <Copy aria-hidden />
                </button>
              </div>
            </li>
            <li>
              <h3>Make it yours</h3>
              <p>
                Copy and data live in <code>src/content.ts</code>; colours, type
                and spacing tokens sit at the top of <code>src/styles.css</code>
                . <code>bun run build</code> writes a static site to{" "}
                <code>dist/</code>.
              </p>
            </li>
          </ol>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <a className="logo logo-sm" href="./" aria-label="Cento, home">
            <Mark />
            Cento
          </a>
          <p>
            By{" "}
            <a href="https://koative.com" target="_blank" rel="noreferrer">
              Koative
            </a>
            . Every template brand is fictional.
          </p>
          <nav aria-label="Footer">
            <a href="#how">How to use</a>
            <a href={`${repo}#readme`} target="_blank" rel="noreferrer">
              Docs
            </a>
            <a href={repo} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href={`${repo}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
            >
              MIT licence
            </a>
          </nav>
        </div>
      </footer>

      <div className="toast" data-on={Boolean(notice)} role="status">
        {notice && (
          <>
            {notice.ok ? <Check aria-hidden /> : <CircleAlert aria-hidden />}
            <span>{notice.text}</span>
            <code>{command}</code>
          </>
        )}
      </div>

      <Preview template={open} onClose={() => setOpen(null)} />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
