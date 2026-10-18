import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, weddings } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Planner } from "./pages/Planner";
import { Weddings } from "./pages/Weddings";
import { WeddingStory } from "./pages/WeddingStory";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Enquire } from "./pages/Enquire";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/services", () => ({ title: "Services and fees", node: <Services /> })],
  ["/planner", () => ({ title: "Countdown planner", node: <Planner /> })],
  ["/weddings", () => ({ title: "Weddings", node: <Weddings /> })],
  [
    "/weddings/:slug",
    ({ slug }) => {
      const w = weddings.find((x) => x.slug === slug);
      return w
        ? {
            title: `${w.couple} at ${w.venue}`,
            node: <WeddingStory w={w} key={w.slug} />,
          }
        : null;
    },
  ],
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const p = posts.find((x) => x.slug === slug);
      return p
        ? { title: p.title, node: <Article post={p} key={p.slug} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "The studio", node: <About /> })],
  ["/enquire", () => ({ title: "Enquire", node: <Enquire /> })],
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
