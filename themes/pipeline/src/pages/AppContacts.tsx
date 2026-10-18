import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Link } from "../router";
import { app, owners, type ContactStatus } from "../content";
import { isOpen, useWorkspace } from "../lib/store";
import { ago, initials, money, shortDate } from "../lib/format";

type Key = "name" | "company" | "owner" | "touch" | "open";
const columns: { key: Key; label: string; numeric?: boolean }[] = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "owner", label: "Owner" },
  { key: "touch", label: "Last touch" },
  { key: "open", label: "Open pipeline", numeric: true },
];
const statuses: (ContactStatus | "All")[] = [
  "All",
  "Lead",
  "Prospect",
  "Customer",
];

export default function AppContacts() {
  const { contacts, deals } = useWorkspace();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({
    key: "touch",
    dir: -1,
  });

  const rows = contacts.map((c) => ({
    contact: c,
    owner: owners.find((o) => o.id === c.owner)!.name,
    touch: c.activity[0]?.date ?? "",
    open: deals
      .filter((d) => d.contactId === c.id && isOpen(d))
      .reduce((n, d) => n + d.value, 0),
  }));
  const value = (r: (typeof rows)[number], key: Key): string | number =>
    key === "name"
      ? r.contact.name
      : key === "company"
        ? r.contact.company
        : r[key];

  const q = query.trim().toLowerCase();
  const list = rows
    .filter((r) => status === "All" || r.contact.status === status)
    .filter(
      (r) =>
        !q ||
        `${r.contact.name} ${r.contact.company} ${r.contact.title} ${r.contact.city}`
          .toLowerCase()
          .includes(q),
    )
    .sort((a, b) => {
      const x = value(a, sort.key);
      const y = value(b, sort.key);
      return (
        (typeof x === "number" && typeof y === "number"
          ? x - y
          : String(x).localeCompare(String(y))) * sort.dir
      );
    });

  function toggle(key: Key) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 1 ? -1 : 1 }
        : { key, dir: key === "touch" || key === "open" ? -1 : 1 },
    );
  }

  const count = (s: (typeof statuses)[number]) =>
    s === "All"
      ? contacts.length
      : contacts.filter((c) => c.status === s).length;

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Contacts</h1>
          <p className="app-sub">
            {contacts.length} people across{" "}
            {new Set(contacts.map((c) => c.company)).size} companies
          </p>
        </div>
      </header>

      <div className="toolbar">
        <fieldset className="segmented">
          <legend className="sr-only">Status</legend>
          {statuses.map((s) => (
            <label key={s}>
              <input
                type="radio"
                name="status"
                checked={status === s}
                onChange={() => setStatus(s)}
              />
              <span>
                {s} <span className="num seg-count">{count(s)}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <div className="search">
          <Search size={16} aria-hidden />
          <label htmlFor="contact-q" className="sr-only">
            Search contacts
          </label>
          <input
            id="contact-q"
            type="search"
            placeholder="Name, company, title or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="result-count" role="status">
        Showing {list.length} of {contacts.length}
      </p>

      <div
        className="sheet table-scroll"
        role="region"
        aria-label="Contacts"
        tabIndex={0}
      >
        <table className="data contacts-table">
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort.key === c.key;
                const Icon = !active
                  ? ArrowUpDown
                  : sort.dir === 1
                    ? ArrowUp
                    : ArrowDown;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    className={c.numeric ? "num" : undefined}
                    aria-sort={
                      active
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <button
                      className="sort"
                      onClick={() => toggle(c.key)}
                      data-active={active ? "" : undefined}
                    >
                      {c.label} <Icon size={14} aria-hidden />
                    </button>
                  </th>
                );
              })}
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ contact: c, owner, touch, open }) => (
              <tr key={c.id}>
                <td>
                  <Link to={`/app/contacts/${c.id}`} className="row-link">
                    <span className="avatar">{initials(c.name)}</span>
                    <span>
                      <strong>{c.name}</strong>
                      <span className="row-sub">{c.title}</span>
                    </span>
                  </Link>
                </td>
                <td>{c.company}</td>
                <td>{owner}</td>
                <td className="num">
                  {shortDate(touch)}{" "}
                  <span className="row-sub">{ago(touch, app.today)}</span>
                </td>
                <td className="num">
                  {open ? money(open) : <span className="muted">—</span>}
                </td>
                <td>
                  <span className="chip" data-status={c.status}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && (
          <div className="empty">
            <p>No contacts match “{query}”.</p>
            <button
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setStatus("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
