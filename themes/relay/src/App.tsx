import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  app,
  brand,
  changelog,
  customers,
  home,
  network,
  notFound,
  platform,
  pricing,
  quote,
  services,
  shipments,
  signin,
  track,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Service from "./pages/Service";
import { Track, TrackShipment } from "./pages/Track";
import Quote from "./pages/Quote";
import Network from "./pages/Network";
import Platform from "./pages/Platform";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppShipments from "./pages/AppShipments";
import AppShipment from "./pages/AppShipment";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} demo`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/services", () => [site("Freight services"), <Services />]],
  [
    "/services/:slug",
    ({ slug }) => {
      const s = services.find((x) => x.slug === slug);
      return s ? [site(s.name), <Service s={s} key={s.slug} />] : null;
    },
  ],
  ["/track", () => [site(track.title), <Track />]],
  [
    "/track/:id",
    ({ id }) => {
      const s = shipments.find((x) => x.id === id);
      return s
        ? [site(`Tracking ${s.id}`), <TrackShipment s={s} key={s.id} />]
        : null;
    },
  ],
  ["/quote", () => [site(quote.title), <Quote />]],
  ["/network", () => [site(network.title), <Network />]],
  ["/platform", () => [site(platform.title), <Platform />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/customers", () => [site(customers.title), <Customers />]],
  ["/changelog", () => [site(changelog.title), <Changelog />]],
  ["/about", () => [site(about.title), <About />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/app", () => [inDemo(app.nav[0].label), <AppOverview />]],
  ["/app/shipments", () => [inDemo(app.nav[1].label), <AppShipments />]],
  [
    "/app/shipments/:id",
    ({ id }) => {
      const s = shipments.find((x) => x.id === id);
      return s ? [inDemo(s.id), <AppShipment id={s.id} key={s.id} />] : null;
    },
  ],
  ["/app/settings", () => [inDemo(app.nav[2].label), <AppSettings />]],
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
