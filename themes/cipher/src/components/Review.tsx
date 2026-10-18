import { useState, type ReactNode } from "react";
import { ArrowRight, Check, Eye, Lock, RotateCcw, X } from "lucide-react";
import { Link } from "../router";
import { app, grants, homeReview, type Grant } from "../content";
import {
  identityOf,
  lastUsed,
  stamp,
  type Decision,
  type Verdict,
} from "../lib/review";
import { AccessPath, Avatar, RiskTag } from "./bits";
import { Seal } from "./Guilloche";

/** Everything a reviewer needs to judge one grant. `actions` renders below the evidence. */
export function GrantDetail({
  grant,
  headingLevel = 3,
  actions,
}: {
  grant: Grant;
  headingLevel?: 2 | 3;
  actions: ReactNode;
}) {
  const person = identityOf(grant);
  const H = `h${headingLevel}` as const;
  return (
    <div className="grant-detail">
      <div className="identity">
        <Avatar initials={person.initials} size="lg" />
        <div>
          <H>{person.name}</H>
          <p>
            {person.title} · {person.dept} · {person.kind}
          </p>
        </div>
        <RiskTag risk={grant.risk} />
      </div>
      <AccessPath grant={grant} person={person} />
      <div className="why">
        <Eye size={18} aria-hidden />
        <div>
          <p className="why-title">Why this needs a look</p>
          <p>{grant.reason}</p>
        </div>
      </div>
      <dl className="facts">
        <div>
          <dt>Last used</dt>
          <dd>{lastUsed(grant.lastUsedDays)}</dd>
        </div>
        <div>
          <dt>Granted</dt>
          <dd>{grant.granted}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{grant.source}</dd>
        </div>
      </dl>
      {actions}
    </div>
  );
}

export function VerdictMark({ decision }: { decision?: Decision }) {
  if (!decision) return null;
  return decision.verdict === "keep" ? (
    <span className="verdict" data-verdict="keep">
      <Check size={14} aria-hidden /> Kept
    </span>
  ) : (
    <span className="verdict" data-verdict="revoke">
      <X size={14} aria-hidden /> Revoked
    </span>
  );
}

