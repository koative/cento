import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Product } from "./pages/Product";
import { Builder } from "./pages/Builder";
import { Subscriptions } from "./pages/Subscriptions";
import { Weddings } from "./pages/Weddings";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Delivery } from "./pages/Delivery";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop flowers", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const product = products.find((p) => p.id === id);
      return product
        ? {
            title: product.name,
            node: <Product product={product} key={product.id} />,
          }
        : null;
    },
  ],
  ["/builder", () => ({ title: "Build a bouquet", node: <Builder /> })],
  [
    "/subscriptions",
    () => ({ title: "Flower subscriptions", node: <Subscriptions /> }),
  ],
  ["/weddings", () => ({ title: "Weddings & events", node: <Weddings /> })],
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: post.title, node: <Article post={post} key={post.slug} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "About the studio", node: <About /> })],
  ["/delivery", () => ({ title: "Delivery & FAQ", node: <Delivery /> })],
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
