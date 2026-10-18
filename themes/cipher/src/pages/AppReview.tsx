import { useState } from "react";
import { Check, RotateCcw, Search, Undo2, X } from "lucide-react";
import { Link } from "../router";
import { app, grants, riskLabel, type Risk } from "../content";
import {
  decide,
  identityOf,
  restart,
  sign,
  undo,
  useReview,
} from "../lib/review";
import { Avatar } from "../components/bits";
import { Attestation, GrantDetail, VerdictMark } from "../components/Review";

const systems = [...new Set(grants.map((g) => g.system))].sort();
const order: Record<Risk, number> = { high: 0, medium: 1, low: 2 };
const sorted = [...grants].sort((a, b) => order[a.risk] - order[b.risk]);

export default function AppReview() {
  const { decisions, signedAt } = useReview();
  const [status, setStatus] = useState<"open" | "decided" | "all">("open");
  const [risk, setRisk] = useState("");
  const [system, setSystem] = useState("");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(
    () =>
      new URLSearchParams(window.location.hash.split("?")[1]).get("g") ??
      sorted.find((g) => !decisions[g.id])?.id ??
      sorted[0].id,
  );
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [message, setMessage] = useState("");

  const q = query.trim().toLowerCase();
  const shown = sorted.filter(
    (g) =>
      (status === "all" || (status === "open") === !decisions[g.id]) &&
      (!risk || g.risk === risk) &&
      (!system || g.system === system) &&
      (!q ||
        `${identityOf(g).name} ${g.system} ${g.permission}`
          .toLowerCase()
          .includes(q)),
  );
  const grant = grants.find((g) => g.id === active) ?? sorted[0];
  const decision = decisions[grant.id];
  const open = grants.length - Object.keys(decisions).length;
  const routineLow = shown.filter((g) => g.risk === "low" && !decisions[g.id]);

  function next(after: Record<string, unknown>) {
    const following =
      sorted.find(
        (g) => g.id !== grant.id && !after[g.id] && shown.includes(g),
      ) ?? sorted.find((g) => !after[g.id]);
    if (following) setActive(following.id);
  }

  function verdict(v: "keep" | "revoke") {
    if (v === "revoke" && !reason) {
      setReasonError(
        "Choose why this access should go; it is written into the evidence.",
      );
      document.getElementById("revoke-reason")?.focus();
      return;
    }
    decide([grant.id], v, v === "revoke" ? reason : undefined);
    setMessage(
      `${identityOf(grant).name}, ${grant.permission} in ${grant.system}: ${v === "keep" ? "kept" : "revoked"}.`,
    );
    setReason("");
    setReasonError("");
    next({ ...decisions, [grant.id]: true });
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Review queue</h1>
          <p>
            {open} of {grants.length} grants open · due {app.due} · highest risk
            first
          </p>
        </div>
        {routineLow.length > 0 && (
          <button
            className="btn btn-quiet"
            onClick={() => {
              decide(
                routineLow.map((g) => g.id),
                "keep",
              );
              setMessage(
                `${routineLow.length} low-risk grants that match their role were kept.`,
              );
            }}
          >
            <Check size={16} aria-hidden /> Keep {routineLow.length} low-risk
            grants
          </button>
        )}
      </header>

      {signedAt ? (
        <Attestation items={grants} decisions={decisions} signedAt={signedAt}>
          <div className="attestation-actions">
            <Link to="/app" className="btn btn-primary">
              Back to overview
            </Link>
            <button className="btn btn-quiet" onClick={restart}>
              <RotateCcw size={16} aria-hidden /> Restart the demo campaign
            </button>
          </div>
        </Attestation>
      ) : open === 0 ? (
        <section className="panel sign-panel" aria-labelledby="sign-title">
          <h2 id="sign-title">Every grant is decided</h2>
          <p>
            {
              Object.values(decisions).filter((d) => d.verdict === "revoke")
                .length
            }{" "}
            revoked,{" "}
            {
              Object.values(decisions).filter((d) => d.verdict === "keep")
                .length
            }{" "}
            kept. Signing seals the campaign and starts removal for revoked
            grants.
          </p>
          <button className="btn btn-primary" onClick={sign}>
            Sign attestation as {app.reviewer.name}
          </button>
        </section>
      ) : null}

      {!signedAt && (
        <>
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Status">
              {(["open", "decided", "all"] as const).map((s) => (
                <button
                  key={s}
                  className="chip"
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s === "open" ? "Open" : s === "decided" ? "Decided" : "All"}
                </button>
              ))}
            </div>
            <label className="select-inline">
              <span>Risk</span>
              <select value={risk} onChange={(e) => setRisk(e.target.value)}>
                <option value="">Any</option>
                {(Object.keys(riskLabel) as Risk[]).map((r) => (
                  <option key={r} value={r}>
                    {riskLabel[r]}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-inline">
              <span>System</span>
              <select
                value={system}
                onChange={(e) => setSystem(e.target.value)}
              >
                <option value="">All systems</option>
                {systems.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="search">
              <Search size={16} aria-hidden />
              <span className="sr-only">Search grants</span>
              <input
                type="search"
                placeholder="Person, system or permission"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          <div className="queue-layout">
            <section aria-label="Grants">
              <p className="result-count" role="status">
                {shown.length} grant{shown.length === 1 ? "" : "s"} shown
              </p>
              {shown.length ? (
                <ul className="queue-list">
                  {shown.map((g) => {
                    const p = identityOf(g);
                    return (
                      <li key={g.id}>
                        <button
                          aria-pressed={g.id === grant.id}
                          onClick={() => (setActive(g.id), setReasonError(""))}
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
                              aria-label={`${riskLabel[g.risk]} risk`}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="empty">
                  <p>
                    {status === "open" && !risk && !system && !q
                      ? "Nothing left open. Switch to Decided to change a decision."
                      : "No grants match these filters."}
                  </p>
                  <button
                    className="btn btn-quiet"
                    onClick={() => {
                      setStatus("all");
                      setRisk("");
                      setSystem("");
                      setQuery("");
                    }}
                  >
                    Show all grants
                  </button>
                </div>
              )}
            </section>

            <section className="panel" aria-label="Selected grant">
              <GrantDetail
                grant={grant}
                headingLevel={2}
                actions={
                  decision ? (
                    <div className="decision done">
                      <p>
                        <VerdictMark decision={decision} /> by{" "}
                        {app.reviewer.name}, {decision.at}
                        {decision.reason ? ` · ${decision.reason}` : ""}
                      </p>
                      <button
                        className="btn btn-quiet"
                        onClick={() => (
                          undo(grant.id),
                          setMessage(`Decision on ${grant.permission} undone.`)
                        )}
                      >
                        <Undo2 size={16} aria-hidden /> Undo
                      </button>
                    </div>
                  ) : (
                    <div className="decision-form">
                      <div className="field">
                        <label htmlFor="revoke-reason">
                          Reason, if you revoke
                        </label>
                        <select
                          id="revoke-reason"
                          value={reason}
                          aria-invalid={reasonError ? true : undefined}
                          aria-describedby={
                            reasonError ? "revoke-reason-err" : undefined
                          }
                          onChange={(e) => (
                            setReason(e.target.value),
                            setReasonError("")
                          )}
                        >
                          <option value="">Choose a reason…</option>
                          {app.revokeReasons.map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                        {reasonError && (
                          <p className="field-error" id="revoke-reason-err">
                            {reasonError}
                          </p>
                        )}
                      </div>
                      <div className="decision">
                        <button
                          className="btn btn-revoke"
                          onClick={() => verdict("revoke")}
                        >
                          <X size={16} aria-hidden /> Revoke
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => verdict("keep")}
                        >
                          <Check size={16} aria-hidden /> Keep
                        </button>
                      </div>
                    </div>
                  )
                }
              />
              <p className="review-status" role="status">
                {message ||
                  "Demo workspace: decisions stay in this browser tab and reset on reload."}
              </p>
              <Link
                to={`/app/identities/${grant.identity}`}
                className="text-link"
              >
                Everything {identityOf(grant).name} can access
              </Link>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
