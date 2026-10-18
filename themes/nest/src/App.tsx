import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, rooms } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { RoomPage } from "./pages/RoomPage";
import { Day } from "./pages/Day";
import { Fees } from "./pages/Fees";
import { Team } from "./pages/Team";
import { Parents } from "./pages/Parents";
import { About } from "./pages/About";
import { Tour } from "./pages/Tour";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Nursery, preschool & after-school club on Linden Row`,
      view: <Home />,
    }),
  ],
  ["/rooms", () => ({ title: "Rooms by age", view: <Rooms /> })],
  [
    "/rooms/:id",
    ({ id }) => {
      const room = rooms.find((r) => r.id === id);
      return room
        ? {
            title: `${room.name} room, ${room.ages.split(" · ")[0]}`,
            view: <RoomPage room={room} />,
          }
        : null;
    },
  ],
  ["/day", () => ({ title: "A day at Nest", view: <Day /> })],
  ["/fees", () => ({ title: "Fees calculator", view: <Fees /> })],
  ["/team", () => ({ title: "Team", view: <Team /> })],
  ["/parents", () => ({ title: "Parent info & FAQ", view: <Parents /> })],
  ["/about", () => ({ title: "Our story", view: <About /> })],
  ["/tour", () => ({ title: "Book a tour", view: <Tour /> })],
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
