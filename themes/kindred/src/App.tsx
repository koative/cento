import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { animals, brand } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Animals } from "./pages/Animals";
import { AnimalPage } from "./pages/AnimalPage";
import { Match } from "./pages/Match";
import { Adopt } from "./pages/Adopt";
import { Apply } from "./pages/Apply";
import { Volunteer } from "./pages/Volunteer";
import { Donate } from "./pages/Donate";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Animal shelter & adoption`,
      view: <Home />,
    }),
  ],
  ["/animals", () => ({ title: "Adoptable animals", view: <Animals /> })],
  [
    "/animals/:id",
    ({ id }) => {
      const a = animals.find((x) => x.id === id);
      return a
        ? {
            title: `${a.name}, ${a.breed.toLowerCase()} · Adopt`,
            view: <AnimalPage animal={a} />,
          }
        : null;
    },
  ],
  ["/match", () => ({ title: "Matching quiz", view: <Match /> })],
  ["/adopt", () => ({ title: "How adoption works", view: <Adopt /> })],
  ["/apply", () => ({ title: "Adoption application", view: <Apply /> })],
  [
    "/apply/:id",
    ({ id }) => {
      const a = animals.find((x) => x.id === id);
      return a
        ? {
            title: `Apply to adopt ${a.name}`,
            view: <Apply key={a.id} animal={a} />,
          }
        : null;
    },
  ],
  ["/volunteer", () => ({ title: "Volunteer & foster", view: <Volunteer /> })],
  ["/donate", () => ({ title: "Donate", view: <Donate /> })],
  ["/about", () => ({ title: "About & visiting", view: <About /> })],
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
