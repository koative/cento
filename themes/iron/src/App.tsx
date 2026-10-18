import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, classes, trainers } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Timetable } from "./pages/Timetable";
import { Classes } from "./pages/Classes";
import { ClassPage } from "./pages/ClassPage";
import { Trainers } from "./pages/Trainers";
import { TrainerPage } from "./pages/TrainerPage";
import { Memberships } from "./pages/Memberships";
import { Programme } from "./pages/Programme";
import { Join } from "./pages/Join";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Barbell gym & personal training`,
      view: <Home />,
    }),
  ],
  ["/timetable", () => ({ title: "Timetable", view: <Timetable /> })],
  ["/classes", () => ({ title: "Classes", view: <Classes /> })],
  [
    "/classes/:id",
    ({ id }) => {
      const c = classes.find((x) => x.id === id);
      return c
        ? { title: `${c.name} · Classes`, view: <ClassPage key={c.id} c={c} /> }
        : null;
    },
  ],
  ["/trainers", () => ({ title: "Trainers", view: <Trainers /> })],
  [
    "/trainers/:id",
    ({ id }) => {
      const t = trainers.find((x) => x.id === id);
      return t
        ? {
            title: `${t.name} · Trainers`,
            view: <TrainerPage key={t.id} t={t} />,
          }
        : null;
    },
  ],
  ["/memberships", () => ({ title: "Memberships", view: <Memberships /> })],
  ["/programme", () => ({ title: "Programme builder", view: <Programme /> })],
  ["/join", () => ({ title: "Join", view: <Join /> })],
  ["/about", () => ({ title: "The gym", view: <About /> })],
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
