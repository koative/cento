import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, drinks, events, nights } from "./content";
import { longDate } from "./lib/format";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { DrinkPage } from "./pages/DrinkPage";
import { Records } from "./pages/Records";
import { NightPage } from "./pages/NightPage";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { Reservations } from "./pages/Reservations";
import { PrivateHire } from "./pages/PrivateHire";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/menu", () => ({ title: "Drinks menu", view: <Menu /> })],
  [
    "/menu/:id",
    ({ id }) => {
      const drink = drinks.find((d) => d.id === id);
      return drink
        ? {
            title: `${drink.name} · Drinks`,
            view: <DrinkPage key={drink.id} drink={drink} />,
          }
        : null;
    },
  ],
  ["/records", () => ({ title: "Record of the night", view: <Records /> })],
  [
    "/records/:id",
    ({ id }) => {
      const night = nights.find((n) => n.id === id);
      return night
        ? {
            title: `${night.title}, ${longDate(night.date)} · Records`,
            view: <NightPage key={night.id} night={night} />,
          }
        : null;
    },
  ],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const event = events.find((e) => e.id === id);
      return event
        ? {
            title: `${event.title} · Events`,
            view: <EventPage key={event.id} event={event} />,
          }
        : null;
    },
  ],
  ["/reservations", () => ({ title: "Book a table", view: <Reservations /> })],
  ["/private-hire", () => ({ title: "Private hire", view: <PrivateHire /> })],
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
