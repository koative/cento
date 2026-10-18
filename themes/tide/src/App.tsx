import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, events, programmes, reports } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Programmes } from "./pages/Programmes";
import { ProgrammePage } from "./pages/ProgrammePage";
import { Volunteer } from "./pages/Volunteer";
import { EventPage } from "./pages/EventPage";
import { Impact } from "./pages/Impact";
import { ReportPage } from "./pages/ReportPage";
import { Donate } from "./pages/Donate";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/programmes", () => ({ title: "Programmes", view: <Programmes /> })],
  [
    "/programmes/:slug",
    ({ slug }) => {
      const p = programmes.find((x) => x.slug === slug);
      return p
        ? {
            title: `${p.name} · Programmes`,
            view: <ProgrammePage programme={p} />,
          }
        : null;
    },
  ],
  ["/volunteer", () => ({ title: "Volunteer", view: <Volunteer /> })],
  [
    "/volunteer/:id",
    ({ id }) => {
      const e = events.find((x) => x.id === id);
      return e
        ? { title: `${e.title} · Volunteer`, view: <EventPage event={e} /> }
        : null;
    },
  ],
  ["/impact", () => ({ title: "Impact reports", view: <Impact /> })],
  [
    "/impact/:year",
    ({ year }) => {
      const r = reports.find((x) => String(x.year) === year);
      return r
        ? { title: `${r.year} impact report`, view: <ReportPage report={r} /> }
        : null;
    },
  ],
  ["/donate", () => ({ title: "Donate", view: <Donate /> })],
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
