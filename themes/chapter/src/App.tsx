import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, episodes, hosts, shows } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Dock } from "./components/Dock";
import { Home } from "./pages/Home";
import { Shows } from "./pages/Shows";
import { ShowPage } from "./pages/ShowPage";
import { Episodes } from "./pages/Episodes";
import { EpisodePage } from "./pages/EpisodePage";
import { Hosts } from "./pages/Hosts";
import { HostPage } from "./pages/HostPage";
import { Newsletter } from "./pages/Newsletter";
import { Advertise } from "./pages/Advertise";
import { About } from "./pages/About";
import { ListeningList } from "./pages/ListeningList";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.tagline}`, view: <Home /> })],
  ["/shows", () => ({ title: "Shows", view: <Shows /> })],
  [
    "/shows/:slug",
    ({ slug }) => {
      const show = shows.find((s) => s.slug === slug);
      return show
        ? { title: show.title, view: <ShowPage show={show} /> }
        : null;
    },
  ],
  ["/episodes", () => ({ title: "Every episode", view: <Episodes /> })],
  [
    "/episodes/:id",
    ({ id }) => {
      const ep = episodes.find((e) => e.id === id);
      const show = ep && shows.find((s) => s.slug === ep.show);
      return ep && show
        ? {
            title: `${ep.title} · ${show.title}`,
            view: <EpisodePage ep={ep} show={show} />,
          }
        : null;
    },
  ],
  ["/hosts", () => ({ title: "Hosts", view: <Hosts /> })],
  [
    "/hosts/:slug",
    ({ slug }) => {
      const host = hosts.find((h) => h.slug === slug);
      return host
        ? { title: `${host.name} · Hosts`, view: <HostPage host={host} /> }
        : null;
    },
  ],
  [
    "/newsletter",
    () => ({ title: "The Margin newsletter", view: <Newsletter /> }),
  ],
  ["/advertise", () => ({ title: "Advertise", view: <Advertise /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
  [
    "/listening-list",
    () => ({ title: "Your listening list", view: <ListeningList /> }),
  ],
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
      <Dock />
    </>
  );
}
