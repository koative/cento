import { Plus } from "lucide-react";
import type { Faq } from "../content";

/** Native <details> disclosures: keyboard and screen-reader support come with the element. */
export function Faqs({ items }: { items: Faq[] }) {
  return (
    <div className="faqs">
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
