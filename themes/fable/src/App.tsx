import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, exhibits } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Exhibits } from "./pages/Exhibits";
import { ExhibitPage } from "./pages/ExhibitPage";
import { Visit } from "./pages/Visit";
import { Tickets } from "./pages/Tickets";
import { Events } from "./pages/Events";
import { SchoolTrips } from "./pages/SchoolTrips";
import { Parties } from "./pages/Parties";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — ${brand.sector} in Wonderby`,
      view: <Home />,
    }),
  ],
  ["/exhibits", () => ({ title: "Exhibits", view: <Exhibits /> })],
  [
    "/exhibits/:slug",
    ({ slug }) => {
      const ex = exhibits.find((e) => e.slug === slug);
      return ex
        ? { title: `${ex.name} · Exhibits`, view: <ExhibitPage ex={ex} /> }
        : null;
    },
  ],
  ["/visit", () => ({ title: "Plan your visit", view: <Visit /> })],
  ["/tickets", () => ({ title: "Tickets", view: <Tickets /> })],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  ["/school-trips", () => ({ title: "School trips", view: <SchoolTrips /> })],
  ["/parties", () => ({ title: "Birthday parties", view: <Parties /> })],
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
