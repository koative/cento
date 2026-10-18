import { useEffect, useState, type DragEvent, type KeyboardEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Link } from "../router";
import { app, owners, stages, type Deal, type StageId } from "../content";
import {
  addDeal,
  isOpen,
  moveDeal,
  probability,
  useWorkspace,
} from "../lib/store";
import { daysBetween, money, short, shortDate } from "../lib/format";
import { Field, useForm } from "../components/form";

const order = stages.map((s) => s.id);
const label = (id: StageId) => stages.find((s) => s.id === id)!.label;

function NewDeal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (company: string) => void;
}) {
  const form = useForm(
    {
      company: "",
      title: "",
      value: "",
      owner: owners.find((o) => o.id === app.me)!.name,
      close: "2026-12-18",
    },
    (v) => ({
      company: v.company.trim() ? undefined : "Enter the buying company.",
      title: v.title.trim()
        ? undefined
        : "Name the deal, e.g. “Pilot, 4 printers”.",
      value: !v.value
        ? "Enter the deal value in dollars."
        : !(Number(v.value) > 0)
          ? "Value must be a number above zero, without the $ sign."
          : undefined,
      close: !v.close
        ? "Pick an expected close date."
        : v.close < app.today
          ? "Close date can't be in the past."
          : undefined,
    }),
    (v) => {
      addDeal({
        company: v.company.trim(),
        title: v.title.trim(),
        value: Math.round(Number(v.value)),
        owner: owners.find((o) => o.name === v.owner)!.id,
        close: v.close,
        stage: "lead",
        forecast: "omit",
        contactId: "",
        next: "Qualify budget and timing",
      });
      onAdded(v.company.trim());
    },
  );

  return (
    <form
      className="sheet new-deal"
      onSubmit={form.submit}
      noValidate
      aria-labelledby="h-new"
    >
      <div className="new-deal-head">
        <h2 id="h-new">New deal in Lead in</h2>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close new deal form"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <div className="new-deal-fields">
        <Field form={form} name="company" label="Company" required />
        <Field form={form} name="title" label="Deal name" required />
        <Field
          form={form}
          name="value"
          label="Value (USD)"
          inputMode="numeric"
          required
        />
        <Field
          form={form}
          name="owner"
          label="Owner"
          options={owners.map((o) => o.name)}
        />
        <Field
          form={form}
          name="close"
          label="Expected close"
          type="date"
          min={app.today}
          required
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={form.status === "sending"}
        aria-busy={form.status === "sending"}
      >
        {form.status === "sending" ? "Adding…" : "Add deal"}
      </button>
    </form>
  );
}

function Card({
  deal,
  fresh,
  onMove,
}: {
  deal: Deal;
  fresh: boolean;
  onMove: (id: string, to: StageId) => void;
}) {
  const owner = owners.find((o) => o.id === deal.owner)!;
  const i = order.indexOf(deal.stage);
  const prev = order[i - 1];
  const next = order[i + 1];
  const quiet = isOpen(deal) && daysBetween(deal.close, app.today) > 0;

  function onKey(e: KeyboardEvent<HTMLLIElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowLeft" && prev)
      (e.preventDefault(), onMove(deal.id, prev));
    if (e.key === "ArrowRight" && next)
      (e.preventDefault(), onMove(deal.id, next));
  }

  return (
    <li
      id={`card-${deal.id}`}
      className="card deal-card"
      data-fresh={fresh ? "" : undefined}
      draggable
      tabIndex={0}
      aria-label={`${deal.company}, ${deal.title}, ${money(deal.value)}, ${label(deal.stage)}. Arrow keys move between stages.`}
      onKeyDown={onKey}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", deal.id);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      {deal.contactId ? (
        <Link to={`/app/contacts/${deal.contactId}`} className="card-co">
          {deal.company}
        </Link>
      ) : (
        <strong className="card-co">{deal.company}</strong>
      )}
      <span className="card-title">{deal.title}</span>
      <span className="card-next">
        {quiet && <Clock size={13} aria-label="Past close date" />}
        {deal.next}
      </span>
      <span className="card-foot">
        <span className="num card-value">{money(deal.value)}</span>
        <span className="card-date">{shortDate(deal.close)}</span>
        <span className="avatar" title={owner.name}>
          {owner.initials}
        </span>
      </span>
      <span className="card-moves">
        <button
          type="button"
          className="icon-btn"
          disabled={!prev}
          onClick={() => prev && onMove(deal.id, prev)}
          aria-label={
            prev
              ? `Move ${deal.company} back to ${label(prev)}`
              : "Already in the first stage"
          }
        >
          <ChevronLeft size={16} aria-hidden />
        </button>
        <button
          type="button"
          className="icon-btn"
          disabled={!next}
          onClick={() => next && onMove(deal.id, next)}
          aria-label={
            next
              ? `Move ${deal.company} to ${label(next)}`
              : "Already in the last stage"
          }
        >
          <ChevronRight size={16} aria-hidden />
        </button>
      </span>
      {deal.stage === "won" && <span className="stamp stamp-won">Won</span>}
      {deal.stage === "lost" && <span className="stamp stamp-lost">Lost</span>}
    </li>
  );
}

