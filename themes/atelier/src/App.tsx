import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, caseBySlug, home, roleById } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { CaseStudy } from "./pages/CaseStudy";
import { Services } from "./pages/Services";
import { Studio } from "./pages/Studio";
import { Careers } from "./pages/Careers";
import { RolePage } from "./pages/RolePage";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: home.title, view: <Home /> })],
  ["/work", () => ({ title: "Work", view: <Work /> })],
  [
    "/work/:slug",
    ({ slug }) => {
      const c = caseBySlug(slug);
      return c
        ? {
            title: `${c.client} · Work`,
            view: <CaseStudy c={c} key={c.slug} />,
          }
        : null;
    },
  ],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  ["/studio", () => ({ title: "Studio", view: <Studio /> })],
  ["/careers", () => ({ title: "Careers", view: <Careers /> })],
  [
    "/careers/:id",
    ({ id }) => {
      const role = roleById(id);
      return role
        ? {
            title: `${role.title} · Careers`,
            view: <RolePage role={role} key={role.id} />,
          }
        : null;
    },
  ],
  ["/contact", () => ({ title: "Start a brief", view: <Contact /> })],
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
