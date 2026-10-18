import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, dishes, events, services } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { DishPage } from "./pages/DishPage";
import { Reservations } from "./pages/Reservations";
import { PrivateDining } from "./pages/PrivateDining";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Wood-fired neighbourhood restaurant`,
      view: <Home />,
    }),
  ],
  [
    "/menu/:service",
    ({ service }) => {
      const s = services.find((x) => x.id === service);
      return s ? { title: `${s.name} menu`, view: <Menu service={s} /> } : null;
    },
  ],
  [
    "/menu/:service/:dish",
    ({ service, dish }) => {
      const d = dishes.find((x) => x.id === dish && x.service === service);
      return d ? { title: d.name, view: <DishPage dish={d} /> } : null;
    },
  ],
  ["/reservations", () => ({ title: "Book a table", view: <Reservations /> })],
  [
    "/private-dining",
    () => ({ title: "Private dining", view: <PrivateDining /> }),
  ],
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
  ["/about", () => ({ title: "Our story", view: <About /> })],
  ["/visit", () => ({ title: "Hours & directions", view: <Visit /> })],
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
