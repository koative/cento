import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, places, villas } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Villas } from "./pages/Villas";
import { VillaPage } from "./pages/VillaPage";
import { Guide } from "./pages/Guide";
import { PlacePage } from "./pages/PlacePage";
import { Concierge } from "./pages/Concierge";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { GoodToKnow } from "./pages/GoodToKnow";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Villas on ${brand.island}`,
      view: <Home />,
    }),
  ],
  ["/villas", () => ({ title: "Villas", view: <Villas /> })],
  [
    "/villas/:slug",
    ({ slug }) => {
      const villa = villas.find((v) => v.slug === slug);
      return villa
        ? { title: `${villa.name} · Villas`, view: <VillaPage villa={villa} /> }
        : null;
    },
  ],
  ["/guide", () => ({ title: "Island guide", view: <Guide /> })],
  [
    "/guide/:slug",
    ({ slug }) => {
      const place = places.find((p) => p.slug === slug);
      return place
        ? {
            title: `${place.name} · Island guide`,
            view: <PlacePage place={place} />,
          }
        : null;
    },
  ],
  ["/concierge", () => ({ title: "Concierge", view: <Concierge /> })],
  ["/book", () => ({ title: "Book a stay", view: <Book /> })],
  ["/about", () => ({ title: "About us", view: <About /> })],
  ["/good-to-know", () => ({ title: "Good to know", view: <GoodToKnow /> })],
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
  const title = path === "/" ? page.title : `${page.title} — ${brand.name}`;
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
