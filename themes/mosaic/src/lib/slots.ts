/* Demo availability: the next three weeks of appointment days, with a deterministic set of slots already taken. */

const TIMES = ["09:30", "11:00", "13:30", "15:00", "16:30"];
// Library visits run Thu–Sat (library hours); home visits and calls run Mon–Fri.
const DAYS: Record<string, number[]> = {
  library: [4, 5, 6],
  home: [1, 2, 3, 4, 5],
  video: [1, 2, 3, 4, 5],
};

export type Day = {
  iso: string;
  date: Date;
  times: { time: string; taken: boolean }[];
};

export function availability(type: string, from = new Date()): Day[] {
  const days: Day[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 2);
  while (days.length < 9) {
    if ((DAYS[type] ?? DAYS.video).includes(d.getDay())) {
      const seed = d.getDate() * 7 + d.getMonth();
      days.push({
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        date: new Date(d),
        times: TIMES.map((time, i) => ({
          time,
          taken: (seed + i * 3) % 5 === 0 || (seed + i) % 7 === 0,
        })),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export const formatDay = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
export const formatLong = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
