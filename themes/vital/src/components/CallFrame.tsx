import { useEffect, useState } from "react";
import { Mic, PhoneOff, Video } from "lucide-react";
import type { Clinician } from "../content";
import { Trace } from "./Mark";

/** A sample video visit in progress: the product, shown rather than described. */
export function CallFrame({ clinician }: { clinician: Clinician }) {
  const [seconds, setSeconds] = useState(252);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <figure className="call">
      <img
        src={clinician.photo}
        alt={`${clinician.name} on a video visit`}
        width={666}
        height={1000}
        style={{ objectPosition: clinician.focus }}
      />
      <div className="call-top" aria-hidden="true">
        <span className="call-live">
          <span className="live-dot" /> Live
        </span>
        <span className="num">
          {mm}:{ss}
        </span>
      </div>
      <Trace beats={3} className="call-trace" />
      <figcaption>
        <strong>
          {clinician.name}, {clinician.credentials}
        </strong>
        <span>
          {clinician.role} · licensed in {clinician.states.length} states
        </span>
      </figcaption>
      <div className="call-controls" aria-hidden="true">
        <span>
          <Mic />
        </span>
        <span>
          <Video />
        </span>
        <span className="call-end">
          <PhoneOff />
        </span>
      </div>
    </figure>
  );
}
