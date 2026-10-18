import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { riskLabel, type Grant, type Identity, type Risk } from "../content";

export function Avatar({ initials, size }: { initials: string; size?: "lg" }) {
  return (
    <span className="avatar" data-size={size} aria-hidden="true">
      {initials}
    </span>
  );
}

export function RiskTag({ risk }: { risk: Risk }) {
  return (
    <span className="risk" data-risk={risk}>
      {riskLabel[risk]} risk
    </span>
  );
}

/** The route a grant takes from a person to a permission, drawn as a chain. */
export function AccessPath({
  grant,
  person,
}: {
  grant: Grant;
  person: Identity;
}) {
  const steps = [
    { k: "Person", v: person.name },
    { k: "Granted via", v: grant.via },
    { k: "System", v: grant.system },
    { k: "Permission", v: grant.permission },
  ];
  return (
    <ol className="path" aria-label="Access path">
      {steps.map((s) => (
        <li key={s.k}>
          <small>{s.k}</small>
          <span>{s.v}</span>
        </li>
      ))}
    </ol>
  );
}

/** Accessible disclosure list: each question is a real button controlling its answer. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="faq">
      {items.map((item, i) => (
        <div
          className="faq-item"
          key={item.q}
          data-open={open === i ? "" : undefined}
        >
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <Plus size={18} aria-hidden />
            </button>
          </h3>
          <div id={`${id}-${i}`} className="faq-answer" hidden={open !== i}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