/** The signed record a closed review produces. The seal draws itself once, when signed. */
export function Attestation({
  items,
  decisions,
  signedAt,
  children,
}: {
  items: Grant[];
  decisions: Record<string, Decision>;
  signedAt: string;
  children?: ReactNode;
}) {
  const revoked = items.filter(
    (g) => decisions[g.id]?.verdict === "revoke",
  ).length;
  return (
    <article className="attestation" aria-labelledby="attest-title">
      <div className="attestation-head">
        <div>
          <h3 id="attest-title">Attestation of user access review</h3>
          <p>
            {app.workspace} · {app.campaign} · {app.framework}
          </p>
        </div>
        <Seal label="Attested" sub={signedAt.split(",")[0]} />
      </div>
      <p className="attestation-statement">
        I have reviewed the {items.length} grants below and confirm that each
        kept grant is required for the holder's current role. {revoked} grant
        {revoked === 1 ? " was" : "s were"} marked for removal.
      </p>
      <table className="attestation-table">
        <thead>
          <tr>
            <th scope="col">Holder</th>
            <th scope="col">Grant</th>
            <th scope="col">Decision</th>
          </tr>
        </thead>
        <tbody>
          {items.map((g) => (
            <tr key={g.id}>
              <td>{identityOf(g).name}</td>
              <td>
                {g.system} · {g.permission}
              </td>
              <td>
                <VerdictMark decision={decisions[g.id]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="signature">
        <span className="signature-name">{app.reviewer.name}</span>
        <small>Signed {signedAt} · SSO session verified · record sealed</small>
      </p>
      {children}
    </article>
  );
}

const queue = homeReview.map((id) => grants.find((g) => g.id === id)!);

/** Home page signature: a four-grant access review, from first decision to signed attestation. */
export function ReviewWidget() {
  const [active, setActive] = useState(queue[0].id); // a grant id, or "sign" once every grant is decided
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const done = Object.keys(decisions).length;
  const grant = queue.find((g) => g.id === active) ?? queue[0];
  const allDone = done === queue.length;
  const revoked = queue.filter(
    (g) => decisions[g.id]?.verdict === "revoke",
  ).length;

  function decide(verdict: Verdict) {
    const next = { ...decisions, [grant.id]: { verdict, at: stamp() } };
    setDecisions(next);
    const left = queue.length - Object.keys(next).length;
    setMessage(
      `${identityOf(grant).name}, ${grant.permission}: ${verdict === "keep" ? "kept" : "revoked"}. ${left ? `${left} left.` : "Ready to sign."}`,
    );
    setActive(queue.find((g) => !next[g.id])?.id ?? "sign");
  }

  function restart() {
    setDecisions({});
    setSignedAt(null);
    setActive(queue[0].id);
    setMessage("Review reset. Four grants to decide.");
  }

  return (
    <section className="review" aria-label="Interactive access review demo">
      <div className="review-bar">
        <p>
          <Lock size={16} aria-hidden />
          <strong>Access review</strong>
          <span>{app.workspace} · Q4 2026</span>
        </p>
        <p className="review-progress">
          <span className="num">
            {done} of {queue.length} decided
          </span>
          <span className="meter" aria-hidden>
            <span style={{ width: `${(done / queue.length) * 100}%` }} />
          </span>
          {allDone && !signedAt && active !== "sign" && (
            <button className="link-button" onClick={() => setActive("sign")}>
              Sign the review
            </button>
          )}
        </p>
      </div>
      <div className="review-body">
        <ul className="review-queue" aria-label="Grants to review">
          {queue.map((g) => {
            const p = identityOf(g);
            return (
              <li key={g.id}>
                <button
                  aria-pressed={g.id === active && !signedAt}
                  onClick={() => (setActive(g.id), setSignedAt(null))}
                >
                  <Avatar initials={p.initials} />
                  <span className="queue-text">
                    <strong>{p.name}</strong>
                    <small>
                      {g.system} · {g.permission}
                    </small>
                  </span>
                  {decisions[g.id] ? (
                    <VerdictMark decision={decisions[g.id]} />
                  ) : (
                    <span
                      className="risk-dot"
                      data-risk={g.risk}
                      aria-label={`${g.risk} risk`}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="review-detail">
          {signedAt ? (
            <Attestation
              items={queue}
              decisions={decisions}
              signedAt={signedAt}
            >
              <div className="attestation-actions">
                <Link to="/app/review" className="btn btn-primary">
                  Run the full campaign <ArrowRight size={16} aria-hidden />
                </Link>
                <button className="btn btn-quiet" onClick={restart}>
                  <RotateCcw size={16} aria-hidden /> Start over
                </button>
              </div>
            </Attestation>
          ) : active === "sign" ? (
            <div className="sign-panel">
              <h3>All four grants decided</h3>
              <p>
                {revoked} revoked, {queue.length - revoked} kept. Sign to seal
                the record; Cipher would then remove the revoked grants and
                verify each one on the next sync.
              </p>
              <div className="attestation-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSignedAt(stamp());
                    setMessage("Attestation signed and sealed.");
                  }}
                >
                  Sign as {app.reviewer.name}
                </button>
                <button className="btn btn-quiet" onClick={restart}>
                  <RotateCcw size={16} aria-hidden /> Start over
                </button>
              </div>
            </div>
          ) : (
            <GrantDetail
              grant={grant}
              actions={
                <div className="decision">
                  <p>
                    {decisions[grant.id]
                      ? `Decision recorded: ${decisions[grant.id].verdict}.`
                      : "You decide what happens next."}
                  </p>
                  <button
                    className="btn btn-revoke"
                    onClick={() => decide("revoke")}
                  >
                    <X size={16} aria-hidden /> Revoke
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => decide("keep")}
                  >
                    <Check size={16} aria-hidden /> Keep
                  </button>
                </div>
              }
            />
          )}
        </div>
      </div>
      <p className="review-status" role="status">
        {message ||
          "Interactive demonstration on fictional data. Nothing is connected or changed."}
      </p>
    </section>
  );
}
