import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { app, bookingFunnel, events } from "../content";
import { FunnelChart } from "../components/Charts";
import { EventName, num } from "../components/format";

const MAX_STEPS = 6;

/** Stable pseudo-random number per pair of events, so demo conversion rates do not jump around. */
function hash(s: string) {
  return [...s].reduce((a, c) => (a * 33 + c.charCodeAt(0)) % 100003, 5381);
}

/** Step-to-step rate: the measured booking funnel where known, a stable 25–80% otherwise. */
function rate(from: string, to: string) {
  const i = bookingFunnel.findIndex((s) => s.event === from);
  if (i >= 0 && bookingFunnel[i + 1]?.event === to)
    return bookingFunnel[i + 1].users / bookingFunnel[i].users;
  return 0.25 + (hash(from + to) % 55) / 100;
}

export default function AppFunnels() {
  const [funnelId, setFunnelId] = useState(app.funnels[0].id);
  const [steps, setSteps] = useState(app.funnels[0].steps);
  const [windowId, setWindowId] = useState("7d");
  const [platformId, setPlatformId] = useState("all");
  const [adding, setAdding] = useState("");

  const win = app.windows.find((w) => w.id === windowId)!;
  const platform = app.platforms.find((p) => p.id === platformId)!;
  const users = events.find((e) => e.id === steps[0])!.users * platform.share;
  const computed = steps.reduce<{ event: string; users: number }[]>(
    (acc, id, i) => {
      if (i === 0) return [{ event: id, users: Math.round(users) }];
      const prev = acc[i - 1];
      const r = Math.min(
        0.97,
        rate(prev.event, id) * win.factor * platform.bias,
      );
      return [...acc, { event: id, users: Math.round(prev.users * r) }];
    },
    [],
  );
  const overall = computed.at(-1)!.users / computed[0].users;
  const available = events.filter(
    (e) => !steps.includes(e.id) && e.status !== "Deprecated",
  );

  function load(id: string) {
    setFunnelId(id);
    setSteps(app.funnels.find((f) => f.id === id)!.steps);
  }
  function move(i: number, by: number) {
    const next = [...steps];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    setSteps(next);
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Funnels</h1>
          <p>
            Pick a saved funnel or edit the steps. Counts recompute instantly on
            demo data.
          </p>
        </div>
      </header>

      <div className="funnel-layout">
        <nav className="saved" aria-label="Saved funnels">
          <h2>Saved</h2>
          <ul>
            {app.funnels.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={funnelId === f.id}
                  onClick={() => load(f.id)}
                >
                  {f.name}
                  <small>{f.steps.length} steps</small>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="funnel-main">
          <section className="app-card" aria-labelledby="steps-title">
            <div className="panel-head">
              <h2 id="steps-title">Steps</h2>
              <div className="app-controls">
                <label className="select-inline">
                  <span>Window</span>
                  <select
                    value={windowId}
                    onChange={(e) => setWindowId(e.target.value)}
                  >
                    {app.windows.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="select-inline">
                  <span>Platform</span>
                  <select
                    value={platformId}
                    onChange={(e) => setPlatformId(e.target.value)}
                  >
                    {app.platforms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <ol className="step-editor">
              {steps.map((s, i) => (
                <li key={s}>
                  <span className="step-n num">{i + 1}</span>
                  <EventName id={s} />
                  <span className="step-actions">
                    <button
                      type="button"
                      className="icon-btn"
                      disabled={i === 0}
                      onClick={() => move(i, -1)}
                      aria-label={`Move ${s} up`}
                    >
                      <ArrowUp size={15} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      disabled={i === steps.length - 1}
                      onClick={() => move(i, 1)}
                      aria-label={`Move ${s} down`}
                    >
                      <ArrowDown size={15} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      disabled={steps.length <= 2}
                      onClick={() => setSteps(steps.filter((x) => x !== s))}
                      aria-label={`Remove ${s}`}
                    >
                      <X size={15} aria-hidden />
                    </button>
                  </span>
                </li>
              ))}
            </ol>
            <form
              className="add-step"
              onSubmit={(e) => {
                e.preventDefault();
                if (!adding) return;
                setSteps([...steps, adding]);
                setAdding("");
              }}
            >
              <label className="select-inline">
                <span>Add step</span>
                <select
                  value={adding}
                  onChange={(e) => setAdding(e.target.value)}
                  disabled={steps.length >= MAX_STEPS}
                >
                  <option value="">
                    {steps.length >= MAX_STEPS
                      ? `Maximum ${MAX_STEPS} steps`
                      : "Choose an event…"}
                  </option>
                  {available.map((e) => (
                    <option key={e.id}>{e.id}</option>
                  ))}
                </select>
              </label>
              <button className="btn btn-ghost btn-sm" disabled={!adding}>
                <Plus size={15} aria-hidden /> Add
              </button>
            </form>
          </section>

          <section className="app-card" aria-labelledby="result-title">
            <div className="panel-head">
              <h2 id="result-title">Conversion</h2>
              <p className="funnel-total" aria-live="polite">
                <strong className="num">{(overall * 100).toFixed(1)}%</strong>{" "}
                of {num.format(computed[0].users)} people reached the last step
              </p>
            </div>
            <FunnelChart
              steps={computed}
              label={`Funnel with ${steps.length} steps, ${(overall * 100).toFixed(1)}% overall conversion`}
            />
          </section>

          <section className="app-card" aria-labelledby="table-title">
            <h2 id="table-title" className="panel-title">
              Step details
            </h2>
            <div
              className="table-scroll"
              role="region"
              aria-labelledby="table-title"
              tabIndex={0}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Step</th>
                    <th scope="col" className="r">
                      People
                    </th>
                    <th scope="col" className="r">
                      From start
                    </th>
                    <th scope="col" className="r">
                      From previous
                    </th>
                    <th scope="col" className="r">
                      Median time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {computed.map((c, i) => (
                    <tr key={c.event}>
                      <td>
                        <EventName id={c.event} />
                      </td>
                      <td className="r num">{num.format(c.users)}</td>
                      <td className="r num">
                        {((c.users / computed[0].users) * 100).toFixed(1)}%
                      </td>
                      <td className="r num">
                        {i
                          ? `${((c.users / computed[i - 1].users) * 100).toFixed(1)}%`
                          : "—"}
                      </td>
                      <td className="r num">
                        {i
                          ? `${(hash(c.event + steps[i - 1]) % 38) + 2} min`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
