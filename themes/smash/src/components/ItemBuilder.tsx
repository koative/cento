import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { Link } from "../router";
import { optionGroups, type MenuItem, type OptionGroup } from "../content";
import {
  describe,
  kcalOf,
  money,
  priceOf,
  stackLayers,
  type Selection,
} from "../lib";
import { addMenuItem } from "../cart";
import { Qty } from "./Qty";
import { Stack } from "./Stack";

/**
 * The item builder: option groups on one side, the burger drawn layer by layer on the other.
 * Mount with key={item.id} so switching items starts from that item's house build.
 */
export function ItemBuilder({ item }: { item: MenuItem }) {
  const [sel, setSel] = useState<Selection>(item.options);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("");
  const price = priceOf(item, sel);
  const changed = JSON.stringify(sel) !== JSON.stringify(item.options);

  const pick = (g: OptionGroup, id: string) =>
    setSel((s) => {
      if (g.type === "one") return { ...s, [g.id]: [id] };
      const cur = s[g.id] ?? [];
      const next = cur.includes(id)
        ? cur.filter((x) => x !== id)
        : [...cur, id];
      // Keep the group's own order so the same build always makes the same order line.
      return {
        ...s,
        [g.id]: g.choices.map((c) => c.id).filter((c) => next.includes(c)),
      };
    });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    addMenuItem(item, sel, qty);
    setStatus(`Added ${qty} × ${item.name} to your order.`);
  };

  return (
    <div className="builder" data-drawn={item.stack ? "" : undefined}>
      {item.stack && (
        <div className="builder-visual">
          <Stack
            layers={stackLayers(item, sel)}
            label={`Your ${item.name}: ${describe(item, sel)}`}
          />
          <p className="builder-readout">
            <span>{money(price)}</span>
            <span>{kcalOf(item, sel)} kcal</span>
          </p>
        </div>
      )}

      <form className="builder-options" onSubmit={submit}>
        {Object.keys(item.options).map((gid) => {
          const g = optionGroups[gid];
          const chosen = sel[gid] ?? [];
          const full =
            g.type === "many" && g.max !== undefined && chosen.length >= g.max;
          return (
            <fieldset key={gid} className="opt-group">
              <legend>
                {g.label} <span>{g.hint}</span>
              </legend>
              <div className="opt-choices">
                {g.choices.map((c) => {
                  const on = chosen.includes(c.id);
                  return (
                    <label
                      key={c.id}
                      className="opt"
                      data-on={on ? "" : undefined}
                    >
                      <input
                        type={g.type === "one" ? "radio" : "checkbox"}
                        name={`${item.id}-${gid}`}
                        checked={on}
                        disabled={full && !on}
                        onChange={() => pick(g, c.id)}
                      />
                      <span>{c.label}</span>
                      {c.price ? (
                        <span className="opt-price">+{money(c.price)}</span>
                      ) : null}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        <div className="builder-bar">
          <Qty value={qty} onChange={setQty} label={item.name} />
          <button className="btn btn-primary btn-add" type="submit">
            Add to order · {money(price * qty)}
          </button>
          {changed && (
            <button
              type="button"
              className="link-btn"
              onClick={() => setSel(item.options)}
            >
              <RotateCcw aria-hidden="true" /> House build
            </button>
          )}
        </div>
        <p className="builder-status" aria-live="polite">
          {status && (
            <>
              {status} <Link to="/order">Review your order</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
