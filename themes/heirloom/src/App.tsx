import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, collections, pieces } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { PiecePage } from "./pages/PiecePage";
import { Builder } from "./pages/Builder";
import { Bespoke } from "./pages/Bespoke";
import { Atelier } from "./pages/Atelier";
import { Appointments } from "./pages/Appointments";
import { Care } from "./pages/Care";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/collections", () => ({ title: "All collections", node: <Collections /> })],
  [
    "/collections/:id",
    ({ id }) => {
      const collection = collections.find((c) => c.id === id);
      return collection
        ? {
            title: collection.title,
            node: <Collections collection={collection} key={id} />,
          }
        : null;
    },
  ],
  [
    "/collections/:id/:slug",
    ({ id, slug }) => {
      const piece = pieces.find((p) => p.slug === slug && p.collection === id);
      return piece
        ? { title: piece.name, node: <PiecePage piece={piece} key={slug} /> }
        : null;
    },
  ],
  ["/ring-builder", () => ({ title: "Ring builder", node: <Builder /> })],
  ["/bespoke", () => ({ title: "Bespoke commissions", node: <Bespoke /> })],
  ["/atelier", () => ({ title: "The atelier", node: <Atelier /> })],
  [
    "/appointments",
    () => ({ title: "Book an appointment", node: <Appointments /> }),
  ],
  ["/care", () => ({ title: "Care & sizing", node: <Care /> })],
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
