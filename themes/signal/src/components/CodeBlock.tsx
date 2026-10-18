import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-block">
      <div className="code-bar">
        <span>{label}</span>
        <button type="button" className="copy" onClick={copy}>
          {copied ? (
            <Check size={14} aria-hidden />
          ) : (
            <Copy size={14} aria-hidden />
          )}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
