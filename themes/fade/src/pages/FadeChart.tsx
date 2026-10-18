import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Link } from "../router";
import { fadeChartPage, services, type Chart } from "../content";
import {
  blendGuards,
  describe,
  guards,
  heights,
  serviceFor,
  startGuards,
} from "../lib/fade";
import { duration, money } from "../lib/format";
import { FadeStrip } from "../components/FadeStrip";
import { PageHead } from "../components/PageHead";

type Option = { value: string; label: string };

function Segmented({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="segmented">
      <legend>{legend}</legend>
      <div className="seg-row">
        {options.map((o) => (
          <label key={o.value} className="seg">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const guardOptions = (ids: string[]) =>
  ids.map((id) => ({
    value: id,
    label: guards.find((g) => g.id === id)!.label,
  }));

function initialChart(): Chart {
  const id = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "preset",
  );
  return (
    fadeChartPage.presets.find((p) => p.id === id) ?? fadeChartPage.presets[1]
  ).chart;
}

export function FadeChart() {
  const [chart, setChart] = useState<Chart>(initialChart);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const set = (patch: Partial<Chart>) => {
    setChart((c) => ({ ...c, ...patch }));
    setCopied("idle");
  };

  const text = describe(chart);
  const service = services.find((s) => s.id === serviceFor(chart))!;
  const preset = fadeChartPage.presets.find(
    (p) => JSON.stringify(p.chart) === JSON.stringify(chart),
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  };

  return (
    <>
      <PageHead title={fadeChartPage.title} intro={fadeChartPage.intro}>
        <div className="presets" role="group" aria-label="Start from a classic">
          {fadeChartPage.presets.map((p) => (
            <button
              key={p.id}
              type="button"
              className="chip"
              aria-pressed={preset?.id === p.id}
              onClick={() => set(p.chart)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </PageHead>

      <div className="wrap chart-tool">
        <form
          className="chart-controls"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Describe your fade"
        >
          <Segmented
            legend="Where the fade sits"
            name="height"
            options={heights.map((h) => ({ value: h.id, label: h.label }))}
            value={chart.height}
            onChange={(v) => set({ height: v as Chart["height"] })}
          />
          <Segmented
            legend="Shortest, at the neckline"
            name="start"
            options={guardOptions(startGuards)}
            value={chart.start}
            onChange={(v) => set({ start: v })}
          />
          <Segmented
            legend="Blended up to"
            name="blend"
            options={guardOptions(blendGuards)}
            value={chart.blend}
            onChange={(v) => set({ blend: v })}
          />

          <div className="range-field">
            <label htmlFor="top-length">
              Length on top <output htmlFor="top-length">{chart.top} in</output>
            </label>
            <input
              id="top-length"
              type="range"
              min="0.25"
              max="4"
              step="0.25"
              value={chart.top}
              aria-valuetext={`${chart.top} inches`}
              onChange={(e) => set({ top: Number(e.target.value) })}
            />
            <p className="range-ends" aria-hidden="true">
              <span>Cropped</span>
              <span>Long enough to tie back</span>
            </p>
          </div>

          <Segmented
            legend="Hairline"
            name="lineup"
            options={[
              { value: "natural", label: "Natural" },
              { value: "sharp", label: "Sharp line-up" },
            ]}
            value={chart.lineup}
            onChange={(v) => set({ lineup: v as Chart["lineup"] })}
          />
          <Segmented
            legend="Beard"
            name="beard"
            options={[
              { value: "none", label: "No beard" },
              { value: "trim", label: "Trim" },
              { value: "blend", label: "Fade it in" },
            ]}
            value={chart.beard}
            onChange={(v) => set({ beard: v as Chart["beard"] })}
          />
          <label className="check">
            <input
              type="checkbox"
              checked={chart.part}
              onChange={(e) => set({ part: e.target.checked })}
            />
            <span>Hard part shaved in on the side</span>
          </label>
        </form>

        <div className="chart-out">
          <div className="chart-drawing">
            <FadeStrip chart={chart} />
          </div>
          <section className="say-it" aria-labelledby="say-title">
            <h2 id="say-title">Say this to your barber</h2>
            <p className="say-text" aria-live="polite">
              {text}
            </p>
            <p className="say-service">
              Books as <strong>{service.name}</strong> · {money(service.price)}{" "}
              · {duration(service.minutes)}
            </p>
            <div className="actions">
              <Link
                to={`/book?service=${service.id}&note=${encodeURIComponent(text)}`}
                className="btn btn-red"
              >
                Book this cut
              </Link>
              <button type="button" className="btn btn-line" onClick={copy}>
                {copied === "done" ? (
                  <Check aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                {copied === "done" ? "Copied" : "Copy the words"}
              </button>
            </div>
            <p className="copy-note" aria-live="polite">
              {copied === "failed" &&
                "Your browser blocked copying. Select the description above and copy it by hand."}
            </p>
          </section>
        </div>
      </div>

      <section className="wrap guard-key" aria-labelledby="key-title">
        <h2 id="key-title">The guard numbers, in real lengths</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Guard</th>
              {guards.map((g) => (
                <th scope="col" key={g.id}>
                  {g.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Length</th>
              {guards.map((g) => (
                <td key={g.id}>{g.mm ? `${g.mm} mm` : "0"}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
