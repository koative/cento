import type { Plan, Space } from "../content";

type Props = {
  plan: Plan;
  label: string;
  selected?: string;
  /** Spaces drawn as unavailable (e.g. rooms too small for the group). */
  muted?: Set<string>;
  onSelect?: (id: string) => void;
};

const zoneTones = ["var(--straw)", "var(--sand)", "var(--sage)"];

/**
 * The house drawn as an architect's plan. Pointer users can click a space;
 * keyboard users get the same choice from the list each page renders beside it.
 */
export function FloorPlan({ plan, label, selected, muted, onSelect }: Props) {
  const zones = plan.spaces.filter((s) => s.kind === "zone");
  const tone = (s: Space) =>
    s.kind === "zone"
      ? zoneTones[zones.indexOf(s) % zoneTones.length]
      : s.kind === "room"
        ? "var(--sand)"
        : "var(--sage)";
  const { x: ex, y: ey } = plan.entrance;

  return (
    <svg className="plan" viewBox="0 0 800 500" role="img" aria-label={label}>
      <rect className="plan-shell" x="40" y="40" width="720" height="420" />
      {plan.spaces.map((s) => {
        const on = s.id === selected;
        const off = muted?.has(s.id);
        return (
          <g
            key={s.id}
            className="plan-space"
            data-kind={s.kind}
            data-on={on ? "" : undefined}
            data-off={off ? "" : undefined}
            style={{ ["--tone" as string]: tone(s) }}
            onClick={onSelect && !off ? () => onSelect(s.id) : undefined}
          >
            <rect
              className="plan-fill"
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
            />
            <Furniture space={s} />
            <text
              className="plan-label"
              x={s.x + 12}
              y={s.y + s.h - 12}
              fontSize={s.w < 100 ? 12 : 15}
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      <line className="plan-door" x1={ex - 26} y1={ey} x2={ex + 26} y2={ey} />
      <path
        className="plan-door-swing"
        d={`M${ex - 26} ${ey} V${ey - 52} A52 52 0 0 1 ${ex + 26} ${ey}`}
      />
      <text className="plan-in" x={ex} y={ey + 28} textAnchor="middle">
        ENTRANCE
      </text>
    </svg>
  );
}

function Furniture({ space: s }: { space: Space }) {
  if (s.kind === "zone") {
    const cols = Math.max(1, Math.floor((s.w - 24) / 58));
    const rows = Math.max(1, Math.floor((s.h - 50) / 48));
    return (
      <g className="plan-furniture">
        {Array.from({ length: rows * cols }, (_, i) => (
          <rect
            key={i}
            x={s.x + 18 + (i % cols) * 58}
            y={s.y + 18 + Math.floor(i / cols) * 48}
            width="40"
            height="22"
            rx="2"
          />
        ))}
      </g>
    );
  }
  if (s.kind === "room") {
    const tw = s.w * 0.56;
    const th = Math.min(30, s.h * 0.3);
    const tx = s.x + (s.w - tw) / 2;
    const ty = s.y + (s.h - th) / 2 - 10;
    const seats = Math.max(1, Math.min(6, Math.round(tw / 22)));
    return (
      <g className="plan-furniture">
        <rect x={tx} y={ty} width={tw} height={th} rx="4" />
        {Array.from({ length: seats }, (_, i) => {
          const cx = tx + (tw / seats) * (i + 0.5);
          return (
            <g key={i}>
              <circle cx={cx} cy={ty - 8} r="4.5" />
              <circle cx={cx} cy={ty + th + 8} r="4.5" />
            </g>
          );
        })}
      </g>
    );
  }
  if (s.kind === "booth") {
    const vertical = s.h > s.w;
    const n = Math.max(1, Math.floor(((vertical ? s.h : s.w) - 40) / 40));
    return (
      <g className="plan-furniture">
        {Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={vertical ? s.x + s.w / 2 - 14 : s.x + 14 + i * 40}
            y={vertical ? s.y + 12 + i * 40 : s.y + 12}
            width="28"
            height="28"
            rx="3"
          />
        ))}
      </g>
    );
  }
  return (
    <g className="plan-furniture">
      <rect x={s.x + 12} y={s.y + 12} width={s.w - 24} height="12" rx="2" />
    </g>
  );
}
