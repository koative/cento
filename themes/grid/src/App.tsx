import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  brand,
  casesPage,
  caseStudies,
  financing,
  home,
  howItWorks,
  notFound,
  planner,
  products,
  productsPage,
  quotePage,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Products from "./pages/Products";
import ProductPage from "./pages/Product";
import Financing from "./pages/Financing";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyPage from "./pages/CaseStudy";
import About from "./pages/About";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/planner", () => [site(planner.title), <Planner />]],
  ["/products", () => [site(productsPage.title), <Products />]],
  [
    "/products/:id",
    ({ id }) => {
      const p = products.find((x) => x.id === id);
      return p ? [site(p.name), <ProductPage product={p} />] : null;
    },
  ],
  ["/financing", () => [site(financing.title), <Financing />]],
  ["/how-it-works", () => [site(howItWorks.title), <HowItWorks />]],
  ["/case-studies", () => [site(casesPage.title), <CaseStudies />]],
  [
    "/case-studies/:slug",
    ({ slug }) => {
      const c = caseStudies.find((x) => x.slug === slug);
      return c
        ? [site(`${c.place} case study`), <CaseStudyPage study={c} />]
        : null;
    },
  ],
  ["/about", () => [site("About"), <About />]],
  ["/quote", () => [site(quotePage.title), <Quote />]],
];

function resolve(path: string): [string, ReactNode] | null {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return null;
}

export default function App() {
  const path = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const [title, page] = resolve(path) ?? [site(notFound.title), <NotFound />];
  usePageChange(mainRef, title);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        ref={mainRef}
        key={path}
        className="site-main"
      >
        {page}
      </main>
      <Footer />
    </>
  );
}
