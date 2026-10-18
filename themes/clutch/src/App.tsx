import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import {
  articles,
  brand,
  matches,
  opponents,
  players,
  products,
} from "./content";
import { day } from "./lib/format";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Teams } from "./pages/Teams";
import { PlayerPage } from "./pages/PlayerPage";
import { Matches } from "./pages/Matches";
import { MatchPage } from "./pages/MatchPage";
import { News } from "./pages/News";
import { ArticlePage } from "./pages/ArticlePage";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { Partners } from "./pages/Partners";
import { Club } from "./pages/Club";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Esports club from ${brand.city}`,
      view: <Home />,
    }),
  ],
  ["/teams", () => ({ title: "Teams & rosters", view: <Teams /> })],
  [
    "/players/:id",
    ({ id }) => {
      const p = players.find((x) => x.id === id);
      return p
        ? {
            title: `${p.handle} (${p.name}) · Players`,
            view: <PlayerPage player={p} />,
          }
        : null;
    },
  ],
  ["/matches", () => ({ title: "Matches & results", view: <Matches /> })],
  [
    "/matches/:id",
    ({ id }) => {
      const m = matches.find((x) => x.id === id);
      return m
        ? {
            title: `${brand.name} vs ${opponents[m.opponent].name}, ${day(m.date)} · ${m.event}`,
            view: <MatchPage match={m} />,
          }
        : null;
    },
  ],
  ["/news", () => ({ title: "News", view: <News /> })],
  [
    "/news/:slug",
    ({ slug }) => {
      const a = articles.find((x) => x.slug === slug);
      return a
        ? { title: `${a.title} · News`, view: <ArticlePage article={a} /> }
        : null;
    },
  ],
  ["/shop", () => ({ title: "Shop", view: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const p = products.find((x) => x.id === id);
      return p
        ? { title: `${p.name} · Shop`, view: <ProductPage product={p} /> }
        : null;
    },
  ],
  ["/cart", () => ({ title: "Bag & checkout", view: <Cart /> })],
  ["/partners", () => ({ title: "Partners", view: <Partners /> })],
  ["/club", () => ({ title: "The club & Clutch House", view: <Club /> })],
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
