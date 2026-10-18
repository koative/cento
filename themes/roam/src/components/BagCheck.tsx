import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "../router";
import { bagKinds, cars } from "../content";
import { fit, type Load } from "../lib/fit";
import { money, plural } from "../lib/format";
import { CarDrawing } from "./CarDrawing";
import { Stepper } from "./Stepper";

export const startLoad: Load = {
  people: 2,
  bags: { large: 2, cabin: 2, skis: 0, stroller: 0 },
};

export function BagControls({
  load,
  onChange,
}: {
  load: Load;
  onChange: (l: Load) => void;
}) {
  return (
    <div className="bag-controls">
      <Stepper
        label="People"
        detail="driver included"
        value={load.people}
        min={1}
        max={9}
        onChange={(people) => onChange({ ...load, people })}
      />
      {bagKinds.map((b) => (
        <Stepper
          key={b.id}
          label={b.label}
          detail={b.size}
          value={load.bags[b.id] ?? 0}
          max={8}
          onChange={(n) =>
            onChange({ ...load, bags: { ...load.bags, [b.id]: n } })
          }
        />
      ))}
    </div>
  );
}

/** The signature tool: pick people and bags, see which cars take the lot and how full the boot gets. */
export function BagPlanner() {
  const [load, setLoad] = useState(startLoad);
  const ranked = cars
    .map((car) => ({ car, f: fit(car, load) }))
    .sort((a, b) => Number(b.f.ok) - Number(a.f.ok) || a.car.rate - b.car.rate);
  const [picked, setPicked] = useState<string | null>(null);
  const best = ranked.find((r) => r.car.id === picked) ?? ranked[0];
  const fits = ranked.filter((r) => r.f.ok).length;

  return (
    <div className="planner">
      <div className="planner-input">
        <BagControls load={load} onChange={setLoad} />
      </div>

      <div className="planner-output">
        <div className="planner-stage" data-ok={best.f.ok ? "" : undefined}>
          <CarDrawing
            key={best.car.id}
            className="drive-in"
            car={best.car}
            load={{
              pct: best.f.room ? best.f.need / best.f.room : 2,
              ok: best.f.ok,
            }}
          />
          <div className="planner-readout">
            <p className="planner-car">
              {best.car.name} <span>{best.car.className}</span>
            </p>
            <p className="planner-meter tnum">
              {best.f.need.toFixed(1)} of {best.f.room.toFixed(1)} cu ft
            </p>
            <p className="planner-verdict">
              {best.f.ok ? `Fits · ${best.f.layout}` : best.f.reason}
            </p>
          </div>
        </div>

        <p className="planner-count" aria-live="polite">
          {fits
            ? `${plural(fits, "car")} take${fits === 1 ? "s" : ""} everything.`
            : "Nothing in the fleet takes all of that. Try the Caravel 9 with fewer bags, or two cars."}
        </p>

        <ul className="board" aria-label="Every car, best fit first">
          {ranked.map(({ car, f }) => (
            <li
              key={car.id}
              data-ok={f.ok ? "" : undefined}
              data-picked={car.id === best.car.id ? "" : undefined}
            >
              <button
                type="button"
                onClick={() => setPicked(car.id)}
                aria-pressed={car.id === best.car.id}
              >
                <span className="board-code">{car.acriss}</span>
                <span className="board-name">{car.name}</span>
                <span className="board-status">
                  {f.ok ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <X aria-hidden="true" />
                  )}
                  {f.ok ? f.layout : f.reason}
                </span>
                <span className="board-rate tnum">{money(car.rate)}/day</span>
              </button>
            </li>
          ))}
        </ul>
        <Link to={`/fleet/${best.car.id}`} className="text-link">
          See the {best.car.name} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
