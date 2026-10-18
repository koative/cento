import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import type { Code, Lang, Method } from "../content";

const KEYWORDS: Record<Lang, string> = {
  ts: "import|from|export|const|let|await|async|function|return|new|if|else|for|of|throw|try|catch|true|false|null|undefined|process",
  py: "import|from|def|return|if|else|for|in|with|as|True|False|None|print",
  bash: "curl|bun|bunx|npm|pnpm|export|FROM|WORKDIR|COPY|RUN|CMD",
  json: "true|false|null",
};
const COMMENT: Record<Lang, string> = {
  ts: "\\/\\/.*",
  py: "#.*",
  bash: "(?:^|\\s)#.*",
  json: "(?!)",
};

function pattern(lang: Lang) {
  return new RegExp(
    [
      `(${COMMENT[lang]})`,
      `("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)(\\s*:)?`,
      `\\b(\\d+(?:\\.\\d+)?)\\b`,
      `\\b(${KEYWORDS[lang]})\\b`,
      `([A-Za-z_$][\\w$]*)(?=\\()`,
    ].join("|"),
    "gm",
  );
}

/** A small tokenizer: comments, strings (JSON keys apart), numbers, keywords, calls. Good enough for docs listings. */
export function highlight(code: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = [];
  const re = pattern(lang);
  let last = 0;
  for (const m of code.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push(code.slice(last, i));
    const [all, comment, str, colon, num, kw, call] = m;
    const k = out.length;
    if (comment)
      out.push(
        <span key={k} className="t-com">
          {comment}
        </span>,
      );
    else if (str)
      out.push(
        colon ? (
          <span key={k}>
            <span className="t-key">{str}</span>
            {colon}
          </span>
        ) : (
          <span key={k} className="t-str">
            {str}
          </span>
        ),
      );
    else if (num)
      out.push(
        <span key={k} className="t-num">
          {num}
        </span>,
      );
    else if (kw)
      out.push(
        <span key={k} className="t-kw">
          {kw}
        </span>,
      );
    else if (call)
      out.push(
        <span key={k} className="t-fn">
          {call}
        </span>,
      );
    else out.push(all);
    last = i + all.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        className="copy-btn"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? (
          <Check size={14} aria-hidden />
        ) : (
          <Copy size={14} aria-hidden />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </>
  );
}

export function CodeBlock({
  code,
  label,
  tabs,
}: {
  code: Code;
  label?: string;
  tabs?: ReactNode;
}) {
  return (
    <figure className="code">
      <figcaption className="code-bar">
        {tabs ?? (
          <span className="code-file">{label ?? code.file ?? code.lang}</span>
        )}
        <CopyButton text={code.code} />
      </figcaption>
      <pre tabIndex={0}>
        <code>{highlight(code.code, code.lang)}</code>
      </pre>
    </figure>
  );
}

/** Renders `backtick` spans in copy as inline code. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/`([^`]+)`/)
        .map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}
    </>
  );
}

export function MethodTag({ method }: { method: Method }) {
  return (
    <span className={`method method-${method.toLowerCase()}`}>{method}</span>
  );
}
