import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, games, jobs, posts } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { GamePage } from "./pages/GamePage";
import { Play } from "./pages/Play";
import { Devlog } from "./pages/Devlog";
import { PostPage } from "./pages/PostPage";
import { Studio } from "./pages/Studio";
import { Press } from "./pages/Press";
import { Jobs } from "./pages/Jobs";
import { JobPage } from "./pages/JobPage";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, view: <Home /> })],
  ["/games", () => ({ title: "Games", view: <Games /> })],
  [
    "/games/:slug",
    ({ slug }) => {
      const game = games.find((g) => g.slug === slug);
      return game
        ? { title: `${game.name} · Games`, view: <GamePage game={game} /> }
        : null;
    },
  ],
  ["/play", () => ({ title: "Play Blob Hop in your browser", view: <Play /> })],
  ["/devlog", () => ({ title: "Devlog", view: <Devlog /> })],
  [
    "/devlog/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: `${post.title} · Devlog`, view: <PostPage post={post} /> }
        : null;
    },
  ],
  ["/studio", () => ({ title: "Studio", view: <Studio /> })],
  ["/press", () => ({ title: "Press kit", view: <Press /> })],
  ["/jobs", () => ({ title: "Jobs", view: <Jobs /> })],
  [
    "/jobs/:slug",
    ({ slug }) => {
      const job = jobs.find((j) => j.slug === slug);
      return job
        ? { title: `${job.title} · Jobs`, view: <JobPage job={job} /> }
        : null;
    },
  ],
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
