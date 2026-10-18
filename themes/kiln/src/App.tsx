import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, products, workshops } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Product } from "./pages/Product";
import { Glazes } from "./pages/Glazes";
import { Workshops } from "./pages/Workshops";
import { WorkshopPage } from "./pages/WorkshopPage";
import { Studio } from "./pages/Studio";
import { Journal } from "./pages/Journal";
import { PostPage } from "./pages/PostPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const p = products.find((x) => x.id === id);
      return p
        ? { title: p.name, node: <Product product={p} key={p.id} /> }
        : null;
    },
  ],
  ["/glazes", () => ({ title: "Glaze bench", node: <Glazes /> })],
  ["/workshops", () => ({ title: "Workshops", node: <Workshops /> })],
  [
    "/workshops/:id",
    ({ id }) => {
      const w = workshops.find((x) => x.id === id);
      return w
        ? { title: w.name, node: <WorkshopPage workshop={w} key={w.id} /> }
        : null;
    },
  ],
  ["/studio", () => ({ title: "The studio", node: <Studio /> })],
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((x) => x.slug === slug);
      return post
        ? { title: post.title, node: <PostPage post={post} key={post.slug} /> }
        : null;
    },
  ],
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
