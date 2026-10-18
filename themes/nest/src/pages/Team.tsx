import { Mail } from "lucide-react";
import { Link } from "../router";
import { brand, rooms, team } from "../content";
import { Peg } from "../components/Peg";
import { TourCta } from "../components/TourCta";

export function Team() {
  const leaders = team.filter((p) => p.leadership);
  const leads = team.filter((p) => p.roomId);
  const support = team.filter((p) => !p.roomId && !p.leadership);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>The team</h1>
          <p className="lede">
            Twenty-four grown-ups, most of whom have been here longer than five
            years. Every child has a key person; every room has a lead you can
            always ask for.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap leaders">
          {leaders.map((p) => (
            <article key={p.id} className="leader">
              <Peg symbol={p.symbol} color={p.color} name={p.name} size="lg" />
              <div>
                <h2>{p.name}</h2>
                <p className="role">{p.role}</p>
                <p>{p.bio}</p>
                <p className="quiet">
                  {p.qualification} · at Nest since {p.since}
                </p>
                <p className="ask">Ask me about: {p.askMe}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap">
          <div className="section-head">
            <h2>Room leads</h2>
            <p>
              The person at the door each morning, and the one who writes your
              child's notes.
            </p>
          </div>
          <ul className="people">
            {leads.map((p) => {
              const room = rooms.find((r) => r.id === p.roomId)!;
              return (
                <li key={p.id}>
                  <Peg symbol={p.symbol} color={p.color} name={p.name} />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="role">
                      <Link to={`/rooms/${room.id}`}>{room.name}</Link> lead ·{" "}
                      {room.ages.split(" · ")[0]}
                    </p>
                    <p>{p.bio}</p>
                    <p className="quiet">{p.qualification}</p>
                    <p className="ask">Ask me about: {p.askMe}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Kitchen & garden</h2>
          </div>
          <ul className="people people-2">
            {support.map((p) => (
              <li key={p.id}>
                <Peg symbol={p.symbol} color={p.color} name={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p className="role">{p.role}</p>
                  <p>{p.bio}</p>
                  <p className="ask">Ask me about: {p.askMe}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap careers">
          <div>
            <h2>Work at Nest</h2>
            <p>
              We pay above the local rate, close for two weeks at winter, fund
              every qualification you want to take, and keep rooms well staffed
              so breaks are real breaks. We're looking for a part-time Robins
              practitioner and a Swifts assistant from January.
            </p>
          </div>
          <a
            className="btn btn-ghost"
            href={`mailto:jobs@nest.example?subject=Working at ${brand.name}`}
          >
            <Mail aria-hidden="true" /> jobs@nest.example
          </a>
        </div>
      </section>
      <TourCta title="Meet them at the door." />
    </>
  );
}
