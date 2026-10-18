import { useEffect, useRef, useState } from "react";
import { ageGate } from "../content";
import { load, save } from "../lib/util";
import { Mark } from "./Art";

const KEY = "kettle.age.v1";

/** Legal-age check on first visit. A modal dialog because the whole site sits behind it. */
export function AgeGate() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (d && !load(KEY, false) && !d.open) d.showModal();
  }, []);

  const accept = () => {
    save(KEY, true);
    dialog.current?.close();
  };

  return (
    <dialog
      ref={dialog}
      className="age-gate"
      aria-labelledby="age-title"
      aria-describedby="age-text"
      onCancel={(e) => e.preventDefault()}
    >
      <div className="age-card">
        <Mark className="age-mark" />
        <h2 id="age-title">{ageGate.title}</h2>
        <p id="age-text">{ageGate.text}</p>
        <div className="age-actions">
          <button
            type="button"
            className="btn btn-copper"
            onClick={accept}
            autoFocus
          >
            {ageGate.yes}
          </button>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setRefused(true)}
          >
            {ageGate.no}
          </button>
        </div>
        <p className="age-refused" aria-live="polite">
          {refused && ageGate.refused}
        </p>
        <p className="age-note">{ageGate.note}</p>
      </div>
    </dialog>
  );
}
