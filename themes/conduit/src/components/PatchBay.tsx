import { connectors, wireOf, type Connector } from "../content";

/*
 * The home page's wiring diagram: eight connector ports cabled into Conduit, one trunk out to your app.
 * Two authored geometries — a wide bay for desktop, a tall cable tray for phones.
 */

type Port = {
  c: Connector;
  x: number;
  y: number;
  w: number;
  h: number;
  wire: string;
};
type Layout = {
  w: number;
  h: number;
  ports: Port[];
  core: [number, number, number, number];
  app: [number, number, number, number];
  trunk: string;
};

const picked = connectors.slice(0, 8);

const wide: Layout = {
  w: 960,
  h: 420,
  ports: picked.map((c, i) => {
    const y = 26 + i * 47;
    const ty = 168 + i * 12;
    return {
      c,
      x: 40,
      y,
      w: 190,
      h: 36,
      wire: `M230 ${y + 18} C340 ${y + 18} 330 ${ty} 440 ${ty}`,
    };
  }),
  core: [440, 150, 150, 120],
  app: [790, 180, 140, 60],
  trunk: "M590 210 H790",
};

const tall: Layout = {
  w: 360,
  h: 560,
  ports: picked.map((c, i) => {
    const left = i % 2 === 0;
    const y = 12 + Math.floor(i / 2) * 50;
    const tx = 120 + i * 17;
    const sx = left ? 166 : 194;
    return {
      c,
      x: left ? 12 : 194,
      y,
      w: 154,
      h: 38,
      wire: `M${sx} ${y + 19} C180 ${y + 19} 180 262 ${tx} 290`,
    };
  }),
  core: [90, 290, 180, 96],
  app: [110, 480, 140, 56],
  trunk: "M180 386 V480",
};

function Bay({ layout, className }: { layout: Layout; className: string }) {
  const [cx, cy, cw, ch] = layout.core;
  const [ax, ay, aw, ah] = layout.app;
  return (
    <svg
      className={`patchbay ${className}`}
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      role="img"
      aria-labelledby={`${className}-t`}
    >
      <title id={`${className}-t`}>
        Eight connectors cabled into Conduit, with one trunk line out to your
        app
      </title>
      {layout.ports.map((p, i) => (
        <g key={p.c.slug} data-wire={wireOf[p.c.category]} className="pb-wire">
          <path d={p.wire} className="pb-cable" />
          <path
            d={p.wire}
            className="pb-pulse"
            pathLength={100}
            style={{ animationDelay: `${i * 0.37}s` }}
          />
        </g>
      ))}
      <path d={layout.trunk} className="pb-trunk" />
      <path
        d={layout.trunk}
        className="pb-pulse pb-pulse-trunk"
        pathLength={100}
      />
      {layout.ports.map((p) => (
        <a
          key={p.c.slug}
          href={`#/connectors/${p.c.slug}`}
          className="pb-port"
          data-wire={wireOf[p.c.category]}
        >
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={6} />
          <rect
            x={p.x + 8}
            y={p.y + 8}
            width={p.h - 16}
            height={p.h - 16}
            rx={3}
            className="pb-jack"
          />
          <text x={p.x + p.h + 2} y={p.y + p.h / 2 + 5}>
            {p.c.name}
          </text>
        </a>
      ))}
      <g className="pb-core">
        <rect x={cx} y={cy} width={cw} height={ch} rx={10} />
        <text
          x={cx + cw / 2}
          y={cy + ch / 2 - 4}
          textAnchor="middle"
          className="pb-core-name"
        >
          conduit
        </text>
        <text
          x={cx + cw / 2}
          y={cy + ch / 2 + 18}
          textAnchor="middle"
          className="pb-core-sub"
        >
          auth · map · retry · log
        </text>
      </g>
      <g className="pb-app">
        <rect x={ax} y={ay} width={aw} height={ah} rx={8} />
        <text x={ax + aw / 2} y={ay + ah / 2 + 5} textAnchor="middle">
          Your app
        </text>
      </g>
    </svg>
  );
}

export function PatchBay() {
  return (
    <>
      <Bay layout={wide} className="pb-wide" />
      <Bay layout={tall} className="pb-tall" />
    </>
  );
}
