import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  accounts,
  app,
  brand,
  changelog,
  features,
  guides,
  guidesPage,
  home,
  households,
  notFound,
  pricing,
  security,
  signin,
  signup,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Households from "./pages/Households";
import Guides from "./pages/Guides";
import Guide from "./pages/Guide";
import Security from "./pages/Security";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppBudgets from "./pages/AppBudgets";
import AppAccounts from "./pages/AppAccounts";
import AppAccount from "./pages/AppAccount";
import AppTransactions from "./pages/AppTransactions";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} demo`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/features", () => [site(features.title), <Features />]],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/households", () => [site(households.title), <Households />]],
  ["/guides", () => [site(guidesPage.title), <Guides />]],
  [
    "/guides/:slug",
    ({ slug }) => {
      const guide = guides.find((g) => g.slug === slug);
      return guide ? [site(guide.title), <Guide guide={guide} />] : null;
    },
  ],
  ["/security", () => [site(security.title), <Security />]],
  ["/changelog", () => [site(changelog.title), <Changelog />]],
  ["/about", () => [site(about.title), <About />]],
  ["/signup", () => [site(signup.title), <SignUp />]],
  ["/signin", () => [site(signin.title), <SignIn />]],
  ["/app", () => [inDemo(app.nav[0].label), <AppOverview />]],
  ["/app/budgets", () => [inDemo(app.nav[1].label), <AppBudgets />]],
  ["/app/accounts", () => [inDemo(app.nav[2].label), <AppAccounts />]],
  [
    "/app/accounts/:id",
    ({ id }) => {
      const account = accounts.find((a) => a.id === id);
      return account
        ? [inDemo(account.name), <AppAccount account={account} />]
        : null;
    },
  ],
  ["/app/transactions", () => [inDemo(app.nav[3].label), <AppTransactions />]],
  ["/app/settings", () => [inDemo(app.nav[4].label), <AppSettings />]],
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
