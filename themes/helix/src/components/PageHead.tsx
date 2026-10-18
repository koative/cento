import type { ReactNode } from "react";

export function PageHead({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      {children}
    </header>
  );
}
