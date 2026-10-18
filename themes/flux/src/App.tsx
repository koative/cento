import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  appNav,
  brand,
  changelog,
  connectors,
  contact,
  customers,
  home,
  notFound,
  pricing,
  product,
  signin,
  templates,
  type Workflow,
} from "./content";
import { useWorkflows } from "./lib/workspace";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Integrations from "./pages/Integrations";
import Integration from "./pages/Integration";
import Templates from "./pages/Templates";
import TemplatePage from "./pages/Template";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppWorkflows from "./pages/AppWorkflows";
import AppBuilder from "./pages/AppBuilder";
import AppRuns from "./pages/AppRuns";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} demo`;

function routes(
  workflows: Workflow[],
): [string, (p: Record<string, string>) => Page][] {
  return [
    ["/", () => [home.title, <Home />]],
    ["/product", () => [site(product.title), <Product />]],
    ["/integrations", () => [site("Integrations"), <Integrations />]],
    [
      "/integrations/:slug",
      ({ slug }) => {
        const c = connectors.find((x) => x.slug === slug);
        return c
          ? [site(`${c.name} integration`), <Integration connector={c} />]
          : null;
      },
    ],
    ["/templates", () => [site("Templates"), <Templates />]],
    [
      "/templates/:slug",
      ({ slug }) => {
        const t = templates.find((x) => x.slug === slug);
        return t
          ? [site(`${t.name} template`), <TemplatePage template={t} />]
          : null;
      },
    ],
    ["/pricing", () => [site(pricing.title), <Pricing />]],
    ["/customers", () => [site(customers.title), <Customers />]],
    ["/changelog", () => [site(changelog.title), <Changelog />]],
    ["/about", () => [site(about.title), <About />]],
    ["/contact", () => [site(contact.title), <Contact />]],
    ["/signin", () => [site(signin.title), <SignIn />]],
    ["/app", () => [inDemo(appNav[0].label), <AppOverview />]],
    ["/app/workflows", () => [inDemo(appNav[1].label), <AppWorkflows />]],
    [
      "/app/workflows/:id",
      ({ id }) => {
        const w = workflows.find((x) => x.id === id);
        return w
          ? [inDemo(w.name), <AppBuilder key={w.id} workflow={w} />]
          : null;
      },
    ],
    ["/app/runs", () => [inDemo(appNav[2].label), <AppRuns />]],
    ["/app/settings", () => [inDemo(appNav[3].label), <AppSettings />]],
  ];
}

export default function App() {
  const path = useRoute();
  const workflows = useWorkflows();
  const mainRef = useRef<HTMLElement>(null);
  let found: [string, ReactNode] | null = null;
  for (const [pattern, render] of routes(workflows)) {
    const params = match(pattern, path);
    found = params && render(params);
    if (found) break;
  }
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
