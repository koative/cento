import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { kindLabel, policies, rooms, type Room } from "../content";
import { Link, navigate } from "../router";
import { money, setDraft } from "../lib/stay";
import { Panorama } from "../components/Panorama";
import { RoomCard } from "../components/RoomCard";

export function RoomPage({ room }: { room: Room }) {
  const images = [room.image, ...room.gallery];
  const [shown, setShown] = useState(0);
  const related = [...rooms.filter((r) => r.id !== room.id)]
    .sort((a, b) => Number(b.kind === room.kind) - Number(a.kind === room.kind))
    .slice(0, 3);

  function book() {
    setDraft({
      roomId: room.id,
      adults: Math.min(2, room.sleeps),
      children: 0,
    });
    navigate("/book");
  }

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/rooms" className="back-link">
          <ArrowLeft aria-hidden="true" /> All rooms and cabins
        </Link>
      </div>

      <section className="wrap room-top">
        <div className="gallery">
          <img
            className="gallery-main"
            src={images[shown].src}
            alt={images[shown].alt}
            width={1280}
            height={853}
            key={shown}
          />
          <div className="gallery-thumbs" role="group" aria-label="Photos">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                aria-pressed={i === shown}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
                onClick={() => setShown(i)}
              >
                <img
                  src={img.src}
                  alt=""
                  width={160}
                  height={107}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="room-summary">
          <h1>{room.name}</h1>
          <p className="lede">{room.line}</p>
          <dl className="facts">
            <div>
              <dt>Type</dt>
              <dd>{kindLabel[room.kind]}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd className="num">{room.size} m²</dd>
            </div>
            <div>
              <dt>Sleeps</dt>
              <dd className="num">{room.sleeps}</dd>
            </div>
            <div>
              <dt>Beds</dt>
              <dd>{room.beds}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{room.where}</dd>
            </div>
            <div>
              <dt>Outlook</dt>
              <dd>{room.outlook}</dd>
            </div>
          </dl>
          <p className="room-price">
            from <strong className="num">{money(room.price)}</strong> a night
            for two, breakfast included
          </p>
          <button
            type="button"
            className="btn btn-primary btn-wide"
            onClick={book}
          >
            Choose dates for this room
          </button>
        </div>
      </section>

      <section className="section wrap room-body">
        <div className="prose">
          <h2>About the room</h2>
          {room.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <h2>In the room</h2>
          <ul className="ticks">
            {room.features.map((f) => (
              <li key={f}>
                <Check aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
          <h2>Good to know</h2>
          <ul className="plain-list">
            {policies.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pano-section" aria-labelledby="view-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="view-h">The view from this window</h2>
            <p className="section-lede">
              {room.outlook}. Tap a summit to read about it.
            </p>
          </div>
          <Panorama roomId={room.id} />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="related-h">
        <h2 id="related-h">You might also like</h2>
        <ul className="room-grid">
          {related.map((r) => (
            <li key={r.id}>
              <RoomCard room={r} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
