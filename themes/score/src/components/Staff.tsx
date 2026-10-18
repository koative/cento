/*
 * A treble staff that engraves notes as quarter notes. One staff space = 10 units;
 * the bottom line (E4) sits at y = 60 and the top line (F5) at y = 20.
 * The clef outline is the U+1D11E glyph from Noto Music (SIL OFL 1.1).
 */
const CLEF =
  "M314 801Q300 854 291 906Q282 958 282 1012Q282 1059 288.5 1100.5Q295 1142 307 1177Q320 1217 341 1252.5Q362 1288 385.5 1311Q409 1334 427 1334Q451 1334 493 1249Q514 1206 524 1156Q534 1106 534 1049Q534 978 515 907.5Q496 837 459.5 775Q423 713 372 666L407 498Q422 500 432 501Q442 502 447 502Q508 502 556 467.5Q604 433 632.5 377Q661 321 661 254Q661 177 621.5 115.5Q582 54 503 25Q508 8 532 -117Q538 -147 541 -164.5Q544 -182 545 -195Q546 -208 546 -225Q546 -275 521.5 -314.5Q497 -354 455.5 -376Q414 -398 363 -398Q311 -398 271 -378.5Q231 -359 208 -324.5Q185 -290 185 -245Q185 -197 211.5 -165Q238 -133 287 -133Q329 -133 355.5 -163.5Q382 -194 382 -236Q382 -272 357 -299Q332 -326 292 -326H282Q308 -365 364 -365Q433 -365 472 -320Q511 -275 511 -205Q511 -188 507 -159.5Q503 -131 493 -91Q483 -51 477.5 -25Q472 1 470 12Q436 2 390 2Q304 2 222 52Q142 102 96 184Q50 266 50 361Q50 451 91 530Q132 609 192.5 675Q253 741 314 801ZM341 826Q364 838 390 870.5Q416 903 440 945Q464 987 479 1029.5Q494 1072 494 1106Q494 1142 483 1163Q472 1184 445 1184Q421 1184 398.5 1162Q376 1140 358.5 1103.5Q341 1067 331 1022Q321 977 321 930Q321 898 327.5 872Q334 846 341 826ZM398 379Q371 373 347 353.5Q323 334 308.5 306.5Q294 279 294 248Q294 223 307 196.5Q320 170 339 154Q352 142 365 136Q380 129 380 123Q380 120 370 117Q332 126 301.5 151Q271 176 253.5 211.5Q236 247 236 287Q236 330 253.5 370Q271 410 302.5 442Q334 474 374 490L345 641Q229 547 174.5 456.5Q120 366 120 277Q120 212 154 156Q188 100 247 65.5Q306 31 380 31Q400 31 420.5 35Q441 39 464 45ZM495 55Q593 97 593 227Q593 270 571 305.5Q549 341 512 362Q475 383 429 383Z";

const PITCH: [step: number, sharp: boolean][] = [
  [0, false],
  [0, true],
  [1, false],
  [1, true],
  [2, false],
  [3, false],
  [3, true],
  [4, false],
  [4, true],
  [5, false],
  [5, true],
  [6, false],
];
const LETTERS = "CDEFGAB";

/** Staff position of a MIDI note: diatonic steps above E4 (negative below), and whether it carries a sharp. */
export function position(midi: number) {
  const [step, sharp] = PITCH[midi % 12];
  return { step: (Math.floor(midi / 12) - 1) * 7 + step - 30, sharp };
}

export function noteName(midi: number) {
  const [step, sharp] = PITCH[midi % 12];
  return `${LETTERS[step]}${sharp ? "#" : ""}${Math.floor(midi / 12) - 1}`;
}

export type StaffNote = { id: number; midi: number };

export const STAFF_SLOTS = 12;
const X0 = 46;
const DX = 22;
const W = X0 + STAFF_SLOTS * DX + 8;

export function Staff({
  notes,
  current,
  label,
}: {
  notes: StaffNote[];
  current?: number;
  label: string;
}) {
  return (
    <svg
      className="staff"
      viewBox={`0 0 ${W} 92`}
      role="img"
      aria-label={label}
    >
      <g className="staff-lines">
        {[20, 30, 40, 50, 60].map((y) => (
          <line key={y} x1="0" x2={W} y1={y} y2={y} />
        ))}
        <line x1={W - 6} x2={W - 6} y1="20" y2="60" />
        <line
          className="staff-final"
          x1={W - 1.75}
          x2={W - 1.75}
          y1="20"
          y2="60"
        />
      </g>
      <path
        className="staff-clef"
        d={CLEF}
        transform="translate(3 60) scale(0.04 -0.04)"
      />
      {notes.map((n, i) => {
        const { step, sharp } = position(n.midi);
        const x = X0 + i * DX + DX / 2;
        const y = 60 - step * 5;
        const up = step < 4;
        const ledgers: number[] = [];
        for (let s = -2; s >= step; s -= 2) ledgers.push(60 - s * 5);
        for (let s = 10; s <= step; s += 2) ledgers.push(60 - s * 5);
        return (
          <g
            key={n.id}
            className="staff-note"
            data-current={current === i ? "" : undefined}
          >
            {ledgers.map((ly) => (
              <line
                key={ly}
                className="staff-ledger"
                x1={x - 9}
                x2={x + 9}
                y1={ly}
                y2={ly}
              />
            ))}
            {sharp && (
              <g className="staff-sharp">
                <line x1={x - 15.5} x2={x - 15.5} y1={y - 9} y2={y + 10} />
                <line x1={x - 11.5} x2={x - 11.5} y1={y - 10} y2={y + 9} />
                <line
                  className="staff-sharp-bar"
                  x1={x - 18.5}
                  x2={x - 8.5}
                  y1={y - 1.6}
                  y2={y - 4.4}
                />
                <line
                  className="staff-sharp-bar"
                  x1={x - 18.5}
                  x2={x - 8.5}
                  y1={y + 4.4}
                  y2={y + 1.6}
                />
              </g>
            )}
            <ellipse
              cx={x}
              cy={y}
              rx="6"
              ry="4.3"
              transform={`rotate(-20 ${x} ${y})`}
            />
            <line
              className="staff-stem"
              x1={up ? x + 5.4 : x - 5.4}
              x2={up ? x + 5.4 : x - 5.4}
              y1={up ? y - 1.5 : y + 1.5}
              y2={up ? y - 34 : y + 34}
            />
          </g>
        );
      })}
    </svg>
  );
}
