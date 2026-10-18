import { useRef, type ReactNode } from "react";
import { match, useRoute, usePageChange } from "./router";
import { brand } from "./content";
import { clinicianBy, serviceBy } from "./lib/schedule";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServicePage } from "./pages/ServicePage";
import { Clinicians } from "./pages/Clinicians";
import { ClinicianPage } from "./pages/ClinicianPage";
import { Book } from "./pages/Book";
import { Patients } from "./pages/Patients";
import { Locations } from "./pages/Locations";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

type Page = { title: string; node: ReactNode };

const routes: [string, (p: Record<string, string>) => Page | null][] = [
  ["/", () => ({ title: `${brand.name} — ${brand.sector}`, node: <Home /> })],
  ["/services", () => ({ title: "Services", node: <Services /> })],
  [
    "/services/:slug",
    ({ slug }) => {
      const service = serviceBy(slug);
      return service
        ? { title: service.name, node: <ServicePage service={service} /> }
        : null;
    },
  ],
  ["/clinicians", () => ({ title: "Our clinicians", node: <Clinicians /> })],
  [
    "/clinicians/:slug",
    ({ slug }) => {
      const clinician = clinicianBy(slug);
      return clinician
        ? {
            title: `${clinician.name}, ${clinician.role}`,
            node: <ClinicianPage clinician={clinician} />,
          }
        : null;
    },
  ],
  ["/book", () => ({ title: "Book a visit", node: <Book /> })],
  ["/patients", () => ({ title: "Patient information", node: <Patients /> })],
  ["/locations", () => ({ title: "Locations & hours", node: <Locations /> })],
  ["/about", () => ({ title: "About the practice", node: <About /> })],
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
        {page.node}
      </main>
      <Footer />
    </>
  );
}
