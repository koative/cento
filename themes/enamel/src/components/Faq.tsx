import { Plus } from "lucide-react";
import type { Faq as Item } from "../content";

export function Faq({ items }: { items: Item[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <Plus aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
