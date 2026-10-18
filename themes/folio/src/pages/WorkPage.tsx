import { Link, navigate } from "../router";
import { artistBySlug, exhibitions, works, type Work } from "../content";
import { dims, price } from "../lib/format";
import { shortlist } from "../lib/store";
import {
  SaveButton,
  StatusMark,
  WorkCard,
  WorkPlate,
} from "../components/WorkCard";
import { ScaleView } from "../components/ScaleView";

export function WorkPage({ work }: { work: Work }) {
  const artist = artistBySlug(work.artist)!;
  const shownIn = exhibitions.find((e) => e.works.includes(work.id));
  const more = works.filter(
    (w) => w.artist === work.artist && w.id !== work.id,
  );

  const enquire = () => {
    if (!shortlist.get().includes(work.id))
      shortlist.set([...shortlist.get(), work.id]);
    navigate("/enquire");
  };

  return (
    <article className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/viewing-room">Viewing room</Link>
      </nav>

      <div className="work-main">
        <figure className="work-stage">
          <WorkPlate work={work} className="plate-stage" />
        </figure>

        <div className="work-info">
          <h1>
            <Link to={`/artists/${artist.slug}`} className="work-artist">
              {artist.name}
            </Link>
            <span className="work-title">
              <cite>{work.title}</cite>, {work.year}
            </span>
          </h1>
          <dl className="spec">
            <div>
              <dt>Medium</dt>
              <dd>{work.medium}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd className="num">
                {dims(work)}
                <br />
                {dims(work, "in")}
              </dd>
            </div>
            {work.edition && (
              <div>
                <dt>Edition</dt>
                <dd>{work.edition}</dd>
              </div>
            )}
            {shownIn && (
              <div>
                <dt>Exhibited</dt>
                <dd>
                  <Link to={`/exhibitions/${shownIn.slug}`}>
                    {shownIn.title}
                  </Link>
                  , {shownIn.space}
                </dd>
              </div>
            )}
          </dl>
          <p className="work-price">
            {work.status === "sold" ? (
              <StatusMark status="sold" />
            ) : (
              price(work)
            )}
            {work.status === "reserved" && <StatusMark status="reserved" />}
          </p>
          <p>{work.note}</p>
          {work.status === "sold" ? (
            <p className="quiet">
              This work has found a home. {artist.name} has other works
              available; ask us and we will send what is in the stockroom.
            </p>
          ) : (
            <p className="quiet">
              {work.status === "reserved"
                ? "Reserved works are held for 7 days. Enquire to join the waiting list."
                : "Prices exclude sales tax. Shipping and installation in New York are included."}
            </p>
          )}
          <div className="actions">
            <button type="button" className="btn" onClick={enquire}>
              {work.status === "sold"
                ? `Ask about ${artist.name}`
                : "Enquire about this work"}
            </button>
            <SaveButton work={work} wide />
          </div>
        </div>
      </div>

      <section className="section scale-section" aria-labelledby="scale-title">
        <div className="scale-intro">
          <h2 id="scale-title">On the wall</h2>
          <p>
            Drawn to scale at {dims(work)}. Choose a wall like yours and set the
            hanging height; galleries hang the centre of a work at about 150 cm.
          </p>
        </div>
        <ScaleView work={work} />
      </section>

      {more.length > 0 && (
        <section className="section" aria-labelledby="more-title">
          <div className="section-head">
            <h2 id="more-title">More by {artist.name}</h2>
            <Link to={`/artists/${artist.slug}`} className="text-link">
              Artist page
            </Link>
          </div>
          <div className="work-grid">
            {more.map((w) => (
              <WorkCard key={w.id} work={w} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
