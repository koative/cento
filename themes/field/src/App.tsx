import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { articles, brand, teams } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Teams } from "./pages/Teams";
import { TeamPage } from "./pages/TeamPage";
import { Fixtures } from "./pages/Fixtures";
import { Join } from "./pages/Join";
import { Coaching } from "./pages/Coaching";
import { News } from "./pages/News";
import { ArticlePage } from "./pages/ArticlePage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Community football club in ${brand.town}`,
      view: <Home />,
    }),
  ],
  ["/teams", () => ({ title: "Teams", view: <Teams /> })],
  [
    "/teams/:slug",
    ({ slug }) => {
      const team = teams.find((t) => t.slug === slug);
      return team
        ? { title: `${team.name} · Teams`, view: <TeamPage team={team} /> }
        : null;
    },
  ],
  ["/fixtures", () => ({ title: "Fixtures & results", view: <Fixtures /> })],
  ["/join", () => ({ title: "Join the club", view: <Join /> })],
  ["/coaching", () => ({ title: "Coaching", view: <Coaching /> })],
  ["/news", () => ({ title: "Club news", view: <News /> })],
  [
    "/news/:slug",
    ({ slug }) => {
      const article = articles.find((a) => a.slug === slug);
      return article
        ? {
            title: `${article.title} · News`,
            view: <ArticlePage article={article} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "The club", view: <About /> })],
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
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
