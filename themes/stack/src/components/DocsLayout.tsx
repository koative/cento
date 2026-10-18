import { useEffect, useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import { Link, useRoute } from "../router";
import { guides, guideTopics, resources } from "../content";

export type TocItem = { id: string; label: string };

function Sidebar() {
  return (
    <nav aria-label="Documentation" className="sidebar-nav">
      <p className="side-label">Start here</p>
      <ul>
        <li>
          <Link to="/guides">All guides</Link>
        </li>
        <li>
          <Link to="/guides/quickstart">Quickstart</Link>
        </li>
      </ul>
      {guideTopics.slice(1).map((topic) => (
        <div key={topic}>
          <p className="side-label">{topic}</p>
          <ul>
            {guides
              .filter((g) => g.topic === topic)
              .map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <p className="side-label">API reference</p>
      <ul>
        <li>
          <Link to="/api">Overview</Link>
        </li>
        {resources.map((r) => (
          <li key={r.slug}>
            <Link to={`/api/${r.slug}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
      <p className="side-label">Tools</p>
      <ul>
        <li>
          <Link to="/playground">Playground</Link>
        </li>
        <li>
          <Link to="/changelog">Changelog</Link>
        </li>
      </ul>
    </nav>
  );
}

function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  // Highlight the section nearest the top of the viewport. Content never depends on this.
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="toc">
      <h2>On this page</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              aria-current={active === i.id ? "location" : undefined}
              onClick={() => {
                const reduce = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                document.getElementById(i.id)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "start",
                });
                setActive(i.id);
              }}
            >
              {i.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Three columns on wide screens: section index, the page, and an on-this-page rail. */
export function DocsLayout({
  toc,
  children,
  wide,
}: {
  toc?: TocItem[];
  children: ReactNode;
  wide?: boolean;
}) {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <div className={`docs${wide ? " docs-wide" : ""}`}>
      <aside className="docs-side">
        <button
          type="button"
          className="side-toggle"
          aria-expanded={open}
          aria-controls="docs-index"
          onClick={() => setOpen((o) => !o)}
        >
          <PanelLeft size={16} aria-hidden />
          {open ? "Hide the docs index" : "Browse the docs"}
        </button>
        <div
          id="docs-index"
          className="docs-index"
          data-open={open ? "" : undefined}
        >
          <Sidebar />
        </div>
      </aside>
      <div className="docs-body">{children}</div>
      {toc && toc.length > 1 && (
        <aside className="docs-toc">
          <OnThisPage items={toc} />
        </aside>
      )}
    </div>
  );
}
