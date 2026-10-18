import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Ticket as TicketIcon,
} from "lucide-react";
import { Link } from "../router";
import { brand, drops, modeLabel, type Drop } from "../content";
import {
  at,
  dayLabel,
  downloadIcs,
  drawAt,
  dropNo,
  dropStatus,
  productsIn,
  timeLabel,
  useNow,
} from "../lib/time";
import { Countdown } from "../components/Countdown";
import { ProductCard } from "../components/ProductCard";

export function DropPage({ drop }: { drop: Drop }) {
  const now = useNow();
  const status = dropStatus(drop, now);
  const start = at(drop.date);
  const pieces = productsIn(drop);
  const i = drops.indexOf(drop);
  const prev = drops[i - 1];
  const next = drops[i + 1];

  return (
    <div className="page drop-page">
      <header className="drop-hero">
        <div className="drop-hero-copy">
          <h1>{drop.name}</h1>
          <p className="lead">{drop.summary}</p>
          <dl className="spec">
            <div>
              <dt>Drop</dt>
              <dd className="num">{dropNo(drop)}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd className="num">{dayLabel(start)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="num">
                {timeLabel(start)} {brand.tzLabel}
              </dd>
            </div>
            <div>
              <dt>How</dt>
              <dd>{modeLabel[drop.mode]}</dd>
            </div>
            <div>
              <dt>Run</dt>
              <dd className="num">{drop.run} pieces</dd>
            </div>
            {drop.collab && (
              <div>
                <dt>With</dt>
                <dd>{drop.collab}</dd>
              </div>
            )}
          </dl>

          {status === "upcoming" && (
            <>
              <Countdown to={start} label={`${drop.name} drops in`} />
              <button
                type="button"
                className="btn btn-signal"
                onClick={() => downloadIcs(drop)}
              >
                <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
              </button>
            </>
          )}
          {status === "raffle-open" && (
            <>
              <Countdown
                to={at(drop.raffleCloses!)}
                label="Raffle entries close in"
              />
              <Link to="/raffle" className="btn btn-signal">
                <TicketIcon size={18} aria-hidden="true" /> Enter the raffle
              </Link>
            </>
          )}
          {status === "raffle-drawn" && (
            <p className="notice">
              The raffle was drawn {dayLabel(drawAt(drop))} at{" "}
              {timeLabel(drawAt(drop))}. Winners have been emailed.
            </p>
          )}
          {status === "live" && (
            <p className="notice">
              Released {dayLabel(start)}.{" "}
              {drop.mode === "raffle"
                ? "Raffle only, allocated to winners."
                : "What is left is below, while it lasts."}
            </p>
          )}
        </div>
        <figure className="drop-hero-photo">
          <img
            src={drop.photo.src}
            alt={drop.photo.alt}
            width={drop.photo.w}
            height={drop.photo.h}
          />
        </figure>
      </header>

      <section className="drop-story" aria-labelledby="h-story">
        <h2 id="h-story">About this drop</h2>
        <div className="prose">
          {drop.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="h-pieces">
        <div className="section-head">
          <h2 id="h-pieces">
            {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
          </h2>
        </div>
        <div className="product-grid">
          {pieces.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <nav className="pager" aria-label="More drops">
        {prev ? (
          <Link to={`/drops/${prev.id}`}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>
              <small className="num">Drop {dropNo(prev)}</small> {prev.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        <Link to="/drops" className="pager-mid">
          All drops
        </Link>
        {next ? (
          <Link to={`/drops/${next.id}`} className="pager-next">
            <span>
              <small className="num">Drop {dropNo(next)}</small> {next.name}
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
