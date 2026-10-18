import { useState } from "react";
import { Trash2 } from "lucide-react";
import { styleGuide } from "../content";
import { Field, useForm } from "../components/form";
import { update, useWorkspace, type Voice } from "../lib/workspace";

const toggles: {
  key: Exclude<keyof Voice, "spelling">;
  label: string;
  hint: string;
}[] = [
  {
    key: "oxford",
    label: "Oxford comma",
    hint: "“boots, packs, and tents” rather than “boots, packs and tents”.",
  },
  {
    key: "contractions",
    label: "Contractions",
    hint: "“we'll” and “don't” in customer-facing copy.",
  },
  {
    key: "sentenceCase",
    label: "Sentence-case headings",
    hint: "“Free returns for every member”, not Title Case.",
  },
];

/** A preview sentence built from the voice settings, so the effect of each switch is visible. */
function preview(v: Voice) {
  const heading = v.sentenceCase
    ? "Free returns for every member"
    : "Free Returns for Every Member";
  const will = v.contractions ? "We'll" : "We will";
  const doesnt = v.contractions ? "doesn't" : "does not";
  const colour = v.spelling === "US" ? "color" : "colour";
  const list = `boots, packs${v.oxford ? "," : ""} and tents`;
  return {
    heading,
    body: `${will} refund ${list} within 60 days. If the ${colour} ${doesnt} suit you, swaps are free.`,
  };
}

export default function AppStyle() {
  const ws = useWorkspace();
  const [announce, setAnnounce] = useState("");
  const form = useForm(
    { avoid: "", prefer: "", note: "" },
    (v) => ({
      avoid: !v.avoid.trim()
        ? "Enter the word or phrase writers should avoid."
        : ws.rules.some(
              (r) => r.avoid.toLowerCase() === v.avoid.trim().toLowerCase(),
            )
          ? `There is already a rule for “${v.avoid.trim()}”. Edit or remove that one first.`
          : undefined,
      prefer: !v.prefer.trim()
        ? "Enter what writers should use instead."
        : v.prefer.trim().toLowerCase() === v.avoid.trim().toLowerCase()
          ? "The preferred term is the same as the one to avoid."
          : undefined,
    }),
    (v) => {
      update((s) => ({
        rules: [
          {
            id: `r${Date.now()}`,
            avoid: v.avoid.trim(),
            prefer: v.prefer.trim(),
            note: v.note.trim(),
          },
          ...s.rules,
        ],
      }));
      form.reset();
      setAnnounce(
        `Added a rule: prefer “${v.prefer.trim()}” over “${v.avoid.trim()}”.`,
      );
    },
  );
  const p = preview(ws.voice);

  return (
    <div className="app-page">
      <header className="app-head">
        <h1>{styleGuide.heading}</h1>
        <p>{styleGuide.lede}</p>
      </header>

      <div className="style-grid">
        <section className="panel" aria-labelledby="terms-title">
          <h2 id="terms-title">
            Term list <span className="num">{ws.rules.length} rules</span>
          </h2>
          <form onSubmit={form.submit} noValidate className="rule-form">
            <Field
              form={form}
              name="avoid"
              label="Avoid"
              placeholder="e.g. touch base"
            />
            <Field
              form={form}
              name="prefer"
              label="Prefer"
              placeholder="e.g. talk"
            />
            <Field
              form={form}
              name="note"
              label="Why (optional)"
              placeholder="Shown to writers"
            />
            <button
              className="btn btn-primary"
              disabled={form.status === "sending"}
            >
              {form.status === "sending" ? "Adding…" : "Add rule"}
            </button>
          </form>
          <p className="quiet-note rule-status" aria-live="polite">
            {form.status === "sending" ? "Adding rule" : announce}
          </p>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-labelledby="terms-title"
          >
            <table className="data-table terms-table">
              <thead>
                <tr>
                  <th scope="col">Avoid</th>
                  <th scope="col">Prefer</th>
                  <th scope="col">Why</th>
                  <th scope="col">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ws.rules.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty">
                      No rules yet. Add the first term your team keeps getting
                      wrong.
                    </td>
                  </tr>
                )}
                {ws.rules.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <del>{r.avoid}</del>
                    </td>
                    <td>
                      <ins>{r.prefer}</ins>
                    </td>
                    <td>{r.note}</td>
                    <td className="r">
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Remove rule “${r.avoid}”`}
                        onClick={() => {
                          update((s) => ({
                            rules: s.rules.filter((x) => x.id !== r.id),
                          }));
                          setAnnounce(`Removed the rule for “${r.avoid}”.`);
                        }}
                      >
                        <Trash2 size={16} aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel" aria-labelledby="voice-title">
          <h2 id="voice-title">{styleGuide.voice.heading}</h2>
          <div className="switches">
            {toggles.map((t) => (
              <div key={t.key} className="switch-row">
                <input
                  type="checkbox"
                  role="switch"
                  id={`v-${t.key}`}
                  checked={ws.voice[t.key]}
                  onChange={(e) =>
                    update((s) => ({
                      voice: { ...s.voice, [t.key]: e.target.checked },
                    }))
                  }
                  aria-describedby={`v-${t.key}-hint`}
                />
                <label htmlFor={`v-${t.key}`}>{t.label}</label>
                <p id={`v-${t.key}-hint`}>{t.hint}</p>
              </div>
            ))}
            <div className="field">
              <label htmlFor="v-spelling">Spelling</label>
              <select
                id="v-spelling"
                value={ws.voice.spelling}
                onChange={(e) =>
                  update((s) => ({
                    voice: {
                      ...s.voice,
                      spelling: e.target.value as Voice["spelling"],
                    },
                  }))
                }
              >
                <option>Canadian</option>
                <option>US</option>
                <option>UK</option>
              </select>
            </div>
          </div>
          <figure className="voice-preview" aria-live="polite">
            <figcaption>{styleGuide.voice.preview}</figcaption>
            <p className="voice-heading">{p.heading}</p>
            <p>{p.body}</p>
          </figure>
        </section>
      </div>
    </div>
  );
}
