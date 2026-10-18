import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { articles, brand, services } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Pricing } from "./pages/Pricing";
import { Calendar } from "./pages/Calendar";
import { Resources } from "./pages/Resources";
import { ArticlePage } from "./pages/ArticlePage";
import { About } from "./pages/About";
import { Book } from "./pages/Book";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Small-business bookkeeping, tax & payroll`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const s = services.find((x) => x.slug === slug);
      return s
        ? { title: `${s.name} · Services`, view: <ServicePage service={s} /> }
        : null;
    },
  ],
  ["/pricing", () => ({ title: "Packages & pricing", view: <Pricing /> })],
  ["/calendar", () => ({ title: "Tax deadline calendar", view: <Calendar /> })],
  ["/resources", () => ({ title: "Resources", view: <Resources /> })],
  [
    "/resources/:slug",
    ({ slug }) => {
      const a = articles.find((x) => x.slug === slug);
      return a
        ? { title: `${a.short} · Resources`, view: <ArticlePage article={a} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "About the firm", view: <About /> })],
  ["/book", () => ({ title: "Book a call", view: <Book /> })],
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
