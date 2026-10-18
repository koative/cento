import { Pause, Play } from "lucide-react";
import type { Release } from "../content";
import { mmss } from "../lib/format";
import { play, PREVIEW, seek, usePlayer } from "../lib/player";
import { Waveform } from "./Waveform";

/** The record player: a deck with a scrubbable waveform over the full tracklist. */
export function Tracklist({
  release,
  limit,
}: {
  release: Release;
  limit?: number;
}) {
  const player = usePlayer();
  const mine = player.slug === release.slug;
  const index = mine ? player.index : 0;
  const track = release.tracks[index];
  const playing = mine && player.playing;
  const tracks = release.tracks.slice(0, limit);

  return (
    <div className="player" data-playing={playing ? "" : undefined}>
      <div className="deck">
        <button
          type="button"
          className="deck-play"
          onClick={() => play(release.slug, index)}
          aria-label={`${playing ? "Pause" : "Play"} ${track.title}`}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <div className="deck-body">
          <p className="deck-now">
            <span className="deck-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{track.title}</strong>
            <span className="deck-time">
              {mmss(mine ? player.pos : 0)} / {mmss(PREVIEW)}
            </span>
          </p>
          <Waveform
            seed={release.slug + track.title}
            pos={mine ? player.pos : 0}
            label={track.title}
            onSeek={(s) => {
              if (!mine) play(release.slug, index);
              seek(s);
            }}
          />
        </div>
      </div>

      <ol className="tracks">
        {tracks.map((t, i) => {
          const on = mine && player.index === i;
          return (
            <li key={t.title} data-current={on ? "" : undefined}>
              <button
                type="button"
                onClick={() => play(release.slug, i)}
                aria-label={`${on && playing ? "Pause" : "Play"} ${t.title}`}
              >
                <span className="track-num" aria-hidden="true">
                  {on && playing ? <Pause /> : String(i + 1).padStart(2, "0")}
                </span>
                <span className="track-title">{t.title}</span>
                <span className="track-len">{mmss(t.length)}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="player-note">
        30-second previews. Full songs on the record and on every streaming
        service.
      </p>
    </div>
  );
}
