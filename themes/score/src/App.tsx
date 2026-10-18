import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, recitals, teachers } from "./content";
import { recitalDate } from "./lib/format";
import { programmeBySlug } from "./lib/school";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Programmes } from "./pages/Programmes";
import { ProgrammePage } from "./pages/ProgrammePage";
import { Teachers } from "./pages/Teachers";
import { TeacherPage } from "./pages/TeacherPage";
import { Recitals } from "./pages/Recitals";
import { RecitalPage } from "./pages/RecitalPage";
import { Practice } from "./pages/Practice";
import { Fees } from "./pages/Fees";
import { About } from "./pages/About";
import { Trial } from "./pages/Trial";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({ title: `${brand.full} — Lessons for every age`, view: <Home /> }),
  ],
  ["/programmes", () => ({ title: "Programmes", view: <Programmes /> })],
  [
    "/programmes/:slug",
    ({ slug }) => {
      const p = programmeBySlug(slug);
      return p
        ? { title: `${p.name} lessons`, view: <ProgrammePage p={p} /> }
        : null;
    },
  ],
  ["/teachers", () => ({ title: "Teachers", view: <Teachers /> })],
  [
    "/teachers/:slug",
    ({ slug }) => {
      const t = teachers.find((x) => x.slug === slug);
      return t
        ? { title: `${t.name} · Teachers`, view: <TeacherPage t={t} /> }
        : null;
    },
  ],
  ["/recitals", () => ({ title: "Recitals & concerts", view: <Recitals /> })],
  [
    "/recitals/:id",
    ({ id }) => {
      const r = recitals.find((x) => x.id === id);
      return r
        ? {
            title: `${r.title} · Recitals`,
            view: <RecitalPage r={{ ...r, date: recitalDate(r) }} />,
          }
        : null;
    },
  ],
  ["/practice", () => ({ title: "Practice room", view: <Practice /> })],
  ["/fees", () => ({ title: "Fees & terms", view: <Fees /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
  ["/trial", () => ({ title: "Book a trial lesson", view: <Trial /> })],
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
