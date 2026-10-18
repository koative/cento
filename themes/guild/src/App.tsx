import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, findCraft, findTalent } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { TalentList } from "./pages/TalentList";
import { Profile } from "./pages/Profile";
import { Crafts } from "./pages/Crafts";
import { CraftPage } from "./pages/CraftPage";
import { Post } from "./pages/Post";
import { HowItWorks } from "./pages/HowItWorks";
import { Pricing } from "./pages/Pricing";
import { Bench } from "./pages/Bench";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; view: ReactNode };
type Route = [string, (p: Record<string, string>) => Page | null];

const routes: Route[] = [
  [
    "/",
    () => ({
      title: `${brand.name} — Freelance designers, engineers and writers, vouched for`,
      view: <Home />,
    }),
  ],
  ["/talent", () => ({ title: "Browse talent", view: <TalentList /> })],
  [
    "/talent/:id",
    ({ id }) => {
      const t = findTalent(id);
      return t
        ? {
            title: `${t.name}, ${findCraft(t.craft)?.name ?? "member"}`,
            view: <Profile t={t} />,
          }
        : null;
    },
  ],
  ["/crafts", () => ({ title: "Crafts", view: <Crafts /> })],
  [
    "/crafts/:slug",
    ({ slug }) => {
      const c = findCraft(slug);
      return c
        ? { title: `${c.name} freelancers`, view: <CraftPage craft={c} /> }
        : null;
    },
  ],
  ["/post", () => ({ title: "Post a project", view: <Post /> })],
  ["/how-it-works", () => ({ title: "How it works", view: <HowItWorks /> })],
  ["/pricing", () => ({ title: "Pricing & fees", view: <Pricing /> })],
  ["/bench", () => ({ title: "Your bench", view: <Bench /> })],
  ["/signup", () => ({ title: "Join Guild", view: <SignUp /> })],
  ["/signin", () => ({ title: "Sign in", view: <SignIn /> })],
  ["/about", () => ({ title: "About & charter", view: <About /> })],
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
  const title = path === "/" ? page.title : `${page.title} — ${brand.name}`;
  usePageChange(main, title);

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
