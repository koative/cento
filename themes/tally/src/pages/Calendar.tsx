import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Link } from "../router";
import { calendarNote, salesFreqs, structures } from "../content";
import {
  applies,
  defaultProfile,
  downloadIcs,
  monthKey,
  monthsAhead,
  saveProfile,
  upcoming,
  useSavedProfile,
  type Profile,
} from "../lib/deadlines";
import { fmt, inDays } from "../lib/format";
import { DeadlineRows } from "../components/Bits";
import { TallyCount } from "../components/Marks";

export function Calendar() {
  const saved = useSavedProfile();
  const [profile, setProfile] = useState<Profile>(saved ?? defaultProfile);
  const update = (patch: Partial<Profile>) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    saveProfile(next);
  };

  const items = upcoming((r) => applies(r, profile));
  const next = items[0];
  const months = monthsAhead().map((m) => ({
    month: m,
    items: items.filter((d) => monthKey(d.date) === monthKey(m)),
  }));
  const thisMonth = monthKey(new Date());

  const exportIcs = () =>
    downloadIcs(
      "tally-tax-calendar.ics",
      items.map((d) => ({
        uid: d.key,
        start: d.date,
        allDay: true,
        title: `${d.rule.title} (${d.rule.forms})`,
        description: `${d.rule.detail} Built with the Tally tax calendar — illustrative, confirm with your accountant.`,
      })),
    );

  return (
    <>
      <header className="page-head wrap">
        <h1>Tax deadline calendar</h1>
        <p className="lede">
          Tell us how your business is set up. We'll tally every federal filing
          and payment for the next twelve months, drop the ones that don't apply
          to you, and put them in your calendar.
        </p>
      </header>

      <div className="wrap cal-grid">
        <form
          className="cal-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Your business"
        >
          <fieldset>
            <legend>How is the business set up?</legend>
            {structures.map((s) => (
              <label key={s.id} className="choice">
                <input
                  type="radio"
                  name="structure"
                  checked={profile.structure === s.id}
                  onChange={() => update({ structure: s.id })}
                />
                <span>
                  {s.label}
                  <small>{s.hint}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Who do you pay?</legend>
            <label className="choice is-check">
              <input
                type="checkbox"
                checked={profile.payroll}
                onChange={(e) => update({ payroll: e.target.checked })}
              />
              <span>
                Employees on payroll
                <small>Including yourself, if you're an S corp owner</small>
              </span>
            </label>
            <label className="choice is-check">
              <input
                type="checkbox"
                checked={profile.contractors}
                onChange={(e) => update({ contractors: e.target.checked })}
              />
              <span>
                Independent contractors
                <small>Freelancers, subs and anyone you'd send a 1099</small>
              </span>
            </label>
          </fieldset>

          <fieldset>
            <legend>How often do you file sales tax?</legend>
            <div className="segmented is-small">
              {salesFreqs.map((f) => (
                <label key={f.id}>
                  <input
                    type="radio"
                    name="sales"
                    checked={profile.salesTax === f.id}
                    onChange={() => update({ salesTax: f.id })}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="fine">
            Saved on this device only, so the header can show your next date.
          </p>
        </form>

        <div className="cal-result">
          <p className="sr-only" aria-live="polite">
            {items.length} deadlines in the next twelve months
            {next ? `, the next on ${fmt.long.format(next.date)}` : ""}.
          </p>

          {next && (
            <section className="next-due" aria-labelledby="nd-title">
              <time
                dateTime={next.date.toISOString().slice(0, 10)}
                className="nd-date"
              >
                <span>{fmt.month.format(next.date)}</span>
                {next.date.getDate()}
              </time>
              <div>
                <p className="nd-count">{inDays(next.days)}</p>
                <h2 id="nd-title">{next.rule.title}</h2>
                <p>
                  {next.rule.forms} — {next.rule.detail}
                </p>
              </div>
            </section>
          )}

          <section className="year-strip" aria-labelledby="ys-h">
            <div className="ys-head">
              <h2 id="ys-h">
                {items.length} dates across the next twelve months
              </h2>
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={exportIcs}
                disabled={!items.length}
              >
                <CalendarPlus aria-hidden="true" /> Add all to my calendar
                (.ics)
              </button>
            </div>
            <ol className="ys-months">
              {months.map(({ month, items: m }) => (
                <li
                  key={monthKey(month)}
                  data-current={monthKey(month) === thisMonth ? "" : undefined}
                  data-empty={m.length ? undefined : ""}
                >
                  <button
                    type="button"
                    disabled={!m.length}
                    onClick={() =>
                      document
                        .getElementById(`m-${monthKey(month)}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    aria-label={`${fmt.monthYear.format(month)}: ${m.length || "no"} ${m.length === 1 ? "deadline" : "deadlines"}`}
                  >
                    <span className="ys-name">{fmt.month.format(month)}</span>
                    <TallyCount
                      count={m.length}
                      key={`${monthKey(month)}-${m.length}`}
                    />
                    <span className="ys-n">{m.length || "–"}</span>
                  </button>
                </li>
              ))}
            </ol>
          </section>

          {months
            .filter((m) => m.items.length)
            .map(({ month, items: m }) => (
              <section
                key={monthKey(month)}
                id={`m-${monthKey(month)}`}
                className="cal-month"
                aria-labelledby={`mh-${monthKey(month)}`}
              >
                <h2 id={`mh-${monthKey(month)}`}>
                  {fmt.monthYear.format(month)}
                </h2>
                <DeadlineRows items={m} />
              </section>
            ))}

          <div className="cal-foot">
            <p className="fine">{calendarNote}</p>
            <Link to="/book" className="btn btn-primary">
              Have an accountant check your dates
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
