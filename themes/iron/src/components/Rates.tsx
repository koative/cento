import { ptRates } from "../content";
import { money } from "../lib";

export function Rates() {
  return (
    <table className="rates">
      <caption className="sr-only">Personal training rates</caption>
      <thead>
        <tr>
          <th scope="col">Option</th>
          <th scope="col">Per session</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {ptRates.map((r) => (
          <tr key={r.name}>
            <th scope="row">
              {r.name}
              <span>{r.note}</span>
            </th>
            <td>{money(r.price / r.sessions)}</td>
            <td>{money(r.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
