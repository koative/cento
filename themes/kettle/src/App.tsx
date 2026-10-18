import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { beers, brand, events, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AgeGate } from "./components/AgeGate";
import { Home } from "./pages/Home";
import { Beers } from "./pages/Beers";
import { BeerPage } from "./pages/BeerPage";
import { Taproom } from "./pages/Taproom";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { Tours } from "./pages/Tours";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Craft brewery & taproom on Tannery Row`,
      view: <Home />,
    }),
  ],
  ["/beers", () => ({ title: "Beers", view: <Beers /> })],
  [
    "/beers/:slug",
    ({ slug }) => {
      const beer = beers.find((b) => b.slug === slug);
      return beer
        ? {
            title: `${beer.name} · ${beer.style}`,
            view: <BeerPage beer={beer} />,
          }
        : null;
    },
  ],
  ["/taproom", () => ({ title: "Taproom menu & hours", view: <Taproom /> })],
  ["/events", () => ({ title: "Events", view: <Events /> })],
  [
    "/events/:id",
    ({ id }) => {
      const event = events.find((e) => e.id === id);
      return event
        ? {
            title: `${event.title} · Events`,
            view: <EventPage event={event} />,
          }
        : null;
    },
  ],
  ["/tours", () => ({ title: "Brewery tours", view: <Tours /> })],
  ["/shop", () => ({ title: "Shop", view: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const product = products.find((p) => p.id === id);
      return product
        ? {
            title: `${product.name} · Shop`,
            view: <ProductPage product={product} />,
          }
        : null;
    },
  ],
  ["/cart", () => ({ title: "Pickup order", view: <Cart /> })],
  ["/checkout", () => ({ title: "Checkout", view: <Checkout /> })],
  ["/about", () => ({ title: "Our story", view: <About /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Not found", view: <NotFound /> };
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
        key={path}
        className="page-enter"
      >
        {page.view}
      </main>
      <Footer />
      <AgeGate />
    </>
  );
}
