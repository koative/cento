import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, classes, events } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { RouteMap } from "./pages/RouteMap";
import { Classes } from "./pages/Classes";
import { ClassPage } from "./pages/ClassPage";
import { Memberships } from "./pages/Memberships";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { Youth } from "./pages/Youth";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Bouldering & rope climbing gym`,
      view: <Home />,
    }),
  ],
  ["/routes", () => ({ title: "Route map", view: <RouteMap /> })],
  ["/classes", () => ({ title: "Classes & courses", view: <Classes /> })],
  [
    "/classes/:id",
    ({ id }) => {
      const item = classes.find((c) => c.id === id);
      return item
        ? { title: `${item.name} · Classes`, view: <ClassPage item={item} /> }
        : null;
    },
  ],
  [
    "/memberships",
    () => ({ title: "Memberships & prices", view: <Memberships /> }),
  ],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const item = events.find((e) => e.id === id);
      return item
        ? { title: `${item.title} · Events`, view: <EventPage item={item} /> }
        : null;
    },
  ],
  ["/youth", () => ({ title: "Youth team", view: <Youth /> })],
  ["/book", () => ({ title: "Book a day pass", view: <Book /> })],
  ["/about", () => ({ title: "About & setters", view: <About /> })],
  ["/visit", () => ({ title: "Visit", view: <Visit /> })],
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
