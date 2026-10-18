/** A dated sequence (L−12 months … launch day, week 1 … week 4) laid out as a horizontal timeline. */
export function Steps({
  steps,
}: {
  steps: { when: string; title: string; text: string }[];
}) {
  return (
    <ol className="steps">
      {steps.map((s) => (
        <li key={s.title}>
          <span className="step-when tnum">{s.when}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
