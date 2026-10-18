import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { agents, areas, brand, listings } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Homes } from "./pages/Homes";
import { ListingPage } from "./pages/ListingPage";
import { Sell } from "./pages/Sell";
import { Neighborhoods } from "./pages/Neighborhoods";
import { NeighborhoodPage } from "./pages/NeighborhoodPage";
import { Agents } from "./pages/Agents";
import { AgentPage } from "./pages/AgentPage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Saved } from "./pages/Saved";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/homes", () => ({ title: "Homes for sale and to rent", node: <Homes /> })],
  [
    "/homes/:id",
    ({ id }) => {
      const l = listings.find((x) => x.id === id);
      return l
        ? { title: l.address, node: <ListingPage listing={l} key={l.id} /> }
        : null;
    },
  ],
  ["/sell", () => ({ title: "Sell or let your home", node: <Sell /> })],
  [
    "/neighborhoods",
    () => ({ title: "Neighborhood guides", node: <Neighborhoods /> }),
  ],
  [
    "/neighborhoods/:slug",
    ({ slug }) => {
      const a = areas.find((x) => x.slug === slug);
      return a
        ? {
            title: `${a.name} neighborhood guide`,
            node: <NeighborhoodPage area={a} key={a.slug} />,
          }
        : null;
    },
  ],
  ["/agents", () => ({ title: "Our agents", node: <Agents /> })],
  [
    "/agents/:id",
    ({ id }) => {
      const a = agents.find((x) => x.id === id);
      return a
        ? {
            title: `${a.name}, ${a.role}`,
            node: <AgentPage agent={a} key={a.id} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "About & fees", node: <About /> })],
  ["/contact", () => ({ title: "Contact the office", node: <Contact /> })],
  ["/saved", () => ({ title: "Saved homes", node: <Saved /> })],
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
