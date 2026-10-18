import { useState } from "react";
import { families, styles, type Family } from "../content";
import { PageHead, StyleRows } from "../components/Lists";
import { TapTempo } from "../components/TapTempo";

export function Styles() {
  const [family, setFamily] = useState<Family | "all">("all");
  const list = styles.filter((s) => family === "all" || s.family === family);

  return (
    <>
      <PageHead
        title="Find your style."
        intro="Eight dances from block parties, ballrooms, rehearsal rooms and swing halls. Every one has a beginner class each week, and your first is $15."
      />
      <div className="wrap">
        <fieldset className="chips">
          <legend>Show</legend>
          {(["all", ...families] as const).map((f) => (
            <label key={f} className="chip">
              <input
                type="radio"
                name="family"
                value={f}
                checked={family === f}
                onChange={() => setFamily(f)}
              />
              <span>{f === "all" ? "Every style" : f}</span>
            </label>
          ))}
        </fieldset>
        <p className="sr-only" aria-live="polite">
          {list.length} styles shown
        </p>
        <StyleRows list={list} lazy={false} />
      </div>
      <section className="section-ink section-gap">
        <div className="wrap">
          <TapTempo />
        </div>
      </section>
    </>
  );
}
