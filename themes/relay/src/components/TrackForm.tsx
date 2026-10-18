import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { navigate } from "../router";
import { shipments } from "../content";

/** Accepts "rly 4821 0937", "RLY48210937" or the canonical RLY-4821-0937. */
function normalise(raw: string) {
  const digits = raw
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .replace(/^RLY/, "");
  return /^\d{8}$/.test(digits)
    ? `RLY-${digits.slice(0, 4)}-${digits.slice(4)}`
    : null;
}

export function TrackForm({
  initial = "",
  compact,
}: {
  initial?: string;
  compact?: boolean;
}) {
  const id = useId();
  const [value, setValue] = useState(initial);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const code = normalise(value);
    if (!value.trim())
      return setError("Enter a tracking number, for example RLY-4821-0937.");
    if (!code)
      return setError(
        "Relay numbers look like RLY-0000-0000: three letters and eight digits.",
      );
    if (!shipments.some((s) => s.id === code))
      return setError(
        `${code} is not in this demo. Try one of the sample numbers.`,
      );
    setError("");
    navigate(`/track/${code}`);
  }

  return (
    <form
      className={`track-form ${compact ? "is-compact" : ""}`}
      onSubmit={submit}
      noValidate
      role="search"
      aria-label="Track a shipment"
    >
      <label htmlFor={id}>Tracking number</label>
      <div className="track-row">
        <input
          id={id}
          name="tracking"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          placeholder="RLY-0000-0000"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
        />
        <button className="btn btn-primary">
          Track <ArrowRight size={18} aria-hidden />
        </button>
      </div>
      <p className="field-error" id={`${id}-err`} aria-live="polite">
        {error}
      </p>
    </form>
  );
}
