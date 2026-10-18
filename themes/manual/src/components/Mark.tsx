/** A closed manual with one thumb-index tab standing proud of the fore-edge. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="3" y="2" width="19" height="24" rx="2" className="mark-cover" />
      <path d="M7 8h11M7 12h7" className="mark-lines" />
      <rect x="22" y="15" width="4" height="7" rx="1" className="mark-tab" />
    </svg>
  );
}
