import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, events, wines } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Wines } from "./pages/Wines";
import { WinePage } from "./pages/WinePage";
import { Finder } from "./pages/Finder";
import { Bar } from "./pages/Bar";
import { Tastings } from "./pages/Tastings";
import { EventPage } from "./pages/EventPage";
import { Club } from "./pages/Club";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/wines", () => ({ title: "All wines", node: <Wines /> })],
  [
    "/wines/:id",
    ({ id }) => {
      const wine = wines.find((w) => w.id === id);
      return wine
        ? {
            title: `${wine.name}, ${wine.producer}`,
            node: <WinePage wine={wine} key={wine.id} />,
          }
        : null;
    },
  ],
  ["/finder", () => ({ title: "Taste finder", node: <Finder /> })],
  ["/bar", () => ({ title: "Bar menu", node: <Bar /> })],
  ["/tastings", () => ({ title: "Tastings & events", node: <Tastings /> })],
  [
    "/tastings/:id",
    ({ id }) => {
      const event = events.find((e) => e.id === id);
      return event
        ? {
            title: event.title,
            node: <EventPage event={event} key={event.id} />,
          }
        : null;
    },
  ],
  ["/club", () => ({ title: "Wine club", node: <Club /> })],
  ["/about", () => ({ title: "Our story", node: <About /> })],
  ["/visit", () => ({ title: "Visit & FAQ", node: <Visit /> })],
  ["/cart", () => ({ title: "Your case", node: <Cart /> })],
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
