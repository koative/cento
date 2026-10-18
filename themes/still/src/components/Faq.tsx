import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <Plus aria-hidden="true" size={20} />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
