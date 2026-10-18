import { useState } from "react";
import { missions, vehicles } from "../content";
import { MissionCard } from "../components/MissionCard";

const statuses = ["All", "Flown", "Upcoming"] as const;

export function Missions() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [vehicle, setVehicle] = useState("all");
  const [order, setOrder] = useState<"new" | "old">("new");

  const shown = missions
    .filter(
      (m) =>
        status === "All" ||
        (status === "Upcoming") === (m.outcome === "Upcoming"),
    )
    .filter((m) => vehicle === "all" || m.vehicle === vehicle)
    .sort(
      (a, b) =>
        (order === "new" ? 1 : -1) * (Date.parse(b.date) - Date.parse(a.date)),
    );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Missions</h1>
          <p className="lede">
            Every flight we have flown and the next ones we will fly, with
            timelines, payload lists and outcomes. Including Headwind, the one
            that did not go to plan.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter missions">
            <div className="segmented" role="radiogroup" aria-label="Status">
              {statuses.map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="status"
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <label className="select-label">
              Vehicle
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="all">All vehicles</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-label">
              Sort
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as "new" | "old")}
              >
                <option value="new">Newest first</option>
                <option value="old">Oldest first</option>
              </select>
            </label>
            <p className="count tnum" aria-live="polite">
              {shown.length} {shown.length === 1 ? "mission" : "missions"}
            </p>
          </div>

          {shown.length ? (
            <div className="mission-grid wide">
              {shown.map((m) => (
                <MissionCard key={m.slug} m={m} headingLevel={2} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                No missions match. Wayfarer has only flown transfer missions so
                far.
              </p>
              <button
                type="button"
                className="btn btn-ghost-dark"
                onClick={() => {
                  setStatus("All");
                  setVehicle("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
