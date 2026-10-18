import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand, products, series, videos } from "./content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Videos } from "./pages/Videos";
import { VideoPage } from "./pages/VideoPage";
import { SeriesList } from "./pages/SeriesList";
import { SeriesPage } from "./pages/SeriesPage";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Membership } from "./pages/Membership";
import { Partners } from "./pages/Partners";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/videos", () => ({ title: "Videos", node: <Videos /> })],
  [
    "/videos/:slug",
    ({ slug }) => {
      const video = videos.find((v) => v.slug === slug);
      return video
        ? {
            title: video.title,
            node: <VideoPage video={video} key={video.slug} />,
          }
        : null;
    },
  ],
  ["/series", () => ({ title: "Series", node: <SeriesList /> })],
  [
    "/series/:slug",
    ({ slug }) => {
      const s = series.find((x) => x.slug === slug);
      return s
        ? { title: s.name, node: <SeriesPage series={s} key={s.slug} /> }
        : null;
    },
  ],
  ["/shop", () => ({ title: "Merch", node: <Shop /> })],
  [
    "/shop/:id",
    ({ id }) => {
      const product = products.find((p) => p.id === id);
      return product
        ? {
            title: product.name,
            node: <ProductPage product={product} key={product.id} />,
          }
        : null;
    },
  ],
  ["/cart", () => ({ title: "Your bag", node: <Cart /> })],
  ["/checkout", () => ({ title: "Checkout", node: <Checkout /> })],
  ["/membership", () => ({ title: "Membership", node: <Membership /> })],
  ["/partners", () => ({ title: "Brand deals", node: <Partners /> })],
  ["/about", () => ({ title: "About the shop", node: <About /> })],
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
