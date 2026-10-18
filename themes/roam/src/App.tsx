import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, cars, stations } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Fleet } from "./pages/Fleet";
import { CarPage } from "./pages/CarPage";
import { Book } from "./pages/Book";
import { Locations } from "./pages/Locations";
import { LocationPage } from "./pages/LocationPage";
import { Deals } from "./pages/Deals";
import { Faq } from "./pages/Faq";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Car rental from the coast to the passes`,
      view: <Home />,
    }),
  ],
  ["/fleet", () => ({ title: "Fleet", view: <Fleet /> })],
  [
    "/fleet/:id",
    ({ id }) => {
      const car = cars.find((c) => c.id === id);
      return car
        ? { title: `${car.name} · Fleet`, view: <CarPage car={car} /> }
        : null;
    },
  ],
  ["/book", () => ({ title: "Book a car", view: <Book /> })],
  ["/locations", () => ({ title: "Locations", view: <Locations /> })],
  [
    "/locations/:id",
    ({ id }) => {
      const station = stations.find((s) => s.id === id);
      return station
        ? {
            title: `${station.short} · Locations`,
            view: <LocationPage station={station} />,
          }
        : null;
    },
  ],
  ["/deals", () => ({ title: "Deals", view: <Deals /> })],
  ["/faq", () => ({ title: "FAQ", view: <Faq /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Wrong turn", view: <NotFound /> };
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
