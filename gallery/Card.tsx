import { Eye, Heart, Terminal } from "lucide-react";
import { preview, type Template } from "./catalog";

/** A large screenshot card; Preview, Get the code and Save surface on hover or keyboard focus. */
export function TemplateCard({
  template: t,
  saved,
  onSave,
  onPreview,
  onCopy,
}: {
  template: Template;
  saved: boolean;
  onSave: () => void;
  onPreview: () => void;
  onCopy: () => void;
}) {
  return (
    <article className="card" aria-labelledby={`card-${t.slug}`}>
      {/* Clicking the picture is a pointer shortcut; the Preview button is the accessible route. */}
      <div className="shot" onClick={onPreview}>
        <img
          src={preview(t)}
          alt={`${t.name} home page`}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
        />
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn btn-light"
            onClick={onPreview}
            aria-label={`Preview ${t.name}`}
          >
            <Eye aria-hidden />
            Preview
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onCopy}
            aria-label={`Get the code for ${t.name}: copy the degit command`}
          >
            <Terminal aria-hidden />
            Get the code
          </button>
        </div>
        <button
          type="button"
          className="fav"
          aria-pressed={saved}
          aria-label={`Save ${t.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <Heart aria-hidden />
        </button>
      </div>
      <div className="card-meta">
        <h3 id={`card-${t.slug}`}>{t.name}</h3>
        <span className="card-no num">
          No. {String(t.number).padStart(3, "0")}
        </span>
      </div>
      <p className="card-sub">
        {t.sector} · <span className="num">{t.pages.length}</span> pages
      </p>
      <ul className="tags" aria-label="Highlights">
        {t.tags.slice(0, 2).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
