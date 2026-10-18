import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { artists, brand, exhibitions, shop, works } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Exhibitions } from "./pages/Exhibitions";
import { ExhibitionPage } from "./pages/ExhibitionPage";
import { Artists } from "./pages/Artists";
import { ArtistPage } from "./pages/ArtistPage";
import { ViewingRoom } from "./pages/ViewingRoom";
import { WorkPage } from "./pages/WorkPage";
import { Visit } from "./pages/Visit";
import { Shop } from "./pages/Shop";
import { ShopItemPage } from "./pages/ShopItemPage";
import { Bag } from "./pages/Bag";
import { About } from "./pages/About";
import { Enquire } from "./pages/Enquire";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/exhibitions", () => ({ title: "Exhibitions", node: <Exhibitions /> })],
  [
    "/exhibitions/:slug",
    ({ slug }) => {
      const ex = exhibitions.find((e) => e.slug === slug);
      return ex
        ? { title: ex.title, node: <ExhibitionPage ex={ex} key={ex.slug} /> }
        : null;
    },
  ],
  ["/artists", () => ({ title: "Artists", node: <Artists /> })],
  [
    "/artists/:slug",
    ({ slug }) => {
      const artist = artists.find((a) => a.slug === slug);
      return artist
        ? {
            title: artist.name,
            node: <ArtistPage artist={artist} key={artist.slug} />,
          }
        : null;
    },
  ],
  ["/viewing-room", () => ({ title: "Viewing room", node: <ViewingRoom /> })],
  [
    "/viewing-room/:id",
    ({ id }) => {
      const work = works.find((w) => w.id === id);
      return work
        ? {
            title: `${work.title}, ${work.year}`,
            node: <WorkPage work={work} key={work.id} />,
          }
        : null;
    },
  ],
  ["/visit", () => ({ title: "Visit", node: <Visit /> })],
  ["/shop", () => ({ title: "Editions & books", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const item = shop.find((s) => s.id === id);
      return item
        ? {
            title: `${item.name} — Shop`,
            node: <ShopItemPage item={item} key={item.id} />,
          }
        : null;
    },
  ],
  ["/bag", () => ({ title: "Your bag", node: <Bag /> })],
  ["/about", () => ({ title: "About", node: <About /> })],
  ["/enquire", () => ({ title: "Enquire", node: <Enquire /> })],
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
