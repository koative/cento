import { animals, type Animal } from "../content";

export type Answers = Record<string, string>;
export type Match = {
  animal: Animal;
  score: number;
  reasons: string[];
  cautions: string[];
};

const tagLevel = { green: 1, amber: 2, orange: 3 } as const;

/**
 * Score every animal against quiz answers, best first. Hard conflicts (wrong species, a "no" on
 * children or a resident pet) drop the animal; softer ones cost points and add a caution.
 * Reasons are pushed most-specific first, so reasons[0] is the best one-line summary.
 * ponytail: hand-tuned weights, not a model — counsellors adjust these numbers, not code paths.
 */
export function rank(a: Answers): Match[] {
  const out: Match[] = [];
  for (const animal of animals) {
    if (a.species && a.species !== "any" && a.species !== animal.species)
      continue;
    const { goodWith, energy, independence, affection } = animal;
    const pets =
      a.pets === "both"
        ? (["dogs", "cats"] as const)
        : a.pets === "dog"
          ? (["dogs"] as const)
          : a.pets === "cat"
            ? (["cats"] as const)
            : [];
    const hasKids = a.kids === "young" || a.kids === "older";
    if (
      (hasKids && goodWith.kids === "no") ||
      pets.some((p) => goodWith[p] === "no")
    )
      continue;

    let score = 88;
    const reasons: string[] = [];
    const cautions: string[] = [];
    const cost = (n: number, why: string) => ((score -= n), cautions.push(why));

    // People and pets: an untested "ask" costs points.
    if (hasKids) {
      const young = a.kids === "young";
      if (goodWith.kids === "ask")
        cost(
          young ? 18 : 8,
          young ? "Untested with young children" : "Best with calm, older kids",
        );
      else {
        reasons.push(
          young ? "Great with young children" : "Good with children",
        );
        if (affection === 3) score += 3;
      }
    }
    for (const p of pets) {
      if (goodWith[p] === "ask")
        cost(
          12,
          `Needs a careful introduction to your ${p === "dogs" ? "dog" : "cat"}`,
        );
      else reasons.push(`Already lives happily with ${p}`);
    }

    // Experience
    const exp = Number(a.experience || 3);
    const need = tagLevel[animal.tag];
    if (need > exp)
      cost(
        need - exp === 2 ? 45 : 22,
        need === 3
          ? "Needs a very experienced adopter"
          : "Better with some pet experience",
      );
    else if (exp === 1) {
      reasons.push("An easy first pet");
      if (energy === 3) cost(6, "A lot of energy for a first pet");
    }

    // Pace
    const pace = Number(a.pace || 2);
    const gap = Math.abs(pace - energy);
    if (gap === 0) {
      score += 4;
      reasons.push(
        energy === 3
          ? "Matches your energy, step for step"
          : energy === 1
            ? "As happy on the couch as you"
            : "Walks at your pace",
      );
    } else if (gap === 2)
      cost(
        25,
        energy > pace
          ? "Much more energy than your weekends"
          : "Much calmer than you'd like",
      );
    else score -= 8;

    // Time alone
    const alone = Number(a.alone || 1);
    if (alone > independence)
      cost(
        alone - independence === 2 ? 30 : 14,
        "Struggles with long stretches alone",
      );
    else if (alone === 3) reasons.push("Copes with a work day");

    // Home
    if (a.home === "apartment" && !animal.apartmentOk)
      cost(30, "Really needs a house with outdoor space");
    else if (
      a.home === "house" &&
      !animal.apartmentOk &&
      animal.size === "Large"
    )
      cost(10, "Would be happiest with a fenced yard");
    else if (a.home === "apartment") reasons.push("Happy in an apartment");

    // Long waits get a small, declared nudge.
    score += Math.min(6, Math.floor(animal.daysHere / 20));
    if (animal.daysHere > 80) reasons.push(`Waiting ${animal.daysHere} days`);

    out.push({
      animal,
      score: Math.max(5, Math.min(99, score)),
      reasons,
      cautions,
    });
  }
  return out.sort(
    (x, y) => y.score - x.score || y.animal.daysHere - x.animal.daysHere,
  );
}
