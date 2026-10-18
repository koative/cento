import { kindLabel, type Room } from "../content";
import { Link } from "../router";
import { money } from "../lib/stay";

export function RoomCard({
  room,
  lazy = true,
}: {
  room: Room;
  lazy?: boolean;
}) {
  return (
    <article className="room-card">
      <Link to={`/rooms/${room.id}`} className="room-card-link">
        <img
          src={room.image.src}
          alt={room.image.alt}
          width={640}
          height={480}
          loading={lazy ? "lazy" : undefined}
        />
        <h3>{room.name}</h3>
      </Link>
      <p className="room-card-facts num">
        {kindLabel[room.kind]} · {room.size} m² · sleeps {room.sleeps}
      </p>
      <p className="room-card-line">{room.line}</p>
      <p className="room-card-price">
        from <strong className="num">{money(room.price)}</strong> a night
      </p>
    </article>
  );
}
