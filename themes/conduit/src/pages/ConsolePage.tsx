import { consolePage } from "../content";
import { Console } from "../components/Console";

export default function ConsolePage() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{consolePage.heading}</h1>
        <p className="lede">{consolePage.lede}</p>
      </header>
      <Console />
      <dl className="notes">
        {consolePage.notes.map((n) => (
          <div key={n.term}>
            <dt>{n.term}</dt>
            <dd>{n.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
