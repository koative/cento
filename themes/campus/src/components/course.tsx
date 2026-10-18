import { Star } from "lucide-react";
import { Link } from "../router";
import {
  courseMinutes,
  instructors,
  lessonCount,
  type Course,
} from "../content";
import { duration } from "../lib/plan";

const teacher = (c: Course) =>
  instructors.find((i) => i.slug === c.instructor)!;

export function Rating({ course }: { course: Course }) {
  return (
    <span className="rating">
      <Star size={14} aria-hidden fill="currentColor" />
      <span>
        {course.rating.toFixed(1)}{" "}
        <span className="muted">
          ({course.reviewCount.toLocaleString("en-US")})
        </span>
      </span>
      <span className="sr-only">average rating out of 5</span>
    </span>
  );
}

/** Catalogue row: a printed-index layout with cover, title, teacher and the facts people filter by. */
export function CourseRow({
  course,
  headingLevel = 2,
}: {
  course: Course;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="course-row">
      <img src={course.image} alt="" width={240} height={180} loading="lazy" />
      <div className="course-row-main">
        <H className="course-row-title">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </H>
        <p className="course-row-by">with {teacher(course).name}</p>
        <p className="course-row-summary">{course.summary}</p>
      </div>
      <dl className="course-row-facts">
        <div>
          <dt>Subject</dt>
          <dd>{course.subject}</dd>
        </div>
        <div>
          <dt>Level</dt>
          <dd>{course.level}</dd>
        </div>
        <div>
          <dt>Length</dt>
          <dd>
            {lessonCount(course)} lessons · {duration(courseMinutes(course))}
          </dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>
            <Rating course={course} />
          </dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd className="num">${course.price}</dd>
        </div>
      </dl>
    </article>
  );
}

/** Image-led tile for featured and related courses. */
export function CourseTile({
  course,
  large = false,
}: {
  course: Course;
  large?: boolean;
}) {
  return (
    <article
      className={large ? "course-tile course-tile-large" : "course-tile"}
    >
      <img
        src={course.image}
        alt={course.imageAlt}
        width={large ? 900 : 480}
        height={large ? 640 : 340}
        loading="lazy"
      />
      <div className="course-tile-body">
        <p className="course-tile-meta">
          {course.subject} · {course.level} · {duration(courseMinutes(course))}
        </p>
        <h3>
          <Link to={`/courses/${course.slug}`} className="stretched">
            {course.title}
          </Link>
        </h3>
        <p className="course-tile-by">with {teacher(course).name}</p>
        {large && <p className="course-tile-summary">{course.summary}</p>}
      </div>
    </article>
  );
}
