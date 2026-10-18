import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  Github,
  Monitor,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { degit, liveUrl, sourceUrl, type Template } from "./catalog";
import { copyText } from "./clipboard";

const devices = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "phone", label: "Phone", icon: Smartphone },
] as const;
type Device = (typeof devices)[number]["id"];

/** Live, multi-page preview of one template in a native modal dialog. */
export function Preview({
  template: t,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [path, setPath] = useState("/");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  useEffect(() => {
    if (!t) return;
    setDevice("desktop");
    setPath("/");
    setLoading(true);
    setCopied("idle");
    dialog.current?.showModal();
    document.documentElement.classList.add("is-previewing");
    return () => {
      dialog.current?.close();
      document.documentElement.classList.remove("is-previewing");
    };
  }, [t]);

  useEffect(() => {
    if (copied === "idle") return;
    const timer = setTimeout(() => setCopied("idle"), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!t) return <dialog ref={dialog} className="preview" />;

  const page = t.pages.find((p) => p.path === path) ?? t.pages[0];
  const url = liveUrl(t, path);

  return (
    <dialog
      ref={dialog}
      className="preview"
      aria-labelledby="preview-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="preview-bar">
        <div className="preview-id">
          <h2 id="preview-title">{t.name}</h2>
          <p>
            {t.sector} · <span className="num">{t.pages.length}</span> pages
          </p>
        </div>
        <div className="segmented" role="group" aria-label="Preview width">
          {devices.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={device === id}
              onClick={() => setDevice(id)}
            >
              <Icon aria-hidden />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="preview-actions">
          <label className="select">
            <span className="select-label">Page</span>
            <select
              value={path}
              onChange={(e) => {
                setPath(e.target.value);
                setLoading(true);
              }}
            >
              {t.pages.map((p) => (
                <option key={p.path} value={p.path}>
                  {p.title}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden />
          </label>
          <a
            className="btn btn-line"
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open live (new tab)"
          >
            <span className="btn-label">Open live</span>
            <ArrowUpRight aria-hidden />
          </a>
          <a
            className="btn btn-line"
            href={sourceUrl(t)}
            target="_blank"
            rel="noreferrer"
            aria-label="Source on GitHub (new tab)"
          >
            <Github aria-hidden />
            <span className="btn-label">Source on GitHub</span>
            <ArrowUpRight aria-hidden />
          </a>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Close preview"
          >
            <X aria-hidden />
          </button>
        </div>
      </div>

      <div className="preview-stage">
        <div className="frame preview-frame" data-device={device}>
          <div className="chrome" aria-hidden>
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="url">
              themes/{t.slug}/{path === "/" ? "" : `#${path}`}
            </span>
          </div>
          <div className="preview-view">
            {loading && (
              <p className="preview-loading" role="status">
                Loading {t.name} · {page.title}…
              </p>
            )}
            <iframe
              key={`${t.slug}${path}`}
              title={`${t.name} live preview`}
              src={url}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </div>

      <div className="preview-foot">
        <div className="cmd">
          <code>{degit(t)}</code>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={async () =>
              setCopied((await copyText(degit(t))) ? "done" : "failed")
            }
          >
            {copied === "done" ? (
              <Check aria-hidden />
            ) : copied === "failed" ? (
              <CircleAlert aria-hidden />
            ) : (
              <Copy aria-hidden />
            )}
            {copied === "done"
              ? "Copied"
              : copied === "failed"
                ? "Couldn’t copy"
                : "Copy command"}
          </button>
        </div>
        <p className="preview-note" aria-live="polite">
          {copied === "failed"
            ? "Your browser blocked the clipboard. Select the command and copy it yourself."
            : `${t.name} is a fictional brand. The preview runs in your browser; nothing you enter is sent anywhere.`}
        </p>
      </div>
    </dialog>
  );
}
