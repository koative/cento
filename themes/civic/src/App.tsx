import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { articles, brand, meetings, services } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Report } from "./pages/Report";
import { Council } from "./pages/Council";
import { MeetingPage } from "./pages/MeetingPage";
import { News } from "./pages/News";
import { ArticlePage } from "./pages/ArticlePage";
import { Alerts } from "./pages/Alerts";
import { CityHall } from "./pages/CityHall";
import { NotFound } from "./pages/NotFound";
import { shortDate } from "./lib/city";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.full} — ${brand.sector}`, node: <Home /> })],
  ["/services", () => ({ title: "Services A–Z", node: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const s = services.find((x) => x.slug === slug);
      return s
        ? { title: s.name, node: <ServicePage service={s} key={s.slug} /> }
        : null;
    },
  ],
  ["/report", () => ({ title: "Report an issue", node: <Report /> })],
  ["/council", () => ({ title: "Council & meetings", node: <Council /> })],
  [
    "/council/:id",
    ({ id }) => {
      const m = meetings.find((x) => x.id === id);
      return m
        ? {
            title: `${m.body}, ${shortDate(m.starts)}`,
            node: <MeetingPage meeting={m} key={m.id} />,
          }
        : null;
    },
  ],
  ["/news", () => ({ title: "News", node: <News /> })],
  [
    "/news/:slug",
    ({ slug }) => {
      const a = articles.find((x) => x.slug === slug);
      return a
        ? { title: a.title, node: <ArticlePage article={a} key={a.slug} /> }
        : null;
    },
  ],
  ["/alerts", () => ({ title: "Alerts & closures", node: <Alerts /> })],
  [
    "/city-hall",
    () => ({ title: "City Hall & departments", node: <CityHall /> }),
  ],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.full}`,
  );

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
