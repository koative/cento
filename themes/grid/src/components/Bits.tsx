import type { ReactNode } from "react";
import { financing, type Img } from "../content";

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

export function Photo({
  img,
  lazy = true,
  className,
}: {
  img: Img;
  lazy?: boolean;
  className?: string;
}) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading={lazy ? "lazy" : undefined}
      className={className}
    />
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CompareTable() {
  return (
    <div
      className="table-scroll"
      tabIndex={0}
      role="region"
      aria-label="Payment options compared"
    >
      <table className="compare">
        <thead>
          <tr>
            <td />
            {financing.options.map((o) => (
              <th key={o.id} scope="col">
                {o.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {financing.compare.map(([label, ...cells]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {cells.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
