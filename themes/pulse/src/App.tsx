import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { artists, brand } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Lineup } from "./pages/Lineup";
import { ArtistPage } from "./pages/ArtistPage";
import { Timetable } from "./pages/Timetable";
import { Tickets } from "./pages/Tickets";
import { Checkout } from "./pages/Checkout";
import { Venue } from "./pages/Venue";
import { Faq } from "./pages/Faq";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Music festival, ${brand.dates}`,
      view: <Home />,
    }),
  ],
  ["/lineup", () => ({ title: "Lineup", view: <Lineup /> })],
  [
    "/lineup/:slug",
    ({ slug }) => {
      const artist = artists.find((a) => a.slug === slug);
      return artist
        ? {
            title: `${artist.name} · Lineup`,
            view: <ArtistPage artist={artist} />,
          }
        : null;
    },
  ],
  ["/timetable", () => ({ title: "Timetable builder", view: <Timetable /> })],
  ["/tickets", () => ({ title: "Tickets", view: <Tickets /> })],
  ["/tickets/checkout", () => ({ title: "Checkout", view: <Checkout /> })],
  ["/venue", () => ({ title: "Venue & getting there", view: <Venue /> })],
  ["/faq", () => ({ title: "FAQ", view: <Faq /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
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
    path === "/" ? page.title : `${page.title} — ${brand.name} ${brand.year}`,
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
