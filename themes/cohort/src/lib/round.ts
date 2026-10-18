export type CapTable = { founders: number; angels: number; pool: number };

export type RoundInput = {
  preMoney: number;
  raise: number;
  /** Option pool the new investors ask for, as % of the post-money. */
  poolTarget: number;
  /** Cohort's part of the new money, in %. */
  cohortShare: number;
  capTable: CapTable;
  /** "pre": the pool top-up dilutes existing holders only (market habit). "post": everyone shares it. */
  poolTiming: "pre" | "post";
};

export type Holder = "founders" | "angels" | "pool" | "cohort" | "others";

export type RoundResult = {
  postMoney: number;
  before: Record<Holder, number>;
  after: Record<Holder, number>;
  /** Percentage points of the company the founders give up to the pool top-up. */
  poolCost: number;
  /** Pre-money once the pool top-up is priced in. */
  effectivePre: number;
};

/** Ownership before and after a priced round, all values in % of the company. */
export function modelRound(i: RoundInput): RoundResult {
  const { founders: F, angels: A, pool: P } = i.capTable;
  const postMoney = i.preMoney + i.raise;
  const scale = i.preMoney / postMoney;
  const investors = (i.raise / postMoney) * 100;
  const pool = P * scale;
  const topUp = Math.max(0, i.poolTarget - pool);

  let founders: number, angels: number, newMoney: number;
  if (i.poolTiming === "pre") {
    founders = F * scale - (topUp * F) / (F + A);
    angels = A * scale - (topUp * A) / (F + A);
    newMoney = investors;
  } else {
    const keep = (100 - pool - topUp) / (100 - pool);
    founders = F * scale * keep;
    angels = A * scale * keep;
    newMoney = investors * keep;
  }

  const cohort = (newMoney * i.cohortShare) / 100;
  return {
    postMoney,
    before: { founders: F, angels: A, pool: P, cohort: 0, others: 0 },
    after: {
      founders,
      angels,
      pool: pool + topUp,
      cohort,
      others: newMoney - cohort,
    },
    poolCost: F * scale - founders,
    effectivePre:
      i.poolTiming === "pre"
        ? i.preMoney - (topUp / 100) * postMoney
        : i.preMoney,
  };
}
