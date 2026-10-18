import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, jobs, missions, vehicles } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Missions } from "./pages/Missions";
import { MissionPage } from "./pages/MissionPage";
import { Vehicles } from "./pages/Vehicles";
import { VehiclePage } from "./pages/VehiclePage";
import { Manifest } from "./pages/Manifest";
import { Rideshare } from "./pages/Rideshare";
import { Reserve } from "./pages/Reserve";
import { Careers } from "./pages/Careers";
import { JobPage } from "./pages/JobPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Small-satellite launch and rideshare`,
      view: <Home />,
    }),
  ],
  ["/missions", () => ({ title: "Missions", view: <Missions /> })],
  [
    "/missions/:slug",
    ({ slug }) => {
      const m = missions.find((x) => x.slug === slug);
      return m
        ? { title: `${m.name} · Missions`, view: <MissionPage m={m} /> }
        : null;
    },
  ],
  ["/vehicles", () => ({ title: "Vehicles", view: <Vehicles /> })],
  [
    "/vehicles/:id",
    ({ id }) => {
      const v = vehicles.find((x) => x.id === id);
      return v
        ? { title: `${v.name} · Vehicles`, view: <VehiclePage v={v} /> }
        : null;
    },
  ],
  ["/manifest", () => ({ title: "Launch manifest", view: <Manifest /> })],
  ["/rideshare", () => ({ title: "Rideshare pricing", view: <Rideshare /> })],
  ["/reserve", () => ({ title: "Reserve a launch", view: <Reserve /> })],
  ["/careers", () => ({ title: "Careers", view: <Careers /> })],
  [
    "/careers/:slug",
    ({ slug }) => {
      const job = jobs.find((j) => j.slug === slug);
      return job
        ? { title: `${job.title} · Careers`, view: <JobPage job={job} /> }
        : null;
    },
  ],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

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
