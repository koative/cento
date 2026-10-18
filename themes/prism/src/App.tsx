import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, editions, speakerBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Speakers } from "./pages/Speakers";
import { SpeakerPage } from "./pages/SpeakerPage";
import { Agenda } from "./pages/Agenda";
import { Tickets } from "./pages/Tickets";
import { Register } from "./pages/Register";
import { Venue } from "./pages/Venue";
import { Sponsors } from "./pages/Sponsors";
import { Editions } from "./pages/Editions";
import { EditionPage } from "./pages/EditionPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Design conference, ${brand.dates}, ${brand.city}`,
      view: <Home />,
    }),
  ],
  ["/speakers", () => ({ title: "Speakers", view: <Speakers /> })],
  [
    "/speakers/:slug",
    ({ slug }) => {
      const speaker = speakerBySlug[slug];
      return speaker
        ? {
            title: `${speaker.name} · Speakers`,
            view: <SpeakerPage speaker={speaker} />,
          }
        : null;
    },
  ],
  ["/agenda", () => ({ title: "Agenda builder", view: <Agenda /> })],
  ["/tickets", () => ({ title: "Tickets", view: <Tickets /> })],
  ["/register", () => ({ title: "Register", view: <Register /> })],
  ["/venue", () => ({ title: "Venue & travel", view: <Venue /> })],
  ["/sponsors", () => ({ title: "Partner with us", view: <Sponsors /> })],
  ["/editions", () => ({ title: "Past editions", view: <Editions /> })],
  [
    "/editions/:year",
    ({ year }) => {
      const edition = editions.find((e) => String(e.year) === year);
      return edition
        ? {
            title: `${edition.year}: ${edition.title} · Past editions`,
            view: <EditionPage edition={edition} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "About & FAQ", view: <About /> })],
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
  const title = path === "/" ? page.title : `${page.title} — ${brand.edition}`;
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
