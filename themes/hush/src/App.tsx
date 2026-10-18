import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, guides, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Story } from "./pages/Story";
import { Compare } from "./pages/Compare";
import { Support } from "./pages/Support";
import { GuidePage } from "./pages/GuidePage";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop headphones", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const product = products.find((p) => p.id === id);
      return product
        ? {
            title: product.name,
            node: <ProductPage product={product} key={product.id} />,
          }
        : null;
    },
  ],
  ["/story", () => ({ title: "The Hush One story", node: <Story /> })],
  ["/compare", () => ({ title: "Compare models", node: <Compare /> })],
  ["/support", () => ({ title: "Support", node: <Support /> })],
  [
    "/support/:slug",
    ({ slug }) => {
      const guide = guides.find((g) => g.slug === slug);
      return guide
        ? {
            title: guide.title,
            node: <GuidePage guide={guide} key={guide.slug} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "About", node: <About /> })],
  ["/cart", () => ({ title: "Your cart", node: <Cart /> })],
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
