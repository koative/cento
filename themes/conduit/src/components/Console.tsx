import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { brand, connectors, wireOf } from "../content";
import { curl, parseBody, run, type Fault, type Run } from "../lib/pipeline";
import { statusClass } from "../lib/format";
import { CopyButton, Json, Mark } from "./bits";

const reasons: Record<number, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  422: "Unprocessable Content",
  502: "Bad Gateway",
};
const faults: { value: Fault; label: string }[] = [
  { value: "none", label: "Healthy" },
  { value: "rate-limit", label: "Rate limited twice (429)" },
  { value: "outage", label: "Down (503)" },
];
const stations = ["Your app", "Auth", "Transform"];
const stationOf = { auth: 1, transform: 2, wait: 2, upstream: 3 } as const;
const sample = (body?: Record<string, unknown>) =>
  body ? JSON.stringify(body, null, 2) : "";

type Tab = "response" | "headers" | "curl";

export function Console({
  compact = false,
  initial = "tillpoint",
}: {
  compact?: boolean;
  initial?: string;
}) {
  const [slug, setSlug] = useState(initial);
  const connector = connectors.find((c) => c.slug === slug) ?? connectors[0];
  const [actionId, setActionId] = useState(connector.actions[0].id);
  const action =
    connector.actions.find((a) => a.id === actionId) ?? connector.actions[0];
  const [body, setBody] = useState(sample(action.body));
  const [fault, setFault] = useState<Fault>("none");
  const [retries, setRetries] = useState(3);
  const [tab, setTab] = useState<Tab>("response");
  const [current, setCurrent] = useState<Run | null>(null);
  const [step, setStep] = useState(-1); // index of the phase being played back; -1 when idle
  const [history, setHistory] = useState<Run[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const playing = step >= 0;
  const bodyCheck = action.method === "GET" ? null : parseBody(body);
  const id = compact ? "hero-console" : "console";

  function pick(nextSlug: string, nextAction?: string) {
    const c = connectors.find((x) => x.slug === nextSlug) ?? connectors[0];
    const a = c.actions.find((x) => x.id === nextAction) ?? c.actions[0];
    setSlug(c.slug);
    setActionId(a.id);
    setBody(sample(a.body));
  }

  function send() {
    const result = run(connector, action, body, fault, retries);
    setCurrent(result);
    setTab("response");
    const done = () => {
      setStep(-1);
      setHistory((h) => [result, ...h].slice(0, 8));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return done();
    // Play each phase back at a readable speed; backoff waits keep their real proportion.
    let at = 0;
    timers.current = result.phases.map((p, i) => {
      const t = window.setTimeout(() => setStep(i), at);
      at +=
        p.kind === "wait"
          ? Math.min(p.ms, 900)
          : Math.min(Math.max(p.ms * 3, 280), 800);
      return t;
    });
    timers.current.push(window.setTimeout(done, at));
  }

  const shown =
    current && (playing ? current.phases.slice(0, step + 1) : current.phases);
  const scale = current ? Math.max(...current.phases.map((p) => p.ms)) : 1;
  const active = playing && current ? current.phases[step] : null;
  const pos = active ? stationOf[active.kind] : 0;
  const failedAt =
    !playing && current && current.status >= 400
      ? current.attempts
        ? 3
        : 2
      : -1;

  return (
    <section
      className={compact ? "console console-compact" : "console"}
      aria-labelledby={`${id}-title`}
      data-wire={wireOf[connector.category]}
    >
      <header className="console-bar">
        <h2 id={`${id}-title`} className="console-title">
          Request console
        </h2>
        <span className="console-env">sandbox · test key</span>
      </header>

      <div className="console-controls">
        <div className="field">
          <label htmlFor={`${id}-connector`}>Connector</label>
          <select
            id={`${id}-connector`}
            value={slug}
            onChange={(e) => pick(e.target.value)}
            disabled={playing}
          >
            {connectors.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-action`}>Action</label>
          <select
            id={`${id}-action`}
            value={action.id}
            onChange={(e) => pick(slug, e.target.value)}
            disabled={playing}
          >
            {connector.actions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-fault`}>Provider behaviour</label>
          <select
            id={`${id}-fault`}
            value={fault}
            onChange={(e) => setFault(e.target.value as Fault)}
            disabled={playing}
          >
            {faults.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-retries`}>Retry policy</label>
          <select
            id={`${id}-retries`}
            value={retries}
            onChange={(e) => setRetries(Number(e.target.value))}
            disabled={playing}
          >
            <option value={0}>No retries</option>
            <option value={3}>Up to 3 retries</option>
            <option value={5}>Up to 5 retries</option>
          </select>
        </div>
      </div>

      <div className="console-request">
        <p className="console-line">
          <span className="method" data-method={action.method}>
            {action.method}
          </span>
          <code>{action.path}</code>
        </p>
        {action.method === "GET" ? (
          <p className="console-nobody">
            GET requests carry no body. {action.summary}
          </p>
        ) : (
          <div className="field console-body">
            <div className="console-body-head">
              <label htmlFor={`${id}-body`}>Request body · JSON</label>
              <button
                type="button"
                className="link-button"
                onClick={() => setBody(sample(action.body))}
                disabled={playing}
              >
                <RotateCcw size={14} aria-hidden /> Reset
              </button>
            </div>
            <textarea
              id={`${id}-body`}
              value={body}
              spellCheck={false}
              rows={compact ? 6 : 9}
              onChange={(e) => setBody(e.target.value)}
              aria-describedby={`${id}-body-hint`}
              aria-invalid={typeof bodyCheck === "string" || undefined}
              disabled={playing}
            />
            <p
              id={`${id}-body-hint`}
              className={
                typeof bodyCheck === "string" ? "field-error" : "field-hint"
              }
            >
              {typeof bodyCheck === "string"
                ? bodyCheck
                : `Required: ${action.required.join(", ")}. Delete one to see a 422.`}
            </p>
          </div>
        )}
        <button
          type="button"
          className="btn btn-signal send"
          onClick={send}
          disabled={playing}
        >
          <Play size={16} aria-hidden /> {playing ? "Sending…" : "Send request"}
        </button>
      </div>

      <div
        className="console-route"
        aria-hidden="true"
        style={{ ["--pos" as string]: pos }}
      >
        <div className="route-line">
          <span
            className="route-packet"
            data-moving={playing ? "" : undefined}
            data-state={active && !active.ok ? "fail" : undefined}
          />
        </div>
        <ol>
          {[...stations, connector.name].map((s, i) => (
            <li
              key={s}
              data-lit={playing && i <= pos ? "" : undefined}
              data-fail={failedAt === i ? "" : undefined}
            >
              {i === 3 ? (
                <Mark connector={connector} size="sm" />
              ) : (
                <span className="station-dot" />
              )}
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="console-result">
        <p className="console-status" role="status">
          {!current ? (
            <span className="muted">
              No requests yet. Press Send — nothing leaves your browser.
            </span>
          ) : playing ? (
            <span>
              {active?.label} — {active?.note}
            </span>
          ) : (
            <>
              <span className={`code-pill ${statusClass(current.status)}`}>
                {current.status} {reasons[current.status]}
              </span>
              <span className="tabular">{current.total} ms</span>
              <span>
                {current.attempts} upstream attempt
                {current.attempts === 1 ? "" : "s"}
              </span>
            </>
          )}
        </p>

        {shown && (
          <ol className="waterfall" aria-label="Phase timings">
            {shown.map((p, i) => (
              <li key={i} data-kind={p.kind} data-fail={p.ok ? undefined : ""}>
                <span className="wf-label">{p.label}</span>
                <span className="wf-track">
                  <span
                    className="wf-bar"
                    style={{ width: `${Math.max(3, (p.ms / scale) * 100)}%` }}
                  />
                </span>
                <span className="wf-ms tabular">{p.ms} ms</span>
                {!compact && <span className="wf-note">{p.note}</span>}
              </li>
            ))}
          </ol>
        )}

        {current && !playing && (
          <div className="console-output">
            <div
              className="console-tabs"
              role="tablist"
              aria-label="Response view"
            >
              {(["response", "headers", "curl"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t === "curl" ? "cURL" : t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
              <CopyButton
                text={
                  tab === "response"
                    ? JSON.stringify(current.response, null, 2)
                    : tab === "headers"
                      ? current.headers.map(([k, v]) => `${k}: ${v}`).join("\n")
                      : curl(current.action, current.body, brand.apiBase)
                }
              />
            </div>
            <pre
              role="tabpanel"
              tabIndex={0}
              aria-label={`${tab} for ${current.id}`}
            >
              {tab === "response" ? (
                <Json value={current.response} />
              ) : tab === "headers" ? (
                <code>
                  {current.headers.map(([k, v]) => `${k}: ${v}`).join("\n")}
                </code>
              ) : (
                <code>{curl(current.action, current.body, brand.apiBase)}</code>
              )}
            </pre>
          </div>
        )}
      </div>

      {!compact && (
        <div className="console-history">
          <h3>History</h3>
          {history.length === 0 ? (
            <p className="muted">Sent requests appear here, newest first.</p>
          ) : (
            <ul>
              {history.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    aria-pressed={current?.id === h.id}
                    onClick={() => setCurrent(h)}
                    disabled={playing}
                  >
                    <span className={`code-pill ${statusClass(h.status)}`}>
                      {h.status}
                    </span>
                    <span className="method" data-method={h.action.method}>
                      {h.action.method}
                    </span>
                    <code>{h.action.path}</code>
                    <span className="tabular">{h.total} ms</span>
                    <span className="tabular muted">{h.at}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
