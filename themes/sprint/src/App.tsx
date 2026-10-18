import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  changelogPage,
  contact,
  customersPage,
  home,
  notFound,
  pricing,
  product,
  signin,
  stories,
} from "./content";
import { useDemo } from "./lib/store";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AppBoard from "./pages/AppBoard";
import AppList from "./pages/AppList";
import AppIssue from "./pages/AppIssue";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — Sprint`;
const demo = (s: string) => `${s} — Sprint demo`;

export default function App() {
  const path = useRoute();
  const { issues } = useDemo();
  const mainRef = useRef<HTMLElement>(null);

  const routes: [string, (p: Record<string, string>) => Page][] = [
    ["/", () => [home.title, <Home />]],
    ["/product", () => [site(product.title), <Product />]],
    ["/pricing", () => [site(pricing.title), <Pricing />]],
    ["/customers", () => [site(customersPage.title), <Customers />]],
    [
      "/customers/:slug",
      ({ slug }) => {
        const story = stories.find((s) => s.slug === slug);
        return story
          ? [
              site(`${story.company} customer story`),
              <Customer story={story} />,
            ]
          : null;
      },
    ],
    ["/changelog", () => [site(changelogPage.title), <Changelog />]],
    ["/about", () => [site(about.title), <About />]],
    ["/contact", () => [site(contact.title), <Contact />]],
    ["/signin", () => [site(signin.signinTitle), <Auth mode="signin" />]],
    ["/signup", () => [site(signin.signupTitle), <Auth mode="signup" />]],
    ["/app", () => [demo("Board"), <AppBoard />]],
    ["/app/list", () => [demo("All issues"), <AppList />]],
    [
      "/app/issues/:key",
      ({ key }) => {
        const issue = issues.find((i) => i.key === key);
        return issue
          ? [demo(`${issue.key} ${issue.title}`), <AppIssue issue={issue} />]
          : null;
      },
    ],
    ["/app/settings", () => [demo("Settings"), <AppSettings />]],
  ];

  let found: Page = null;
  for (const [pattern, render] of routes) {
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
