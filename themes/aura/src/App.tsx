import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, ingredients, posts, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Ritual } from "./pages/Ritual";
import { Ingredients } from "./pages/Ingredients";
import { IngredientPage } from "./pages/IngredientPage";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Help } from "./pages/Help";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop the essentials", node: <Shop /> })],
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
  ["/ritual", () => ({ title: "Ritual builder", node: <Ritual /> })],
  [
    "/ingredients",
    () => ({ title: "Ingredients glossary", node: <Ingredients /> }),
  ],
  [
    "/ingredients/:slug",
    ({ slug }) => {
      const ingredient = ingredients.find((g) => g.slug === slug);
      return ingredient
        ? {
            title: `${ingredient.name} — Ingredients`,
            node: <IngredientPage ingredient={ingredient} key={slug} />,
          }
        : null;
    },
  ],
  ["/journal", () => ({ title: "Journal", node: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: post.title, node: <Article post={post} key={slug} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "Our story", node: <About /> })],
  ["/help", () => ({ title: "Help & FAQ", node: <Help /> })],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

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
