import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, camps, coaches } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Lessons } from "./pages/Lessons";
import { Camps } from "./pages/Camps";
import { CampPage } from "./pages/CampPage";
import { ForecastPage } from "./pages/ForecastPage";
import { Coaches } from "./pages/Coaches";
import { CoachPage } from "./pages/CoachPage";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { Faq } from "./pages/Faq";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Surf school & camps at Gull Point`,
      view: <Home />,
    }),
  ],
  ["/lessons", () => ({ title: "Surf lessons", view: <Lessons /> })],
  ["/camps", () => ({ title: "Surf camps", view: <Camps /> })],
  [
    "/camps/:id",
    ({ id }) => {
      const camp = camps.find((c) => c.id === id);
      return camp
        ? { title: `${camp.name} · Surf camps`, view: <CampPage camp={camp} /> }
        : null;
    },
  ],
  ["/forecast", () => ({ title: "Surf report", view: <ForecastPage /> })],
  ["/coaches", () => ({ title: "Coaches", view: <Coaches /> })],
  [
    "/coaches/:id",
    ({ id }) => {
      const coach = coaches.find((c) => c.id === id);
      return coach
        ? {
            title: `${coach.name} · Coaches`,
            view: <CoachPage coach={coach} />,
          }
        : null;
    },
  ],
  ["/book", () => ({ title: "Book a lesson or camp", view: <Book /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
  ["/faq", () => ({ title: "FAQ", view: <Faq /> })],
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
