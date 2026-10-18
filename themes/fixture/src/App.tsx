import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, services } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Estimate } from "./pages/Estimate";
import { Areas } from "./pages/Areas";
import { Emergency } from "./pages/Emergency";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Plumbing & electrical services in ${brand.city}`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const service = services.find((s) => s.slug === slug);
      return service
        ? {
            title: `${service.name} · Services`,
            view: <ServicePage service={service} />,
          }
        : null;
    },
  ],
  ["/estimate", () => ({ title: "Instant estimate", view: <Estimate /> })],
  ["/areas", () => ({ title: "Service areas", view: <Areas /> })],
  ["/emergency", () => ({ title: "24/7 emergency", view: <Emergency /> })],
  ["/book", () => ({ title: "Book a visit", view: <Book /> })],
  ["/about", () => ({ title: "About & team", view: <About /> })],
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
