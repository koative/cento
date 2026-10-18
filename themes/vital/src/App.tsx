import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, clinicians, conditions } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Conditions } from "./pages/Conditions";
import { ConditionPage } from "./pages/ConditionPage";
import { HowItWorks } from "./pages/HowItWorks";
import { CheckIn } from "./pages/CheckIn";
import { Pricing } from "./pages/Pricing";
import { Clinicians } from "./pages/Clinicians";
import { ClinicianPage } from "./pages/ClinicianPage";
import { AppPage } from "./pages/AppPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Telehealth visits by video and message`,
      view: <Home />,
    }),
  ],
  [
    "/conditions",
    () => ({ title: "Conditions we treat", view: <Conditions /> }),
  ],
  [
    "/conditions/:slug",
    ({ slug }) => {
      const c = conditions.find((x) => x.slug === slug);
      return c
        ? {
            title: `${c.name} · Conditions`,
            view: <ConditionPage condition={c} />,
          }
        : null;
    },
  ],
  ["/how-it-works", () => ({ title: "How it works", view: <HowItWorks /> })],
  ["/check-in", () => ({ title: "Symptom check-in", view: <CheckIn /> })],
  ["/pricing", () => ({ title: "Pricing & insurance", view: <Pricing /> })],
  ["/clinicians", () => ({ title: "Clinicians", view: <Clinicians /> })],
  [
    "/clinicians/:slug",
    ({ slug }) => {
      const c = clinicians.find((x) => x.slug === slug);
      return c
        ? {
            title: `${c.name}, ${c.credentials} · Clinicians`,
            view: <ClinicianPage clinician={c} />,
          }
        : null;
    },
  ],
  ["/app", () => ({ title: "The Vital app", view: <AppPage /> })],
  ["/about", () => ({ title: "About & standards", view: <About /> })],
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
