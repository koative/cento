import { Fragment, type ReactNode } from "react";

/** `code`, **UI label** and [[Key]] inside article strings. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[\[[^\]]+\]\])/).map((part, i) => {
        if (part.startsWith("`"))
          return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("**"))
          return (
            <strong key={i} className="ui-label">
              {part.slice(2, -2)}
            </strong>
          );
        if (part.startsWith("[["))
          return <kbd key={i}>{part.slice(2, -2)}</kbd>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Marks every word that starts with one of the search terms. */
export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`\\b(${terms.map(escape).join("|")})`, "gi");
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    const end = text.slice(i).search(/[^A-Za-z0-9'’]|$/) + i;
    out.push(text.slice(last, i), <mark key={i}>{text.slice(i, end)}</mark>);
    last = end;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}
