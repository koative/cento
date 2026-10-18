import type { Album } from "../content";

type Props = {
  album: Album;
  side: "A" | "B";
  playing: boolean;
  /** 0–1 through the side; null lifts the arm */ progress: number | null;
};

const grooves = Array.from({ length: 13 }, (_, i) => 52 + i * 6);

/** Top-down drawing of the house deck. The arm tracks inward as the side plays. */
export function Turntable({ album, side, playing, progress }: Props) {
  const angle = progress === null ? 0 : 22 + progress * 16;
  return (
    <svg
      className="turntable"
      viewBox="0 0 400 320"
      role="img"
      aria-label={`Turntable playing ${album.title}, side ${side}`}
    >
      <defs>
        <linearGradient id="tt-walnut" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b3b27" />
          <stop offset="0.5" stopColor="#3d2618" />
          <stop offset="1" stopColor="#573823" />
        </linearGradient>
        <radialGradient id="tt-sheen" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.07" />
        </radialGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="396"
        height="316"
        rx="14"
        fill="url(#tt-walnut)"
      />
      <rect
        x="2.5"
        y="2.5"
        width="395"
        height="315"
        rx="13.5"
        fill="none"
        stroke="#d4a55a"
        strokeOpacity="0.35"
      />
      <circle cx="160" cy="160" r="138" fill="#1b1714" />
      <circle
        cx="160"
        cy="160"
        r="136"
        fill="none"
        stroke="#8d7a63"
        strokeWidth="2"
        strokeDasharray="1.5 3.2"
        opacity="0.6"
      />
      <g className="tt-record" data-spinning={playing ? "" : undefined}>
        <circle cx="160" cy="160" r="128" fill="#0d0b0a" />
        {grooves.map((r) => (
          <circle
            key={r}
            cx="160"
            cy="160"
            r={r}
            fill="none"
            stroke="#2b2622"
            strokeWidth="0.7"
          />
        ))}
        <circle cx="160" cy="160" r="44" fill={album.color} />
        <text x="160" y="140" textAnchor="middle" className="tt-label-name">
          {album.label.toUpperCase()}
        </text>
        <text x="160" y="187" textAnchor="middle" className="tt-label-side">
          SIDE {side} · 33 RPM
        </text>
        <path
          d="M128 160h20M172 160h20"
          stroke="#0d0b0a"
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
      </g>
      <circle
        cx="160"
        cy="160"
        r="128"
        fill="url(#tt-sheen)"
        pointerEvents="none"
      />
      <circle cx="160" cy="160" r="3.4" fill="#cfc4b0" />
      <g
        className="tt-arm"
        style={{ transform: `translate(340px, 60px) rotate(${angle}deg)` }}
      >
        <circle r="22" fill="#2a211c" stroke="#d4a55a" strokeOpacity="0.5" />
        <circle r="9" fill="#cfc4b0" />
        <path
          d="M0 0 L-6 160 L-18 200"
          fill="none"
          stroke="#d9cfbd"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="-27"
          y="196"
          width="18"
          height="26"
          rx="3"
          fill="#1f1a17"
          stroke="#d9cfbd"
          strokeWidth="1.5"
          transform="rotate(18 -18 200)"
        />
        <rect x="-6" y="-40" width="12" height="24" rx="3" fill="#cfc4b0" />
      </g>
      <circle
        cx="360"
        cy="286"
        r="5"
        className="tt-lamp"
        data-on={playing ? "" : undefined}
      />
      <text x="342" y="290" textAnchor="end" className="tt-speed">
        33 · 45
      </text>
    </svg>
  );
}
