import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  directory,
  images,
  notices,
  perks,
  stories,
  type Notice,
} from "../content";
import { validate } from "../lib";
import { Field, useErrors } from "../components/Field";

const tags: Notice["tag"][] = ["Wanted", "Offered", "Clubs", "Free"];

export function Community() {
  const [board, setBoard] = useState<Notice[]>(notices);
  const [tag, setTag] = useState<Notice["tag"] | "all">("all");
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState("");
  const { errors, setErrors, onChange } = useErrors();

  const shownNotices = board.filter((n) => tag === "all" || n.tag === tag);
  const q = query.trim().toLowerCase();
  const shownMembers = directory.filter(
    (m) => !q || `${m.name} ${m.trade} ${m.where}`.toLowerCase().includes(q),
  );

  const pin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      title: "Give the notice a short title, like “Spare monitor”.",
      body: "Add a line or two so people know what you're after (at least 10 characters).",
      from: "Sign it with your name or business so people can find you.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const d = new FormData(form);
    const notice: Notice = {
      id: `mine-${Date.now()}`,
      title: String(d.get("title")),
      body: String(d.get("body")),
      from: String(d.get("from")),
      tag: d.get("tag") as Notice["tag"],
    };
    setBoard((b) => [notice, ...b]);
    setTag("all");
    setPinned(notice.title);
    form.reset();
  };

  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>The people in the building</h1>
          <p className="lede">
            Nine hundred members: designers, lawyers, novelists, a podcast
            studio, two architects and a bike co-op. Most of the good things
            that happen here start at the kitchen counter.
          </p>
        </div>
        <img
          className="head-image"
          src={images.deskTop.src}
          alt={images.deskTop.alt}
          width={images.deskTop.w}
          height={images.deskTop.h}
        />
      </header>

      <section className="wrap section stories" aria-labelledby="stories-title">
        <h2 id="stories-title" className="sr-only">
          Member stories
        </h2>
        {stories.map((s) => (
          <figure key={s.name} className="quote">
            <blockquote>
              <p>{s.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{s.name}</strong>
              {s.business} · {s.plan}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="corkboard band" aria-labelledby="board-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="board-title">The notice board</h2>
              <p>
                What's on the board by the kitchen at every house this week. Pin
                your own; it stays up for a fortnight.
              </p>
            </div>
            <div className="chips" role="group" aria-label="Filter notices">
              {(["all", ...tags] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  className="chip"
                  aria-pressed={tag === t}
                  onClick={() => setTag(t)}
                >
                  {t === "all" ? "Everything" : t}
                </button>
              ))}
            </div>
          </div>
          <div className="notice-layout">
            <ul className="notices">
              {shownNotices.map((n) => (
                <li
                  key={n.id}
                  className="notice"
                  data-tag={n.tag}
                  data-new={n.id.startsWith("mine-") ? "" : undefined}
                >
                  <span className="tag">{n.tag}</span>
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                  <p className="notice-from">{n.from}</p>
                </li>
              ))}
            </ul>
            <form
              className="form pin-form"
              noValidate
              onSubmit={pin}
              onChange={onChange}
            >
              <h3>Pin a notice</h3>
              <Field
                label="Title"
                name="title"
                required
                maxLength={40}
                error={errors.title}
              />
              <Field label="Details" name="body" error={errors.body}>
                <textarea required minLength={10} maxLength={180} rows={3} />
              </Field>
              <Field label="Type" name="tag">
                <select defaultValue="Wanted">
                  {tags.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="From"
                name="from"
                required
                autoComplete="organization"
                error={errors.from}
              />
              <button type="submit" className="btn btn-accent btn-block">
                Pin it up
              </button>
              <p className="news-done" aria-live="polite">
                {pinned &&
                  `“${pinned}” is on the board. Only you can see it in this demo.`}
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="dir-title">
        <div className="section-head">
          <h2 id="dir-title">Member directory</h2>
          <div className="field field-inline">
            <label htmlFor="dir-search">Search</label>
            <input
              id="dir-search"
              type="search"
              value={query}
              placeholder="Design, legal, Harbour Row…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="sign directory directory-full">
          <table>
            <caption className="sr-only">
              Members by trade and where to find them
            </caption>
            <thead>
              <tr>
                <th scope="col">Member</th>
                <th scope="col">Trade</th>
                <th scope="col">Find them</th>
              </tr>
            </thead>
            <tbody>
              {shownMembers.map((m) => (
                <tr key={m.name}>
                  <th scope="row">{m.name}</th>
                  <td>{m.trade}</td>
                  <td>{m.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="directory-count" aria-live="polite">
            {shownMembers.length
              ? `${shownMembers.length} listed`
              : `Nobody matches “${query}” yet. Try a trade or a house name.`}
          </p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="perks-title">
        <h2 id="perks-title">Small things that add up</h2>
        <dl className="perks">
          {perks.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          <Link to="/events" className="text-link">
            See this month's events <ArrowRight aria-hidden="true" />
          </Link>
        </p>
      </section>
    </>
  );
}
