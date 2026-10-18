import { ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "../router";
import { allergyNote, dishes, services, type Dish } from "../content";
import { Diets, DishRow } from "../components/DishRow";
import { Photo } from "../components/Photo";
import { add, countOf, usePlan } from "../lib/table";
import { money } from "../lib/time";

export function DishPage({ dish }: { dish: Dish }) {
  const plan = usePlan();
  const qty = plan.items[dish.id] ?? 0;
  const service = services.find((s) => s.id === dish.service)!;
  const pair = dishes.find((d) => d.id === dish.pairsWith);
  const sameSection = dishes.filter(
    (d) =>
      d.section === dish.section &&
      d.service === dish.service &&
      d.id !== dish.id,
  );
  const related = (
    sameSection.length >= 2
      ? sameSection
      : dishes.filter((d) => d.service === dish.service && d.id !== dish.id)
  ).slice(0, 3);

  return (
    <div className="dish-page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={`/menu/${service.id}`}>{service.name}</Link>
            </li>
            <li>{dish.section}</li>
            <li aria-current="page">{dish.name}</li>
          </ol>
        </nav>
      </div>

      <article className="wrap dish-grid">
        {dish.photo && (
          <div className="dish-media">
            <Photo photo={dish.photo} className="arch" eager />
          </div>
        )}
        <div className="dish-copy">
          <h1>{dish.name}</h1>
          <p className="dish-price">
            <span className="num">{money(dish.price)}</span>
            <Diets dish={dish} />
          </p>
          <p className="lede">{dish.desc}</p>

          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => add(dish.id)}
            >
              {qty ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
              {qty
                ? `On your table (${qty}) · add another`
                : "Add to your table"}
            </button>
            <Link to={`/menu/${service.id}`} className="btn btn-ghost">
              Back to {service.name.toLowerCase()}
            </Link>
          </div>
          <p className="plan-status" aria-live="polite">
            {qty
              ? `${countOf(plan)} ${countOf(plan) === 1 ? "dish" : "dishes"} planned for ${plan.guests}. `
              : ""}
            {qty ? (
              <Link to={`/menu/${service.id}`}>See your table plan</Link>
            ) : null}
          </p>

          {dish.notes?.map((n) => (
            <p key={n}>{n}</p>
          ))}

          <dl className="dish-facts">
            <div>
              <dt>Contains</dt>
              <dd>
                {dish.contains.length
                  ? dish.contains.join(", ")
                  : "None of the 14 major allergens"}
              </dd>
            </div>
            {dish.from && (
              <div>
                <dt>Where it comes from</dt>
                <dd>{dish.from}</dd>
              </div>
            )}
            {pair && (
              <div>
                <dt>
                  {dish.service === "drinks" ? "Try it with" : "Drink with it"}
                </dt>
                <dd>
                  <Link to={`/menu/${pair.service}/${pair.id}`}>
                    {pair.name}
                  </Link>{" "}
                  · <span className="num">{money(pair.price)}</span>
                </dd>
              </div>
            )}
            <div>
              <dt>Served</dt>
              <dd>{service.when}</dd>
            </div>
          </dl>
          <p className="fine">{allergyNote}</p>
        </div>
        {!dish.photo && (
          <aside className="menu-card" aria-labelledby="card-title">
            <h2 id="card-title">{dish.section}</h2>
            <ul>
              {dishes
                .filter(
                  (d) =>
                    d.section === dish.section && d.service === dish.service,
                )
                .map((d) => (
                  <li key={d.id}>
                    <Link
                      to={`/menu/${d.service}/${d.id}`}
                      aria-current={d.id === dish.id ? "page" : undefined}
                    >
                      {d.name}
                    </Link>
                    <span className="leader" aria-hidden="true" />
                    <span className="num">{money(d.price)}</span>
                  </li>
                ))}
            </ul>
            <p>{service.when}</p>
          </aside>
        )}
      </article>

      <section className="wrap related" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title" className="section-title">
            {!dish.photo
              ? `Pictured from ${service.name.toLowerCase()}`
              : sameSection.length >= 2
                ? `More ${dish.section.toLowerCase()}`
                : `More from ${service.name.toLowerCase()}`}
          </h2>
          <Link to="/reservations" className="text-link">
            Book a table <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        {dish.photo ? (
          <ul className="dish-list related-list">
            {related.map((d) => (
              <DishRow key={d.id} dish={d} />
            ))}
          </ul>
        ) : (
          <ul className="photo-strip">
            {dishes
              .filter((d) => d.service === dish.service && d.photo)
              .map((d) => (
                <li key={d.id}>
                  <Link to={`/menu/${d.service}/${d.id}`}>
                    <Photo photo={d.photo!} />
                    <span>{d.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
