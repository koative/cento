import { Link } from "../router";
import { artistById, availabilityLabel, type Design } from "../content";
import { money } from "../lib/ink";
import { FlashArt } from "./FlashArt";

export function FlashCard({ design: d }: { design: Design }) {
  const artist = artistById(d.artist);
  return (
    <Link
      to={`/flash/${d.id}`}
      className="flash-card"
      data-availability={d.availability}
    >
      <span className="flash-no">No. {d.no}</span>
      <FlashArt art={d.id} />
      <span className="flash-meta">
        <span className="flash-name">{d.name}</span>
        <span className="flash-price">
          {d.availability === "claimed" ? "Claimed" : `from ${money(d.price)}`}
        </span>
        <span className="flash-sub">
          {artist?.name.split(" ")[0]} · {d.minCm}–{d.maxCm} cm
          {d.availability === "one-off" && (
            <> · {availabilityLabel["one-off"]}</>
          )}
        </span>
      </span>
    </Link>
  );
}
