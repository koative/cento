/** FDI two-digit notation: quadrant (1 upper right, 2 upper left, 3 lower left, 4 lower right) + position from the midline. */

const kinds = [
  "central incisor",
  "lateral incisor",
  "canine",
  "first premolar",
  "second premolar",
  "first molar",
  "second molar",
  "wisdom tooth",
];
const quadrants = [
  "",
  "Upper right",
  "Upper left",
  "Lower left",
  "Lower right",
];

/** Viewer's left to right, as on a dental chart (the patient's right is on the left). */
export const upperArch = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
];
export const lowerArch = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

export const toothName = (n: number) =>
  `${quadrants[Math.floor(n / 10)]} ${kinds[(n % 10) - 1]}`;

/** Relative width of a tooth along the arch. */
export const toothWidth = (n: number) =>
  [0, 0.82, 0.72, 0.84, 0.8, 0.78, 1.12, 1.04, 0.96][n % 10];
