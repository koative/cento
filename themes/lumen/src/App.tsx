import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, frames, stores } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Frames } from "./pages/Frames";
import { FramePage } from "./pages/FramePage";
import { FaceShapes } from "./pages/FaceShapes";
import { Lenses } from "./pages/Lenses";
import { Stores } from "./pages/Stores";
import { StorePage } from "./pages/StorePage";
import { EyeTest } from "./pages/EyeTest";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/frames", () => ({ title: "Glasses and sunglasses", node: <Frames /> })],
  [
    "/frames/:id",
    ({ id }) => {
      const frame = frames.find((f) => f.id === id);
      return frame
        ? {
            title: `${frame.name} ${frame.line === "sun" ? "sunglasses" : "glasses"}`,
            node: <FramePage frame={frame} key={frame.id} />,
          }
        : null;
    },
  ],
  [
    "/face-shapes",
    () => ({ title: "Face-shape finder", node: <FaceShapes /> }),
  ],
  ["/lenses", () => ({ title: "Lens guide", node: <Lenses /> })],
  ["/stores", () => ({ title: "Stores", node: <Stores /> })],
  [
    "/stores/:id",
    ({ id }) => {
      const store = stores.find((s) => s.id === id);
      return store
        ? {
            title: `${store.name}, ${store.city}`,
            node: <StorePage store={store} key={store.id} />,
          }
        : null;
    },
  ],
  ["/eye-test", () => ({ title: "Book an eye test", node: <EyeTest /> })],
  ["/about", () => ({ title: "Our story", node: <About /> })],
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
