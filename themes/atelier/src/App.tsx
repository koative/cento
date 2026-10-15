import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  Asterisk,
  Check,
} from "lucide-react";
const projects = [
  {
    title: "Form & Field",
    type: "Brand identity",
    year: "2026",
    className: "form",
    description:
      "A new perspective on everyday objects. Strategy, identity, and an endlessly flexible visual language for a contemporary furniture concept.",
  },
  {
    title: "OFFBEAT",
    type: "Digital experience",
    year: "2026",
    className: "offbeat",
    description:
      "An independent culture platform with a rhythm of its own. A vibrant editorial system, expressive motion, and a website that invites a little wandering.",
  },
  {
    title: "Good Things",
    type: "Packaging",
    year: "2025",
    className: "good",
    description:
      "Optimism, bottled. A joyful packaging family for a fictional natural beverage brand, with bold typography and a generous squeeze of color.",
  },
  {
    title: "Common Ground",
    type: "Brand identity",
    year: "2025",
    className: "common",
    description:
      "A place for ideas to take root. An approachable identity and thoughtful wayfinding for a neighborhood creative space concept.",
  },
];
export default function App() {
  const [filter, setFilter] = useState("Everything");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [spin, setSpin] = useState(0);
  async function copy() {
    try {
      await navigator.clipboard.writeText("hello@example.com");
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <>
      <header>
        <a className="logo" href="#">
          atelier<span>®</span>
        </a>
        <span className="header-note">
          INDEPENDENT MINDS.
          <br />
          SHARED AMBITION.
        </span>
        <nav>
          <a href="#work">Our work</a>
          <a href="#studio">The studio</a>
          <a href="#contact">
            Say hello <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-line">
            <h1>
              Good ideas.
              <br />
              <span>Strange shapes.</span>
            </h1>
            <button
              className="shape-play"
              onClick={() => setSpin(spin + 90)}
              aria-label="Turn the studio sculpture"
            >
              <svg
                viewBox="0 0 200 200"
                role="img"
                aria-label="Yellow sculptural asterisk"
                style={{ transform: `rotate(${spin}deg)` }}
              >
                <path d="M82 0h36v63l45-45 25 25-45 45h57v36h-57l45 45-25 25-45-45v51H82v-51l-45 45-25-25 45-45H0V88h57L12 43l25-25 45 45z" />
              </svg>
              <span>
                GIVE IT A SPIN <ArrowUpRight size={12} />
              </span>
            </button>
          </div>
          <div className="hero-bottom">
            <p>
              We turn interesting businesses
              <br />
              into impossible-to-ignore brands.
            </p>
            <p>
              A small independent design studio.
              <br />
              Big on curiosity. Allergic to ordinary.
            </p>
            <a href="#work" aria-label="Explore selected work">
              <ArrowDown size={30} />
            </a>
          </div>
        </section>
        <section className="work" id="work">
          <div className="work-bar">
            <h2>
              Selected work <span>(04)</span>
            </h2>
            <div className="filters" aria-label="Filter projects">
              {[
                "Everything",
                "Brand identity",
                "Digital experience",
                "Packaging",
              ].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {projects
              .filter((p) => filter === "Everything" || p.type === filter)
              .map((p) => (
                <article className={"project " + p.className} key={p.title}>
                  <button
                    className="project-art"
                    onClick={() =>
                      setExpanded(expanded === p.title ? null : p.title)
                    }
                    aria-expanded={expanded === p.title}
                    aria-label={"Explore " + p.title}
                  >
                    {p.className === "form" ? (
                      <div className="form-poster">
                        <span>
                          FORM
                          <br />& FIELD
                        </span>
                        <div className="form-sculpture">
                          <i />
                          <i />
                          <i />
                        </div>
                        <small>OBJECTS FOR THE WAY YOU LIVE.</small>
                      </div>
                    ) : p.className === "offbeat" ? (
                      <div className="offbeat-poster">
                        <span>
                          OFF
                          <br />
                          BEAT
                        </span>
                        <i>
                          STAY
                          <br />
                          CURIOUS.
                        </i>
                        <small>CULTURE DOESN'T WALK IN A STRAIGHT LINE.</small>
                      </div>
                    ) : p.className === "good" ? (
                      <div className="good-poster">
                        <span>
                          GOOD
                          <br />
                          THINGS
                        </span>
                        <div className="bottle">
                          <i />
                          <b>
                            good
                            <br />
                            things
                            <span>
                              ORANGE
                              <br />& SUNSHINE
                            </span>
                          </b>
                        </div>
                        <small>THAT FEEL LIKE A LITTLE YES.</small>
                      </div>
                    ) : (
                      <div className="common-poster">
                        <div className="common-mark">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        <span>
                          common
                          <br />
                          ground.
                        </span>
                        <small>A SPACE FOR WHAT'S NEXT.</small>
                      </div>
                    )}
                    <span className="project-open">
                      {expanded === p.title ? (
                        <Minus size={20} />
                      ) : (
                        <ArrowUpRight size={20} />
                      )}
                    </span>
                  </button>
                  <div className="project-caption">
                    <div>
                      <h3>{p.title}</h3>
                      <span>{p.type}</span>
                    </div>
                    <span>{p.year}</span>
                  </div>
                  {expanded === p.title && (
                    <div className="project-details">
                      <p>{p.description}</p>
                      <span>
                        Self-initiated concept · Demonstration project
                      </span>
                    </div>
                  )}
                </article>
              ))}
          </div>
        </section>
        <section className="studio" id="studio">
          <div className="studio-label">
            <Asterisk size={32} />
            <span>
              SMALL STUDIO.
              <br />
              WIDE OPEN MINDS.
            </span>
          </div>
          <div>
            <h2>
              Different backgrounds.
              <br />
              One healthy obsession
              <br />
              with <em>what could be.</em>
            </h2>
            <div className="studio-copy">
              <p>
                We bring strategy, identity, and digital experiences into the
                same room. Then ask better questions until something interesting
                happens.
              </p>
              <p>
                From the first scribble to the final pixel, we work closely,
                think openly, and make things that feel unmistakably you.
              </p>
            </div>
            <div className="services">
              <span>Strategy & direction</span>
              <span>Brand identities</span>
              <span>Digital experiences</span>
              <span>Packaging & print</span>
            </div>
          </div>
        </section>
        <section className="contact" id="contact">
          <div>
            <span>HAVE SOMETHING ON YOUR MIND?</span>
            <h2>
              Let's make
              <br />a little noise.
            </h2>
          </div>
          <div className="contact-right">
            <a href="mailto:hello@example.com">
              Say hello
              <ArrowUpRight size={36} />
            </a>
            <button onClick={copy}>
              {copied ? (
                <>
                  <Check size={15} /> Email copied
                </>
              ) : (
                <>
                  Copy demo email <Plus size={15} />
                </>
              )}
            </button>
            <p aria-live="polite">
              {copyError
                ? "Copy manually: hello@example.com"
                : copied
                  ? "hello@example.com is ready to paste."
                  : "hello@example.com · Demonstration address"}
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          atelier<span>®</span>
        </a>
        <span>A FICTIONAL STUDIO WITH REAL PERSONALITY.</span>
        <a href="../../">
          A KOATIVE TEMPLATE <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
