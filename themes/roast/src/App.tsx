import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, coffees, guides } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Product } from "./pages/Product";
import { Subscribe } from "./pages/Subscribe";
import { Guides } from "./pages/Guides";
import { GuidePage } from "./pages/GuidePage";
import { Cafes } from "./pages/Cafes";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop coffee", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const coffee = coffees.find((c) => c.id === id);
      return coffee
        ? {
            title: coffee.name,
            node: <Product coffee={coffee} key={coffee.id} />,
          }
        : null;
    },
  ],
  ["/subscribe", () => ({ title: "Subscriptions", node: <Subscribe /> })],
  ["/brew", () => ({ title: "Brew guides", node: <Guides /> })],
  [
    "/brew/:slug",
    ({ slug }) => {
      const guide = guides.find((g) => g.slug === slug);
      return guide
        ? {
            title: `${guide.name} guide`,
            node: <GuidePage guide={guide} key={guide.slug} />,
          }
        : null;
    },
  ],
  ["/cafes", () => ({ title: "Cafés", node: <Cafes /> })],
  ["/about", () => ({ title: "Our story", node: <About /> })],
  ["/cart", () => ({ title: "Your bag", node: <Cart /> })],
  ["/checkout", () => ({ title: "Checkout", node: <Checkout /> })],
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
