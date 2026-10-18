import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            <span>{f.q}</span>
            <Plus aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
