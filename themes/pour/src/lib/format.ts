/** Event dates are stored as ISO days; render them in the shop's own short style ("Thu 23 Oct"). */
export function eventDate(iso: string, style: "short" | "long" = "short") {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: style === "long" ? "long" : "short",
    day: "numeric",
    month: style === "long" ? "long" : "short",
  });
}

export function dayParts(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
  };
}
