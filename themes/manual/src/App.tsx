import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, categories, flows, incidents, threads } from "./content";
import { articleBySlug, codeOf } from "./lib/manual";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Contents } from "./pages/Contents";
import { CategoryPage } from "./pages/CategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { SearchPage } from "./pages/SearchPage";
import { Troubleshoot } from "./pages/Troubleshoot";
import { Contact } from "./pages/Contact";
import { Status } from "./pages/Status";
import { IncidentPage } from "./pages/IncidentPage";
import { Community } from "./pages/Community";
import { ThreadPage } from "./pages/ThreadPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.site} — Help center & knowledge base`,
      view: <Home />,
    }),
  ],
  ["/categories", () => ({ title: "Contents", view: <Contents /> })],
  [
    "/categories/:slug",
    ({ slug }) => {
      const c = categories.find((x) => x.slug === slug);
      return c
        ? {
            title: `${c.title} · Contents`,
            view: <CategoryPage category={c} />,
          }
        : null;
    },
  ],
  [
    "/articles/:slug",
    ({ slug }) => {
      const a = articleBySlug(slug);
      return a
        ? {
            title: `${codeOf(a)} ${a.title}`,
            view: <ArticlePage article={a} />,
          }
        : null;
    },
  ],
  ["/search", () => ({ title: "Search", view: <SearchPage /> })],
  [
    "/troubleshoot",
    () => ({ title: "Troubleshooter", view: <Troubleshoot /> }),
  ],
  [
    "/troubleshoot/:id",
    ({ id }) => {
      const f = flows.find((x) => x.id === id);
      return f
        ? {
            title: `${f.title} · Troubleshooter`,
            view: <Troubleshoot flow={f} />,
          }
        : null;
    },
  ],
  ["/contact", () => ({ title: "Contact support", view: <Contact /> })],
  ["/status", () => ({ title: "System status", view: <Status /> })],
  [
    "/status/:id",
    ({ id }) => {
      const i = incidents.find((x) => x.id === id);
      return i
        ? { title: `${i.title} · Status`, view: <IncidentPage incident={i} /> }
        : null;
    },
  ],
  ["/community", () => ({ title: "Community", view: <Community /> })],
  [
    "/community/:id",
    ({ id }) => {
      const t = threads.find((x) => x.id === id);
      return t
        ? { title: `${t.title} · Community`, view: <ThreadPage thread={t} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "About this manual", view: <About /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Page not found", view: <NotFound /> };
}

export default function App() {
  const path = useRoute();
  const main = useRef<HTMLElement>(null);
  const page = resolve(path);
  const title = path === "/" ? page.title : `${page.title} — ${brand.site}`;
  usePageChange(main, title);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        ref={main}
        key={path}
        className="page-enter"
      >
        {page.view}
      </main>
      <Footer />
    </>
  );
}
