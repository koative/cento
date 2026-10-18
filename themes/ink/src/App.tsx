import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { artistById, brand, designById } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Flash } from "./pages/Flash";
import { DesignPage } from "./pages/DesignPage";
import { Artists } from "./pages/Artists";
import { ArtistPage } from "./pages/ArtistPage";
import { Aftercare } from "./pages/Aftercare";
import { Studio } from "./pages/Studio";
import { Faq } from "./pages/Faq";
import { Book } from "./pages/Book";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Tattoo studio, flash & custom work`,
      view: <Home />,
    }),
  ],
  ["/flash", () => ({ title: "Flash book", view: <Flash /> })],
  [
    "/flash/:id",
    ({ id }) => {
      const d = designById(id);
      return d
        ? {
            title: `No. ${d.no} ${d.name} · Flash`,
            view: <DesignPage design={d} />,
          }
        : null;
    },
  ],
  ["/artists", () => ({ title: "Artists", view: <Artists /> })],
  [
    "/artists/:id",
    ({ id }) => {
      const a = artistById(id);
      return a
        ? { title: `${a.name} · Artists`, view: <ArtistPage artist={a} /> }
        : null;
    },
  ],
  ["/aftercare", () => ({ title: "Aftercare", view: <Aftercare /> })],
  ["/studio", () => ({ title: "Studio", view: <Studio /> })],
  ["/faq", () => ({ title: "FAQ & policies", view: <Faq /> })],
  ["/book", () => ({ title: "Request a booking", view: <Book /> })],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

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
