import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, experiences, posts, rooms } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { RoomPage } from "./pages/RoomPage";
import { Book } from "./pages/Book";
import { Dining } from "./pages/Dining";
import { Spa } from "./pages/Spa";
import { Experiences } from "./pages/Experiences";
import { ExperiencePage } from "./pages/ExperiencePage";
import { Journal } from "./pages/Journal";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Plan } from "./pages/Plan";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Alpine hotel at 1,640 m in Val Teria`,
      view: <Home />,
    }),
  ],
  ["/rooms", () => ({ title: "Rooms and cabins", view: <Rooms /> })],
  [
    "/rooms/:id",
    ({ id }) => {
      const room = rooms.find((r) => r.id === id);
      return room
        ? { title: `${room.name} · Rooms`, view: <RoomPage room={room} /> }
        : null;
    },
  ],
  ["/book", () => ({ title: "Check availability", view: <Book /> })],
  ["/dining", () => ({ title: "Dining", view: <Dining /> })],
  ["/spa", () => ({ title: "The bathhouse", view: <Spa /> })],
  ["/experiences", () => ({ title: "Experiences", view: <Experiences /> })],
  [
    "/experiences/:id",
    ({ id }) => {
      const x = experiences.find((e) => e.id === id);
      return x
        ? {
            title: `${x.title} · Experiences`,
            view: <ExperiencePage experience={x} />,
          }
        : null;
    },
  ],
  ["/journal", () => ({ title: "Journal", view: <Journal /> })],
  [
    "/journal/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: `${post.title} · Journal`, view: <Article post={post} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: "The house", view: <About /> })],
  ["/plan", () => ({ title: "Plan your stay", view: <Plan /> })],
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
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
