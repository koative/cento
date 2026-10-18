import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, stories } from "./content";
import { modelBySlug } from "./lib/build";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Models } from "./pages/Models";
import { ModelPage } from "./pages/ModelPage";
import { Configure } from "./pages/Configure";
import { Reserve } from "./pages/Reserve";
import { TestDrive } from "./pages/TestDrive";
import { Charging } from "./pages/Charging";
import { Owners } from "./pages/Owners";
import { StoryPage } from "./pages/StoryPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Electric cars with honest range`,
      view: <Home />,
    }),
  ],
  ["/models", () => ({ title: "Models", view: <Models /> })],
  [
    "/models/:slug",
    ({ slug }) => {
      const model = modelBySlug(slug);
      return model
        ? {
            title: `${model.name} ${model.body.toLowerCase()}`,
            view: <ModelPage model={model} />,
          }
        : null;
    },
  ],
  [
    "/configure",
    () => ({ title: "Configure your Vector", view: <Configure /> }),
  ],
  [
    "/configure/:slug",
    ({ slug }) => {
      const model = modelBySlug(slug);
      return model
        ? {
            title: `Configure ${model.name}`,
            view: <Configure model={model} />,
          }
        : null;
    },
  ],
  ["/reserve", () => ({ title: "Reserve", view: <Reserve /> })],
  ["/test-drive", () => ({ title: "Book a test drive", view: <TestDrive /> })],
  ["/charging", () => ({ title: "Charging", view: <Charging /> })],
  ["/owners", () => ({ title: "Owners", view: <Owners /> })],
  [
    "/owners/:slug",
    ({ slug }) => {
      const story = stories.find((s) => s.slug === slug);
      return story
        ? {
            title: `${story.title} · Owner stories`,
            view: <StoryPage story={story} />,
          }
        : null;
    },
  ],
  ["/about", () => ({ title: "Company", view: <About /> })],
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
  usePageChange(
    main,
    path === "/" ? page.title : `${page.title} — ${brand.name}`,
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} ref={main} key={path} className="page">
        {page.view}
      </main>
      <Footer />
    </>
  );
}
