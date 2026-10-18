import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, capabilities, insights } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Capabilities } from "./pages/Capabilities";
import { CapabilityPage } from "./pages/CapabilityPage";
import { Industries } from "./pages/Industries";
import { Insights } from "./pages/Insights";
import { Article } from "./pages/Article";
import { People } from "./pages/People";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/capabilities", () => ({ title: "Capabilities", view: <Capabilities /> })],
  [
    "/capabilities/:slug",
    ({ slug }) => {
      const cap = capabilities.find((c) => c.slug === slug);
      return cap
        ? {
            title: `${cap.name} · Capabilities`,
            view: <CapabilityPage cap={cap} />,
          }
        : null;
    },
  ],
  ["/industries", () => ({ title: "Industries", view: <Industries /> })],
  ["/insights", () => ({ title: "Insights", view: <Insights /> })],
  [
    "/insights/:slug",
    ({ slug }) => {
      const post = insights.find((p) => p.slug === slug);
      return post
        ? { title: `${post.title} · Insights`, view: <Article post={post} /> }
        : null;
    },
  ],
  ["/people", () => ({ title: "People", view: <People /> })],
  ["/careers", () => ({ title: "Careers", view: <Careers /> })],
  ["/contact", () => ({ title: "Contact", view: <Contact /> })],
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
