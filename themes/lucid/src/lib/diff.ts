export type Change = { kind: "change"; del: string; ins: string };
export type Part = { kind: "same"; text: string } | Change;

/** Word-level diff (LCS over words and whitespace), grouped into tracked changes like an editor's markup. */
export function diffWords(before: string, after: string): Part[] {
  const a = before.match(/\s+|[^\s]+/g) ?? [];
  const b = after.match(/\s+|[^\s]+/g) ?? [];
  // ponytail: O(n·m) table; fine for paragraphs, swap for Myers' diff if documents get long.
  const lcs = Array.from(
    { length: a.length + 1 },
    () => new Uint16Array(b.length + 1),
  );
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      lcs[i][j] =
        a[i] === b[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);

  const parts: Part[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    const last = parts[parts.length - 1];
    if (i < a.length && j < b.length && a[i] === b[j]) {
      if (last?.kind === "same") last.text += a[i];
      else parts.push({ kind: "same", text: a[i] });
      (i++, j++);
      continue;
    }
    const change: Change =
      last?.kind === "change" ? last : { kind: "change", del: "", ins: "" };
    if (change !== last) parts.push(change);
    if (j < b.length && (i === a.length || lcs[i][j + 1] >= lcs[i + 1][j]))
      change.ins += b[j++];
    else change.del += a[i++];
  }

  // A lone space between two changes reads as one edit: fold it into both sides.
  const merged: Part[] = [];
  for (let k = 0; k < parts.length; k++) {
    const p = parts[k];
    const prev = merged[merged.length - 1];
    const next = parts[k + 1];
    if (
      p.kind === "same" &&
      /^\s+$/.test(p.text) &&
      prev?.kind === "change" &&
      next?.kind === "change"
    ) {
      prev.del += p.text + next.del;
      prev.ins += p.text + next.ins;
      k++;
    } else merged.push(p);
  }
  return merged;
}

/** The text that results from a set of decisions: accepted changes use the insertion, the rest keep the original. */
export function resolve(parts: Part[], accepted: (index: number) => boolean) {
  let n = -1;
  return parts
    .map((p) =>
      p.kind === "same" ? p.text : (n++, accepted(n) ? p.ins : p.del),
    )
    .join("")
    .replace(/ {2,}/g, " ");
}

if (import.meta.env.DEV) {
  const parts = diffWords("in order to start the app", "to start the new app");
  console.assert(
    parts.filter((p) => p.kind === "change").length === 2,
    "diffWords groups edits",
    parts,
  );
  console.assert(
    resolve(parts, () => true) === "to start the new app",
    "resolve accepts all",
  );
  console.assert(
    resolve(parts, () => false) === "in order to start the app",
    "resolve rejects all",
  );
}
