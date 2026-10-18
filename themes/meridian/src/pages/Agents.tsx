import { Mail, Phone } from "lucide-react";
import { Link } from "../router";
import { agents, listings } from "../content";
import { areaOf } from "../lib/format";

export function Agents() {
  return (
    <>
      <section className="page-head wrap">
        <h1>Six agents, one office, every one of them local</h1>
        <p className="lede">
          Each of us sells in the neighborhoods we live in. Call the agent for
          your street directly; if they are out on a viewing, the front desk
          will find them.
        </p>
      </section>
      <section className="wrap section-tight">
        <ul className="agent-grid">
          {agents.map((a) => {
            const live = listings.filter((l) => l.agent === a.id).length;
            return (
              <li key={a.id} className="agent-card">
                <img
                  src={a.photo}
                  alt={`Portrait of ${a.name}`}
                  loading="lazy"
                />
                <h2>
                  <Link to={"/agents/" + a.id}>{a.name}</Link>
                </h2>
                <p className="agent-role">{a.role}</p>
                <p className="muted">
                  {a.areas.map((s) => areaOf(s).name).join(" · ")}
                  {live > 0 && (
                    <>
                      {" "}
                      · <span className="num">{live}</span>{" "}
                      {live === 1 ? "home" : "homes"} listed
                    </>
                  )}
                </p>
                <p className="agent-contact">
                  <a href={a.phoneHref} aria-label={`Call ${a.name}`}>
                    <Phone size={15} aria-hidden="true" />{" "}
                    <span className="num">{a.phone}</span>
                  </a>
                  <a href={"mailto:" + a.email} aria-label={`Email ${a.name}`}>
                    <Mail size={15} aria-hidden="true" /> Email
                  </a>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
