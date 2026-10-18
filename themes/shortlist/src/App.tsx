import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, companies, jobs } from "./content";
import { companyOf } from "./lib/format";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { JobPage } from "./pages/JobPage";
import { Apply } from "./pages/Apply";
import { Companies } from "./pages/Companies";
import { CompanyPage } from "./pages/CompanyPage";
import { Post } from "./pages/Post";
import { Salaries } from "./pages/Salaries";
import { Shortlist } from "./pages/Shortlist";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Jobs with the salary on every listing`,
      view: <Home />,
    }),
  ],
  ["/jobs", () => ({ title: "Find jobs", view: <Jobs /> })],
  [
    "/jobs/:id",
    ({ id }) => {
      const job = jobs.find((j) => j.id === id);
      return job
        ? {
            title: `${job.title} at ${companyOf(job).name}`,
            view: <JobPage job={job} />,
          }
        : null;
    },
  ],
  [
    "/jobs/:id/apply",
    ({ id }) => {
      const job = jobs.find((j) => j.id === id);
      return job
        ? { title: `Apply: ${job.title}`, view: <Apply job={job} /> }
        : null;
    },
  ],
  ["/companies", () => ({ title: "Companies hiring", view: <Companies /> })],
  [
    "/companies/:slug",
    ({ slug }) => {
      const company = companies.find((c) => c.slug === slug);
      return company
        ? {
            title: `${company.name} · Companies`,
            view: <CompanyPage company={company} />,
          }
        : null;
    },
  ],
  ["/post", () => ({ title: "Post a job", view: <Post /> })],
  ["/salaries", () => ({ title: "Salary guide", view: <Salaries /> })],
  ["/shortlist", () => ({ title: "Your shortlist", view: <Shortlist /> })],
  ["/about", () => ({ title: "About", view: <About /> })],
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
