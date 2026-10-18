import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, services, vets } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Vets } from "./pages/Vets";
import { VetPage } from "./pages/VetPage";
import { Plans } from "./pages/Plans";
import { Planner } from "./pages/Planner";
import { Emergency } from "./pages/Emergency";
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
      title: `${brand.name} — Veterinary clinic in Fernhill`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services & prices", view: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const s = services.find((x) => x.slug === slug);
      return s
        ? { title: `${s.name} · Services`, view: <ServicePage service={s} /> }
        : null;
    },
  ],
  ["/vets", () => ({ title: "Vets & nurses", view: <Vets /> })],
  [
    "/vets/:slug",
    ({ slug }) => {
      const v = vets.find((x) => x.slug === slug);
      return v
        ? { title: `${v.name} · Vets & nurses`, view: <VetPage vet={v} /> }
        : null;
    },
  ],
  ["/plans", () => ({ title: "Pet health plans", view: <Plans /> })],
  ["/planner", () => ({ title: "Care planner", view: <Planner /> })],
  ["/emergency", () => ({ title: "Emergency care", view: <Emergency /> })],
  ["/book", () => ({ title: "Book a visit", view: <Book /> })],
  ["/visit", () => ({ title: "Visiting & new clients", view: <Visit /> })],
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
