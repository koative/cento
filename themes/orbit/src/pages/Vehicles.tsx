import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { vehicles } from "../content";
import { num } from "../lib/format";
import { VehicleDrawing } from "../components/VehicleDrawing";

const compare = [
  "Height",
  "Lift-off mass",
  "Customer ports",
  "Fairing envelope",
  "Launch site",
  "Reusability",
];

export function Vehicles() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Vehicles</h1>
          <p className="lede">
            Two rockets and a tug, designed and built in Port Kessel. Kestrel
            flies one customer to an exact orbit; Halcyon flies everyone else;
            Wayfarer moves you from where the rideshare stops to where your
            mission starts.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap vehicle-rows">
          {vehicles.map((v) => (
            <article key={v.id} className="vehicle-row">
              <div className="vehicle-row-drawing">
                <VehicleDrawing v={v} />
              </div>
              <div className="vehicle-row-copy">
                <p className="role">{v.role}</p>
                <h2>{v.name}</h2>
                <p>{v.summary}</p>
                <dl className="perf-list tnum">
                  {v.performance
                    .filter((p) => p.kg > 0)
                    .map((p) => (
                      <div key={p.orbit}>
                        <dt>{p.orbit}</dt>
                        <dd>{num(p.kg)} kg</dd>
                      </div>
                    ))}
                </dl>
                <p className="price tnum">
                  <strong>{v.price}</strong> {v.priceNote}
                </p>
                <Link to={`/vehicles/${v.id}`} className="btn btn-dark">
                  {v.name} spec sheet{" "}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap">
          <h2>Side by side</h2>
          <div className="table-wrap">
            <table className="data compare tnum">
              <thead>
                <tr>
                  <td />
                  {vehicles.map((v) => (
                    <th key={v.id} scope="col">
                      {v.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {vehicles.map((v) => (
                      <td key={v.id}>
                        {v.specs.find(([l]) => l === label)?.[1] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
