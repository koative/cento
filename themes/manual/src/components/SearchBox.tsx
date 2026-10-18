import { useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { navigate } from "../router";
import { codeOf, categoryOf, search, terms } from "../lib/manual";
import { Highlight } from "./Inline";

/** Search field with instant answers: arrow keys move through matches, Enter opens one. */
export function SearchBox({
  label,
  placeholder,
  large = false,
}: {
  label: string;
  placeholder: string;
  large?: boolean;
}) {
  const id = useId();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const all = search(q);
  const results = all.slice(0, 6);
  const ts = terms(q);
  const showing = open && q.trim().length > 1;

  const go = (slug: string) => {
    setOpen(false);
    navigate(`/articles/${slug}`);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (index >= 0 && results[index]) return go(results[index].article.slug);
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!results.length) return;
      e.preventDefault();
      setOpen(true);
      const total = results.length + 1; // the extra slot is "nothing selected"
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setIndex((i) => ((i + 1 + dir + total) % total) - 1);
    } else if (e.key === "Escape") {
      setOpen(false);
      setIndex(-1);
    }
  };

  return (
    <form
      role="search"
      className={`searchbox${large ? " searchbox-large" : ""}`}
      onSubmit={submit}
    >
      <label htmlFor={`${id}-q`} className="sr-only">
        {label}
      </label>
      <div className="searchbox-field">
        <Search aria-hidden="true" className="searchbox-icon" />
        <input
          id={`${id}-q`}
          data-search-input
          type="search"
          role="combobox"
          aria-expanded={showing}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={
            showing && index >= 0 && index < results.length
              ? `${id}-opt-${index}`
              : undefined
          }
          autoComplete="off"
          placeholder={placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKey}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
      <div className="searchbox-panel" hidden={!showing}>
        <ul id={`${id}-list`} role="listbox" aria-label="Matching articles">
          {results.map((r, i) => {
            const cat = categoryOf(r.article.category);
            return (
              <li
                key={r.article.slug}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === index}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(r.article.slug)}
              >
                <span className="code">{codeOf(r.article)}</span>
                <span className="opt-title">
                  <Highlight text={r.article.title} terms={ts} />
                </span>
                <span className="opt-meta">{cat?.title}</span>
              </li>
            );
          })}
        </ul>
        <p className="searchbox-foot" aria-live="polite">
          {results.length
            ? `${all.length} ${all.length === 1 ? "article matches" : "articles match"}. Enter for all results.`
            : "No article matches yet. Press Enter to search the community and troubleshooters too."}
        </p>
      </div>
    </form>
  );
}
