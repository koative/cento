import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, events, programmes } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Programmes } from "./pages/Programmes";
import { ProgrammePage } from "./pages/ProgrammePage";
import { Admissions } from "./pages/Admissions";
import { Apply } from "./pages/Apply";
import { CampusLife } from "./pages/CampusLife";
import { Research } from "./pages/Research";
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
      title: `${brand.full} — Harrowmere, since ${brand.founded}`,
      view: <Home />,
    }),
  ],
  ["/programmes", () => ({ title: "Programme finder", view: <Programmes /> })],
  [
    "/programmes/:id",
    ({ id }) => {
      const p = programmes.find((x) => x.id === id);
      return p
        ? {
            title: `${p.award} ${p.title} · Programmes`,
            view: <ProgrammePage p={p} />,
          }
        : null;
    },
  ],
  [
    "/admissions",
    () => ({ title: "Admissions, fees & funding", view: <Admissions /> }),
  ],
  ["/apply", () => ({ title: "Apply for 2027", view: <Apply /> })],
  ["/campus-life", () => ({ title: "Campus life", view: <CampusLife /> })],
  ["/research", () => ({ title: "Research", view: <Research /> })],
  ["/events", () => ({ title: "Events & open days", view: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const e = events.find((x) => x.id === id);
      return e
        ? { title: `${e.title} · Events`, view: <EventPage e={e} /> }
        : null;
    },
  ],
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
  const title = path === "/" ? page.title : `${page.title} — ${brand.full}`;
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
