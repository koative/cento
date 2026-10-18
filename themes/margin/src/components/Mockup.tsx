import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Block, Screen } from "../content";

/** Authored client UI, drawn from data in content.ts. Decorative copy of a product, so hidden from assistive tech; the figure caption and margin notes carry the meaning. */
export function Mockup({ screen, accent }: { screen: Screen; accent: string }) {
  const style = { "--brand": accent } as CSSProperties;
  const blocks = screen.blocks.map((b, i) => <BlockView key={i} block={b} />);
  return (
    <div
      className="device"
      data-device={screen.device}
      data-dark={screen.dark || undefined}
      style={style}
      aria-hidden="true"
    >
      {screen.device === "phone" ? (
        <div className="m-screen">
          <div className="m-status">
            <span>08:47</span>
            <span className="m-signal" />
          </div>
          {blocks}
        </div>
      ) : (
        <div className="m-window">
          <div className="m-side">
            <span className="m-app">{screen.label.split(" — ")[0]}</span>
            {screen.nav?.map((n, i) => (
              <span key={n} className="m-nav" data-on={i === 0 || undefined}>
                {n}
              </span>
            ))}
          </div>
          <div className="m-screen">{blocks}</div>
        </div>
      )}
    </div>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.t) {
    case "bar":
      return (
        <div className="m-blk m-bar" data-blk>
          {b.back && <ChevronLeft size={16} />}
          <strong>{b.title}</strong>
          {b.action && <span className="m-action">{b.action}</span>}
        </div>
      );
    case "title":
      return (
        <div className="m-blk m-title" data-blk>
          <strong>{b.text}</strong>
          {b.sub && <span>{b.sub}</span>}
        </div>
      );
    case "tabs":
      return (
        <div className="m-blk m-tabs" data-blk>
          {b.items.map((t, i) => (
            <span key={t} data-on={i === b.active || undefined}>
              {t}
            </span>
          ))}
        </div>
      );
    case "field":
      return (
        <div className="m-blk m-field" data-blk>
          <span className="m-label">{b.label}</span>
          <span className="m-input">{b.value}</span>
          {b.hint && <span className="m-hint">{b.hint}</span>}
        </div>
      );
    case "chips":
      return (
        <div className="m-blk m-chips" data-blk>
          {b.items.map((t, i) => (
            <span key={t} data-on={i === b.active || undefined}>
              {t}
            </span>
          ))}
        </div>
      );
    case "list":
      return (
        <div className="m-blk m-list" data-blk>
          {b.items.map((it) => (
            <div key={it.title} className="m-row">
              <span className="m-row-main">
                <strong>{it.title}</strong>
                {it.meta && <span>{it.meta}</span>}
              </span>
              {it.tag && <span className="m-tag">{it.tag}</span>}
              {it.value && <span className="m-value">{it.value}</span>}
              <ChevronRight size={14} className="m-chev" />
            </div>
          ))}
        </div>
      );
    case "stat":
      return (
        <div className="m-blk m-stat" data-blk>
          <span className="m-label">{b.label}</span>
          <strong>{b.value}</strong>
          {b.meta && <span className="m-hint">{b.meta}</span>}
        </div>
      );
    case "progress":
      return (
        <div className="m-blk m-progress" data-blk>
          <span className="m-progress-head">
            <span>{b.label}</span>
            <span>{b.meta}</span>
          </span>
          <span className="m-track">
            <span style={{ width: `${b.value * 100}%` }} />
          </span>
        </div>
      );
    case "chart": {
      const max = Math.max(...b.values);
      return (
        <div className="m-blk m-chart" data-blk>
          <span className="m-label">{b.label}</span>
          <svg
            viewBox={`0 0 ${b.values.length * 20} 64`}
            preserveAspectRatio="none"
          >
            {b.values.map((v, i) => (
              <rect
                key={i}
                x={i * 20 + 5}
                y={64 - (v / max) * 60}
                width="10"
                height={(v / max) * 60}
              />
            ))}
          </svg>
          <span className="m-axis">
            {b.labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
      );
    }
    case "banner":
      return (
        <div className="m-blk m-banner" data-blk>
          {b.text}
        </div>
      );
    case "button":
      return (
        <div className="m-blk m-button" data-blk>
          <span className="m-primary">{b.label}</span>
          {b.secondary && <span className="m-secondary">{b.secondary}</span>}
        </div>
      );
  }
}
