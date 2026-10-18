import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, projects } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { Writing } from "./pages/Writing";
import { Post } from "./pages/Post";
import { Uses } from "./pages/Uses";
import { Resume } from "./pages/Resume";
import { About } from "./pages/About";
import { Now } from "./pages/Now";
import { Contact } from "./pages/Contact";
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
            title: `${project.name}: case study`,
            node: <Project project={project} key={slug} />,
          }
        : null;
    },
  ],
  ["/writing", () => ({ title: "Writing", node: <Writing /> })],
  [
    "/writing/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: post.title, node: <Post post={post} key={slug} /> }
        : null;
    },
  ],
  ["/uses", () => ({ title: "Uses", node: <Uses /> })],
  ["/resume", () => ({ title: "Résumé", node: <Resume /> })],
  ["/about", () => ({ title: "About", node: <About /> })],
  ["/now", () => ({ title: "Now", node: <Now /> })],
  ["/contact", () => ({ title: "Start a project", node: <Contact /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Not found", node: <NotFound /> };
}

export default function App() {
  const path = useRoute();
  const main = useRef<HTMLElement>(null);
  const page = resolve(path);
  const title = path === "/" ? page.title : `${page.title} — ${brand.person}`;
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
