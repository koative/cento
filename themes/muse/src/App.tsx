import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, looks, lookPath, posts, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Collection } from "./pages/Collection";
import { LookPage } from "./pages/LookPage";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { Stores } from "./pages/Stores";
import { House } from "./pages/House";
import { Bag } from "./pages/Bag";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  [
    "/collection",
    () => ({
      title: `${brand.collection}, ${brand.season}`,
      node: <Collection />,
    }),
  ],
  [
    "/collection/:look",
    ({ look }) => {
      const found = looks.find((l) => lookPath(l.n) === `/collection/${look}`);
      return found
        ? {
            title: `Look ${String(found.n).padStart(2, "0")}, ${found.title}`,
            node: <LookPage look={found} />,
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
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post ? { title: post.title, node: <Article post={post} /> } : null;
    },
  ],
  ["/stores", () => ({ title: "Stores", node: <Stores /> })],
  ["/house", () => ({ title: "The House", node: <House /> })],
  ["/bag", () => ({ title: "Your bag", node: <Bag /> })],
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
      <main
        id="main"
        tabIndex={-1}
        ref={main}
        key={path.startsWith("/collection/") ? "/collection/look" : path}
      >
        {page.node}
      </main>
      <Footer />
    </>
  );
}
