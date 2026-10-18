import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, findFrame, prints, series } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { SeriesIndex } from "./pages/SeriesIndex";
import { SeriesPage } from "./pages/SeriesPage";
import { Commissions } from "./pages/Commissions";
import { Prints } from "./pages/Prints";
import { PrintPage } from "./pages/PrintPage";
import { Order } from "./pages/Order";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  [
    "/",
    () => ({
      title: `${brand.name} — ${brand.photographer}, photographer`,
      node: <Home />,
    }),
  ],
  ["/series", () => ({ title: "Series", node: <SeriesIndex /> })],
  [
    "/series/:slug",
    ({ slug }) => {
      const s = series.find((x) => x.slug === slug);
      return s
        ? { title: s.title, node: <SeriesPage series={s} key={s.slug} /> }
        : null;
    },
  ],
  ["/commissions", () => ({ title: "Commissions", node: <Commissions /> })],
  ["/prints", () => ({ title: "Prints", node: <Prints /> })],
  [
    "/prints/:id",
    ({ id }) => {
      const p = prints.find((x) => x.id === id);
      return p
        ? {
            title: `${findFrame(p.frameId)!.title} — print`,
            node: <PrintPage print={p} key={p.id} />,
          }
        : null;
    },
  ],
  ["/order", () => ({ title: "Your print order", node: <Order /> })],
  ["/about", () => ({ title: "About", node: <About /> })],
  ["/contact", () => ({ title: "Contact", node: <Contact /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Page not found", node: <NotFound /> };
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
      <main id="main" tabIndex={-1} ref={main} key={path}>
        {page.node}
      </main>
      <Footer />
    </>
  );
}
