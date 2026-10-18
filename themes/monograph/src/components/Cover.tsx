import type { CSSProperties } from "react";
import type { Issue } from "../content";

/** The printed cover, drawn in CSS: nameplate, a plate photograph, the issue word. Scales with its container. */
export function Cover({
  issue,
  eager = false,
}: {
  issue: Issue;
  eager?: boolean;
}) {
  return (
    <div
      className="cover"
      style={
        { "--cover": issue.color, "--cover-ink": issue.ink } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="cover-top">
        <span>Monograph</span>
        <small>
          No. {issue.no} · {issue.season} · ${issue.price}
        </small>
      </div>
      <img src={issue.image} alt="" loading={eager ? "eager" : "lazy"} />
      <div className="cover-word">{issue.word}</div>
    </div>
  );
}
