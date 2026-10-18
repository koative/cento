import type { SampleField, Step, Template } from "../content";
import { ruleText } from "../lib/flow";
import { Link } from "../router";
import { ConnectorMark } from "./Marks";

/** Compact, read-only step run used on template tiles. */
export function StepList({
  steps,
  sample,
}: {
  steps: Step[];
  sample: SampleField[];
}) {
  return (
    <ol className="step-list">
      {steps.map((s) => (
        <li key={s.id} data-kind={s.kind}>
          <ConnectorMark slug={s.app} size={24} />
          <span>{s.rule ? ruleText(s.rule, sample) : s.title}</span>
        </li>
      ))}
    </ol>
  );
}

/** A template in a gallery row; the whole tile links to its page. */
export function TemplateTile({
  t,
  detailed = false,
}: {
  t: Template;
  detailed?: boolean;
}) {
  const Heading = detailed ? "h2" : "h3";
  return (
    <li className="template-tile">
      <Heading>
        <Link to={`/templates/${t.slug}`} className="stretch">
          {t.name}
        </Link>
      </Heading>
      <span className="tile-team">
        {t.team}
        {detailed && ` · ${t.setupMinutes} min setup`}
      </span>
      {detailed && <p>{t.summary}</p>}
      <StepList steps={t.steps} sample={t.sample} />
    </li>
  );
}
