import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, eventBySlug, styleBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Timetable } from "./pages/Timetable";
import { Styles } from "./pages/Styles";
import { StylePage } from "./pages/StylePage";
import { Instructors } from "./pages/Instructors";
import { Passes } from "./pages/Passes";
import { Trial } from "./pages/Trial";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Dance studio: classes, passes & socials`,
      view: <Home />,
    }),
  ],
  ["/timetable", () => ({ title: "Timetable", view: <Timetable /> })],
  ["/styles", () => ({ title: "Dance styles", view: <Styles /> })],
  [
    "/styles/:slug",
    ({ slug }) => {
      const s = styleBySlug(slug);
      return s
        ? {
            title: `${s.name} classes`,
            view: <StylePage key={s.slug} style={s} />,
          }
        : null;
    },
  ],
  ["/instructors", () => ({ title: "Instructors", view: <Instructors /> })],
  ["/passes", () => ({ title: "Passes & memberships", view: <Passes /> })],
  ["/trial", () => ({ title: "Book a trial class", view: <Trial /> })],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  [
    "/events/:slug",
    ({ slug }) => {
      const e = eventBySlug(slug);
      return e
        ? {
            title: `${e.title} · Events`,
            view: <EventPage key={e.slug} event={e} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "The studio", view: <About /> })],
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
