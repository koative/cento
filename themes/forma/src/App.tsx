import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, projectBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectPage } from "./pages/ProjectPage";
import { Studio } from "./pages/Studio";
import { Process } from "./pages/Process";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/projects", () => ({ title: "Projects", node: <Projects /> })],
  [
    "/projects/:slug",
    ({ slug }) => {
      const project = projectBySlug(slug);
      return project
        ? {
            title: `${project.name}, ${project.place}`,
            node: <ProjectPage project={project} key={slug} />,
          }
        : null;
    },
  ],
  ["/studio", () => ({ title: "Studio", node: <Studio /> })],
  ["/process", () => ({ title: "Process and fees", node: <Process /> })],
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: post.title, node: <Article post={post} key={slug} /> }
        : null;
    },
  ],
  ["/contact", () => ({ title: "Start a project", node: <Contact /> })],
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
