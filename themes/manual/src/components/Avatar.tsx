/** Initials on a paper chip; staff get the ink chip. */
export function Avatar({
  name,
  staff = false,
}: {
  name: string;
  staff?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className="avatar"
      data-staff={staff ? "" : undefined}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
