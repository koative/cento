import type { Colorway, Product, Shape } from "../content";

/*
 * Technical flats: the line drawings a tech pack uses, filled with the colourway.
 * One silhouette per shape, front and back, with the print set in the display face.
 */

type Body = {
  outline: string;
  details: string[];
  print: { x: number; y: number; w: number };
};

const tee =
  "M70 22 Q100 36 130 22 L168 36 L190 82 L160 94 L152 78 L152 204 L48 204 L48 78 L40 94 L10 82 L32 36 Z";
const longsleeve =
  "M70 22 Q100 36 130 22 L166 34 L194 156 L172 162 L152 88 L152 204 L48 204 L48 88 L28 162 L6 156 L34 34 Z";
const hoodie =
  "M66 34 L36 42 L10 164 L32 170 L50 98 L50 204 L150 204 L150 98 L168 170 L190 164 L164 42 L134 34 Q132 4 100 4 Q68 4 66 34 Z";
const jacket =
  "M66 22 L34 32 L8 160 L30 166 L50 92 L50 204 L150 204 L150 92 L170 166 L192 160 L166 32 L134 22 Z";

const shapes: Record<Shape, { front: Body; back: Body }> = {
  tee: {
    front: {
      outline: tee,
      details: [
        "M70 22 Q100 46 130 22",
        "M48 196 L152 196",
        "M40 94 L52 70",
        "M160 94 L148 70",
      ],
      print: { x: 100, y: 74, w: 30 },
    },
    back: {
      outline: tee,
      details: ["M70 22 Q100 30 130 22", "M48 196 L152 196"],
      print: { x: 100, y: 84, w: 84 },
    },
  },
  longsleeve: {
    front: {
      outline: longsleeve,
      details: [
        "M70 22 Q100 46 130 22",
        "M48 196 L152 196",
        "M28 162 L32 148 L10 142",
        "M172 162 L168 148 L190 142",
      ],
      print: { x: 100, y: 74, w: 30 },
    },
    back: {
      outline: longsleeve,
      details: [
        "M70 22 Q100 30 130 22",
        "M48 196 L152 196",
        "M32 148 L10 142",
        "M168 148 L190 142",
      ],
      print: { x: 100, y: 84, w: 84 },
    },
  },
  hoodie: {
    front: {
      outline: hoodie,
      details: [
        "M74 36 Q100 58 126 36 Q122 16 100 16 Q78 16 74 36 Z",
        "M64 148 L136 148 L146 186 L54 186 Z",
        "M92 50 L90 90",
        "M108 50 L110 90",
        "M50 194 L150 194",
        "M32 170 L35 158",
        "M168 170 L165 158",
      ],
      print: { x: 100, y: 120, w: 34 },
    },
    back: {
      outline: hoodie,
      details: ["M66 34 Q100 52 134 34", "M100 6 L100 44", "M50 194 L150 194"],
      print: { x: 100, y: 96, w: 84 },
    },
  },
  jacket: {
    front: {
      outline: jacket,
      details: [
        "M66 22 L100 44 L134 22 L128 10 L100 22 L72 10 Z",
        "M100 44 L100 204",
        "M62 120 L80 150",
        "M138 120 L120 150",
        "M50 196 L150 196",
      ],
      print: { x: 128, y: 70, w: 22 },
    },
    back: {
      outline: jacket,
      details: [
        "M72 10 Q100 18 128 10",
        "M50 60 Q100 74 150 60",
        "M50 196 L150 196",
      ],
      print: { x: 100, y: 112, w: 84 },
    },
  },
  pants: {
    front: {
      outline: "M56 10 L144 10 L158 210 L110 210 L100 72 L90 210 L42 210 Z",
      details: [
        "M56 24 L144 24",
        "M100 24 L100 62",
        "M50 110 L78 110 L80 154 L48 154",
        "M150 110 L122 110 L120 154 L152 154",
        "M56 24 Q70 42 62 58",
        "M144 24 Q130 42 138 58",
      ],
      print: { x: 124, y: 40, w: 14 },
    },
    back: {
      outline: "M56 10 L144 10 L158 210 L110 210 L100 72 L90 210 L42 210 Z",
      details: [
        "M56 24 L144 24",
        "M66 36 L90 36 L90 60 L66 60 Z",
        "M110 36 L134 36 L134 60 L110 60 Z",
      ],
      print: { x: 78, y: 49, w: 18 },
    },
  },
  cap: {
    front: {
      outline: "M38 132 Q38 56 100 54 Q162 56 162 132 Q100 118 38 132 Z",
      details: [
        "M100 54 L100 124",
        "M100 54 Q76 80 70 126",
        "M100 54 Q124 80 130 126",
        "M38 132 Q100 112 162 132 Q180 156 100 160 Q20 156 38 132 Z",
      ],
      print: { x: 100, y: 100, w: 34 },
    },
    back: {
      outline: "M38 140 Q38 56 100 54 Q162 56 162 140 Z",
      details: [
        "M100 54 L100 140",
        "M78 140 Q78 112 100 110 Q122 112 122 140",
        "M70 132 L130 132",
      ],
      print: { x: 100, y: 90, w: 34 },
    },
  },
  beanie: {
    front: {
      outline: "M48 168 L48 96 Q48 30 100 30 Q152 30 152 96 L152 168 Z",
      details: [
        "M48 116 L152 116",
        "M62 116 L62 168",
        "M76 116 L76 168",
        "M90 116 L90 168",
        "M110 116 L110 168",
        "M124 116 L124 168",
        "M138 116 L138 168",
      ],
      print: { x: 100, y: 142, w: 26 },
    },
    back: {
      outline: "M48 168 L48 96 Q48 30 100 30 Q152 30 152 96 L152 168 Z",
      details: ["M48 116 L152 116", "M100 30 L100 116"],
      print: { x: 100, y: 80, w: 40 },
    },
  },
  tote: {
    front: {
      outline: "M36 84 L164 84 L170 210 L30 210 Z",
      details: [
        "M62 84 L62 40 Q62 22 80 22 Q96 22 96 40 L96 84",
        "M104 84 L104 40 Q104 22 120 22 Q138 22 138 40 L138 84",
        "M36 96 L164 96",
      ],
      print: { x: 100, y: 150, w: 96 },
    },
    back: {
      outline: "M36 84 L164 84 L170 210 L30 210 Z",
      details: [
        "M62 84 L62 40 Q62 22 80 22 Q96 22 96 40 L96 84",
        "M104 84 L104 40 Q104 22 120 22 Q138 22 138 40 L138 84",
        "M36 96 L164 96",
      ],
      print: { x: 100, y: 150, w: 84 },
    },
  },
  deck: {
    front: {
      outline:
        "M72 36 Q72 8 100 8 Q128 8 128 36 L128 184 Q128 212 100 212 Q72 212 72 184 Z",
      details: [
        "M86 46 h28",
        "M86 174 h28",
        "M90 40 v12",
        "M110 40 v12",
        "M90 168 v12",
        "M110 168 v12",
      ],
      print: { x: 100, y: 110, w: 150 },
    },
    back: {
      outline:
        "M72 36 Q72 8 100 8 Q128 8 128 36 L128 184 Q128 212 100 212 Q72 212 72 184 Z",
      details: [],
      print: { x: 100, y: 110, w: 150 },
    },
  },
};

