import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { board, locations, roomPolicies, rooms } from "../content";
import {
  bookedFor,
  hhmm,
  isoDate,
  longDate,
  maxLength,
  money,
  pause,
  reference,
  slots,
  validate,
  type Booking,
} from "../lib";
import { RoomBoard, type Pick } from "../components/RoomBoard";
import { FloorPlan } from "../components/FloorPlan";
import { Field, useErrors } from "../components/Field";

const LUNCH = 14;
const MEMBER_OFF = 0.2;

/** ?room=loom&start=10 or ?location=harbour-row, from links elsewhere on the site. */
function initial() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const room = rooms.find((r) => r.id === q.get("room"));
  const location =
    room?.locationId ??
    locations.find((l) => l.id === q.get("location"))?.id ??
    locations[0].id;
  const start = Number(q.get("start"));
  return {
    room,
    location,
    start: start >= board.open && start < board.close ? start : null,
  };
}

export function Rooms() {
  const [init] = useState(initial);
  const [locationId, setLocationId] = useState(init.location);
  const [dayIndex, setDayIndex] = useState(0);
  const [headcount, setHeadcount] = useState(
    init.room ? Math.min(4, init.room.capacity) : 2,
  );
  const [mine, setMine] = useState<Booking[]>([]);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (confirmed) confirmRef.current?.scrollIntoView({ block: "nearest" });
  }, [confirmed]);
  const [member, setMember] = useState(false);
  const [lunch, setLunch] = useState(false);
  const { errors, setErrors, onChange } = useErrors();

  const now = new Date();
  const dates = Array.from(
    { length: 10 },
    (_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + i),
  );
  const date = dates[dayIndex];
  const cutoff =
    dayIndex === 0 ? now.getHours() + (now.getMinutes() >= 30 ? 1 : 0.5) : 0;
  const location = locations.find((l) => l.id === locationId) ?? locations[0];
  const here = rooms.filter((r) => r.locationId === location.id);

  const busyFor = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)!;
    const yours = mine
      .filter((b) => b.roomId === roomId && b.date === isoDate(date))
      .map((b): [number, number] => [b.start, b.end]);
    return [...bookedFor(room, date), ...yours];
  };

  const startPick = (roomId: string, start: number, length = 1): Pick => ({
    roomId,
    start,
    length: Math.min(length, maxLength(busyFor(roomId), start)),
  });

  const [pick, setPick] = useState<Pick | null>(() => {
    if (!init.room || init.start === null) return null;
    const busy = bookedFor(init.room, date);
    const free =
      init.start >= cutoff &&
      !busy.some(([s, e]) => init.start! >= s && init.start! < e);
    return free ? startPick(init.room.id, init.start) : null;
  });
  const [focusRoom, setFocusRoom] = useState(init.room?.id ?? "");

  const room = rooms.find((r) => r.id === (pick?.roomId ?? focusRoom)) ?? null;
  const tooSmall = new Set(
    here.filter((r) => r.capacity < headcount).map((r) => r.id),
  );
  const hours = pick?.length ?? 0;
  const roomCost = room ? hours * room.rate * (member ? 1 - MEMBER_OFF : 1) : 0;
  const lunchCost = lunch ? LUNCH * headcount : 0;

  const choose = (roomId: string, start: number) => {
    setPick(startPick(roomId, start, pick?.length ?? 1));
    setFocusRoom(roomId);
    setConfirmed(null);
    setErrors(({ slot: _, ...rest }) => rest);
  };

  /** Clicking a room on the plan: pick its first free hour from the cutoff on. */
  const chooseFromPlan = (id: string) => {
    if (!here.some((r) => r.id === id)) return;
    setFocusRoom(id);
    const busy = busyFor(id);
    const start = slots.find(
      (t) => t >= cutoff && !busy.some(([s, e]) => t >= s && t < e),
    );
    if (start !== undefined) choose(id, start);
  };

  const reset = (next: () => void) => {
    next();
    setPick(null);
    setConfirmed(null);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(
      form,
      {
        name: "Add the name we should put on the door sign.",
        email:
          "Enter an email like you@example.com so we can send the confirmation.",
      },
      pick ? {} : { slot: "Pick a free slot on the board above first." },
    );
    setErrors(found);
    if (Object.keys(found).length || !pick) return;
    setStatus("sending");
    await pause();
    const booking: Booking = {
      roomId: pick.roomId,
      date: isoDate(date),
      start: pick.start,
      end: pick.start + pick.length,
      ref: reference("CM"),
    };
    setMine((m) => [...m, booking]);
    setConfirmed(booking);
    setPick(null);
    setStatus("idle");
    form.reset();
    setMember(false);
    setLunch(false);
  };

  const confirmedRoom =
    confirmed && rooms.find((r) => r.id === confirmed.roomId);

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a meeting room</h1>
        <p className="lede">
          Ten rooms across four houses, by the half hour from 8:00 to 20:00.
          Open to everyone; members pay with their included hours and get{" "}
          {MEMBER_OFF * 100}% off the rest.
        </p>
      </header>

      <section
        className="wrap booking-controls"
        aria-label="Choose house, day and group size"
      >
        <div className="control">
          <h2 className="control-label" id="house-label">
            House
          </h2>
          <div className="segmented" role="group" aria-labelledby="house-label">
            {locations.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={l.id === locationId}
                onClick={() =>
                  reset(() => (setLocationId(l.id), setFocusRoom("")))
                }
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
        <div className="control">
          <h2 className="control-label" id="day-label">
            Day
          </h2>
          <div className="date-strip" role="group" aria-labelledby="day-label">
            {dates.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                aria-pressed={i === dayIndex}
                onClick={() => reset(() => setDayIndex(i))}
              >
                <span>
                  {i === 0
                    ? "Today"
                    : d.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <strong>{d.getDate()}</strong>
              </button>
            ))}
          </div>
        </div>
        <div className="control">
          <h2 className="control-label" id="size-label">
            People
          </h2>
          <div className="stepper" role="group" aria-labelledby="size-label">
            <button
              type="button"
              aria-label="One fewer person"
              disabled={headcount <= 1}
              onClick={() => reset(() => setHeadcount((h) => h - 1))}
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">{headcount}</output>
            <button
              type="button"
              aria-label="One more person"
              disabled={headcount >= 30}
              onClick={() => reset(() => setHeadcount((h) => h + 1))}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section
        className="board-band board-band-tight"
        aria-labelledby="board-title"
      >
        <div className="wrap">
          <h2 id="board-title" className="board-title">
            {location.name} · {longDate(isoDate(date))}
          </h2>
          <RoomBoard
            rooms={here}
            date={date}
            headcount={headcount}
            pick={pick}
            mine={mine.filter((b) => b.date === isoDate(date))}
            cutoff={cutoff}
            onPick={choose}
          />
          <p className="board-legend">
            <span data-state="free">Free</span>
            <span data-state="picked">Your pick</span>
            <span data-state="busy">Booked</span>
            <span data-state="yours">Booked by you</span>
            <span data-state="past">Passed</span>
          </p>
        </div>
      </section>

      <section className="wrap section book-grid">
        <div className="book-plan">
          <FloorPlan
            plan={location.plan}
            label={`${location.name} plan${room ? ` with ${room.name} highlighted` : ""}`}
            selected={room?.id}
            muted={tooSmall}
            onSelect={chooseFromPlan}
          />
          <p className="plan-caption">
            <span>Tap a room on the plan to jump to its first free hour</span>
          </p>
          {room ? (
            <div className="room-card">
              {room.image && (
                <img
                  src={room.image.src}
                  alt={room.image.alt}
                  width={room.image.w}
                  height={room.image.h}
                  loading="lazy"
                />
              )}
              <div>
                <h3>{room.name}</h3>
                <p>{room.blurb}</p>
                <p className="room-specs">
                  {room.capacity} seats · {room.layout} · {money(room.rate)}/h
                </p>
                <ul className="amenities">
                  {room.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <ul className="room-rows room-rows-compact">
              {here.map((r) => (
                <li key={r.id}>
                  <h3>{r.name}</h3>
                  <p className="room-specs">
                    {r.capacity} seats · {r.layout} · {money(r.rate)}/h
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="book-panel">
          <div className="confirm" aria-live="polite" ref={confirmRef}>
            {confirmed && confirmedRoom && (
              <div className="confirm-card">
                <CalendarCheck aria-hidden="true" />
                <div>
                  <h2>{confirmedRoom.name} is yours</h2>
                  <p>
                    {longDate(confirmed.date)}, {hhmm(confirmed.start)} –{" "}
                    {hhmm(confirmed.end)}. Reference{" "}
                    <strong>{confirmed.ref}</strong>. The door sign will have
                    your name on it; the front desk has the screen code.
                  </p>
                  <p>
                    <Link to="/events" className="text-link">
                      While you're here, see what's on
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>

          <h2 className="panel-title">Your booking</h2>
          <div
            className="summary"
            data-empty={pick ? undefined : ""}
            data-invalid={errors.slot ? "" : undefined}
          >
            {pick && room ? (
              <>
                <p className="summary-when">
                  <strong>{room.name}</strong>
                  {longDate(isoDate(date))}
                </p>
                <div className="duration">
                  <span className="time-range">
                    {hhmm(pick.start)} – {hhmm(pick.start + pick.length)}
                  </span>
                  <div
                    className="stepper stepper-small"
                    role="group"
                    aria-label="Length of booking"
                  >
                    <button
                      type="button"
                      aria-label="30 minutes shorter"
                      disabled={pick.length <= 0.5}
                      onClick={() =>
                        setPick({ ...pick, length: pick.length - 0.5 })
                      }
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <output aria-live="polite">{pick.length} h</output>
                    <button
                      type="button"
                      aria-label="30 minutes longer"
                      disabled={
                        pick.length >=
                        maxLength(busyFor(pick.roomId), pick.start)
                      }
                      onClick={() =>
                        setPick({ ...pick, length: pick.length + 0.5 })
                      }
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p>
                Nothing picked yet. Choose a free slot on the board, or tap a
                room on the plan.
              </p>
            )}
            {errors.slot && (
              <p className="field-error" id="slot-err">
                {errors.slot}
              </p>
            )}
          </div>

          <form
            className="form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
          >
            <Field
              label="Name for the door sign"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <Field
              label="Company"
              name="company"
              hint="Optional, for the invoice"
              autoComplete="organization"
            />
            <label className="check">
              <input
                type="checkbox"
                name="member"
                checked={member}
                onChange={(e) => setMember(e.target.checked)}
              />
              <span>
                I'm a member ({MEMBER_OFF * 100}% off, included hours used
                first)
              </span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="lunch"
                checked={lunch}
                onChange={(e) => setLunch(e.target.checked)}
              />
              <span>
                Add lunch for {headcount} ({money(LUNCH)} a person)
              </span>
            </label>
            <dl className="cost">
              <div>
                <dt>
                  Room
                  {room && pick
                    ? `, ${pick.length} h × ${money(room.rate)}`
                    : ""}
                  {member ? " − member rate" : ""}
                </dt>
                <dd>{money(roomCost)}</dd>
              </div>
              {lunch && (
                <div>
                  <dt>Lunch × {headcount}</dt>
                  <dd>{money(lunchCost)}</dd>
                </div>
              )}
              <div className="cost-total">
                <dt>Total</dt>
                <dd>{money(roomCost + lunchCost)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              className="btn btn-accent btn-block"
              disabled={status === "sending"}
              aria-describedby={errors.slot ? "slot-err" : undefined}
            >
              {status === "sending"
                ? "Holding the room…"
                : pick && room
                  ? `Book ${room.name}`
                  : "Book this room"}
            </button>
            <p className="quiet-note">
              This is a demo: nothing is sent and no card is charged.
            </p>
          </form>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="policy-title">
        <h2 id="policy-title">How room bookings work</h2>
        <ul className="policy-list">
          {roomPolicies.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
