import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { articleBySlug, brand, coverBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CoverList } from "./pages/CoverList";
import { CoverPage } from "./pages/CoverPage";
import { Quote } from "./pages/Quote";
import { Claims } from "./pages/Claims";
import { Help } from "./pages/Help";
import { HelpArticle } from "./pages/HelpArticle";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/cover", () => ({ title: "Cover", view: <CoverList /> })],
  [
    "/cover/:slug",
    ({ slug }) => {
      const cover = coverBySlug(slug);
      return cover
        ? {
            title: `${cover.name} insurance`,
            view: <CoverPage cover={cover} />,
          }
        : null;
    },
  ],
  ["/quote", () => ({ title: "Get a quote", view: <Quote /> })],
  ["/claims", () => ({ title: "Making a claim", view: <Claims /> })],
  ["/help", () => ({ title: "Help centre", view: <Help /> })],
  [
    "/help/:slug",
    ({ slug }) => {
      const article = articleBySlug(slug);
      return article
        ? {
            title: `${article.title} · Help centre`,
            view: <HelpArticle article={article} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "About the mutual", view: <About /> })],
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
