import { kindLabel, type SampleField, type Step } from "../content";
import { connector, ruleText, type StepState } from "../lib/flow";
import { ConnectorMark } from "./Marks";

const badge: Partial<Record<StepState, string>> = {
  active: "Running",
  done: "Done",
  stopped: "Stopped here",
  skipped: "Skipped",
};

type Props = {
  steps: Step[];
  sample: SampleField[];
  states: StepState[] | null;
  selected?: string;
  onSelect?: (id: string) => void;
};

/** The signature: a vertical run of steps joined by wires; a pulse travels the wire into the step being run. */
export function FlowCanvas({
  steps,
  sample,
  states,
  selected,
  onSelect,
}: Props) {
  return (
    <ol className="flow">
      {steps.map((s, i) => {
        const state = states?.[i] ?? "idle";
        const app = connector(s.app)?.name ?? "Flux";
        const body = (
          <>
            <ConnectorMark slug={s.app} />
            <span className="node-text">
              <span className="node-kind">
                {kindLabel[s.kind]} · {app}
              </span>
              <span className="node-title">
                {s.rule ? ruleText(s.rule, sample) : s.title}
              </span>
            </span>
            {badge[state] && <span className="node-badge">{badge[state]}</span>}
          </>
        );
        return (
          <li
            key={s.id}
            className="flow-item"
            data-state={state}
            data-kind={s.kind}
          >
            {i > 0 && <span className="wire" aria-hidden="true" />}
            {onSelect ? (
              <button
                type="button"
                className="node"
                aria-pressed={selected === s.id}
                onClick={() => onSelect(s.id)}
              >
                {body}
              </button>
            ) : (
              <div className="node">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
