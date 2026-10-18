import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, capabilities } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Capabilities } from "./pages/Capabilities";
import { CapabilityPage } from "./pages/CapabilityPage";
import { ConfiguratorPage } from "./pages/ConfiguratorPage";
import { Industries } from "./pages/Industries";
import { Quality } from "./pages/Quality";
import { About } from "./pages/About";
import { Rfq } from "./pages/Rfq";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Precision machining to print`,
      view: <Home />,
    }),
  ],
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
  [
    "/configurator",
    () => ({ title: "Part configurator", view: <ConfiguratorPage /> }),
  ],
  ["/industries", () => ({ title: "Industries", view: <Industries /> })],
  ["/quality", () => ({ title: "Quality", view: <Quality /> })],
  ["/about", () => ({ title: "About & careers", view: <About /> })],
  ["/rfq", () => ({ title: "Request a quote", view: <Rfq /> })],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
