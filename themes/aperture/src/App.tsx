import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, films } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { WhatsOn } from "./pages/WhatsOn";
import { FilmPage } from "./pages/FilmPage";
import { Book } from "./pages/Book";
import { Events } from "./pages/Events";
import { Membership } from "./pages/Membership";
import { Hire } from "./pages/Hire";
import { Visit } from "./pages/Visit";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Independent cinema on Tanner Street`,
      view: <Home />,
    }),
  ],
  ["/whats-on", () => ({ title: "What's on", view: <WhatsOn /> })],
  [
    "/films/:slug",
    ({ slug }) => {
      const film = films.find((f) => f.slug === slug);
      return film
        ? {
            title: `${film.title} (${film.year})`,
            view: <FilmPage film={film} />,
          }
        : null;
    },
  ],
  ["/book", () => ({ title: "Book tickets", view: <Book /> })],
  ["/events", () => ({ title: "Events & Q&As", view: <Events /> })],
  ["/membership", () => ({ title: "Membership", view: <Membership /> })],
  ["/hire", () => ({ title: "Venue hire", view: <Hire /> })],
  ["/visit", () => ({ title: "Visit & access", view: <Visit /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
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
