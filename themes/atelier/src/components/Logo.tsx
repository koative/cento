import { ASTERISK } from "./Mark";

/** Wordmark: the studio asterisk plus "atelier" set in Syne. */
export function Logo() {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className="logo-mark"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ASTERISK} />
      </svg>
      <span className="logo-word">atelier</span>
    </>
  );
}
