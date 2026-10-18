import { grades, type Grade } from "../content";

/** Wordmark glyph: three contour lines closing on a summit. */
export function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3 27 C8 22 11 12 16 5 C21 12 24 22 29 27" />
      <path d="M8.5 27 C11.5 23 13.5 17 16 12.5 C18.5 17 20.5 23 23.5 27" />
      <path d="M13.5 27 C14.5 25 15.2 22.5 16 20.5 C16.8 22.5 17.5 25 18.5 27" />
    </svg>
  );
}

/** Painted trail waymark: white–colour–white bands, colour by grade. */
export function Blaze({
  grade,
  label = true,
}: {
  grade: Grade;
  label?: boolean;
}) {
  return (
    <span className="blaze" data-grade={grade}>
      <span className="blaze-paint" aria-hidden="true" />
      {label ? (
        grades[grade].name
      ) : (
        <span className="sr-only">{grades[grade].name}</span>
      )}
    </span>
  );
}
