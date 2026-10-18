import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, events, locations } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Memberships } from "./pages/Memberships";
import { Locations } from "./pages/Locations";
import { LocationPage } from "./pages/LocationPage";
import { Rooms } from "./pages/Rooms";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { Community } from "./pages/Community";
import { About } from "./pages/About";
import { Tour } from "./pages/Tour";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Coworking space in ${brand.city}`,
      view: <Home />,
    }),
  ],
  ["/memberships", () => ({ title: "Memberships", view: <Memberships /> })],
  ["/locations", () => ({ title: "Locations", view: <Locations /> })],
  [
    "/locations/:id",
    ({ id }) => {
      const l = locations.find((x) => x.id === id);
      return l
        ? {
            title: `${l.name} · Locations`,
            view: <LocationPage location={l} />,
          }
        : null;
    },
  ],
  ["/rooms", () => ({ title: "Book a meeting room", view: <Rooms /> })],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const e = events.find((x) => x.id === id);
      return e
        ? { title: `${e.title} · Events`, view: <EventPage event={e} /> }
        : null;
    },
  ],
  ["/community", () => ({ title: "Community", view: <Community /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
  ["/tour", () => ({ title: "Book a tour", view: <Tour /> })],
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
