/** A key combination as physical keycaps; "1–4" style ranges stay one cap. */
export function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="keys">
      {keys.map((k, n) => (
        <kbd key={n}>{k}</kbd>
      ))}
    </span>
  );
}
