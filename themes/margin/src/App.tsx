import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, cases } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { CaseStudy } from "./pages/CaseStudy";
import { Playground } from "./pages/Playground";
import { About } from "./pages/About";
import { Resume } from "./pages/Resume";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  [
    "/",
    () => ({
      title: `${brand.name} — ${brand.person}, product designer`,
      node: <Home />,
    }),
  ],
  ["/work", () => ({ title: "Case studies", node: <Work /> })],
  [
    "/work/:slug",
    ({ slug }) => {
      const c = cases.find((x) => x.slug === slug);
      return c
        ? {
            title: `${c.client}: ${c.title}`,
            node: <CaseStudy c={c} key={c.slug} />,
          }
        : null;
    },
  ],
  ["/playground", () => ({ title: "Playground", node: <Playground /> })],
  ["/about", () => ({ title: `About ${brand.person}`, node: <About /> })],
  ["/resume", () => ({ title: "Résumé", node: <Resume /> })],
  ["/contact", () => ({ title: "Start a project", node: <Contact /> })],
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
