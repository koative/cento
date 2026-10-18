import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, materials, projects } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectPage } from "./pages/ProjectPage";
import { Services } from "./pages/Services";
import { Process } from "./pages/Process";
import { Materials } from "./pages/Materials";
import { MaterialPage } from "./pages/MaterialPage";
import { SampleBoard } from "./pages/SampleBoard";
import { Studio } from "./pages/Studio";
import { Consultation } from "./pages/Consultation";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/projects", () => ({ title: "Projects", node: <Projects /> })],
  [
    "/projects/:slug",
    ({ slug }) => {
      const project = projects.find((p) => p.slug === slug);
      return project
        ? {
            title: `${project.name}, ${project.place}`,
            node: <ProjectPage project={project} key={slug} />,
          }
        : null;
    },
  ],
  ["/services", () => ({ title: "Services and fees", node: <Services /> })],
  ["/process", () => ({ title: "How a project runs", node: <Process /> })],
  ["/materials", () => ({ title: "Material library", node: <Materials /> })],
  [
    "/materials/:id",
    ({ id }) => {
      const material = materials.find((m) => m.id === id);
      return material
        ? {
            title: `${material.name} — material library`,
            node: <MaterialPage material={material} key={id} />,
          }
        : null;
    },
  ],
  ["/samples", () => ({ title: "Your sample board", node: <SampleBoard /> })],
  ["/studio", () => ({ title: "The studio", node: <Studio /> })],
  [
    "/consultation",
    () => ({ title: "Book a consultation", node: <Consultation /> }),
  ],
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
