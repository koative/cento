import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  app,
  brand,
  changelog,
  connectors,
  connectorsPage,
  consolePage,
  customers,
  docs,
  home,
  notFound,
  platform,
  pricing,
  signin,
  signup,
  status,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Connectors from "./pages/Connectors";
import ConnectorPage from "./pages/Connector";
import ConsolePage from "./pages/ConsolePage";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import Changelog from "./pages/Changelog";
import Customers from "./pages/Customers";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppConnections from "./pages/AppConnections";
import AppLogs from "./pages/AppLogs";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inApp = (i: number) =>
  `${app.nav[i].label} — ${brand.name} dashboard demo`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/platform", () => [site(platform.title), <Platform />]],
  ["/connectors", () => [site(connectorsPage.title), <Connectors />]],
  [
    "/connectors/:slug",
    ({ slug }) => {
      const c = connectors.find((x) => x.slug === slug);
      return c
        ? [site(`${c.name} connector`), <ConnectorPage connector={c} />]
        : null;
    },
  ],
  ["/console", () => [site(consolePage.title), <ConsolePage />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/docs", () => [site(docs.title), <Docs />]],
  ["/status", () => [site(status.title), <Status />]],
  ["/changelog", () => [site(changelog.title), <Changelog />]],
  ["/customers", () => [site(customers.title), <Customers />]],
  ["/about", () => [site(about.title), <About />]],
  ["/signup", () => [site(signup.title), <SignUp />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/app", () => [inApp(0), <AppOverview />]],
  ["/app/connections", () => [inApp(1), <AppConnections />]],
  ["/app/logs", () => [inApp(2), <AppLogs />]],
  ["/app/settings", () => [inApp(3), <AppSettings />]],
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
  const found = resolve(path);
  const [title, page] = found ?? [site(notFound.title), <NotFound />];
  const dashboard =
    found !== null && (path === "/app" || path.startsWith("/app/"));
  usePageChange(mainRef, title);

  return (
    <div className={dashboard ? "app-shell" : "site-shell"}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {dashboard ? <AppSidebar /> : <Header />}
      <main
        id="main"
        tabIndex={-1}
        ref={mainRef}
        key={path}
        className={dashboard ? "app-main" : "site-main"}
      >
        {page}
      </main>
      {!dashboard && <Footer />}
    </div>
  );
}
