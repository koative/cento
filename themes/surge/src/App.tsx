import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, caseBySlug, serviceBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Work } from "./pages/Work";
import { CasePage } from "./pages/CasePage";
import { Roi } from "./pages/Roi";
import { Team } from "./pages/Team";
import { Approach } from "./pages/Approach";
import { Proposal } from "./pages/Proposal";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Growth marketing agency`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services", view: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const s = serviceBySlug(slug);
      return s
        ? { title: `${s.name} · Services`, view: <ServicePage service={s} /> }
        : null;
    },
  ],
  ["/work", () => ({ title: "Case studies", view: <Work /> })],
  [
    "/work/:slug",
    ({ slug }) => {
      const c = caseBySlug(slug);
      return c
        ? { title: `${c.client} case study`, view: <CasePage study={c} /> }
        : null;
    },
  ],
  ["/roi", () => ({ title: "ROI model", view: <Roi /> })],
  ["/approach", () => ({ title: "Approach", view: <Approach /> })],
  ["/team", () => ({ title: "Team", view: <Team /> })],
  ["/proposal", () => ({ title: "Request a proposal", view: <Proposal /> })],
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
