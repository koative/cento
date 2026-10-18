import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, products, releases, shows } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Dock } from "./components/Dock";
import { Home } from "./pages/Home";
import { Tour } from "./pages/Tour";
import { ShowPage } from "./pages/ShowPage";
import { Music } from "./pages/Music";
import { ReleasePage } from "./pages/ReleasePage";
import { Videos } from "./pages/Videos";
import { Merch } from "./pages/Merch";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Press } from "./pages/Press";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { monthDay } from "./lib/format";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Low Ceiling out now, on tour through December`,
      view: <Home />,
    }),
  ],
  ["/tour", () => ({ title: "Tour dates", view: <Tour /> })],
  [
    "/tour/:id",
    ({ id }) => {
      const show = shows.find((s) => s.id === id);
      return show
        ? {
            title: `${show.city}, ${monthDay(show.date)} · Tour`,
            view: <ShowPage show={show} />,
          }
        : null;
    },
  ],
  ["/music", () => ({ title: "Discography", view: <Music /> })],
  [
    "/music/:slug",
    ({ slug }) => {
      const release = releases.find((r) => r.slug === slug);
      return release
        ? {
            title: `${release.title} (${release.kind}) · Music`,
            view: <ReleasePage release={release} />,
          }
        : null;
    },
  ],
  ["/videos", () => ({ title: "Videos", view: <Videos /> })],
  ["/merch", () => ({ title: "Merch", view: <Merch /> })],
  [
    "/merch/:id",
    ({ id }) => {
      const product = products.find((p) => p.id === id);
      return product
        ? {
            title: `${product.name} · Merch`,
            view: <ProductPage product={product} />,
          }
        : null;
    },
  ],
  ["/cart", () => ({ title: "Cart", view: <Cart /> })],
  ["/checkout", () => ({ title: "Checkout", view: <Checkout /> })],
  ["/press", () => ({ title: "Press", view: <Press /> })],
  ["/about", () => ({ title: "About the band", view: <About /> })],
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
      <Dock />
    </>
  );
}
