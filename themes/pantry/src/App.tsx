import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, recipes } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { RecipePage } from "./pages/RecipePage";
import { Plans } from "./pages/Plans";
import { HowItWorks } from "./pages/HowItWorks";
import { GiftCards } from "./pages/GiftCards";
import { About } from "./pages/About";
import { BoxPage } from "./pages/BoxPage";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/menu", () => ({ title: "This week’s menu", node: <Menu /> })],
  [
    "/menu/:slug",
    ({ slug }) => {
      const recipe = recipes.find((r) => r.slug === slug);
      return recipe
        ? {
            title: recipe.name,
            node: <RecipePage recipe={recipe} key={recipe.slug} />,
          }
        : null;
    },
  ],
  ["/plans", () => ({ title: "Plans & prices", node: <Plans /> })],
  ["/how-it-works", () => ({ title: "How it works", node: <HowItWorks /> })],
  ["/gift-cards", () => ({ title: "Gift cards", node: <GiftCards /> })],
  ["/about", () => ({ title: "Our kitchen", node: <About /> })],
  ["/box", () => ({ title: "Your box", node: <BoxPage /> })],
  ["/checkout", () => ({ title: "Sign up & checkout", node: <Checkout /> })],
];

function resolve(path: string): Page {
  for (const [pattern, render] of routes) {
    const params = match(pattern, path);
    const page = params && render(params);
    if (page) return page;
  }
  return { title: "Page not found", node: <NotFound /> };
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
      <main id="main" tabIndex={-1} ref={main} key={path}>
        {page.node}
      </main>
      <Footer />
    </>
  );
}
