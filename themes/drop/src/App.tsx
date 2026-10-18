import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, drops, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Drops } from "./pages/Drops";
import { DropPage } from "./pages/DropPage";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Lookbook } from "./pages/Lookbook";
import { Raffle } from "./pages/Raffle";
import { Store } from "./pages/Store";
import { Help } from "./pages/Help";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/drops", () => ({ title: "Drops calendar", node: <Drops /> })],
  [
    "/drops/:id",
    ({ id }) => {
      const drop = drops.find((d) => d.id === id);
      return drop
        ? {
            title: `${drop.name} (Drop ${drop.number})`,
            node: <DropPage drop={drop} key={drop.id} />,
          }
        : null;
    },
  ],
  ["/shop", () => ({ title: "Shop", node: <Shop /> })],
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
  ["/lookbook", () => ({ title: "Lookbook", node: <Lookbook /> })],
  ["/raffle", () => ({ title: "Raffle entry", node: <Raffle /> })],
  ["/store", () => ({ title: "The shop", node: <Store /> })],
  ["/help", () => ({ title: "Help & sizing", node: <Help /> })],
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
