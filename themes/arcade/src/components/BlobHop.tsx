import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { games } from "../content";
import {
  VIEW,
  draw,
  makeArt,
  newGame,
  press,
  release,
  scoreOf,
  step,
  type Game,
} from "../lib/blobhop";
import { addRun, useRuns } from "../lib/util";

type Phase = "ready" | "playing" | "paused" | "over";

const palette = games.find((g) => g.slug === "blob-hop")!.palette;
const HOP_KEYS = [" ", "ArrowUp", "w", "W"];

/** The playable Blob Hop demo: canvas world, HTML overlay for text, buttons for every action. */
export function BlobHop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(newGame(1));
  const art = useRef(makeArt(palette));
  const phaseRef = useRef<Phase>("ready");
  const assistRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [assist, setAssist] = useState(false);
  const [announce, setAnnounce] = useState("");
  const runs = useRuns();
  const best = runs[0]?.score ?? 0;

  const go = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const paint = () => {
    const ctx = canvas.current?.getContext("2d");
    if (ctx) draw(ctx, game.current, art.current);
  };

  useEffect(paint, []);

  useEffect(() => {
    if (phase !== "playing") return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt =
        Math.min(0.05, (now - last) / 1000) * (assistRef.current ? 0.7 : 1);
      last = now;
      const g = game.current;
      const result = step(g, dt);
      paint();
      setScore(scoreOf(g));
      if (result === "over") {
        const final = scoreOf(g);
        const isBest = final > (runs[0]?.score ?? 0);
        addRun({
          score: final,
          berries: g.berries,
          at: new Date().toISOString(),
        });
        setAnnounce(
          `Bonk. Score ${final}, ${g.berries} ${g.berries === 1 ? "berry" : "berries"}.${isBest ? " New best on this device!" : ""}`,
        );
        go("over");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const onHide = () => document.hidden && pauseGame();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onHide);
    };
    // `runs` is read once per round on purpose: the loop must not restart when a run is saved.
  }, [phase]);

  function start() {
    if (phaseRef.current === "over" || phaseRef.current === "ready") {
      game.current = newGame();
      setScore(0);
    }
    setAnnounce(
      phaseRef.current === "paused" ? "Resumed." : "Go! Hop over the thistles.",
    );
    go("playing");
  }

  function pauseGame() {
    if (phaseRef.current !== "playing") return;
    release(game.current);
    setAnnounce("Paused.");
    go("paused");
  }

  function restart() {
    game.current = newGame();
    setScore(0);
    paint();
    setAnnounce("New run. Go!");
    go("playing");
  }

  function hop() {
    if (phaseRef.current === "playing") press(game.current);
    else start();
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (HOP_KEYS.includes(e.key)) {
      e.preventDefault();
      if (!e.repeat) hop();
    } else if (e.key === "p" || e.key === "P" || e.key === "Escape") {
      if (phaseRef.current === "playing") pauseGame();
      else if (phaseRef.current === "paused") start();
    }
  };
  const onKeyUp = (e: KeyboardEvent) =>
    HOP_KEYS.includes(e.key) && release(game.current);

  return (
    <div className="hop" data-phase={phase}>
      <div
        className="hop-screen"
        tabIndex={0}
        role="group"
        aria-roledescription="game"
        aria-label="Blob Hop demo. Press Space or Up to hop, hold to hop higher, P to pause."
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.focus();
          hop();
        }}
        onPointerUp={() => release(game.current)}
        onPointerLeave={() => release(game.current)}
      >
        <canvas
          ref={canvas}
          width={VIEW.w}
          height={VIEW.h}
          aria-hidden="true"
        />
        <div className="hop-hud" aria-hidden="true">
          <span className="num">{String(score).padStart(5, "0")}</span>
          <span className="num">
            Best {String(Math.max(best, score)).padStart(5, "0")}
          </span>
        </div>
        {phase !== "playing" && (
          <div className="hop-card" aria-hidden="true">
            {phase === "ready" && (
              <>
                <strong>Thistle Meadow</strong>
                <span>Tap or press Space to hop</span>
              </>
            )}
            {phase === "paused" && (
              <>
                <strong>Paused</strong>
                <span>Tap or press Space to carry on</span>
              </>
            )}
            {phase === "over" && (
              <>
                <strong>Bonk!</strong>
                <span className="num">
                  {score} points · best {best}
                </span>
                <span>Tap or press Space to hop again</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hop-controls">
        {phase === "playing" ? (
          <button
            type="button"
            className="btn btn-ghost-dark"
            onClick={pauseGame}
          >
            <Pause aria-hidden="true" /> Pause
          </button>
        ) : (
          <button type="button" className="btn btn-sun" onClick={start}>
            <Play aria-hidden="true" />{" "}
            {phase === "paused"
              ? "Resume"
              : phase === "over"
                ? "Hop again"
                : "Start"}
          </button>
        )}
        <button
          type="button"
          className="btn btn-ghost-dark"
          onClick={restart}
          disabled={phase === "ready"}
        >
          <RotateCcw aria-hidden="true" /> Restart
        </button>
        <label className="switch">
          <input
            type="checkbox"
            checked={assist}
            onChange={(e) => {
              assistRef.current = e.target.checked;
              setAssist(e.target.checked);
            }}
          />
          <span>Assist mode (70% speed)</span>
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