export default function AppBoard() {
  const { deals } = useWorkspace();
  const [owner, setOwner] = useState("all");
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [over, setOver] = useState<StageId | null>(null);
  const [moved, setMoved] = useState<{
    id: string;
    n: number;
    keyboard: boolean;
  } | null>(null);
  const [message, setMessage] = useState("");

  const q = query.trim().toLowerCase();
  const visible = deals.filter(
    (d) =>
      (owner === "all" || d.owner === owner) &&
      (!q || `${d.company} ${d.title}`.toLowerCase().includes(q)),
  );
  const open = visible.filter(isOpen);
  const total = open.reduce((n, d) => n + d.value, 0);
  const weighted = open.reduce((n, d) => n + d.value * probability(d.stage), 0);
  const won = visible
    .filter((d) => d.stage === "won")
    .reduce((n, d) => n + d.value, 0);

  // Keyboard moves remount the card in its new column; put focus back on it.
  useEffect(() => {
    if (moved?.keyboard) document.getElementById(`card-${moved.id}`)?.focus();
  }, [moved]);

  function move(id: string, to: StageId, keyboard = true) {
    const deal = deals.find((d) => d.id === id);
    if (!deal || deal.stage === to) return;
    moveDeal(id, to);
    const column = deals
      .filter((d) => d.id === id || d.stage === to)
      .reduce((n, d) => n + d.value, 0);
    setMoved({ id, n: Date.now(), keyboard });
    setMessage(
      `${deal.company} moved to ${label(to)}. ${label(to)} now holds ${money(column)}.`,
    );
  }

  function drop(e: DragEvent<HTMLElement>, to: StageId) {
    e.preventDefault();
    setOver(null);
    move(e.dataTransfer.getData("text/plain"), to, false);
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Deals board</h1>
          <p className="app-sub">
            {app.quarter} · open {money(total)} · weighted {money(weighted)} ·
            won {money(won)}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setAdding((a) => !a)}
          aria-expanded={adding}
        >
          <Plus size={18} aria-hidden /> New deal
        </button>
      </header>

      {adding && (
        <NewDeal
          onClose={() => setAdding(false)}
          onAdded={(company) => {
            setAdding(false);
            setMessage(`${company} added to Lead in.`);
          }}
        />
      )}

      <div className="toolbar">
        <div className="field field-inline">
          <label htmlFor="owner">Owner</label>
          <select
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <option value="all">All reps</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="search">
          <Search size={16} aria-hidden />
          <label htmlFor="deal-q" className="sr-only">
            Search deals
          </label>
          <input
            id="deal-q"
            type="search"
            placeholder="Search company or deal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="board-hint">
          Drag a card, or focus it and use the arrow keys
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {message}
      </p>

      <div
        className="board"
        role="region"
        aria-label="Deals by stage"
        tabIndex={-1}
      >
        {stages.map((s) => {
          const list = visible.filter((d) => d.stage === s.id);
          const sum = list.reduce((n, d) => n + d.value, 0);
          return (
            <section
              key={s.id}
              className="column"
              data-stage={s.id}
              data-over={over === s.id ? "" : undefined}
              aria-labelledby={`col-${s.id}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(s.id);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setOver(null);
              }}
              onDrop={(e) => drop(e, s.id)}
            >
              <header className="column-head">
                <h2 id={`col-${s.id}`}>
                  {s.label} <span className="num">{list.length}</span>
                </h2>
                <p className="num">
                  {short(sum)}
                  {s.id !== "won" && s.id !== "lost" && (
                    <span> · wtd {short(sum * s.probability)}</span>
                  )}
                </p>
              </header>
              {list.length ? (
                <ul>
                  {list.map((d) => (
                    <Card
                      key={d.id}
                      deal={d}
                      fresh={moved?.id === d.id}
                      onMove={move}
                    />
                  ))}
                </ul>
              ) : (
                <p className="column-empty">
                  {q || owner !== "all"
                    ? "No matching deals"
                    : "Drop a deal here"}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
