import { Link } from "../router";
import { beers } from "../content";
import { beerColor, money } from "../lib/util";

/** The board behind the bar: every tap, in tap order. */
export function TapBoard({ caption }: { caption: string }) {
  const taps = beers
    .filter((b) => b.tap !== null)
    .sort((a, b) => a.tap! - b.tap!);
  return (
    <div className="board-scroll">
      <table className="board">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Tap</th>
            <th scope="col">Beer</th>
            <th scope="col" className="board-style">
              Style
            </th>
            <th scope="col" className="num">
              ABV
            </th>
            <th scope="col" className="num board-ibu">
              IBU
            </th>
            <th scope="col" className="num">
              Pour
            </th>
          </tr>
        </thead>
        <tbody>
          {taps.map((b) => (
            <tr key={b.slug}>
              <td className="board-tap tnum">
                {String(b.tap).padStart(2, "0")}
              </td>
              <th scope="row">
                <span
                  className="board-swatch"
                  style={{ background: beerColor(b) }}
                  aria-hidden="true"
                />
                <Link to={`/beers/${b.slug}`}>{b.name}</Link>
                <span className="board-style-inline">{b.style}</span>
              </th>
              <td className="board-style">{b.style}</td>
              <td className="num tnum">{b.abv.toFixed(1)}%</td>
              <td className="num tnum board-ibu">{b.ibu}</td>
              <td className="num tnum">
                <span className="board-size">{b.pour.size}</span>{" "}
                {money(b.pour.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
