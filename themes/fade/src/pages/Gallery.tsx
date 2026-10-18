import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Link } from "../router";
import {
  barbers,
  cuts,
  cutStyles,
  galleryPage,
  services,
  type Cut,
} from "../content";
import { PageHead } from "../components/PageHead";

export function Gallery() {
  const [style, setStyle] = useState<string>("all");
  const [barber, setBarber] = useState("all");
  const [open, setOpen] = useState<Cut | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const shown = cuts.filter(
    (c) =>
      (style === "all" || c.style === style) &&
      (barber === "all" || c.barber === barber),
  );
  const nameOf = (id: string) => barbers.find((b) => b.id === id)!.name;

  const view = (c: Cut) => {
    setOpen(c);
    dialog.current?.showModal();
  };

  return (
    <>
      <PageHead title={galleryPage.title} intro={galleryPage.intro} />

      <div className="wrap filters">
        <div className="chips" role="group" aria-label="Style">
          {cutStyles.map((s) => (
            <button
              key={s.id}
              type="button"
              className="chip"
              aria-pressed={style === s.id}
              onClick={() => setStyle(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="select-field">
          <span>Barber</span>
          <select value={barber} onChange={(e) => setBarber(e.target.value)}>
            <option value="all">Every chair</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "cut" : "cuts"}
        </p>
      </div>

      {shown.length ? (
        <ul className="wrap cut-grid">
          {shown.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="cut"
                onClick={() => view(c)}
                aria-haspopup="dialog"
              >
                <img
                  src={c.img.src}
                  alt={c.img.alt}
                  width={c.img.w}
                  height={c.img.h}
                  loading="lazy"
                />
                <span className="cut-caption">
                  <strong>{c.title}</strong>
                  <span>{nameOf(c.barber)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="wrap empty">
          <p>
            No {cutStyles.find((s) => s.id === style)!.label.toLowerCase()} from{" "}
            {nameOf(barber).split(" ")[0]} in the gallery yet.
          </p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setBarber("all")}
          >
            Show every chair
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        className="viewer"
        aria-labelledby="viewer-title"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        {open && (
          <div className="viewer-body">
            <img
              src={open.img.src}
              alt={open.img.alt}
              width={open.img.w}
              height={open.img.h}
            />
            <div className="viewer-info">
              <h2 id="viewer-title">{open.title}</h2>
              <p>{open.recipe}</p>
              <p className="viewer-by">
                By{" "}
                <Link to={`/barbers/${open.barber}`}>
                  {nameOf(open.barber)}
                </Link>{" "}
                · books as{" "}
                {services
                  .find((s) => s.id === open.service)!
                  .name.toLowerCase()}
              </p>
              <Link
                to={`/book?service=${open.service}&barber=${open.barber}&note=${encodeURIComponent(`Like "${open.title}" in the gallery: ${open.recipe}.`)}`}
                className="btn btn-red"
              >
                Book this cut
              </Link>
            </div>
            <button
              type="button"
              className="viewer-close"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
