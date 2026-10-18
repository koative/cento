import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  app,
  brand,
  changelogPage,
  demo,
  home,
  identities,
  notFound,
  platform,
  pricing,
  signin,
  solutions,
  solutionsPage,
  trust,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import SolutionPage from "./pages/Solution";
import Pricing from "./pages/Pricing";
import Trust from "./pages/Trust";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import Demo from "./pages/Demo";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppReview from "./pages/AppReview";
import AppIdentities from "./pages/AppIdentities";
import AppIdentity from "./pages/AppIdentity";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} demo workspace`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/platform", () => [site(platform.title), <Platform />]],
  ["/solutions", () => [site(solutionsPage.title), <Solutions />]],
  [
    "/solutions/:slug",
    ({ slug }) => {
      const s = solutions.find((x) => x.slug === slug);
      return s ? [site(s.name), <SolutionPage solution={s} />] : null;
    },
  ],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/trust", () => [site(trust.title), <Trust />]],
  ["/changelog", () => [site(changelogPage.title), <Changelog />]],
  ["/about", () => [site(about.title), <About />]],
  ["/demo", () => [site(demo.title), <Demo />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/app", () => [inDemo(app.nav[0].label), <AppOverview />]],
  ["/app/review", () => [inDemo(app.nav[1].label), <AppReview />]],
  ["/app/identities", () => [inDemo(app.nav[2].label), <AppIdentities />]],
  [
    "/app/identities/:id",
    ({ id }) => {
      const person = identities.find((i) => i.id === id);
      return person
        ? [inDemo(person.name), <AppIdentity person={person} />]
        : null;
    },
  ],
  ["/app/settings", () => [inDemo(app.nav[3].label), <AppSettings />]],
];

function resolve(path: string): Page {
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
  const found = resolve(path);
  const [title, page] = found ?? [site(notFound.title), <NotFound />];
  const inApp = found !== null && path.startsWith("/app");
  usePageChange(mainRef, title);

  return (
    <div className={inApp ? "app-shell" : "site-shell"}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {inApp ? <AppSidebar /> : <Header />}
      <main
        id="main"
        tabIndex={-1}
        ref={mainRef}
        key={path}
        className={inApp ? "app-main" : "site-main"}
      >
        {page}
      </main>
      {!inApp && <Footer />}
    </div>
  );
}
