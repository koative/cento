import { useRef, type ReactNode } from "react";
import { match, usePageChange, useRoute } from "./router";
import {
  about,
  app,
  brand,
  changelogPage,
  contact,
  docs,
  home,
  notFound,
  pricing,
  product,
  signin,
  useCases,
  useCasesPage,
} from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import UseCases from "./pages/UseCases";
import UseCasePage from "./pages/UseCase";
import Pricing from "./pages/Pricing";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AppOverview from "./pages/AppOverview";
import AppDocuments from "./pages/AppDocuments";
import AppDocument from "./pages/AppDocument";
import AppStyle from "./pages/AppStyle";
import AppSettings from "./pages/AppSettings";

type Page = [title: string, node: ReactNode] | null;

const site = (s: string) => `${s} — ${brand.name}`;
const inDemo = (s: string) => `${s} — ${brand.name} editor demo`;

const routes: [string, (p: Record<string, string>) => Page][] = [
  ["/", () => [home.title, <Home />]],
  ["/product", () => [site(product.title), <Product />]],
  ["/use-cases", () => [site(useCasesPage.title), <UseCases />]],
  [
    "/use-cases/:slug",
    ({ slug }) => {
      const useCase = useCases.find((u) => u.slug === slug);
      return useCase
        ? [site(`${useCase.team} use case`), <UseCasePage useCase={useCase} />]
        : null;
    },
  ],
  ["/pricing", () => [site(pricing.title), <Pricing />]],
  ["/changelog", () => [site(changelogPage.title), <Changelog />]],
  ["/about", () => [site(about.title), <About />]],
  ["/contact", () => [site(contact.title), <Contact />]],
  ["/signin", () => [site(signin.title), <SignIn mode="signin" />]],
  ["/signup", () => [site(signin.signupTitle), <SignIn mode="signup" />]],
  ["/app", () => [inDemo(app.nav[0].label), <AppOverview />]],
  ["/app/documents", () => [inDemo(app.nav[1].label), <AppDocuments />]],
  [
    "/app/documents/:id",
    ({ id }) => {
      const doc = docs.find((d) => d.id === id);
      return doc ? [inDemo(doc.title), <AppDocument doc={doc} />] : null;
    },
  ],
  ["/app/style", () => [inDemo(app.nav[2].label), <AppStyle />]],
  ["/app/settings", () => [inDemo(app.nav[3].label), <AppSettings />]],
];

function resolveRoute(path: string): [string, ReactNode] | null {
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
  const found = resolveRoute(path);
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
