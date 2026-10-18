import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, campaigns, events } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Campaigns } from "./pages/Campaigns";
import { Campaign } from "./pages/Campaign";
import { Donate } from "./pages/Donate";
import { Events } from "./pages/Events";
import { Event } from "./pages/Event";
import { Volunteer } from "./pages/Volunteer";
import { Reports } from "./pages/Reports";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/campaigns", () => ({ title: "Campaigns", node: <Campaigns /> })],
  [
    "/campaigns/:slug",
    ({ slug }) => {
      const c = campaigns.find((x) => x.slug === slug);
      return c
        ? { title: c.title, node: <Campaign campaign={c} key={c.slug} /> }
        : null;
    },
  ],
  ["/donate", () => ({ title: "Donate", node: <Donate /> })],
  ["/events", () => ({ title: "Events", node: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const e = events.find((x) => x.id === id);
      return e
        ? { title: e.title, node: <Event event={e} key={e.id} /> }
        : null;
    },
  ],
  ["/volunteer", () => ({ title: "Volunteer", node: <Volunteer /> })],
  ["/reports", () => ({ title: "Reports & open books", node: <Reports /> })],
  ["/about", () => ({ title: "About us", node: <About /> })],
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
