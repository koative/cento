import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, courses } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { CoursePage } from "./pages/CoursePage";
import { Timetable } from "./pages/Timetable";
import { LevelTest } from "./pages/LevelTest";
import { Teachers } from "./pages/Teachers";
import { Fees } from "./pages/Fees";
import { About } from "./pages/About";
import { Enrol } from "./pages/Enrol";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/courses", () => ({ title: "Courses", node: <Courses /> })],
  [
    "/courses/:id",
    ({ id }) => {
      const course = courses.find((c) => c.id === id);
      return course
        ? { title: course.title, node: <CoursePage course={course} /> }
        : null;
    },
  ],
  ["/timetable", () => ({ title: "Weekly timetable", node: <Timetable /> })],
  ["/level-test", () => ({ title: "Level test", node: <LevelTest /> })],
  ["/teachers", () => ({ title: "Teachers", node: <Teachers /> })],
  ["/fees", () => ({ title: "Fees & terms", node: <Fees /> })],
  ["/about", () => ({ title: "About the school", node: <About /> })],
  ["/enrol", () => ({ title: "Enrol", node: <Enrol /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Page not found", node: <NotFound /> };
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
      <main id="main" tabIndex={-1} ref={main} key={path}>
        {page.node}
      </main>
      <Footer />
    </>
  );
}
