import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { barbers, brand, products } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { FadeChart } from "./pages/FadeChart";
import { Barbers } from "./pages/Barbers";
import { BarberPage } from "./pages/BarberPage";
import { Book } from "./pages/Book";
import { Gallery } from "./pages/Gallery";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Bag } from "./pages/Bag";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.full} — Fades, cuts & hot towel shaves`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services & prices", view: <Services /> })],
  ["/fade-chart", () => ({ title: "Fade chart", view: <FadeChart /> })],
  ["/barbers", () => ({ title: "The barbers", view: <Barbers /> })],
  [
    "/barbers/:id",
    ({ id }) => {
      const barber = barbers.find((b) => b.id === id);
      return barber
        ? {
            title: `${barber.name} · Chair ${barber.chair}`,
            view: <BarberPage barber={barber} />,
          }
        : null;
    },
  ],
  ["/book", () => ({ title: "Book a chair", view: <Book /> })],
  ["/gallery", () => ({ title: "Gallery", view: <Gallery /> })],
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
  ["/bag", () => ({ title: "Your bag", view: <Bag /> })],
  ["/about", () => ({ title: "Our story", view: <About /> })],
  ["/visit", () => ({ title: "Hours & directions", view: <Visit /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Page not found", view: <NotFound /> };
}

export default function App() {
  const path = useRoute();
  const main = useRef<HTMLElement>(null);
  const page = resolve(path);
  const title = path === "/" ? page.title : `${page.title} — ${brand.full}`;
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
    </>
  );
}
