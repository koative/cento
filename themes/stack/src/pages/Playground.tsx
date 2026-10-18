import { useState } from "react";
import { History, KeyRound, RotateCcw, Send } from "lucide-react";
import { Link } from "../router";
import { brand, endpoints, playgroundPage, resources } from "../content";
import { CodeBlock, highlight, MethodTag } from "../components/Code";
import { DocsLayout } from "../components/DocsLayout";
import {
  buildUrl,
  initialInputs,
  send,
  snippets,
  STATUS_TEXT,
  type Inputs,
  type Reply,
} from "../lib/sandbox";

type Entry = { n: number; op: string; inputs: Inputs; reply: Reply };
const LANGS = [
  { key: "curl", label: "cURL", lang: "bash" },
  { key: "ts", label: "fetch", lang: "ts" },
  { key: "py", label: "Python", lang: "py" },
] as const;

export default function Playground({ op }: { op: string }) {
  const [current, setCurrent] = useState(op);
  const endpoint = endpoints.find((e) => e.op === current) ?? endpoints[0];
  const [inputs, setInputs] = useState(() => initialInputs(endpoint));
  const [reply, setReply] = useState<Reply | null>(null);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<Entry[]>([]);
  const [lang, setLang] = useState<(typeof LANGS)[number]["key"]>("curl");

  const code = snippets(endpoint, inputs);
  const active = LANGS.find((l) => l.key === lang)!;
  const pathParams = endpoint.params.filter((p) => p.in === "path");
  const queryParams = endpoint.params.filter((p) => p.in === "query");

  function choose(next: string) {
    const e = endpoints.find((x) => x.op === next)!;
    setCurrent(next);
    setInputs(initialInputs(e));
    setReply(null);
  }

  function run() {
    if (sending) return;
    setSending(true);
    const n = history.length + 1;
    const r = send(endpoint, inputs, n);
    window.setTimeout(
      () => {
        setReply(r);
        setSending(false);
        setHistory((h) =>
          [{ n, op: endpoint.op, inputs, reply: r }, ...h].slice(0, 6),
        );
      },
      260 + r.ms * 3,
    );
  }

  const ok = reply && reply.status < 400;

  return (
    <DocsLayout wide>
      <article className="doc doc-wide">
        <header className="doc-head">
          <h1>{playgroundPage.h1}</h1>
          <p className="lead">{playgroundPage.lead}</p>
          <p className="key-line">
            <KeyRound size={15} aria-hidden />
            <span>Test key</span>
            <code>{brand.testKey}</code>
            <span className="quiet-note">{playgroundPage.note}</span>
          </p>
        </header>

        <div className="console">
          <form
            className="panel request"
            aria-label="Request"
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
          >
            <div className="panel-head">
              <h2>Request</h2>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => choose(endpoint.op)}
              >
                <RotateCcw size={14} aria-hidden /> Reset to example
              </button>
            </div>
            <div className="field">
              <label htmlFor="pg-op">Endpoint</label>
              <select
                id="pg-op"
                value={endpoint.op}
                onChange={(e) => choose(e.target.value)}
              >
                {resources.map((r) => (
                  <optgroup key={r.slug} label={r.name}>
                    {r.endpoints.map((e) => (
                      <option key={e.op} value={e.op}>
                        {e.method} {e.path} · {e.op}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <p className="url-line">
              <MethodTag method={endpoint.method} />
              <code>{buildUrl(endpoint, inputs)}</code>
            </p>
            <p className="pg-desc">
              {endpoint.description}{" "}
              <Link to={`/api/${endpoint.resource}`}>Reference</Link>
            </p>

            {[...pathParams, ...queryParams].map((p) => {
              const part = p.in as "path" | "query";
              return (
                <div className="field" key={p.name}>
                  <label htmlFor={`pg-${p.name}`}>
                    <code>{p.name}</code>{" "}
                    <span className="param-in">
                      {p.in} · {p.type}
                    </span>
                    {p.required && <span className="req">required</span>}
                  </label>
                  <input
                    id={`pg-${p.name}`}
                    className="mono"
                    spellCheck={false}
                    autoComplete="off"
                    value={inputs[part][p.name] ?? ""}
                    onChange={(e) =>
                      setInputs((v) => ({
                        ...v,
                        [part]: { ...v[part], [p.name]: e.target.value },
                      }))
                    }
                    aria-describedby={`pg-${p.name}-hint`}
                  />
                  <p className="field-hint" id={`pg-${p.name}-hint`}>
                    {p.description}
                  </p>
                </div>
              );
            })}

            {endpoint.request !== undefined && (
              <div className="field">
                <label htmlFor="pg-body">
                  Body <span className="param-in">application/json</span>
                </label>
                <textarea
                  id="pg-body"
                  className="mono body-input"
                  spellCheck={false}
                  rows={Math.max(6, inputs.body.split("\n").length + 1)}
                  value={inputs.body}
                  onChange={(e) =>
                    setInputs((v) => ({ ...v, body: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      run();
                    }
                  }}
                  aria-describedby="pg-body-hint"
                />
                <p className="field-hint" id="pg-body-hint">
                  Fields:{" "}
                  {endpoint.params
                    .filter((p) => p.in === "body")
                    .map((p) => p.name + (p.required ? "*" : ""))
                    .join(", ")}
                  . Starred fields are required. Press Ctrl+Enter or ⌘+Enter to
                  send.
                </p>
              </div>
            )}

            <button
              className="btn btn-primary send"
              disabled={sending}
              aria-busy={sending}
            >
              <Send size={15} aria-hidden />{" "}
              {sending ? "Sending…" : `Send ${endpoint.method} request`}
            </button>
          </form>

          <section
            className="panel response"
            aria-labelledby="res-h"
            aria-busy={sending}
          >
            <div className="panel-head">
              <h2 id="res-h">Response</h2>
              {reply && !sending && (
                <p className="res-meta">
                  <span className={`status ${ok ? "status-ok" : "status-err"}`}>
                    {reply.status} {STATUS_TEXT[reply.status]}
                  </span>
                  <span className="tabular">{reply.ms} ms</span>
                </p>
              )}
            </div>
            <p className="sr-only" role="status">
              {sending
                ? "Sending request"
                : reply
                  ? `${reply.status} ${STATUS_TEXT[reply.status]} in ${reply.ms} milliseconds`
                  : ""}
            </p>
            {sending ? (
              <div className="res-wait">
                <span className="wait-bar" aria-hidden />
                Waiting for the sandbox…
              </div>
            ) : reply ? (
              <>
                <dl className="headers">
                  <div>
                    <dt>content-type</dt>
                    <dd>application/json</dd>
                  </div>
                  <div>
                    <dt>x-request-id</dt>
                    <dd>{reply.requestId}</dd>
                  </div>
                  <div>
                    <dt>ratelimit-remaining</dt>
                    <dd className="tabular">{600 - history.length}</dd>
                  </div>
                </dl>
                <pre className="res-body" tabIndex={0} key={reply.requestId}>
                  <code>{highlight(reply.body, "json")}</code>
                </pre>
              </>
            ) : (
              <div className="res-empty">
                <p>
                  Nothing sent yet. Send the example as it is, then try breaking
                  it:
                </p>
                <ul>
                  <li>delete a required field to get a 422,</li>
                  <li>change an id prefix to get a 404,</li>
                  <li>leave a trailing comma in the body to get a 400.</li>
                </ul>
              </div>
            )}
          </section>
        </div>

        <section className="pg-code" aria-labelledby="code-h">
          <h2 id="code-h">This request as code</h2>
          <p>
            Updates as you edit. Copy it straight into your project; set
            STACK_KEY in your environment first.
          </p>
          <CodeBlock
            code={{ lang: active.lang, code: code[lang] }}
            tabs={
              <div role="group" aria-label="Language" className="code-tabs">
                {LANGS.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    aria-pressed={lang === l.key}
                    onClick={() => setLang(l.key)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            }
          />
        </section>

        <section className="pg-history" aria-labelledby="hist-h">
          <h2 id="hist-h">
            <History size={18} aria-hidden /> This session
          </h2>
          {history.length ? (
            <ol>
              {history.map((h) => {
                const e = endpoints.find((x) => x.op === h.op)!;
                return (
                  <li key={h.n}>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(h.op);
                        setInputs(h.inputs);
                        setReply(h.reply);
                      }}
                    >
                      <span className="tabular hist-n">#{h.n}</span>
                      <MethodTag method={e.method} />
                      <code>{e.path}</code>
                      <span
                        className={`status ${h.reply.status < 400 ? "status-ok" : "status-err"}`}
                      >
                        {h.reply.status}
                      </span>
                      <span className="hist-restore">Restore</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="quiet-note">
              Requests you send appear here, newest first. Click one to restore
              it. Nothing is stored after you leave.
            </p>
          )}
        </section>
      </article>
    </DocsLayout>
  );
}
