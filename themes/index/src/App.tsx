import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { bookBySlug, brand, eventBySlug } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogue } from "./pages/Catalogue";
import { BookPage } from "./pages/BookPage";
import { StaffPicks } from "./pages/StaffPicks";
import { Events } from "./pages/Events";
import { EventPage } from "./pages/EventPage";
import { BookClub } from "./pages/BookClub";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/books", () => ({ title: "The catalogue", node: <Catalogue /> })],
  [
    "/books/:slug",
    ({ slug }) => {
      const book = bookBySlug(slug);
      return book
        ? {
            title: `${book.title} by ${book.author}`,
            node: <BookPage book={book} key={book.slug} />,
          }
        : null;
    },
  ],
  ["/staff-picks", () => ({ title: "Staff picks", node: <StaffPicks /> })],
  ["/events", () => ({ title: "Events & readings", node: <Events /> })],
  [
    "/events/:slug",
    ({ slug }) => {
      const event = eventBySlug(slug);
      return event
        ? {
            title: event.title,
            node: <EventPage event={event} key={event.slug} />,
          }
        : null;
    },
  ],
  ["/book-club", () => ({ title: "The Index Club", node: <BookClub /> })],
  ["/about", () => ({ title: "Our story & rooms", node: <About /> })],
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
