import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { ages, brand, products, workshops } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { AgeShelf } from "./pages/AgeShelf";
import { GiftFinder } from "./pages/GiftFinder";
import { Workshops } from "./pages/Workshops";
import { WorkshopPage } from "./pages/WorkshopPage";
import { Events } from "./pages/Events";
import { Visit } from "./pages/Visit";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop all toys", node: <Shop /> })],
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
  [
    "/ages/:id",
    ({ id }) => {
      const band = ages.find((a) => a.id === id);
      return band
        ? {
            title: `Toys for ${band.label}`,
            node: <AgeShelf band={band} key={band.id} />,
          }
        : null;
    },
  ],
  ["/gift-finder", () => ({ title: "Gift finder", node: <GiftFinder /> })],
  ["/workshops", () => ({ title: "Workshops", node: <Workshops /> })],
  [
    "/workshops/:id",
    ({ id }) => {
      const workshop = workshops.find((w) => w.id === id);
      return workshop
        ? {
            title: `${workshop.name} workshop`,
            node: <WorkshopPage workshop={workshop} key={workshop.id} />,
          }
        : null;
    },
  ],
  ["/events", () => ({ title: "Store events", node: <Events /> })],
  ["/visit", () => ({ title: "Visit & hours", node: <Visit /> })],
  ["/about", () => ({ title: "About us", node: <About /> })],
  ["/cart", () => ({ title: "Your basket", node: <Cart /> })],
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
