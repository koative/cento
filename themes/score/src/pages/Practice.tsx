import { practice } from "../content";
import { KeyboardStaff } from "../components/KeyboardStaff";
import { Metronome } from "../components/Metronome";
import { Tuner } from "../components/Tuner";
import { Coda } from "../components/Bits";

export function Practice() {
  return (
    <div className="page practice">
      <header className="page-head wrap">
        <h1>{practice.title}</h1>
        <p className="lede">{practice.lede}</p>
      </header>

      <section className="play-band play-band-page" aria-labelledby="kb-h">
        <div className="wrap">
          <h2 id="kb-h">Keyboard and staff</h2>
          <p className="play-hint">
            Click a key, then use your computer keyboard: <kbd>A</kbd> to{" "}
            <kbd>;</kbd> play the white notes from C, <kbd>W</kbd> <kbd>E</kbd>{" "}
            <kbd>T</kbd> <kbd>Y</kbd> <kbd>U</kbd> <kbd>O</kbd> <kbd>P</kbd> the
            black ones. The last twelve notes stay on the staff.
          </p>
          <KeyboardStaff />
        </div>
      </section>

      <div className="wrap tools">
        <Metronome />
        <Tuner />
      </div>

      <section className="wrap tips" aria-labelledby="tips-h">
        <h2 id="tips-h">From the teachers' notebooks</h2>
        <dl className="tip-list">
          {practice.tips.map((t) => (
            <div key={t.title}>
              <dt>{t.title}</dt>
              <dd>{t.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Coda
        title="Practice goes further with a teacher."
        text="Thirty minutes a week with someone who can hear what you can't. The first lesson is free."
      />
    </div>
  );
}
