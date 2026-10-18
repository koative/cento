import type { Product } from "../content";

/** Perceived lightness, to pick label ink that stays legible on the tint. */
function isLight(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

const bodies: Record<
  Product["shape"],
  { body: string; cap: string; label: number }
> = {
  bottle: {
    body: "M36 46h48a8 8 0 0 1 8 8v92a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8V54a8 8 0 0 1 8-8z",
    cap: "M46 22h28v24H46z",
    label: 92,
  },
  tube: {
    body: "M30 18h60l-6 104a10 10 0 0 1-10 9H46a10 10 0 0 1-10-9z",
    cap: "M44 131h32v23H44z",
    label: 70,
  },
  jar: {
    body: "M24 86h72a6 6 0 0 1 6 6v54a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V92a6 6 0 0 1 6-6z",
    cap: "M22 66h76v20H22z",
    label: 120,
  },
  dropper: {
    body: "M38 84h44a10 10 0 0 1 10 10v50a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V94a10 10 0 0 1 10-10z",
    cap: "M48 62h24v22H48zM53 30a7 7 0 0 1 14 0v32H53z",
    label: 120,
  },
  spray: {
    body: "M34 44h52v102a8 8 0 0 1-8 8H42a8 8 0 0 1-8-8z",
    cap: "M40 22h40v22H40zM80 28h12v8H80z",
    label: 96,
  },
};

export function ProductArt({ product }: { product: Product }) {
  const shape = bodies[product.shape];
  const ink = isLight(product.tint) ? "#3d1621" : "#fcefe8";
  return (
    <svg className="product-art" viewBox="0 0 120 160" aria-hidden="true">
      <path d={shape.cap} fill="#3d1621" />
      <path d={shape.body} fill={product.tint} />
      <text
        x="60"
        y={shape.label - 12}
        textAnchor="middle"
        fill={ink}
        fontSize="6"
        letterSpacing="2"
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
      >
        CHROMA
      </text>
      <text
        x="60"
        y={shape.label}
        textAnchor="middle"
        fill={ink}
        fontSize={product.name.length > 8 ? 9 : 11}
        fontFamily="'Yeseva One', serif"
      >
        {product.name}
      </text>
    </svg>
  );
}
