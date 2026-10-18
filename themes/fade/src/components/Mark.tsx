/** Five bars thinning toward the neckline: a fade, drawn as the shop's mark. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="9" rx="1.5" />
      <rect x="3" y="14" width="26" height="6" rx="1.5" />
      <rect x="3" y="22" width="26" height="3.4" rx="1" />
      <rect x="3" y="27" width="26" height="1.6" rx=".8" className="mark-red" />
    </svg>
  );
}
