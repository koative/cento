import { useRef, useState, type FormEvent } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Link } from "../router";
import { brand, games, press, statusLabel } from "../content";
import { SPRITES } from "../lib/pixels";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { MARK_COLORS, PixelArt } from "../components/PixelArt";
import { Scene } from "../components/Scene";

function downloadSvg(holder: HTMLElement | null, name: string) {
  const svg = holder?.querySelector("svg");
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const url = URL.createObjectURL(
    new Blob([clone.outerHTML], { type: "image/svg+xml" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const keyGames = games.filter((g) => g.status !== "free");
const COVERAGE = [
  "Review",
  "Preview",
  "Video or stream",
  "Feature or interview",
];

const marks = [
  {
    id: "mark-violet",
    label: "Mark on paper",
    colors: MARK_COLORS,
    bg: "paper",
  },
  {
    id: "mark-light",
    label: "Mark on ink",
    colors: { ...MARK_COLORS, h: "#f6efe2", d: "#c9bfe8", w: "#1d1631" },
    bg: "ink",
  },
];

export function Press() {
  const [copied, setCopied] = useState(false);
  const holders = useRef<Record<string, HTMLDivElement | null>>({});

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(press.boilerplate);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>{press.title}</h1>
        <p className="lede">{press.lede}</p>
        <p>
          Press contact: Rosa Mendel,{" "}
          <a href={`mailto:${brand.pressEmail}`}>{brand.pressEmail}</a>
        </p>
      </header>

      <section className="press-facts" aria-labelledby="facts-title">
        <div>
          <h2 id="facts-title">Fact sheet</h2>
          <dl className="spec-table">
            {press.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="boilerplate">
          <h2>About Arcade</h2>
          <p>{press.boilerplate}</p>
          <button type="button" className="btn btn-ghost" onClick={copy}>
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy boilerplate"}
          </button>
          <p className="sr-only" aria-live="polite">
            {copied ? "Boilerplate copied to the clipboard." : ""}
          </p>
        </div>
      </section>

      <section aria-labelledby="logos-title">
        <h2 id="logos-title">Logos</h2>
        <p className="section-note">
          The mark is Blob, drawn on a 12 by 10 grid. Scale it in whole
          multiples so the pixels stay square. The wordmark is set in Bungee.
        </p>
        <div className="logo-tiles">
          {marks.map((m) => (
            <figure key={m.id} className="logo-tile" data-bg={m.bg}>
              <div
                ref={(el) => void (holders.current[m.id] = el)}
                className="logo-tile-art"
              >
                <PixelArt
                  grid={SPRITES.blob}
                  colors={m.colors}
                  label={`${brand.name} mark, ${m.label.toLowerCase()}`}
                />
                <span className="logo-word" aria-hidden="true">
                  {brand.name}
                </span>
              </div>
              <figcaption>
                {m.label}
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() =>
                    downloadSvg(holders.current[m.id], `arcade-${m.id}.svg`)
                  }
                >
                  <Download aria-hidden="true" /> SVG
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="shots-title">
        <h2 id="shots-title">Key art and screenshots</h2>
        <p className="section-note">
          One image per game. Every game page has more, and every image
          downloads as a crisp SVG.
        </p>
        <div className="press-shots">
          {games.map((g) => (
            <figure key={g.slug}>
              <div
                ref={(el) => void (holders.current[g.slug] = el)}
                className="screen"
              >
                <Scene
                  game={g}
                  seed={g.shots[0].seed}
                  label={`${g.name}: ${g.shots[0].caption}`}
                />
              </div>
              <figcaption>
                <Link to={`/games/${g.slug}`}>{g.name}</Link>
                <span>
                  {statusLabel[g.status]} · {g.when}
                </span>
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() =>
                    downloadSvg(holders.current[g.slug], `${g.slug}.svg`)
                  }
                >
                  <Download aria-hidden="true" /> SVG
                  <span className="sr-only">, {g.name}</span>
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="press-quotes" aria-labelledby="quotes-title">
        <h2 id="quotes-title">Selected quotes and awards</h2>
        <ul>
          {games.flatMap((g) =>
            g.quotes.map((q) => (
              <li key={q.text}>
                <blockquote className="quote">
                  <p>{q.text}</p>
                  <footer>
                    {q.source}, on <Link to={`/games/${g.slug}`}>{g.name}</Link>
                  </footer>
                </blockquote>
              </li>
            )),
          )}
        </ul>
        <ul className="awards">
          {games.flatMap((g) => g.awards.map((a) => <li key={a}>{a}</li>))}
        </ul>
      </section>

      <KeyRequest />
    </div>
  );
}

function KeyRequest() {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{
    name: string;
    game: string;
    platform: string;
    email: string;
  } | null>(null);
  const [gameSlug, setGameSlug] = useState("");
  const game = keyGames.find((g) => g.slug === gameSlug);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Tell us your name so we know who the key is for.",
      email:
        "Enter a work email like you@outlet.example. Keys go to this address.",
      outlet:
        "Name the outlet, channel or publication you write or stream for.",
      link: "Paste a full link to your outlet or channel, starting with https://.",
      game: "Choose which game you'd like a key for.",
      platform:
        "Choose a platform. Only the platforms this game is on are listed.",
      coverage: "Pick the kind of coverage you're planning.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause();
    setSending(false);
    setDone({
      name: String(data.get("name")),
      email: String(data.get("email")),
      game: game!.name,
      platform: String(data.get("platform")),
    });
  };

  return (
    <section className="form-panel" aria-labelledby="keys-title">
      <div className="form-intro">
        <h2 id="keys-title">{press.keys.title}</h2>
        <p>{press.keys.text}</p>
        <p className="small">
          We answer within two working days. This is a demo form: nothing is
          sent anywhere.
        </p>
      </div>
      <div aria-live="polite">
        {done ? (
          <div className="success">
            <h3>Request received, {done.name.split(" ")[0]}.</h3>
            <p>
              A {done.platform} key for {done.game} is on its way to{" "}
              {done.email}, along with the press build notes. (Demo: no email
              was sent and no key was issued.)
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setDone(null);
                setGameSlug("");
              }}
            >
              Request another key
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form-grid"
            aria-busy={sending}
          >
            <Field
              label="Your name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            <Field
              label="Work email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@outlet.example"
              error={errors.email}
            />
            <Field
              label="Outlet or channel"
              name="outlet"
              required
              autoComplete="organization"
              error={errors.outlet}
            />
            <Field
              label="Link to your work"
              name="link"
              type="url"
              required
              placeholder="https://"
              error={errors.link}
            />
            <Field label="Game" name="game" error={errors.game}>
              <select
                required
                value={gameSlug}
                onChange={(e) => setGameSlug(e.target.value)}
              >
                <option value="">Choose a game</option>
                {keyGames.map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.name}
                    {g.status === "soon" ? " (preview build)" : ""}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Platform"
              name="platform"
              error={errors.platform}
              hint={game ? undefined : "Pick a game first."}
            >
              <select required disabled={!game} key={gameSlug} defaultValue="">
                <option value="">Choose a platform</option>
                {game?.platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset
              className="field field-wide radio-row"
              data-invalid={errors.coverage ? "" : undefined}
            >
              <legend>Planned coverage</legend>
              {COVERAGE.map((c) => (
                <label key={c} className="chip">
                  <input
                    type="radio"
                    name="coverage"
                    value={c}
                    required
                    aria-describedby={
                      errors.coverage ? "f-coverage-err" : undefined
                    }
                  />
                  <span>{c}</span>
                </label>
              ))}
              {errors.coverage && (
                <p className="field-error" id="f-coverage-err">
                  {errors.coverage}
                </p>
              )}
            </fieldset>
            <Field
              label="Anything else? (optional)"
              name="notes"
              className="field-wide"
            >
              <textarea
                rows={3}
                placeholder="Embargo questions, accessibility needs, a co-host who also needs a key…"
              />
            </Field>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={sending}
            >
              {sending ? "Sending request…" : "Request key"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
