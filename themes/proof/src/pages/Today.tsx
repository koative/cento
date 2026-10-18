import { ArrowRight } from "lucide-react";
import { hours, images, products } from "../content";
import { Link } from "../router";
import { OvenBoard } from "../components/OvenBoard";
import { money } from "../lib/cart";
import { dayLabel } from "../lib/time";

export function Today() {
  const date = new Date();
  const weekday = date.getDay();
  const closed = hours[weekday].open === null;
  /** We close one day a week; on that day the lists show tomorrow. */
  const day = closed ? (weekday + 1) % 7 : weekday;
  const when = closed ? "tomorrow" : "today";
  const baked = products.filter((p) => p.bakeDays.includes(day));
  const notToday = products.filter((p) => !p.bakeDays.includes(day));

  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>Today's bake</h1>
          <p className="lede">
            {closed
              ? `${dayLabel(date, "long")}: the ovens are off and we're closed. Below is a typical baking day — the shop reopens tomorrow at 7:00.`
              : `${dayLabel(date, "long")}. Eleven oven loads between 5:40 and 1pm. Drag the clock to see what's warm, what's on the rack, and what usually sells out first.`}
          </p>
        </div>
        <img
          src={images.oven}
          alt="Rows of scored loaves baking inside a deck oven"
          width={1500}
          height={1125}
        />
      </header>

      <section className="section" aria-label="Oven board">
        <OvenBoard />
      </section>

      <section className="section today-lists" aria-labelledby="counter-title">
        <div>
          <h2 id="counter-title">On the counter {when}</h2>
          <ul className="price-list">
            {baked.map((p) => (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`}>{p.name}</Link>
                <span>{money(Math.min(...p.sizes.map((s) => s.price)))}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="today-aside">
          <h2>Not baked {when}</h2>
          {notToday.length ? (
            <ul className="plain-list">
              {notToday.map((p) => (
                <li key={p.id}>
                  <Link to={`/shop/${p.id}`}>{p.name}</Link>
                  <span>
                    {" "}
                    —{" "}
                    {p.specs.find(([k]) => k === "Baked")?.[1] ??
                      "on other days"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Everything on the list is in the oven {when}.</p>
          )}
          <p>
            Croissants are usually gone by half past ten. If your morning
            depends on one, order it ahead.
          </p>
          <Link to="/shop" className="btn">
            Order for tomorrow <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
