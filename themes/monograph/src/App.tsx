import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, contributors, sections } from "./content";
import { articleOf, issueOf } from "./lib/magazine";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Stories } from "./pages/Stories";
import { ArticlePage } from "./pages/ArticlePage";
import { Issues } from "./pages/Issues";
import { IssuePage } from "./pages/IssuePage";
import { SectionPage } from "./pages/SectionPage";
import { Contributors } from "./pages/Contributors";
import { ContributorPage } from "./pages/ContributorPage";
import { Subscribe } from "./pages/Subscribe";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/stories", () => ({ title: "All stories", node: <Stories /> })],
  [
    "/read/:slug",
    ({ slug }) => {
      const article = articleOf(slug);
      return article
        ? {
            title: article.title,
            node: <ArticlePage article={article} key={slug} />,
          }
        : null;
    },
  ],
  ["/issues", () => ({ title: "Issues", node: <Issues /> })],
  [
    "/issues/:no",
    ({ no }) => {
      const issue = issueOf(Number(no));
      return issue
        ? {
            title: `No. ${issue.no}: ${issue.word}`,
            node: <IssuePage issue={issue} key={no} />,
          }
        : null;
    },
  ],
  [
    "/sections/:slug",
    ({ slug }) => {
      const section = sections.find((s) => s.slug === slug);
      return section
        ? {
            title: section.name,
            node: <SectionPage section={section} key={slug} />,
          }
        : null;
    },
  ],
  ["/contributors", () => ({ title: "Contributors", node: <Contributors /> })],
  [
    "/contributors/:slug",
    ({ slug }) => {
      const person = contributors.find((c) => c.slug === slug);
      return person
        ? {
            title: person.name,
            node: <ContributorPage person={person} key={slug} />,
          }
        : null;
    },
  ],
  ["/subscribe", () => ({ title: "Subscribe", node: <Subscribe /> })],
  ["/about", () => ({ title: "About", node: <About /> })],
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
