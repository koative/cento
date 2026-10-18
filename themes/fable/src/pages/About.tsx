import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, exhibits, images, principles, story, team } from "../content";
import { Shape } from "../components/Shape";

export function About() {
  return (
    <>
      <section className="page-hero wrap about-hero">
        <div>
          <h1>A museum that started with a water table</h1>
          <p className="lede">
            Since 1998, Fable has been the place in Wonderby where children are
            allowed — expected — to touch everything.
          </p>
        </div>
        <figure className="about-photo">
          <img
            src={images.studio}
            alt="A grown-up holds a cup of paintbrushes while a child paints at an easel behind."
            width={1280}
            height={854}
          />
          <figcaption>
            Saturday painting in the Colour Kitchen studio.
          </figcaption>
        </figure>
      </section>

      <section className="section wrap story" aria-labelledby="story-title">
        <h2 id="story-title">Our story</h2>
        <div className="prose">
          {story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section
        className="section band band-ink"
        aria-labelledby="principles-title"
      >
        <div className="wrap">
          <h2 id="principles-title">What we believe</h2>
          <ul className="principles">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Shape
                  kind={exhibits[i * 3].shape}
                  swatch={exhibits[i * 3].swatch}
                />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">The people in yellow shirts</h2>
          <p>Forty-two staff and about 180 volunteers, led by these six.</p>
        </div>
        <ul className="team">
          {team.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap split-note">
        <h2>Work, volunteer or give</h2>
        <p>
          We hire floor staff every spring and summer, and volunteers can start
          at sixteen. Gifts to the Fable Fund pay for free school visits and
          Sensory Saturdays. Write to{" "}
          <a href={`mailto:${brand.email}?subject=Joining%20in`}>
            {brand.email}
          </a>{" "}
          and tell us what you would like to do.
        </p>
        <Link to="/visit" className="text-link">
          Come and see it first <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
