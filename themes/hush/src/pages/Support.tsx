import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Search } from "lucide-react";
import { Link } from "../router";
import { brand, faqs, guides, products, supportTopics } from "../content";
import {
  Field,
  SelectField,
  TextArea,
  validate,
  type Errors,
} from "../components/Field";

const messages = {
  name: { missing: "Enter your name so we know who to reply to." },
  email: {
    missing: "Enter your email so we can reply.",
    invalid:
      "Check the email address, it needs an @ and a domain like example.com.",
  },
  product: { missing: "Choose the product you need help with." },
  topic: { missing: "Choose the topic closest to your question." },
  order: {
    missing: "",
    invalid:
      "Order numbers look like HSH-12345: the letters HSH, a dash and five digits.",
  },
  message: {
    missing: "Tell us what is happening.",
    invalid:
      "Add a little more detail, at least 20 characters, so we can help on the first reply.",
  },
};

export function Support() {
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const q = query.trim().toLowerCase();
  const found = guides.filter(
    (g) =>
      !q ||
      (g.title + " " + g.summary + " " + g.products.join(" "))
        .toLowerCase()
        .includes(q),
  );

  useEffect(() => {
    if (sent) done.current?.focus();
  }, [sent]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form, messages);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.split(" ")[0];
    setTimeout(() => {
      setBusy(false);
      setSent(name);
    }, 900);
  }

  return (
    <div className="page support-page">
      <header className="page-head">
        <h1>How can we help?</h1>
        <p className="lead">
          Guides written by the people who repair our headphones, answers to the
          questions we hear most, and a real person when you need one.
        </p>
        <div className="search">
          <Search size={20} aria-hidden="true" />
          <label htmlFor="guide-search" className="visually-hidden">
            Search guides
          </label>
          <input
            id="guide-search"
            type="search"
            placeholder="Try “pairing”, “battery” or “Buds Pro”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <section aria-labelledby="h-guides" className="guides">
        <h2 id="h-guides">Guides</h2>
        <p className="result-count" aria-live="polite">
          {q
            ? `${found.length} ${found.length === 1 ? "guide matches" : "guides match"} “${query.trim()}”`
            : `${guides.length} guides`}
        </p>
        {found.length ? (
          <ul className="guide-list">
            {found.map((g) => (
              <li key={g.slug}>
                <Link to={"/support/" + g.slug}>
                  <b>{g.title}</b>
                  <span>{g.summary}</span>
                  <span className="muted num">{g.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>
              No guide covers that yet. Ask us below and we will answer within
              one working day.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setQuery("")}
            >
              Show all guides
            </button>
          </div>
        )}
      </section>

      <section aria-labelledby="h-faq" className="faq">
        <h2 id="h-faq">Questions we hear most</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="h-contact" className="contact">
        <div className="contact-info">
          <h2 id="h-contact">Write to support</h2>
          <p>{brand.hours}. Most questions are answered within four hours.</p>
          <p>
            <a href={"mailto:" + brand.supportEmail}>{brand.supportEmail}</a>
            <br />
            <a href={"tel:" + brand.phone.replace(/\s/g, "")}>{brand.phone}</a>
          </p>
        </div>

        {sent ? (
          <div className="form-done" aria-live="polite">
            <Check size={28} aria-hidden="true" />
            <h3 ref={done} tabIndex={-1}>
              Thanks, {sent}. Your ticket is open.
            </h3>
            <p>
              We reply by email, usually within four hours on working days. This
              is a demo, so nothing was sent.
            </p>
            <Link to="/support/pair-a-device" className="text-link">
              Meanwhile, try the pairing guide{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <form
            className="support-form"
            noValidate
            onSubmit={submit}
            aria-busy={busy}
          >
            <div className="field-row">
              <Field
                label="Your name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
            </div>
            <div className="field-row">
              <SelectField
                label="Product"
                name="product"
                placeholder="Choose a product"
                options={products.map((p) => p.name)}
                error={errors.product}
              />
              <SelectField
                label="Topic"
                name="topic"
                placeholder="Choose a topic"
                options={supportTopics}
                error={errors.topic}
              />
            </div>
            <Field
              label="Order number (optional)"
              name="order"
              placeholder="HSH-12345"
              pattern="[Hh][Ss][Hh]-\d{5}"
              hint="On your confirmation email. Helps with returns and repairs."
              error={errors.order}
            />
            <TextArea
              label="What is happening?"
              name="message"
              minLength={20}
              hint="Which device it is paired with and when it started help us most."
              error={errors.message}
            />
            <button type="submit" className="btn" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                  Sending…
                </>
              ) : (
                "Send to support"
              )}
            </button>
            <p className="muted small">Demo form: nothing is sent anywhere.</p>
          </form>
        )}
      </section>
    </div>
  );
}
