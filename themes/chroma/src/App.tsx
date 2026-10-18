import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import { brand, looks, stylists } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Lookbook } from "./pages/Lookbook";
import { LookPage } from "./pages/LookPage";
import { Stylists } from "./pages/Stylists";
import { StylistPage } from "./pages/StylistPage";
import { Products } from "./pages/Products";
import { Book } from "./pages/Book";
import { About } from "./pages/About";
import { Visit } from "./pages/Visit";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Hair salon, colour & cuts on Linden Avenue`,
      view: <Home />,
    }),
  ],
  ["/services", () => ({ title: "Services & prices", view: <Services /> })],
  ["/lookbook", () => ({ title: "Lookbook", view: <Lookbook /> })],
  [
    "/lookbook/:id",
    ({ id }) => {
      const look = looks.find((l) => l.id === id);
      return look
        ? { title: `${look.name} · Lookbook`, view: <LookPage look={look} /> }
        : null;
    },
  ],
  ["/stylists", () => ({ title: "Stylists", view: <Stylists /> })],
  [
    "/stylists/:id",
    ({ id }) => {
      const stylist = stylists.find((s) => s.id === id);
      return stylist
        ? {
            title: `${stylist.name} · Stylists`,
            view: <StylistPage stylist={stylist} />,
          }
        : null;
    },
  ],
  ["/products", () => ({ title: "Products", view: <Products /> })],
  ["/book", () => ({ title: "Book an appointment", view: <Book /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
  ["/visit", () => ({ title: "Visit, policies & FAQ", view: <Visit /> })],
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
