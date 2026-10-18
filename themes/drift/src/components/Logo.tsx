export function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--ink)" />
      <path
        d="M7 23c4.5 0 5-8 10.5-8S23 23 27.5 23 31.5 18 34 18"
        fill="none"
        stroke="var(--wax)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M7 30c4.5 0 5-4 10.5-4s5.5 4 10 4 4-2.5 6.5-2.5"
        fill="none"
        stroke="var(--sand)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
