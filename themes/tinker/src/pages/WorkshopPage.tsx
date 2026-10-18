import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Ticket } from "lucide-react";
import { Link } from "../router";
import { workshops, type Workshop } from "../content";
import { addLine } from "../lib/cart";
import { money, shortDate } from "../lib/format";
import { Qty } from "../components/Qty";

export function WorkshopPage({ workshop }: { workshop: Workshop }) {
  const open = workshop.sessions.filter((s) => s.left > 0);
  const [sessionId, setSessionId] = useState(open[0]?.id ?? "");
  const [kids, setKids] = useState(1);
  const [added, setAdded] = useState("");
  const session = workshop.sessions.find((s) => s.id === sessionId);
  const others = workshops.filter((w) => w.id !== workshop.id).slice(0, 3);

  function book(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session) return;
    addLine({
      kind: "workshop",
      id: workshop.id,
      name: workshop.name,
      detail: `${shortDate(session.date)}, ${session.time}`,
      image: workshop.image.src,
      unit: workshop.price,
      qty: Math.min(kids, session.left),
      max: session.left,
    });
    setAdded(
      `${kids} ${kids === 1 ? "seat" : "seats"} for ${shortDate(session.date)} added to your basket.`,
    );
  }

  return (
    <div className="page workshop-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/workshops">Workshops</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{workshop.name}</span>
      </nav>

      <header className="workshop-hero">
        <div>
          <h1>{workshop.name}</h1>
          <p className="lead">{workshop.summary}</p>
          <dl className="workshop-facts">
            <div>
              <dt>Ages</dt>
              <dd>{workshop.ages}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{workshop.length}</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>{workshop.seats} kids</dd>
            </div>
            <div>
              <dt>Led by</dt>
              <dd>{workshop.lead}</dd>
            </div>
          </dl>
        </div>
        <img
          src={workshop.image.src}
          alt={workshop.image.alt}
          width={workshop.image.w}
          height={workshop.image.h}
        />
      </header>

      <div className="workshop-layout">
        <div className="workshop-body">
          {workshop.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>How the session runs</h2>
          <ol className="steps">
            {workshop.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h2>Good to know</h2>
          <dl className="specs">
            <div>
              <dt>Take home</dt>
              <dd>{workshop.takeHome}</dd>
            </div>
            <div>
              <dt>Grown-ups</dt>
              <dd>{workshop.grownUp}</dd>
            </div>
            <div>
              <dt>Cancelling</dt>
              <dd>
                Full refund up to 48 hours before, or swap to another date any
                time.
              </dd>
            </div>
          </dl>
        </div>

        <form className="book-box" onSubmit={book}>
          <h2>
            <Ticket size={20} aria-hidden="true" /> Book a seat
          </h2>
          <fieldset>
            <legend>Choose a date</legend>
            {workshop.sessions.map((s) => (
              <label
                key={s.id}
                className="radio-card"
                data-disabled={s.left === 0 || undefined}
              >
                <input
                  type="radio"
                  name="session"
                  value={s.id}
                  checked={sessionId === s.id}
                  disabled={s.left === 0}
                  onChange={() => {
                    setSessionId(s.id);
                    setKids(Math.min(kids, s.left));
                  }}
                />
                <span>
                  <strong>{shortDate(s.date)}</strong>
                  <small>{s.time}</small>
                </span>
                <span className={"seats" + (s.left <= 3 ? " seats-low" : "")}>
                  {s.left ? `${s.left} left` : "Full"}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="buy-row">
            <Qty
              value={kids}
              max={session?.left ?? 1}
              onChange={setKids}
              label="Number of children"
            />
            <button type="submit" className="btn" disabled={!session}>
              Add {kids} {kids === 1 ? "seat" : "seats"} ·{" "}
              {money(workshop.price * kids)}
            </button>
          </div>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View basket</Link>
              </>
            )}
          </p>
        </form>
      </div>

      <section className="related" aria-labelledby="h-more">
        <h2 id="h-more">More at the back bench</h2>
        <ul className="more-workshops">
          {others.map((w) => (
            <li key={w.id}>
              <img
                src={w.image.src}
                alt=""
                width={w.image.w}
                height={w.image.h}
                loading="lazy"
              />
              <Link to={`/workshops/${w.id}`}>{w.name}</Link>
              <span>
                Ages {w.ages} · {money(w.price)}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/workshops" className="text-link">
          See the full workshop calendar{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
