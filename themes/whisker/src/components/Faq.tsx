import { ChevronDown } from "lucide-react";

/** Native <details> disclosures: keyboard and screen-reader support for free. */
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
