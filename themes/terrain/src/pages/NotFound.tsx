import { Signpost } from "../components/Signpost";

export function NotFound() {
  return (
    <section className="wrap notfound" data-not-found>
      <div>
        <h1>You've walked off the map.</h1>
        <p className="lede">
          This page doesn't exist, or the trail has been rerouted. No harm done:
          every good walk has a wrong turn in it.
        </p>
      </div>
      <Signpost
        label="Back to the trail"
        here="Lost? Start here"
        signs={[
          { to: "/", label: "Home", meta: "0 m" },
          { to: "/trips", label: "All trips", meta: "8 routes" },
          { to: "/route-finder", label: "Route finder", meta: "2 minutes" },
        ]}
      />
    </section>
  );
}
