import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  apiPage,
  brand,
  changelogPage,
  endpoints,
  guides,
  guidesPage,
  home,
  notFound,
  playgroundPage,
  resources,
  searchPage,
  support,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import Guide from "./pages/Guide";
import Api from "./pages/Api";
import Resource from "./pages/Resource";
import Playground from "./pages/Playground";
import Changelog from "./pages/Changelog";
import Search from "./pages/Search";
import About from "./pages/About";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.site}`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/guides", () => [site(guidesPage.title), <Guides />]],
  [
    "/guides/:slug",
    ({ slug }) => {
      const guide = guides.find((g) => g.slug === slug);
      return guide ? [site(guide.title), <Guide guide={guide} />] : null;
    },
  ],
  ["/api", () => [site(apiPage.title), <Api />]],
  [
    "/api/:slug",
    ({ slug }) => {
      const resource = resources.find((r) => r.slug === slug);
      return resource
        ? [site(`${resource.name} API`), <Resource resource={resource} />]
        : null;
    },
  ],
  [
    "/playground",
    () => [site(playgroundPage.title), <Playground op={endpoints[0].op} />],
  ],
  [
    "/playground/:op",
    ({ op }) =>
      endpoints.some((e) => e.op === op)
        ? [site(`${op} · ${playgroundPage.title}`), <Playground op={op} />]
        : null,
  ],
  ["/changelog", () => [site(changelogPage.title), <Changelog />]],
  ["/search", () => [site(searchPage.title), <Search />]],
  ["/about", () => [site(about.title), <About />]],
  ["/support", () => [site(support.title), <Support />]],
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
      <main id="main" tabIndex={-1} ref={mainRef} key={path}>
        {page}
      </main>
      <Footer />
    </>
  );
}
