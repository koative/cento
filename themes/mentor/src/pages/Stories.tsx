import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  formats,
  programmes,
  stories,
  storiesPage,
  type Format,
} from "../content";
import { StoryQuote } from "../components/StoryQuote";

export function Stories() {
  const [format, setFormat] = useState<Format | "all">("all");
  const formatOf = (programme: string) =>
    programmes.find((p) => p.slug === programme)!.format;
  const list = stories.filter(
    (s) => format === "all" || formatOf(s.programme) === format,
  );
  const withPhoto = list.filter((s) => s.photo);
  const words = list.filter((s) => !s.photo);

  return (
    <div className="page stories">
      <header className="page-head wrap">
        <h1>{storiesPage.title}</h1>
        <p className="lede">{storiesPage.intro}</p>
      </header>

      <div className="wrap filters" role="group" aria-label="Filter stories">
        <div className="chips" role="group" aria-label="Programme format">
          {(["all", ...formats] as const).map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={format === f}
              onClick={() => setFormat(f)}
            >
              {f === "all" ? "Every programme" : f}
            </button>
          ))}
        </div>
      </div>
      <p className="wrap result-count" aria-live="polite">
        {list.length === 1 ? "1 story" : `${list.length} stories`}
      </p>

      <section className="wrap story-list" aria-label="Stories with photos">
        {withPhoto.map((s) => (
          <StoryQuote key={s.id} s={s} />
        ))}
      </section>

      {words.length > 0 && (
        <section className="wrap story-words" aria-labelledby="words-h">
          <h2 id="words-h">In a sentence or two</h2>
          <div className="words-grid">
            {words.map((s) => (
              <StoryQuote key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <aside className="wrap unsure">
        <h2>Your story starts with a short application.</h2>
        <p>
          Eight minutes, four steps. I reply to every one within three working
          days.
        </p>
        <Link to="/apply" className="btn btn-ink">
          Apply for coaching <ArrowRight aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
