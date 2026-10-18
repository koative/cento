import { ListCheck, ListPlus, Pause, Play } from "lucide-react";
import type { Episode } from "../content";
import { player, usePlayer } from "../lib/player";

/** Round play/pause button for one episode. `label` shows a text label beside the icon. */
export function PlayButton({
  ep,
  label,
  className = "",
}: {
  ep: Episode;
  label?: boolean;
  className?: string;
}) {
  const { id, playing, progress } = usePlayer();
  const on = id === ep.id && playing;
  const at = progress[ep.id] ?? 0;
  const verb = on ? "Pause" : at > 0 && at < ep.duration ? "Resume" : "Play";
  return (
    <button
      type="button"
      className={`play ${label ? "play-labelled" : ""} ${className}`}
      data-on={on ? "" : undefined}
      aria-label={label ? undefined : `${verb} ${ep.title}`}
      onClick={() => player.toggle(ep.id)}
    >
      {on ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      {label && <span>{verb === "Play" ? "Play episode" : verb}</span>}
    </button>
  );
}

export function QueueButton({ ep, label }: { ep: Episode; label?: boolean }) {
  const queued = usePlayer().queue.includes(ep.id);
  return (
    <button
      type="button"
      className={`queue-btn ${label ? "queue-labelled" : ""}`}
      aria-pressed={queued}
      aria-label={
        label
          ? undefined
          : `${queued ? "Remove" : "Save"} ${ep.title} ${queued ? "from" : "to"} your listening list`
      }
      onClick={() => player.toggleQueued(ep.id)}
    >
      {queued ? (
        <ListCheck aria-hidden="true" />
      ) : (
        <ListPlus aria-hidden="true" />
      )}
      {label && <span>{queued ? "On your list" : "Listen later"}</span>}
    </button>
  );
}
