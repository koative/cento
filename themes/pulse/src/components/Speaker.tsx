/** The poster's speaker cone: six rings tilted in space, breathing out of phase. */
export function Speaker() {
  return (
    <div className="speaker" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          style={{ inset: `${i * 8}%`, animationDelay: `${-i * 0.4}s` }}
        />
      ))}
    </div>
  );
}
