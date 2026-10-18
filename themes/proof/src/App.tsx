import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, classes, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Today } from "./pages/Today";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Classes } from "./pages/Classes";
import { ClassPage } from "./pages/ClassPage";
import { Wholesale } from "./pages/Wholesale";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/today", () => ({ title: "Today's bake", node: <Today /> })],
  ["/shop", () => ({ title: "Order ahead", node: <Shop /> })],
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
  ["/classes", () => ({ title: "Baking classes", node: <Classes /> })],
  [
    "/classes/:id",
    ({ id }) => {
      const c = classes.find((x) => x.id === id);
      return c
        ? {
            title: `${c.name} class`,
            node: <ClassPage bakeClass={c} key={c.id} />,
          }
        : null;
    },
  ],
  ["/wholesale", () => ({ title: "Wholesale", node: <Wholesale /> })],
  ["/about", () => ({ title: "Our story", node: <About /> })],
  ["/visit", () => ({ title: "Visit & FAQ", node: <Visit /> })],
  ["/cart", () => ({ title: "Your bag", node: <Cart /> })],
  ["/checkout", () => ({ title: "Pickup checkout", node: <Checkout /> })],
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
