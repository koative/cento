import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { classes, teachers } from "../content";

export function Teachers() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Teachers</h1>
        <p className="lead">
          Five teachers who share one idea: that yoga should be explained
          clearly and taught slowly. Between them they have been teaching for
          more than sixty years.
        </p>
      </header>
      <ul className="wrap roster">
        {teachers.map((t) => (
          <li key={t.slug} className="roster-item">
            <Link
              to={`/teachers/${t.slug}`}
              className="roster-photo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={t.image.src}
                alt=""
                width={t.image.w}
                height={t.image.h}
                loading="lazy"
              />
            </Link>
            <div className="roster-text">
              <h2>
                <Link to={`/teachers/${t.slug}`}>{t.name}</Link>
              </h2>
              <p className="roster-role">
                {t.role} · at Still since {t.since}
              </p>
              <blockquote>{t.quote}</blockquote>
              <p>{t.short}</p>
              <p className="roster-classes">
                Teaches{" "}
                {t.teaches.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && (i === t.teaches.length - 1 ? " and " : ", ")}
                    <Link to={`/classes/${slug}`}>
                      {classes.find((c) => c.slug === slug)!.name}
                    </Link>
                  </span>
                ))}
              </p>
              <Link to={`/teachers/${t.slug}`} className="text-link">
                {t.name.split(" ")[0]}'s classes this week{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
