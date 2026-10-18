/* Authored diagrams. Geometry only; every label is real text for screen readers via <title>/<desc>. */

const ARROW = (
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
    </marker>
  </defs>
);

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  strong,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  strong?: boolean;
}) {
  return (
    <g className={strong ? "fig-box fig-strong" : "fig-box"}>
      <rect x={x} y={y} width={w} height={h} rx="6" />
      <text
        x={x + 14}
        y={y + (sub ? h / 2 - 4 : h / 2 + 5)}
        className="fig-title"
      >
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + h / 2 + 15} className="fig-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

const FLOW_PATHS = [
  "M180 160 H246",
  "M410 160 H445 V94 H476",
  "M410 160 H476",
  "M410 160 H445 V226 H476",
  "M660 94 H726",
  "M660 160 H726",
  "M660 226 H726",
  "M330 200 V300 H476",
];

export function FlowDiagram() {
  return (
    <div className="figure-scroll">
      <svg
        className="figure flow"
        viewBox="0 0 900 340"
        role="img"
        aria-labelledby="flow-t flow-d"
      >
        <title id="flow-t">How a job moves through Stack</title>
        <desc id="flow-d">
          Your service sends a job to the Stack API, which persists it and
          places it on one of three named queues. Workers pull jobs from the
          queues. Events are also delivered, signed, to webhook endpoints.
        </desc>
        {ARROW}
        {FLOW_PATHS.map((d) => (
          <path key={d} d={d} className="fig-line" markerEnd="url(#arrow)" />
        ))}
        <Box
          x={20}
          y={120}
          w={160}
          h={80}
          title="Your service"
          sub="enqueue · send"
        />
        <Box
          x={250}
          y={120}
          w={160}
          h={80}
          title="Stack API"
          sub="persisted ×2 zones"
          strong
        />
        <Box x={480} y={72} w={180} h={44} title="queue: emails" />
        <Box x={480} y={138} w={180} h={44} title="queue: exports" />
        <Box x={480} y={204} w={180} h={44} title="queue: billing" />
        <g className="fig-box">
          <rect x={730} y={60} width={150} height={210} rx="6" />
          <text x={744} y={88} className="fig-title">
            Workers
          </text>
          {["eu-1 / 1", "eu-1 / 2", "eu-1 / 3", "us-1 / 1"].map((w, i) => (
            <text key={w} x={744} y={124 + i * 34} className="fig-sub">
              {w}
            </text>
          ))}
        </g>
        <Box x={480} y={278} w={180} h={44} title="Webhook endpoints" />
        <text x={342} y={262} className="fig-sub">
          events, signed
        </text>
        <text x={186} y={148} className="fig-sub">
          HTTPS
        </text>
        <text x={672} y={150} className="fig-sub">
          pull
        </text>
        {FLOW_PATHS.map((d, i) => (
          <circle
            key={d}
            r="4"
            className="packet"
            style={{
              offsetPath: `path("${d}")`,
              animationDelay: `${(i % 4) * 0.7}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function LifecycleDiagram() {
  return (
    <div className="figure-scroll">
      <svg
        className="figure"
        viewBox="0 0 760 240"
        role="img"
        aria-labelledby="life-t life-d"
      >
        <title id="life-t">Job states</title>
        <desc id="life-d">
          A queued job is claimed by a worker with a 30-second lease and becomes
          active. It completes when the handler resolves. If the lease expires
          it returns to queued. If the handler throws it fails, and returns to
          queued while attempts remain. A queued job can be cancelled.
        </desc>
        {ARROW}
        <path d="M150 72 H326" className="fig-line" markerEnd="url(#arrow)" />
        <path
          d="M330 94 H154"
          className="fig-line fig-dash"
          markerEnd="url(#arrow)"
        />
        <path d="M470 82 H586" className="fig-line" markerEnd="url(#arrow)" />
        <path
          d="M400 104 V166"
          className="fig-line fig-alert"
          markerEnd="url(#arrow)"
        />
        <path
          d="M330 192 C 240 192, 130 160, 110 108"
          className="fig-line fig-dash"
          markerEnd="url(#arrow)"
        />
        <path d="M50 104 V166" className="fig-line" markerEnd="url(#arrow)" />
        <Box x={10} y={60} w={140} h={44} title="queued" />
        <Box x={330} y={60} w={140} h={44} title="active" strong />
        <Box x={590} y={60} w={160} h={44} title="completed" />
        <Box x={330} y={170} w={140} h={44} title="failed" />
        <Box x={10} y={170} w={140} h={44} title="cancelled" />
        <text x={162} y={60} className="fig-sub">
          claimed · 30 s lease
        </text>
        <text x={166} y={116} className="fig-sub">
          lease expired
        </text>
        <text x={484} y={70} className="fig-sub">
          resolved
        </text>
        <text x={412} y={142} className="fig-sub">
          threw
        </text>
        <text x={206} y={212} className="fig-sub">
          retry
        </text>
        <text x={62} y={142} className="fig-sub">
          cancel
        </text>
        <text x={482} y={197} className="fig-sub">
          dead letter after the last attempt
        </text>
      </svg>
    </div>
  );
}

const BASE = 2;
const RETRIES = 5;

export function BackoffChart() {
  const delays = Array.from({ length: RETRIES }, (_, i) => BASE * 2 ** i);
  const max = delays[delays.length - 1] * 1.2;
  const total = delays.reduce((a, b) => a + b, 0);
  const W = 520;
  return (
    <figure className="backoff">
      <svg
        className="figure"
        viewBox={`0 0 ${W + 170} ${RETRIES * 40 + 30}`}
        role="img"
        aria-labelledby="bo-t"
      >
        <title id="bo-t">
          Default delays before each retry:{" "}
          {delays.map((d) => `${d} seconds`).join(", ")}, each with up to 20
          percent jitter.
        </title>
        {delays.map((d, i) => {
          const w = (d / max) * W;
          return (
            <g key={d} transform={`translate(0 ${i * 40 + 10})`}>
              <text x={0} y={19} className="fig-sub">
                retry {i + 1}
              </text>
              <rect x={80} y={4} width={w} height={22} className="bar" />
              <rect
                x={80 + w}
                y={4}
                width={w * 0.2}
                height={22}
                className="bar-jitter"
              />
              <text x={80 + w * 1.2 + 10} y={19} className="fig-sub tabular">
                {d} s
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        Delay before each retry with a 2 s base. The lighter band is the jitter
        range. All five retries finish within about {total} s, plus handler
        time.
      </figcaption>
    </figure>
  );
}
