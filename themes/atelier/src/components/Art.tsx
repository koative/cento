import { useId } from "react";
import type { ArtKind, Case } from "../content";
import { MarkShape } from "./Mark";

/** Font size that fits the longest line into `width`, capped at `max`. Syne caps run about 0.74em wide. */
function fit(lines: string[], width: number, max: number) {
  const longest = Math.max(...lines.map((l) => l.length));
  return Math.min(max, width / (longest * 0.74));
}

function Mark({
  c,
  x,
  y,
  size,
  rotate = 0,
  fg,
  accent,
}: {
  c: Case;
  x: number;
  y: number;
  size: number;
  rotate?: number;
  fg?: string;
  accent?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate} ${size / 2} ${size / 2}) scale(${size / 100})`}
    >
      <MarkShape
        kind={c.mark}
        fg={fg ?? c.palette.ink}
        accent={accent ?? c.palette.accent}
      />
    </g>
  );
}

function Word({
  c,
  x,
  y,
  width,
  max,
  anchor = "start",
  fill,
}: {
  c: Case;
  x: number;
  y: number;
  width: number;
  max: number;
  anchor?: "start" | "middle";
  fill?: string;
}) {
  const lines = c.word.split("\n");
  const size = fit(lines, width, max);
  return (
    <text
      className="art-word"
      x={x}
      y={y + size * 0.8}
      fontSize={size}
      textAnchor={anchor}
      fill={fill ?? c.palette.ink}
    >
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i ? size * 0.9 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/* ------------------------------------------------------------ cover */

/** The project's poster-cover, used on the work index and as the case-study hero. */
export function Cover({ c, className = "" }: { c: Case; className?: string }) {
  const { bg, ink, accent } = c.palette;
  return (
    <svg
      viewBox="0 0 800 700"
      className={`art cover ${className}`}
      role="img"
      aria-label={`${c.client}: ${c.line}`}
    >
      <rect width="800" height="700" fill={bg} />
      {c.layout === "stack" && (
        <>
          <Word c={c} x={52} y={52} width={640} max={150} />
          <Mark c={c} x={430} y={300} size={320} rotate={-12} />
        </>
      )}
      {c.layout === "tilt" && (
        <>
          <g transform="rotate(-8 400 300)">
            <Word c={c} x={70} y={70} width={600} max={210} />
          </g>
          <circle cx="620" cy="500" r="110" fill={accent} />
          <Mark c={c} x={540} y={420} size={160} rotate={12} accent={bg} />
        </>
      )}
      {c.layout === "center" && (
        <>
          <Mark c={c} x={300} y={80} size={200} rotate={-8} />
          <Word c={c} x={400} y={330} width={600} max={110} anchor="middle" />
        </>
      )}
      {c.layout === "split" && (
        <>
          <rect x="470" width="330" height="700" fill={accent} />
          <Mark c={c} x={505} y={230} size={260} fg={bg} accent={ink} />
          <Word c={c} x={52} y={52} width={380} max={140} />
        </>
      )}
      <text
        className="art-small"
        x={c.layout === "center" ? 400 : 52}
        y={652}
        textAnchor={c.layout === "center" ? "middle" : "start"}
        fontSize="20"
        fill={ink}
      >
        {c.line.toUpperCase()}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------ artefacts */

export const ART_BOX: Record<ArtKind, [number, number]> = {
  poster: [400, 500],
  pack: [400, 500],
  phone: [400, 500],
  cards: [600, 400],
  screen: [600, 400],
  sign: [600, 400],
  spec: [600, 400],
  frames: [600, 400],
};

/** One artefact from a case study (poster, carton, screen…) drawn from the client's palette, word and mark. */
export function Artifact({
  c,
  kind,
  label,
}: {
  c: Case;
  kind: ArtKind;
  label: string;
}) {
  const shadow = useId().replace(/:/g, "");
  const [w, h] = ART_BOX[kind];
  const { bg, ink, accent, paper } = c.palette;
  const flat = c.word.replace("\n", " ");
  // Screen headline on two lines, split at the space nearest the middle.
  const spaces = [...c.line.matchAll(/ /g)].map((m) => m.index!);
  const cut = spaces.reduce(
    (a, b) =>
      Math.abs(b - c.line.length / 2) < Math.abs(a - c.line.length / 2) ? b : a,
    c.line.length,
  );
  const head = [c.line.slice(0, cut), c.line.slice(cut + 1)].filter(Boolean);
  const headSize = Math.min(
    26,
    260 / (Math.max(...head.map((l) => l.length)) * 0.62),
  );
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`art art-${kind}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="12"
            floodColor="#1d201b"
            floodOpacity=".22"
          />
        </filter>
      </defs>
      {kind === "poster" && (
        <>
          <rect width={w} height={h} fill={paper} />
          <g filter={`url(#${shadow})`}>
            <rect x="70" y="40" width="260" height="400" fill={bg} />
          </g>
          <Word c={c} x={92} y={62} width={216} max={70} />
          <Mark c={c} x={180} y={250} size={130} rotate={-10} />
          <text className="art-small" x="92" y="394" fontSize="11" fill={ink}>
            {c.year}
          </text>
          <text
            className="art-small"
            x="92"
            y="416"
            fontSize={Math.min(11, 216 / (c.line.length * 0.7))}
            fill={ink}
          >
            {c.line.toUpperCase()}
          </text>
        </>
      )}
      {kind === "cards" && (
        <>
          <rect width={w} height={h} fill={paper} />
          <g filter={`url(#${shadow})`} transform="rotate(-9 230 190)">
            <rect x="80" y="110" width="290" height="170" fill={bg} />
            <Mark c={c} x={110} y={140} size={80} />
            <text className="art-word" x="110" y="262" fontSize="24" fill={ink}>
              {flat}
            </text>
          </g>
          <g filter={`url(#${shadow})`} transform="rotate(6 400 210)">
            <rect x="260" y="150" width="290" height="170" fill="#fbfaf5" />
            <rect x="260" y="150" width="12" height="170" fill={accent} />
            <text
              className="art-word"
              x="292"
              y="196"
              fontSize="17"
              fill="#1d201b"
            >
              {c.quote.name}
            </text>
            <text
              className="art-small"
              x="292"
              y="218"
              fontSize="11"
              fill="#50574b"
            >
              {c.quote.role.split(",")[0]}
            </text>
            <text
              className="art-small"
              x="292"
              y="290"
              fontSize="11"
              fill="#50574b"
            >
              {c.location}
            </text>
          </g>
        </>
      )}
      {kind === "screen" && (
        <>
          <rect width={w} height={h} fill={accent} />
          <g filter={`url(#${shadow})`}>
            <rect x="40" y="36" width="520" height="328" rx="8" fill={paper} />
          </g>
          <rect
            x="40"
            y="36"
            width="520"
            height="26"
            rx="8"
            fill={ink}
            opacity=".12"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={58 + i * 14}
              cy="49"
              r="4"
              fill={ink}
              opacity=".35"
            />
          ))}
          <text className="art-word" x="64" y="94" fontSize="15" fill={ink}>
            {flat}
          </text>
          {c.labels.map((l, i) => (
            <text
              key={l}
              className="art-small"
              x={536 - (2 - i) * 86}
              y="94"
              fontSize="11"
              fill={ink}
              textAnchor="end"
            >
              {l}
            </text>
          ))}
          <text
            className="art-word"
            x="64"
            y="140"
            fontSize={headSize}
            fill={ink}
          >
            {head.map((l, i) => (
              <tspan key={l} x="64" dy={i ? headSize * 1.1 : 0}>
                {l}
              </tspan>
            ))}
          </text>
          <rect x="64" y="192" width="120" height="28" rx="14" fill={ink} />
          <rect x="340" y="116" width="196" height="112" fill={bg} />
          <Mark c={c} x={398} y={132} size={80} />
          {c.labels.map((l, i) => (
            <g key={l}>
              <rect
                x={64 + i * 160}
                y="248"
                width="148"
                height="90"
                fill={i === 1 ? bg : ink}
                opacity={i === 1 ? 1 : 0.08}
              />
              <text
                className="art-small"
                x={74 + i * 160}
                y="328"
                fontSize="12"
                fill={ink}
              >
                {l}
              </text>
            </g>
          ))}
        </>
      )}
      {kind === "phone" && (
        <>
          <rect width={w} height={h} fill={bg} />
          <g filter={`url(#${shadow})`}>
            <rect
              x="100"
              y="40"
              width="200"
              height="420"
              rx="30"
              fill="#141613"
            />
          </g>
          <rect x="110" y="50" width="180" height="400" rx="22" fill={paper} />
          <rect x="172" y="60" width="56" height="12" rx="6" fill="#141613" />
          <text className="art-word" x="126" y="104" fontSize="13" fill={ink}>
            {flat}
          </text>
          <rect x="126" y="120" width="148" height="128" fill={bg} />
          <Mark c={c} x={160} y={134} size={80} />
          {c.labels.map((l, i) => (
            <g key={l}>
              <circle
                cx="134"
                cy={278 + i * 44}
                r="8"
                fill={accent}
                stroke={ink}
                strokeOpacity=".2"
              />
              <text
                className="art-small"
                x="152"
                y={282 + i * 44}
                fontSize="12"
                fill={ink}
              >
                {l}
              </text>
              <rect
                x="126"
                y={296 + i * 44}
                width="148"
                height="1"
                fill={ink}
                opacity=".15"
              />
            </g>
          ))}
          <rect x="126" y="404" width="148" height="30" rx="15" fill={ink} />
        </>
      )}
      {kind === "pack" &&
        // Furniture ships in a carton; everything else in this portfolio is a drinks can.
        (c.mark === "discs" ? (
          <>
            <rect width={w} height={h} fill={paper} />
            <g filter={`url(#${shadow})`}>
              <path
                d="M70 170l150-70 120 60v220l-150 70-120-60z"
                fill="#c4a77d"
              />
            </g>
            <path d="M70 170l150-70 120 60-150 70z" fill="#d6bd94" />
            <path d="M190 230l150-70v220l-150 70z" fill="#b39368" />
            <path d="M70 170l120 60v220l-120-60z" fill={bg} />
            <g transform="matrix(1 .5 0 1 0 0)">
              <text
                className="art-word"
                x="84"
                y="160"
                fontSize="22"
                fill={ink}
              >
                {c.word.split("\n")[0]}
              </text>
              <text
                className="art-word"
                x="84"
                y="186"
                fontSize="22"
                fill={ink}
              >
                {c.word.split("\n")[1]}
              </text>
              <Mark c={c} x={100} y={210} size={70} />
              {Array.from({ length: 9 }, (_, i) => (
                <rect
                  key={i}
                  x={84 + i * 10}
                  y="304"
                  width="1.5"
                  height={i % 2 ? 6 : 12}
                  fill={ink}
                />
              ))}
            </g>
          </>
        ) : (
          <>
            <rect width={w} height={h} fill={paper} />
            {[0, 1].map((i) => (
              <g
                key={i}
                transform={`translate(${i ? 214 : 76} ${i ? 70 : 50})`}
              >
                <g filter={`url(#${shadow})`}>
                  <rect
                    width="112"
                    height="300"
                    rx="18"
                    fill={i ? accent : bg}
                  />
                </g>
                <rect y="10" width="112" height="6" fill="#fff" opacity=".35" />
                <rect y="284" width="112" height="6" fill="#000" opacity=".1" />
                <text
                  className="art-word"
                  fontSize={Math.min(44, 190 / (c.labels[i].length * 0.74))}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={ink}
                  transform="translate(56 126) rotate(-90)"
                >
                  {c.labels[i].toUpperCase()}
                </text>
                <Mark
                  c={c}
                  x={34}
                  y={232}
                  size={44}
                  fg={ink}
                  accent={i ? bg : accent}
                />
              </g>
            ))}
          </>
        ))}
      {kind === "sign" && (
        <>
          <rect width={w} height={h} fill="#d9d7cc" />
          <rect y="330" width={w} height="70" fill="#bdbbb0" />
          <rect x="60" y="54" width="480" height="8" fill="#6f6f66" />
          <g filter={`url(#${shadow})`}>
            <rect x="96" y="70" width="408" height="220" fill={bg} />
          </g>
          <rect x="96" y="70" width="90" height="220" fill={accent} />
          <Mark c={c} x={106} y={135} size={70} fg={bg} accent={ink} />
          {c.labels.map((l, i) => (
            <g key={l} transform={`translate(214 ${108 + i * 66})`}>
              <text className="art-word" x="0" y="0" fontSize="26" fill={ink}>
                {l}
              </text>
              <g
                transform={`translate(254 -20) rotate(${[0, 180, -90][i]} 12 10)`}
              >
                <path
                  d="M0 10h18M12 3l8 7-8 7"
                  fill="none"
                  stroke={ink}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {i < 2 && (
                <rect
                  x="0"
                  y="22"
                  width="276"
                  height="1.5"
                  fill={ink}
                  opacity=".35"
                />
              )}
            </g>
          ))}
        </>
      )}
      {kind === "spec" && (
        <>
          <rect width={w} height={h} fill="#fbfaf5" />
          {[bg, ink, accent, paper].map((col, i) => (
            <g key={col + i}>
              <rect
                x={32 + i * 136}
                y="32"
                width="128"
                height="196"
                fill={col}
                stroke="#1d201b"
                strokeOpacity=".12"
              />
              <text
                className="art-small mono"
                x={42 + i * 136}
                y="252"
                fontSize="12"
                fill="#1d201b"
              >
                {col.toUpperCase()}
              </text>
            </g>
          ))}
          <text
            className="art-word"
            x="32"
            y="350"
            fontSize="84"
            fill="#1d201b"
          >
            Aa
          </text>
          <text
            className="art-word"
            x="170"
            y="318"
            fontSize="20"
            fill="#1d201b"
          >
            {flat}
          </text>
          <text
            className="art-small"
            x="170"
            y="346"
            fontSize="13"
            fill="#50574b"
          >
            {c.line}
          </text>
          <Mark
            c={c}
            x={476}
            y={276}
            size={92}
            fg={bg === "#fbfaf5" ? ink : bg}
            accent={accent === bg ? ink : accent}
          />
        </>
      )}
      {kind === "frames" && (
        <>
          <rect width={w} height={h} fill="#121412" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${30 + i * 186} 70)`}>
              <rect
                width="168"
                height="168"
                fill={bg}
                stroke="#fff"
                strokeOpacity=".15"
              />
              <Mark
                c={c}
                x={84 - (30 + i * 14)}
                y={84 - (30 + i * 14)}
                size={60 + i * 28}
                rotate={i * 40}
                fg={ink}
              />
              <text
                className="art-small mono"
                x="0"
                y="196"
                fontSize="12"
                fill="#c9cdc2"
              >
                {["00:00", "00:04", "00:12"][i]}
              </text>
            </g>
          ))}
          <rect
            x="30"
            y="300"
            width="540"
            height="2"
            fill="#c9cdc2"
            opacity=".4"
          />
          {Array.from({ length: 13 }, (_, i) => (
            <rect
              key={i}
              x={30 + i * 45}
              y={i % 3 ? 296 : 290}
              width="2"
              height={i % 3 ? 10 : 16}
              fill="#c9cdc2"
              opacity=".6"
            />
          ))}
          <rect x="390" y="284" width="4" height="34" fill={accent} />
        </>
      )}
    </svg>
  );
}
