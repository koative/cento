import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, jobs, projects } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { ProjectPage } from "./pages/ProjectPage";
import { Safety } from "./pages/Safety";
import { Careers } from "./pages/Careers";
import { JobPage } from "./pages/JobPage";
import { About } from "./pages/About";
import { Tender } from "./pages/Tender";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  ["/projects", () => ({ title: "Projects", view: <Projects /> })],
  [
    "/projects/:slug",
    ({ slug }) => {
      const p = projects.find((x) => x.slug === slug);
      return p
        ? {
            title: `${p.name} · Projects`,
            view: <ProjectPage key={p.slug} project={p} />,
          }
        : null;
    },
  ],
  ["/safety", () => ({ title: "Safety", view: <Safety /> })],
  ["/careers", () => ({ title: "Careers", view: <Careers /> })],
  [
    "/careers/:id",
    ({ id }) => {
      const j = jobs.find((x) => x.id === id);
      return j
        ? {
            title: `${j.title} · Careers`,
            view: <JobPage key={j.id} job={j} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "About", view: <About /> })],
  ["/tender", () => ({ title: "Tenders and quotes", view: <Tender /> })],
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
