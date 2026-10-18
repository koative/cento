import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, pieceById, rooms } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { PiecePage } from "./pages/PiecePage";
import { Rooms } from "./pages/Rooms";
import { RoomPage } from "./pages/RoomPage";
import { Restoration } from "./pages/Restoration";
import { Sell } from "./pages/Sell";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/shop", () => ({ title: "Shop the floor", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const piece = pieceById(id);
      return piece
        ? {
            title: `${piece.name} (${piece.stock})`,
            node: <PiecePage piece={piece} key={piece.id} />,
          }
        : null;
    },
  ],
  ["/rooms", () => ({ title: "Room sets", node: <Rooms /> })],
  [
    "/rooms/:slug",
    ({ slug }) => {
      const room = rooms.find((r) => r.slug === slug);
      return room
        ? {
            title: `${room.name} — room set`,
            node: <RoomPage room={room} key={room.slug} />,
          }
        : null;
    },
  ],
  [
    "/restoration",
    () => ({ title: "Restoration workshop", node: <Restoration /> }),
  ],
  ["/sell", () => ({ title: "Sell us a piece", node: <Sell /> })],
  ["/about", () => ({ title: "About", node: <About /> })],
  ["/visit", () => ({ title: "Visit & delivery", node: <Visit /> })],
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
