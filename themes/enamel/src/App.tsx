import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, dentists, treatments } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Treatments } from "./pages/Treatments";
import { TreatmentPage } from "./pages/TreatmentPage";
import { Dentists } from "./pages/Dentists";
import { DentistPage } from "./pages/DentistPage";
import { Prices } from "./pages/Prices";
import { NewPatients } from "./pages/NewPatients";
import { Book } from "./pages/Book";
import { Visit } from "./pages/Visit";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Dental clinic on Halden Street`,
      view: <Home />,
    }),
  ],
  ["/treatments", () => ({ title: "Treatments", view: <Treatments /> })],
  [
    "/treatments/:slug",
    ({ slug }) => {
      const t = treatments.find((x) => x.slug === slug);
      return t
        ? { title: `${t.name} · Treatments`, view: <TreatmentPage t={t} /> }
        : null;
    },
  ],
  ["/dentists", () => ({ title: "Dentists", view: <Dentists /> })],
  [
    "/dentists/:slug",
    ({ slug }) => {
      const d = dentists.find((x) => x.slug === slug);
      return d
        ? { title: `${d.name} · Dentists`, view: <DentistPage d={d} /> }
        : null;
    },
  ],
  ["/prices", () => ({ title: "Prices & plans", view: <Prices /> })],
  ["/new-patients", () => ({ title: "New patients", view: <NewPatients /> })],
  ["/book", () => ({ title: "Book online", view: <Book /> })],
  ["/visit", () => ({ title: "Visit & hours", view: <Visit /> })],
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
