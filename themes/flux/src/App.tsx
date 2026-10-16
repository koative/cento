import { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  Check,
  Mail,
  FileText,
  GitBranch,
  Trash2,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  MousePointer2,
  Settings2,
} from "lucide-react";
type Step = { id: number; type: string; name: string };
const initial: Step[] = [
  { id: 1, type: "trigger", name: "New project created" },
  { id: 2, type: "condition", name: "Budget is above €5,000" },
  { id: 3, type: "action", name: "Create project brief" },
  { id: 4, type: "action", name: "Notify the team" },
];
export default function App() {
  const [steps, setSteps] = useState(initial);
  const [selected, setSelected] = useState(2);
  const [name, setName] = useState("Client onboarding");
  const [status, setStatus] = useState("Draft");
  const [log, setLog] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState("Builder");
  const [budget, setBudget] = useState(5000);
  const [sampleBudget, setSampleBudget] = useState(7500);
  const [stopped, setStopped] = useState(false);
  const active = steps.find((s) => s.id === selected);
  function add(type: string) {
    const s = { id: Date.now(), type: "action", name: type };
    setSteps([...steps, s]);
    setSelected(s.id);
    setAdding(false);
    setStatus("Draft");
    setLog([]);
  }
  return (
    <>
      <a className="skip" href="#canvas">
        Skip to workflow canvas
      </a>
      <div className="app-shell">
        <aside className="rail">
          <a className="brand" href="#">
            <Workflow />
          </a>
          <button
            aria-label="Open workflows"
            className="active"
            onClick={() => setTab("Builder")}
          >
            <Workflow />
          </button>
          <button aria-label="Open activity" onClick={() => setTab("Activity")}>
            <FileText />
          </button>
          <span className="rail-avatar">JD</span>
        </aside>
        <div className="workspace">
          <header className="workspace-header">
            <div>
              <span>Acme studio</span>
              <ChevronDown size={14} />
              <span className="slash">/</span>
              <strong>Workflows</strong>
            </div>
            <span className="demo">Fictional workspace · local demo</span>
          </header>
          <div className="workflow-header">
            <div>
              <h1 aria-label={name || "Untitled workflow"}>
                <input
                  aria-label="Workflow name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </h1>
              <p>
                Make the handoff feel effortless.{" "}
                <span className={"state " + status.toLowerCase()}>
                  {status}
                </span>
              </p>
            </div>
            <div>
              <button
                className="outline"
                onClick={() => {
                  setSteps(initial);
                  setSelected(2);
                  setLog([]);
                  setStatus("Draft");
                  setBudget(5000);
                  setSampleBudget(7500);
                  setStopped(false);
                }}
              >
                <RotateCcw />
                Reset
              </button>
              <button
                className="run"
                onClick={() => {
                  let blocked = false;
                  const results = steps.map((s, i) => {
                    if (blocked) return `${i + 1}. ${s.name} — skipped`;
                    if (s.type === "condition" && sampleBudget <= budget) {
                      blocked = true;
                      return `${i + 1}. ${s.name} — condition not met`;
                    }
                    return `${i + 1}. ${s.name} — completed`;
                  });
                  setLog(results);
                  setStopped(blocked);
                  setStatus(blocked ? "Condition not met" : "Test passed");
                  setTab("Activity");
                }}
              >
                <Play />
                Test workflow
              </button>
            </div>
          </div>
          <div className="workspace-tabs">
            <div>
              {["Builder", "Activity"].map((t) => (
                <button
                  key={t}
                  aria-pressed={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t}
                  {t === "Activity" && log.length > 0 && (
                    <span>{log.length}</span>
                  )}
                </button>
              ))}
            </div>
            <span>All changes stay in this browser session</span>
          </div>
          <main className="editor">
            <section id="canvas" className="canvas">
              {tab === "Builder" ? (
                <>
                  <div className="canvas-note">
                    <MousePointer2 size={14} />
                    Select a step to edit
                  </div>
                  <div className="flow">
                    {steps.map((s, i) => (
                      <div className="flow-step" key={s.id}>
                        {i > 0 && (
                          <div className="connector">
                            <span />
                          </div>
                        )}
                        <button
                          className={"node " + s.type}
                          aria-pressed={selected === s.id}
                          onClick={() => setSelected(s.id)}
                        >
                          <span className="node-icon">
                            {s.type === "trigger" ? (
                              <Workflow />
                            ) : s.type === "condition" ? (
                              <GitBranch />
                            ) : s.name.includes("Notify") ? (
                              <Mail />
                            ) : (
                              <FileText />
                            )}
                          </span>
                          <span>
                            <small>
                              {s.type === "trigger"
                                ? "WHEN THIS HAPPENS"
                                : s.type === "condition"
                                  ? "ONLY CONTINUE IF"
                                  : "THEN DO THIS"}
                            </small>
                            <strong>{s.name}</strong>
                          </span>
                          <span className="step-no">{i + 1}</span>
                        </button>
                      </div>
                    ))}
                    <div className="connector" />
                    <button
                      className="add-step"
                      aria-expanded={adding}
                      onClick={() => setAdding(!adding)}
                    >
                      <Plus />
                      Add a step
                    </button>
                    {adding && (
                      <div className="add-options">
                        {[
                          "Send an email",
                          "Create a task",
                          "Update project status",
                        ].map((x) => (
                          <button key={x} onClick={() => add(x)}>
                            {x}
                            <Plus size={14} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="simulation-input">
                    <div>
                      <strong>Try a sample project</strong>
                      <p>
                        The condition checks this budget before any action runs.
                      </p>
                    </div>
                    <label>
                      Sample project budget (€)
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={sampleBudget}
                        onChange={(e) => {
                          setSampleBudget(Math.max(0, +e.target.value));
                          setStatus("Draft");
                        }}
                      />
                    </label>
                    <span className="simulation-outcome">
                      {steps.some((s) => s.type === "condition")
                        ? sampleBudget > budget
                          ? "Matches the current condition"
                          : "Will stop at the condition"
                        : "No condition in this workflow"}
                    </span>
                  </div>
                  <span className="canvas-scale">
                    100% <span>Auto layout</span>
                  </span>
                </>
              ) : (
                <div className="activity">
                  <h2>Test activity</h2>
                  <p>Run a local simulation to check your workflow sequence.</p>
                  {log.length ? (
                    <>
                      <div className={"success " + (stopped ? "stopped" : "")}>
                        <Check />
                        {stopped
                          ? "Condition not met. Remaining actions skipped."
                          : `All ${log.length} steps completed.`}
                      </div>
                      <ol>
                        {log.map((x) => (
                          <li key={x}>
                            {x.endsWith("completed") ? (
                              <Check />
                            ) : (
                              <GitBranch />
                            )}
                            {x.replace(/^\d+\. /, "")}
                          </li>
                        ))}
                      </ol>
                      <p className="demo">
                        Simulated outcomes only. No email, task or external
                        action was created.
                      </p>
                    </>
                  ) : (
                    <div className="empty">
                      <Play />
                      <h2>Ready when you are.</h2>
                      <p>Your first test run will appear here.</p>
                    </div>
                  )}
                </div>
              )}
            </section>
            <aside className="inspector">
              <div className="inspector-heading">
                <Settings2 size={16} />
                <strong>Step settings</strong>
              </div>
              {active ? (
                <>
                  <span className="type-label">{active.type}</span>
                  <h2>{active.name}</h2>
                  <label className="field">
                    Step name
                    <input
                      value={active.name}
                      onChange={(e) => {
                        setSteps(
                          steps.map((s) =>
                            s.id === selected
                              ? { ...s, name: e.target.value }
                              : s,
                          ),
                        );
                        setStatus("Draft");
                      }}
                    />
                  </label>
                  {active.type === "condition" ? (
                    <>
                      <label className="field">
                        Minimum project budget (€)
                        <input
                          type="number"
                          min={0}
                          step={500}
                          value={budget}
                          onChange={(e) => {
                            setBudget(+e.target.value);
                            setSteps(
                              steps.map((s) =>
                                s.id === selected
                                  ? {
                                      ...s,
                                      name: `Budget is above €${(+e.target.value).toLocaleString()}`,
                                    }
                                  : s,
                              ),
                            );
                          }}
                        />
                      </label>
                      <p className="field-help">
                        The simulated path continues when a project meets this
                        condition.
                      </p>
                    </>
                  ) : (
                    <p className="field-help">
                      This step is a local placeholder. Connect your own service
                      to perform real actions.
                    </p>
                  )}
                  <div className="connection">
                    <span className="connection-dot" />
                    Demo connection<span>Local only</span>
                  </div>
                  {active.type !== "trigger" && (
                    <button
                      className="delete"
                      onClick={() => {
                        setSteps(steps.filter((s) => s.id !== selected));
                        setSelected(1);
                        setStatus("Draft");
                      }}
                    >
                      <Trash2 />
                      Remove step
                    </button>
                  )}
                  <div className="inspector-tip">
                    <h3>A little less busywork.</h3>
                    <p>
                      Keep each step focused. A good workflow is one your whole
                      team can understand.
                    </p>
                    <ArrowRight />
                  </div>
                </>
              ) : (
                <p>Select a step to get started.</p>
              )}
            </aside>
          </main>
          <footer className="editor-footer">
            <span>
              <Workflow size={14} /> flux
            </span>
            <span>
              Fictional workflow builder by Koative · no services connected
            </span>
            <span>{steps.length} steps</span>
          </footer>
        </div>
      </div>
    </>
  );
}
