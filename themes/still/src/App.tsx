import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, classes, teachers } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Classes } from "./pages/Classes";
import { ClassPage } from "./pages/ClassPage";
import { Teachers } from "./pages/Teachers";
import { TeacherPage } from "./pages/TeacherPage";
import { Memberships } from "./pages/Memberships";
import { Breathe } from "./pages/Breathe";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/schedule", () => ({ title: "This week's schedule", view: <Schedule /> })],
  ["/classes", () => ({ title: "Classes", view: <Classes /> })],
  [
    "/classes/:slug",
    ({ slug }) => {
      const c = classes.find((x) => x.slug === slug);
      return c
        ? { title: `${c.name} · Classes`, view: <ClassPage cls={c} /> }
        : null;
    },
  ],
  ["/teachers", () => ({ title: "Teachers", view: <Teachers /> })],
  [
    "/teachers/:slug",
    ({ slug }) => {
      const t = teachers.find((x) => x.slug === slug);
      return t
        ? { title: `${t.name} · Teachers`, view: <TeacherPage teacher={t} /> }
        : null;
    },
  ],
  [
    "/memberships",
    () => ({ title: "Memberships & passes", view: <Memberships /> }),
  ],
  ["/breathe", () => ({ title: "Breathing guide", view: <Breathe /> })],
  ["/book", () => ({ title: "Book a class", view: <Book /> })],
  ["/about", () => ({ title: "Our story", view: <About /> })],
  ["/visit", () => ({ title: "Your first visit", view: <Visit /> })],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

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
