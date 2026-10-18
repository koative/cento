import type { Campaign } from "../content";
import { navigate } from "../router";
import { persisted } from "./store";

export type Gift = {
  ref: string;
  campaign: string | null;
  amount: number;
  monthly: boolean;
  name: string;
  onBoard: boolean;
  date: string;
};

/** Gifts made in this browser. They are added to the campaign totals so the board moves when you give. */
export const gifts = persisted<Gift[]>("lantern:gifts", []);

/** Event places held in this browser, keyed by event id. */
export const rsvps = persisted<Record<string, number>>("lantern:rsvps", {});

export function progress(c: Campaign, all: Gift[]) {
  const raised =
    c.raised +
    all.filter((g) => g.campaign === c.slug).reduce((s, g) => s + g.amount, 0);
  const donors = c.donors + all.filter((g) => g.campaign === c.slug).length;
  return {
    raised,
    donors,
    share: Math.min(raised / c.goal, 1),
    funded: raised >= c.goal,
  };
}

/** What the donate page opens with. It reads this once and clears it after mounting. */
export type Draft = {
  campaign: string | null;
  amount: number;
  monthly: boolean;
};
export const draft: { current: Draft | null } = { current: null };

/** "Give $X" buttons anywhere on the site carry their choice to the donate page. */
export function startGift(next: Draft) {
  draft.current = next;
  navigate("/donate");
}
