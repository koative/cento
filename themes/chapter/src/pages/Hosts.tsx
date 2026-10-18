import { hosts, shows, staff } from "../content";
import { Link } from "../router";

export function Hosts() {
  return (
    <>
      <section className="wrap page-head">
        <h1>The hosts</h1>
        <p className="lede">
          Seven people who would rather ask one good question than five quick
          ones. Each of them pitched their show to us, and each of them still
          edits with their producer, line by line.
        </p>
      </section>

      <section className="wrap" aria-label="Hosts">
        <ul className="host-grid">
          {hosts.map((h) => {
            const hosted = shows.filter((s) => s.hosts.includes(h.slug));
            return (
              <li key={h.slug} className="host-card">
                <Link
                  to={`/hosts/${h.slug}`}
                  className="host-card-photo"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={h.photo}
                    alt=""
                    loading="lazy"
                    width={720}
                    height={900}
                  />
                </Link>
                <h2>
                  <Link to={`/hosts/${h.slug}`}>{h.name}</Link>
                </h2>
                <p className="meta">
                  {hosted.map((s) => s.title).join(", ")} · {h.basedIn}
                </p>
                <p>{h.short}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap staff" aria-labelledby="staff-h">
        <h2 id="staff-h">Behind the microphones</h2>
        <p>
          Producers, editors and the people who make sure the feeds go out on
          time.
        </p>
        <ul>
          {staff.map((s) => (
            <li key={s.name}>
              <span className="staff-name">{s.name}</span>
              <span className="staff-role">{s.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
