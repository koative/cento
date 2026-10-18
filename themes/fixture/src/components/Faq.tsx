import { ChevronDown } from "lucide-react";

/** Native disclosure list: keyboard and screen-reader behaviour come with <details>. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <ChevronDown aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