/** Relative luminance check, so stitch lines stay visible on dark and light cloth. */
function isDark(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return r * 0.299 + g * 0.587 + b * 0.114 < 120;
}

type Props = {
  product: Product;
  color?: Colorway;
  side?: "front" | "back";
  label?: string;
};

export function Flat({
  product,
  color = product.colors[0],
  side = "front",
  label,
}: Props) {
  const body = shapes[product.shape][side];
  const lines = side === "front" ? [product.print.front] : product.print.back;
  const stitch = isDark(color.hex)
    ? "rgba(255,255,255,.28)"
    : "rgba(0,0,0,.32)";
  const vertical = product.shape === "deck";
  // Size each line to the print box: Rubik Mono One glyphs are ~0.8em wide.
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.min(
    body.print.w / (longest * 0.82),
    side === "front" ? 12 : 16,
  );
  const top = body.print.y - ((lines.length - 1) * size * 1.08) / 2;

  return (
    <svg
      className="flat"
      viewBox="0 0 200 220"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path
        d={body.outline}
        fill={color.hex}
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {body.details.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={stitch}
          strokeWidth="1.2"
          strokeDasharray={d.includes("Z") ? undefined : "3 2"}
        />
      ))}
      <g
        transform={
          vertical ? `rotate(-90 ${body.print.x} ${body.print.y})` : undefined
        }
        fill={color.ink}
        className="flat-print"
      >
        {lines.map((l, i) => (
          <text
            key={i}
            x={body.print.x}
            y={top + i * size * 1.08}
            fontSize={size}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {l}
          </text>
        ))}
      </g>
    </svg>
  );
}
