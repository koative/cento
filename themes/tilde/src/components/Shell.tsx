import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link, navigate } from "../router";
import { brand } from "../content";
import { complete, run, type Line } from "../lib/shell";
import { toggleScheme } from "../lib/theme";

type Props = { boot: string[]; suggestions: string[]; label: string };

/** Runs the boot commands once so the first paint already shows real output. */
function bootLines(boot: string[]) {
  return boot.flatMap((cmd): Line[] => [
    { kind: "cmd", cwd: "~", text: cmd },
    ...run(cmd, "~", []).lines,
  ]);
}

export function Shell({ boot, suggestions, label }: Props) {
  const [lines, setLines] = useState(() => bootLines(boot));
  const [cwd, setCwd] = useState("~");
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>(boot);
  const [cursor, setCursor] = useState(-1);
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function exec(cmd: string) {
    const result = run(cmd, cwd, [...history, cmd]);
    const echo: Line = { kind: "cmd", cwd, text: cmd };
    setLines((prev) => (result.clear ? [] : [...prev, echo, ...result.lines]));
    if (cmd.trim()) setHistory((h) => [...h, cmd.trim()]);
    if (result.cwd) setCwd(result.cwd);
    if (result.scheme) toggleScheme();
    if (result.go) navigate(result.go);
    setValue("");
    setCursor(-1);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      exec(value);
    } else if (e.key === "Tab" && value) {
      const next = complete(value, cwd);
      if (next !== value) {
        e.preventDefault();
        setValue(next);
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!history.length) return;
      e.preventDefault();
      const step = e.key === "ArrowUp" ? -1 : 1;
      const from = cursor === -1 ? history.length : cursor;
      const next = Math.min(history.length, Math.max(0, from + step));
      setCursor(next === history.length ? -1 : next);
      setValue(history[next] ?? "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div
      className="shell"
      onClick={() =>
        window.getSelection()?.isCollapsed &&
        input.current?.focus({ preventScroll: true })
      }
    >
      <div className="shell-bar">
        <span>tsh</span>
        <span className="shell-title">
          {brand.handle}@home: {cwd}
        </span>
      </div>
      <div
        className="shell-screen"
        ref={screen}
        role="log"
        aria-live="polite"
        aria-label="Shell output"
      >
        {lines.map((l, i) => (
          <ShellLine key={i} line={l} />
        ))}
        <div className="shell-input">
          <label htmlFor="tsh-input" className="prompt">
            <span className="visually-hidden">{label}, </span>
            {cwd} $
          </label>
          <input
            id="tsh-input"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
          />
        </div>
      </div>
      <div className="shell-hints">
        <span aria-hidden="true">try</span>
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => exec(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function ShellLine({ line }: { line: Line }) {
  if (line.kind === "cmd")
    return (
      <p className="shell-cmd">
        <span className="prompt">{line.cwd} $</span> {line.text}
      </p>
    );
  if (line.kind === "text")
    return (
      <p className={line.tone ? "shell-" + line.tone : undefined}>
        {line.text || "\u00a0"}
      </p>
    );
  return (
    <ul className="shell-ls">
      {line.items.map((item) => (
        <li key={item.to + item.label}>
          <Link to={item.to}>{item.label}</Link>
          {item.note && <span className="shell-muted"> {item.note}</span>}
        </li>
      ))}
    </ul>
  );
}
