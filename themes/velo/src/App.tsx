import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { bikes, brand } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Bikes } from "./pages/Bikes";
import { BikePage } from "./pages/BikePage";
import { Build } from "./pages/Build";
import { Service } from "./pages/Service";
import { Rides } from "./pages/Rides";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/bikes", () => ({ title: "Bikes", node: <Bikes /> })],
  [
    "/bikes/:id",
    ({ id }) => {
      const bike = bikes.find((b) => b.id === id);
      return bike
        ? {
            title: `${bike.name} ${bike.type.toLowerCase()} bike`,
            node: <BikePage bike={bike} key={bike.id} />,
          }
        : null;
    },
  ],
  ["/build", () => ({ title: "Build configurator", node: <Build /> })],
  [
    "/service",
    () => ({ title: "Workshop & service booking", node: <Service /> }),
  ],
  ["/rides", () => ({ title: "Rides club", node: <Rides /> })],
  ["/about", () => ({ title: "About the workshop", node: <About /> })],
  ["/cart", () => ({ title: "Your cart", node: <Cart /> })],
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
