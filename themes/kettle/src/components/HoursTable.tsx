import { days, hours } from "../content";
import { hoursLabel } from "../lib/util";

/** The week's taproom hours with today marked. */
export function HoursTable() {
  const today = new Date().getDay();
  // Monday-first reads like a bar's chalkboard.
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <table className="hours">
      <caption className="sr-only">Taproom opening hours</caption>
      <tbody>
        {order.map((d) => (
          <tr key={d} aria-current={d === today ? "date" : undefined}>
            <th scope="row">{days[d]}</th>
            <td>{hoursLabel(hours[d])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
