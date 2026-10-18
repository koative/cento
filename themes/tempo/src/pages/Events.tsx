import { useState } from "react";
import { eventKinds, events, type EventKind } from "../content";
import { EventRows, PageHead } from "../components/Lists";

export function Events() {
  const [kind, setKind] = useState<EventKind | "all">("all");
  const list = events.filter((e) => kind === "all" || e.kind === kind);

  return (
    <>
      <PageHead
        title="Socials, jams and nights out."
        intro="What the classes are for. Monthly socials, battles, a kiki ball, a swing weekend with a live band and a showcase where students take the stage."
      />
      <div className="wrap">
        <fieldset className="chips">
          <legend>Type</legend>
          {(["all", ...eventKinds] as const).map((k) => (
            <label key={k} className="chip">
              <input
                type="radio"
                name="kind"
                value={k}
                checked={kind === k}
                onChange={() => setKind(k)}
              />
              <span>{k === "all" ? "Everything" : k}</span>
            </label>
          ))}
        </fieldset>
        <p className="sr-only" aria-live="polite">
          {list.length} events shown
        </p>
        <EventRows list={list} headingLevel={2} />
      </div>
    </>
  );
}
