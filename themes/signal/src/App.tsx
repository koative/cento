import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  app,
  brand,
  changelogPage,
  customers,
  demo,
  docs,
  events,
  home,
  notFound,
  pricing,
  product,
  signin,
  stories,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Changelog from "./pages/Changelog";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Demo from "./pages/Demo";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppFunnels from "./pages/AppFunnels";
import AppEvents from "./pages/AppEvents";
import AppEvent from "./pages/AppEvent";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} demo`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/product", () => [site(product.title), <Product />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/customers", () => [site(customers.title), <Customers />]],
  [
    "/customers/:slug",
    ({ slug }) => {
      const story = stories.find((s) => s.slug === slug);
      return story
        ? [site(`${story.company} story`), <Customer story={story} />]
        : null;
    },
  ],
  ["/changelog", () => [site(changelogPage.title), <Changelog />]],
  ["/docs", () => [site(docs.title), <Docs />]],
  ["/about", () => [site(about.title), <About />]],
  ["/demo", () => [site(demo.title), <Demo />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/app", () => [inDemo(app.nav[0].label), <AppOverview />]],
  ["/app/funnels", () => [inDemo(app.nav[1].label), <AppFunnels />]],
  ["/app/events", () => [inDemo(app.nav[2].label), <AppEvents />]],
  [
    "/app/events/:id",
    ({ id }) => {
      const event = events.find((e) => e.id === id);
      return event ? [inDemo(event.id), <AppEvent event={event} />] : null;
    },
  ],
  ["/app/settings", () => [inDemo(app.nav[3].label), <AppSettings />]],
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
