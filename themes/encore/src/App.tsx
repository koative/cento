import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, productions } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Season } from "./pages/Season";
import { ProductionPage } from "./pages/ProductionPage";
import { Book } from "./pages/Book";
import { Membership } from "./pages/Membership";
import { Learning } from "./pages/Learning";
import { Visit } from "./pages/Visit";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.full} — Plays, musicals and classics on Lantern Street`,
      view: <Home />,
    }),
  ],
  ["/season", () => ({ title: `Season ${brand.season}`, view: <Season /> })],
  [
    "/season/:slug",
    ({ slug }) => {
      const p = productions.find((x) => x.slug === slug);
      return p ? { title: p.title, view: <ProductionPage p={p} /> } : null;
    },
  ],
  [
    "/book/:slug",
    ({ slug }) => {
      const p = productions.find((x) => x.slug === slug);
      return p ? { title: `Book ${p.title}`, view: <Book p={p} /> } : null;
    },
  ],
  ["/membership", () => ({ title: "Membership", view: <Membership /> })],
  [
    "/learning",
    () => ({ title: "Learning & participation", view: <Learning /> }),
  ],
  ["/visit", () => ({ title: "Plan your visit", view: <Visit /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Not found", view: <NotFound /> };
}

export default function App() {
  const path = useRoute();
  const main = useRef<HTMLElement>(null);
  const page = resolve(path);
  const title = path === "/" ? page.title : `${page.title} — ${brand.full}`;
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
