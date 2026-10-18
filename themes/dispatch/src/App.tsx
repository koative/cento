import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, posts, topics } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Archive } from "./pages/Archive";
import { PostPage } from "./pages/PostPage";
import { Topics } from "./pages/Topics";
import { TopicPage } from "./pages/TopicPage";
import { About } from "./pages/About";
import { Subscribe } from "./pages/Subscribe";
import { Sponsor } from "./pages/Sponsor";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  ["/", () => ({ title: `${brand.name} — ${brand.tagline}`, view: <Home /> })],
  ["/archive", () => ({ title: "Archive", view: <Archive /> })],
  [
    "/archive/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post
        ? { title: post.title, view: <PostPage key={post.slug} post={post} /> }
        : null;
    },
  ],
  ["/topics", () => ({ title: "Topics", view: <Topics /> })],
  [
    "/topics/:id",
    ({ id }) => {
      const topic = topics.find((t) => t.id === id);
      return topic
        ? { title: `${topic.name} · Topics`, view: <TopicPage topic={topic} /> }
        : null;
    },
  ],
  ["/about", () => ({ title: `About ${brand.writer}`, view: <About /> })],
  ["/subscribe", () => ({ title: "Subscribe", view: <Subscribe /> })],
  ["/sponsor", () => ({ title: "Sponsor a Sunday", view: <Sponsor /> })],
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
