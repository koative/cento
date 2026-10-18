import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  access,
  brand,
  careers,
  home,
  notFound,
  papers,
  pricing,
  research,
  roadmap,
  systems,
  team,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Systems from "./pages/Systems";
import SystemPage from "./pages/SystemPage";
import Roadmap from "./pages/Roadmap";
import Pricing from "./pages/Pricing";
import Research from "./pages/Research";
import PaperPage from "./pages/PaperPage";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Access from "./pages/Access";
import NotFound from "./pages/NotFound";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/systems", () => [site("Systems"), <Systems />]],
  [
    "/systems/:slug",
    ({ slug }) => {
      const system = systems.find((s) => s.slug === slug);
      return system
        ? [site(`${system.name} system`), <SystemPage system={system} />]
        : null;
    },
  ],
  ["/roadmap", () => [site(roadmap.title), <Roadmap />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/research", () => [site(research.title), <Research />]],
  [
    "/research/:slug",
    ({ slug }) => {
      const paper = papers.find((p) => p.slug === slug);
      return paper ? [site(paper.title), <PaperPage paper={paper} />] : null;
    },
  ],
  ["/team", () => [site(team.title), <Team />]],
  ["/careers", () => [site(careers.title), <Careers />]],
  ["/access", () => [site(access.title), <Access />]],
];

function resolve(path: string): [string, ReactNode] | null {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return null;
}

export default function App() {
  const path = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const [title, page] = resolve(path) ?? [site(notFound.title), <NotFound />];
  usePageChange(mainRef, title);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        ref={mainRef}
        key={path}
        className="site-main"
      >
        {page}
      </main>
      <Footer />
    </>
  );
}
