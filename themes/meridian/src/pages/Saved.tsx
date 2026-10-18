import { Heart, X } from "lucide-react";
import { Link } from "../router";
import { listings } from "../content";
import { areaOf, money, price } from "../lib/format";
import { toggleSaved, useSaved } from "../lib/store";
import { ListingCard } from "../components/ListingCard";

export function Saved() {
  const ids = useSaved();
  const saved = listings.filter((l) => ids.includes(l.id));

  return (
    <>
      <section className="page-head wrap">
        <h1>Saved homes</h1>
        <p className="lede">
          Your shortlist, kept on this device. Compare the numbers side by side,
          then book viewings for the ones that survive.
        </p>
      </section>

      {saved.length === 0 ? (
        <section className="wrap section-tight">
          <div className="empty">
            <Heart size={28} strokeWidth={1.5} aria-hidden="true" />
            <h2>Nothing saved yet</h2>
            <p>
              Use the heart on any home to keep it here. Your list stays in this
              browser; no account needed.
            </p>
            <Link to="/homes" className="btn">
              Search homes
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className="wrap section-tight">
            <h2 className="visually-hidden">Compare</h2>
            <div className="table-scroll">
              <table className="data-table compare num">
                <thead>
                  <tr>
                    <th scope="col">Home</th>
                    <th scope="col">Price</th>
                    <th scope="col">Beds</th>
                    <th scope="col">Baths</th>
                    <th scope="col">Sq ft</th>
                    <th scope="col">Per sq ft</th>
                    <th scope="col">
                      <span className="visually-hidden">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {saved.map((l) => (
                    <tr key={l.id}>
                      <th scope="row">
                        <Link to={"/homes/" + l.id}>{l.address}</Link>
                        <span className="muted"> · {areaOf(l.area).name}</span>
                      </th>
                      <td>{price(l)}</td>
                      <td>{l.beds}</td>
                      <td>{l.baths}</td>
                      <td>{l.sqft.toLocaleString("en-US")}</td>
                      <td>
                        {l.mode === "buy"
                          ? money(Math.round(l.price / l.sqft))
                          : "—"}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label={`Remove ${l.address}`}
                          onClick={() => toggleSaved(l.id)}
                        >
                          <X size={16} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="wrap section">
            <h2>Your shortlist</h2>
            <div className="card-grid card-grid-3">
              {saved.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
