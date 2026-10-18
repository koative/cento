import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  blogPage,
  brand,
  contact,
  download,
  features,
  helpArticles,
  helpPage,
  home,
  notFound,
  posts,
  pricing,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import Download from "./pages/Download";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/features", () => [site(features.title), <Features />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/blog", () => [site(blogPage.title), <Blog />]],
  [
    "/blog/:slug",
    ({ slug }) => {
      const post = posts.find((p) => p.slug === slug);
      return post ? [site(post.title), <Article post={post} />] : null;
    },
  ],
  ["/help", () => [site(helpPage.title), <Help />]],
  [
    "/help/:slug",
    ({ slug }) => {
      const article = helpArticles.find((a) => a.slug === slug);
      return article
        ? [site(`${article.title} · Help`), <HelpArticle article={article} />]
        : null;
    },
  ],
  ["/download", () => [site(download.title), <Download />]],
  ["/about", () => [site(about.title), <About />]],
  ["/contact", () => [site(contact.title), <Contact />]],
];

function resolve(path: string): [string, ReactNode] | null {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return null;
}

export default function App() {
  const path = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const [title, page] = resolve(path) ?? [site(notFound.title), <NotFound />];
  usePageChange(mainRef, title);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} ref={mainRef} key={path}>
        {page}
      </main>
      <Footer />
    </>
  );
}
