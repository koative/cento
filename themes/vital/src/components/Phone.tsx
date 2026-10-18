import { Check, ChevronRight, Pill, Video } from "lucide-react";
import { Mark } from "./Mark";

export type Screen = "home" | "note" | "rx";

/** Authored app UI inside a phone outline. Decorative copies of real screens, so hidden from assistive tech. */
export function Phone({ screen }: { screen: Screen }) {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-bar">
        <span className="num">9:41</span>
        <span className="phone-notch" />
        <span className="num">5G</span>
      </div>
      <div className="phone-screen">
        {screen === "home" ? (
          <HomeScreen />
        ) : screen === "note" ? (
          <NoteScreen />
        ) : (
          <RxScreen />
        )}
      </div>
      <div className="phone-tabs">
        {(["Home", "Visits", "Rx", "Me"] as const).map((t, i) => (
          <span
            key={t}
            data-on={
              (screen === "home" ? 0 : screen === "note" ? 1 : 2) === i
                ? ""
                : undefined
            }
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <>
      <div className="ps-head">
        <Mark />
        <span>Good evening, Sam</span>
      </div>
      <div className="ps-card ps-primary">
        <span className="ps-label">Video visit · Oregon</span>
        <strong className="num">12 min wait</strong>
        <span className="ps-btn">
          <Video /> Start a check-in
        </span>
      </div>
      <p className="ps-section">Your care</p>
      <div className="ps-list">
        <span>
          Sinus infection <em>Day 3 of 7 · message by Fri</em>
          <ChevronRight />
        </span>
        <span>
          Blood pressure <em className="num">128/82 this morning</em>
          <ChevronRight />
        </span>
        <span>
          Amoxicillin <em>Ready at Larkin St Pharmacy</em>
          <ChevronRight />
        </span>
      </div>
    </>
  );
}

function NoteScreen() {
  return (
    <>
      <p className="ps-section">Visit note · Oct 14</p>
      <strong className="ps-title">Strep throat</strong>
      <span className="ps-by">Nadia Haddad, FNP-C · 9 min video</span>
      <div className="ps-block">
        <span className="ps-label">What to take</span>
        <span>
          Amoxicillin 500 mg, twice a day for 10 days. Finish the course.
        </span>
      </div>
      <div className="ps-block">
        <span className="ps-label">Watch for</span>
        <span>
          Drooling, trouble opening your mouth, or a fever past day 3.
        </span>
      </div>
      <div className="ps-block">
        <span className="ps-label">Back to work</span>
        <span>After 24 hours on antibiotics. Note attached.</span>
      </div>
    </>
  );
}

function RxScreen() {
  const steps = [
    { label: "Sent by your clinician", time: "6:52 pm", done: true },
    { label: "Received by pharmacy", time: "6:58 pm", done: true },
    { label: "Being filled", time: "now", done: false },
    { label: "Ready for pickup", time: "≈ 7:30 pm", done: false },
  ];
  return (
    <>
      <p className="ps-section">Prescription</p>
      <div className="ps-head">
        <Pill />
        <strong className="ps-title">Amoxicillin 500 mg</strong>
      </div>
      <ol className="ps-steps">
        {steps.map((s) => (
          <li key={s.label} data-done={s.done ? "" : undefined}>
            <span className="ps-tick">{s.done && <Check />}</span>
            <span>
              {s.label}
              <em className="num">{s.time}</em>
            </span>
          </li>
        ))}
      </ol>
      <div className="ps-card">
        <span className="ps-label">Larkin St Pharmacy</span>
        <span>Open until 10 pm · 0.4 mi</span>
      </div>
    </>
  );
}
