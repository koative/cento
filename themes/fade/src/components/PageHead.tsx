import type { ReactNode } from "react";

export function PageHead({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      <p className="lede">{intro}</p>
      {children}
    </header>
  );
}
