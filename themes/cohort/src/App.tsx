import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, companyBySlug, essayBySlug, partnerBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Company } from "./pages/Company";
import { Thesis } from "./pages/Thesis";
import { Team } from "./pages/Team";
import { Partner } from "./pages/Partner";
import { Writing } from "./pages/Writing";
import { Essay } from "./pages/Essay";
import { Founders } from "./pages/Founders";
import { Pitch } from "./pages/Pitch";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Venture capital for the industrial middle`,
      view: <Home />,
    }),
  ],
  ["/portfolio", () => ({ title: "Portfolio", view: <Portfolio /> })],
  [
    "/portfolio/:slug",
    ({ slug }) => {
      const c = companyBySlug(slug);
      return c
        ? {
            title: `${c.name} · Portfolio`,
            view: <Company key={slug} company={c} />,
          }
        : null;
    },
  ],
  ["/thesis", () => ({ title: "Thesis", view: <Thesis /> })],
  ["/team", () => ({ title: "Team", view: <Team /> })],
  [
    "/team/:slug",
    ({ slug }) => {
      const p = partnerBySlug(slug);
      return p
        ? {
            title: `${p.name} · Team`,
            view: <Partner key={slug} partner={p} />,
          }
        : null;
    },
  ],
  ["/writing", () => ({ title: "Writing", view: <Writing /> })],
  [
    "/writing/:slug",
    ({ slug }) => {
      const e = essayBySlug(slug);
      return e
        ? {
            title: `${e.title} · Writing`,
            view: <Essay key={slug} essay={e} />,
          }
        : null;
    },
  ],
  ["/founders", () => ({ title: "For founders", view: <Founders /> })],
  ["/pitch", () => ({ title: "Pitch us", view: <Pitch /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Not found", view: <NotFound /> };
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
