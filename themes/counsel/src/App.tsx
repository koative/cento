import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, insights } from "./content";
import { areaBySlug, personBySlug } from "./lib/util";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Practice } from "./pages/Practice";
import { Area } from "./pages/Area";
import { People } from "./pages/People";
import { Profile } from "./pages/Profile";
import { Insights } from "./pages/Insights";
import { Article } from "./pages/Article";
import { Firm } from "./pages/Firm";
import { Fees } from "./pages/Fees";
import { Enquiry } from "./pages/Enquiry";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/practice", () => ({ title: "Practice areas", node: <Practice /> })],
  [
    "/practice/:slug",
    ({ slug }) => {
      const area = areaBySlug(slug);
      return area
        ? { title: area.name, node: <Area area={area} key={slug} /> }
        : null;
    },
  ],
  ["/people", () => ({ title: "People", node: <People /> })],
  [
    "/people/:slug",
    ({ slug }) => {
      const person = personBySlug(slug);
      return person
        ? {
            title: `${person.name}, ${person.role}`,
            node: <Profile person={person} key={slug} />,
          }
        : null;
    },
  ],
  ["/insights", () => ({ title: "Insights", node: <Insights /> })],
  [
    "/insights/:slug",
    ({ slug }) => {
      const insight = insights.find((i) => i.slug === slug);
      return insight
        ? {
            title: insight.title,
            node: <Article insight={insight} key={slug} />,
          }
        : null;
    },
  ],
  ["/firm", () => ({ title: "The firm", node: <Firm /> })],
  ["/fees", () => ({ title: "Fees & engagement", node: <Fees /> })],
  ["/enquiry", () => ({ title: "Make an enquiry", node: <Enquiry /> })],
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
