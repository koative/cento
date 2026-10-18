import { Plus } from "lucide-react";

export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faqs">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
