import type { Answers, FaceShape } from "../content";

/** Map the three mirror questions to one of six face shapes. */
export function faceFrom({ widest, length, jaw }: Answers): FaceShape {
  if (jaw === "pointed")
    return widest === "cheekbones"
      ? "diamond"
      : widest === "jaw"
        ? "oval"
        : "heart";
  if (length === "long")
    return jaw === "angular" || widest === "even" ? "oblong" : "oval";
  if (jaw === "angular" || widest === "jaw") return "square";
  return widest === "cheekbones"
    ? "diamond"
    : widest === "forehead"
      ? "heart"
      : "round";
}
