import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  brand,
  courses,
  home,
  instructors,
  notFound,
  pricing,
  signin,
  signup,
  workspace,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LearnShell } from "./components/LearnShell";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Instructors from "./pages/Instructors";
import Instructor from "./pages/Instructor";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LearnDesk from "./pages/LearnDesk";
import LearnLesson from "./pages/LearnLesson";
import LearnNotes from "./pages/LearnNotes";
import NotFound from "./pages/NotFound";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const desk = (s: string) => `${s} — ${brand.name} workspace`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/courses", () => [site("All courses"), <Courses />]],
  [
    "/courses/:slug",
    ({ slug }) => {
      const course = courses.find((c) => c.slug === slug);
      return course ? [site(course.title), <Course course={course} />] : null;
    },
  ],
  ["/instructors", () => [site("Instructors"), <Instructors />]],
  [
    "/instructors/:slug",
    ({ slug }) => {
      const person = instructors.find((i) => i.slug === slug);
      return person
        ? [site(`${person.name}, instructor`), <Instructor person={person} />]
        : null;
    },
  ],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/about", () => [site(about.title), <About />]],
  ["/signup", () => [site(signup.title), <SignUp />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/learn", () => [desk("Your desk"), <LearnDesk />]],
  ["/learn/notes", () => [desk("Notebook"), <LearnNotes />]],
  [
    "/learn/:lesson",
    ({ lesson }) => {
      const found = workspace.lessons.find((l) => l.id === lesson);
      return found ? [desk(found.title), <LearnLesson lesson={found} />] : null;
    },
  ],
];

function resolve(path: string): [string, ReactNode] | null {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return null;
}

export default function App() {
  const path = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const found = resolve(path);
  const [title, page] = found ?? [site(notFound.title), <NotFound />];
  const inDesk =
    found !== null && (path === "/learn" || path.startsWith("/learn/"));
  usePageChange(mainRef, title);

  return (
    <div className={inDesk ? "desk-shell" : "site-shell"}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {inDesk ? <LearnShell /> : <Header />}
      <main
        id="main"
        tabIndex={-1}
        ref={mainRef}
        key={path}
        className={inDesk ? "desk-main" : "site-main"}
      >
        {page}
      </main>
      {!inDesk && <Footer />}
    </div>
  );
}
