import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand } from "./content";
import { filmBySlug } from "./lib/format";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Films } from "./pages/Films";
import { FilmPage } from "./pages/FilmPage";
import { Screenings } from "./pages/Screenings";
import { Services } from "./pages/Services";
import { Studio } from "./pages/Studio";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Documentary film production`,
      view: <Home />,
    }),
  ],
  ["/films", () => ({ title: "Films", view: <Films /> })],
  [
    "/films/:slug",
    ({ slug }) => {
      const film = filmBySlug(slug);
      return film
        ? {
            title: `${film.title} (${film.year}) · Films`,
            view: <FilmPage film={film} />,
          }
        : null;
    },
  ],
  ["/screenings", () => ({ title: "Screenings", view: <Screenings /> })],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  ["/studio", () => ({ title: "Studio & team", view: <Studio /> })],
  ["/contact", () => ({ title: "Contact", view: <Contact /> })],
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
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
