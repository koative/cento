import { Link } from "../router";
import { notFound } from "../content";

export function NotFound() {
  return (
    <section className="not-found" data-not-found>
      <img
        src={notFound.image.src}
        alt=""
        width={notFound.image.w}
        height={notFound.image.h}
      />
      <div className="wrap not-found-inner">
        <h1>{notFound.title}</h1>
        <p className="lede">{notFound.text}</p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Back to the floor
          </Link>
          <Link to="/timetable" className="btn btn-ghost">
            Timetable
          </Link>
        </div>
      </div>
    </section>
  );
}
