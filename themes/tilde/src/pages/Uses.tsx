import { useRef, useState, type KeyboardEvent } from "react";
import { Copy, FileText } from "lucide-react";
import { dotfiles, uses, usesIntro } from "../content";
import { Code, Section } from "../components/Blocks";
import desk from "../assets/desk.jpg";

export function Uses() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Uses</h1>
        <p className="lead">{usesIntro}</p>
      </header>
      <figure className="wide-photo wrap">
        <img
          src={desk}
          alt="A white desk by a window with a laptop showing code, a monitor, a mug and headphones"
          width={1800}
          height={1198}
        />
      </figure>
      {uses.map((g) => (
        <Section key={g.group} title={g.group}>
          <dl className="kv kv-wide">
            {g.items.map((i) => (
              <div key={i.name}>
                <dt>{i.name}</dt>
                <dd>{i.note}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
      <Section title="Dotfiles">
        <p className="prose-p">
          The four files I would rewrite first on a new machine. Pick one to
          read it; copy what you like.
        </p>
        <Dotfiles />
      </Section>
    </>
  );
}

function Dotfiles() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const file = dotfiles[active];

  function onKey(e: KeyboardEvent) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      e.key
    ];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + dotfiles.length) % dotfiles.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(file.body);
      setCopied(`Copied ${file.path} to the clipboard.`);
    } catch {
      setCopied("Copying is blocked in this browser. Select the text instead.");
    }
  }

  return (
    <div className="dotfiles">
      <div
        className="dot-tree"
        role="tablist"
        aria-label="Dotfiles"
        aria-orientation="vertical"
        onKeyDown={onKey}
      >
        {dotfiles.map((f, i) => (
          <button
            key={f.path}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={"tab-" + i}
            aria-selected={i === active}
            aria-controls="dot-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => {
              setActive(i);
              setCopied("");
            }}
          >
            <FileText size={15} aria-hidden="true" />
            {f.path}
          </button>
        ))}
      </div>
      <div
        className="dot-panel"
        id="dot-panel"
        role="tabpanel"
        aria-labelledby={"tab-" + active}
      >
        <div className="dot-actions">
          <span className="muted">{file.body.split("\n").length} lines</span>
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={copy}
          >
            <Copy size={15} aria-hidden="true" /> Copy
          </button>
        </div>
        <Code file={file.path} body={file.body} />
        <p className="form-status" aria-live="polite">
          {copied}
        </p>
      </div>
    </div>
  );
}
