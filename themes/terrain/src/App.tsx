import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, guides, trips } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Trips } from "./pages/Trips";
import { TripPage } from "./pages/TripPage";
import { RouteFinder } from "./pages/RouteFinder";
import { Guides } from "./pages/Guides";
import { GuidePage } from "./pages/GuidePage";
import { Gear } from "./pages/Gear";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { Faq } from "./pages/Faq";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Guided adventure travel`,
      view: <Home />,
    }),
  ],
  ["/trips", () => ({ title: "All trips", view: <Trips /> })],
  [
    "/trips/:slug",
    ({ slug }) => {
      const trip = trips.find((t) => t.slug === slug);
      return trip
        ? {
            title: `${trip.name}, ${trip.region}`,
            view: <TripPage trip={trip} />,
          }
        : null;
    },
  ],
  ["/route-finder", () => ({ title: "Route finder", view: <RouteFinder /> })],
  ["/guides", () => ({ title: "Our guides", view: <Guides /> })],
  [
    "/guides/:slug",
    ({ slug }) => {
      const guide = guides.find((g) => g.slug === slug);
      return guide
        ? { title: `${guide.name} • Guides`, view: <GuidePage guide={guide} /> }
        : null;
    },
  ],
  ["/gear", () => ({ title: "Gear list", view: <Gear /> })],
  ["/book", () => ({ title: "Book a trip", view: <Book /> })],
  ["/about", () => ({ title: "About & safety", view: <About /> })],
  ["/faq", () => ({ title: "FAQ & policies", view: <Faq /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Off the map", view: <NotFound /> };
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
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
