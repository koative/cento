import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, locations, menu, merch } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { MenuItemPage } from "./pages/MenuItemPage";
import { Order } from "./pages/Order";
import { Checkout } from "./pages/Checkout";
import { Locations } from "./pages/Locations";
import { LocationPage } from "./pages/LocationPage";
import { Catering } from "./pages/Catering";
import { Merch } from "./pages/Merch";
import { MerchItemPage } from "./pages/MerchItemPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Smash burgers, fried chicken & shakes`,
      view: <Home />,
    }),
  ],
  ["/menu", () => ({ title: "Menu", view: <Menu /> })],
  [
    "/menu/:id",
    ({ id }) => {
      const item = menu.find((m) => m.id === id);
      return item
        ? { title: item.name, view: <MenuItemPage item={item} /> }
        : null;
    },
  ],
  ["/order", () => ({ title: "Your order", view: <Order /> })],
  ["/checkout", () => ({ title: "Checkout", view: <Checkout /> })],
  ["/locations", () => ({ title: "Locations", view: <Locations /> })],
  [
    "/locations/:id",
    ({ id }) => {
      const loc = locations.find((l) => l.id === id);
      return loc
        ? {
            title: `${loc.name} · Locations`,
            view: <LocationPage location={loc} />,
          }
        : null;
    },
  ],
  ["/catering", () => ({ title: "Catering", view: <Catering /> })],
  ["/merch", () => ({ title: "Merch", view: <Merch /> })],
  [
    "/merch/:id",
    ({ id }) => {
      const item = merch.find((m) => m.id === id);
      return item
        ? { title: `${item.name} · Merch`, view: <MerchItemPage item={item} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "About", view: <About /> })],
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
    </>
  );
}
