import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, episodes, programmes, resources } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Programmes } from "./pages/Programmes";
import { ProgrammePage } from "./pages/ProgrammePage";
import { Resources } from "./pages/Resources";
import { ResourcePage } from "./pages/ResourcePage";
import { Podcast } from "./pages/Podcast";
import { EpisodePage } from "./pages/EpisodePage";
import { Stories } from "./pages/Stories";
import { About } from "./pages/About";
import { Apply } from "./pages/Apply";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Coaching and courses for new managers`,
      view: <Home />,
    }),
  ],
  ["/programmes", () => ({ title: "Programmes", view: <Programmes /> })],
  [
    "/programmes/:slug",
    ({ slug }) => {
      const p = programmes.find((x) => x.slug === slug);
      return p
        ? { title: `${p.name} · Programmes`, view: <ProgrammePage p={p} /> }
        : null;
    },
  ],
  ["/resources", () => ({ title: "Free resources", view: <Resources /> })],
  [
    "/resources/:slug",
    ({ slug }) => {
      const r = resources.find((x) => x.slug === slug);
      return r
        ? { title: `${r.title} · Free resources`, view: <ResourcePage r={r} /> }
        : null;
    },
  ],
  [
    "/podcast",
    () => ({ title: "The Monday One-on-One podcast", view: <Podcast /> }),
  ],
  [
    "/podcast/:slug",
    ({ slug }) => {
      const ep = episodes.find((x) => x.slug === slug);
      return ep
        ? {
            title: `Ep. ${ep.number}: ${ep.title} · Podcast`,
            view: <EpisodePage ep={ep} />,
          }
        : null;
    },
  ],
  ["/stories", () => ({ title: "Stories", view: <Stories /> })],
  ["/about", () => ({ title: "About Margo", view: <About /> })],
  ["/apply", () => ({ title: "Apply for coaching", view: <Apply /> })],
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
