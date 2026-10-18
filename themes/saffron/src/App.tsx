import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { aisles, brand, products, recipes } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Aisles } from "./pages/Aisles";
import { ProductPage } from "./pages/ProductPage";
import { Recipes } from "./pages/Recipes";
import { RecipePage } from "./pages/RecipePage";
import { Delivery } from "./pages/Delivery";
import { About } from "./pages/About";
import { BasketPage } from "./pages/BasketPage";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/aisles", () => ({ title: "All aisles", node: <Aisles /> })],
  [
    "/aisles/:aisle",
    ({ aisle }) => {
      const found = aisles.find((a) => a.id === aisle);
      return found
        ? { title: found.name, node: <Aisles aisle={found} /> }
        : null;
    },
  ],
  [
    "/aisles/:aisle/:id",
    ({ aisle, id }) => {
      const product = products.find((p) => p.id === id && p.aisle === aisle);
      return product
        ? {
            title: product.name,
            node: <ProductPage product={product} key={product.id} />,
          }
        : null;
    },
  ],
  ["/recipes", () => ({ title: "Recipes", node: <Recipes /> })],
  [
    "/recipes/:slug",
    ({ slug }) => {
      const recipe = recipes.find((r) => r.slug === slug);
      return recipe
        ? {
            title: recipe.name,
            node: <RecipePage recipe={recipe} key={recipe.slug} />,
          }
        : null;
    },
  ],
  ["/delivery", () => ({ title: "Delivery slots", node: <Delivery /> })],
  ["/about", () => ({ title: "Our market", node: <About /> })],
  ["/basket", () => ({ title: "Your basket", node: <BasketPage /> })],
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
