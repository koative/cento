import { useState } from "react";
import { Printer } from "lucide-react";
import { brand, resume } from "../content";
import { Code, Section } from "../components/Blocks";
import { formatMonth } from "../lib/format";

const views = ["Formatted", "resume.json", "Plain text"] as const;
type View = (typeof views)[number];

const span = (from: string, to: string) =>
  `${formatMonth(from)} – ${to === "present" ? "present" : formatMonth(to)}`;

function asJson() {
  return JSON.stringify(
    {
      basics: {
        name: brand.person,
        label: brand.role,
        email: brand.email,
        phone: brand.phone,
        location: brand.city,
        summary: resume.summary,
      },
      work: resume.experience.map((e) => ({
        name: e.org,
        position: e.title,
        startDate: e.from,
        endDate: e.to,
        highlights: e.changes,
      })),
      education: resume.education.map((e) => ({
        institution: e.org,
        studyType: e.title,
        years: e.years,
      })),
      skills: resume.skills.map((s) => ({ name: s.group, keywords: s.items })),
      talks: resume.talks,
      languages: resume.languages,
    },
    null,
    2,
  );
}

function asText() {
  const rule = "-".repeat(60);
  return [
    brand.person.toUpperCase(),
    `${brand.role} · ${brand.city} · ${brand.email}`,
    "",
    resume.summary,
    "",
    "EXPERIENCE",
    rule,
    ...resume.experience.flatMap((e) => [
      `${e.title}, ${e.org}`,
      `${span(e.from, e.to)} · ${e.place}`,
      ...e.changes.map((c) => `  - ${c}`),
      "",
    ]),
    "SKILLS",
    rule,
    ...resume.skills.map((s) => `${s.group}: ${s.items.join(", ")}`),
    "",
    "TALKS",
    rule,
    ...resume.talks.map((t) => `${t.year}  ${t.title} (${t.event})`),
    "",
    "EDUCATION",
    rule,
    ...resume.education.map((e) => `${e.years}  ${e.title}, ${e.org}`),
  ].join("\n");
}

export function Resume() {
  const [view, setView] = useState<View>("Formatted");

  return (
    <>
      <header className="page-head wrap resume-head">
        <h1>Résumé</h1>
        <p className="lead">{resume.summary}</p>
        <div className="toolbar no-print">
          <div className="segmented" role="group" aria-label="Résumé format">
            {views.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => window.print()}
          >
            <Printer size={16} aria-hidden="true" /> Print or save as PDF
          </button>
        </div>
      </header>

      {view === "Formatted" ? (
        <div className="resume">
          <Section title="Experience">
            <ol className="commits">
              {resume.experience.map((e) => (
                <li key={e.hash}>
                  <p className="commit-meta">
                    <code className="hash">{e.hash}</code> {span(e.from, e.to)}{" "}
                    · {e.place}
                  </p>
                  <h3>
                    {e.title}, <span className="org">{e.org}</span>
                  </h3>
                  <ul className="diff">
                    {e.changes.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>
          <Section title="Skills">
            <dl className="kv">
              {resume.skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>
          <Section title="Talks">
            <ul className="talks">
              {resume.talks.map((t) => (
                <li key={t.title}>
                  <span className="num">{t.year}</span>
                  <span>
                    {t.title}
                    <span className="muted"> · {t.event}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Education">
            <ul className="talks">
              {resume.education.map((e) => (
                <li key={e.title}>
                  <span className="num">{e.years}</span>
                  <span>
                    {e.title}
                    <span className="muted"> · {e.org}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="muted">Languages: {resume.languages.join(", ")}</p>
          </Section>
        </div>
      ) : (
        <div className="wrap resume-source">
          <Code
            file={view === "resume.json" ? "resume.json" : "resume.txt"}
            body={view === "resume.json" ? asJson() : asText()}
          />
        </div>
      )}
    </>
  );
}
