import { Link } from "../router";
import type { Grade } from "../content";
import { Blaze } from "./Marks";

export type Sign = { to: string; label: string; meta: string; grade?: Grade };

/** Trail fingerpost: a location plate on top, yellow arrows pointing to destinations. */
export function Signpost({
  here,
  signs,
  label,
}: {
  here: string;
  signs: Sign[];
  label: string;
}) {
  return (
    <nav className="signpost" aria-label={label}>
      <p className="signpost-here">{here}</p>
      <ul>
        {signs.map((s, i) => (
          <li
            key={s.to + i}
            style={{ ["--i" as string]: i }}
            data-dir={i % 2 ? "left" : "right"}
          >
            <Link to={s.to} className="sign">
              <span className="sign-label">{s.label}</span>
              <span className="sign-meta">{s.meta}</span>
              {s.grade && <Blaze grade={s.grade} label={false} />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
