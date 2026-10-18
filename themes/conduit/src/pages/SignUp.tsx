import { Check } from "lucide-react";
import { Link } from "../router";
import { signup } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function SignUp() {
  const form = useForm(
    {
      name: "",
      email: "",
      password: "",
      workspace: "",
      role: "",
      region: "",
      terms: "",
    },
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Enter your name so teammates know who created the workspace.",
      email: !v.email.trim()
        ? "Enter your work email."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete — check the part after the @."
          : undefined,
      password:
        v.password.length < 12
          ? `Use at least 12 characters (${12 - v.password.length} more).`
          : !/\d/.test(v.password)
            ? "Add at least one number to the password."
            : undefined,
      workspace:
        slugify(v.workspace).length < 3
          ? "Workspace names need at least 3 letters or numbers."
          : undefined,
      role: v.role ? undefined : "Choose the role closest to yours.",
      region: v.region
        ? undefined
        : "Choose where logs and credentials are stored. You can't change this later.",
      terms: v.terms ? undefined : "Accept the terms to create the workspace.",
    }),
  );
  const slug = slugify(form.values.workspace);

  return (
    <div className="wrap page auth-page">
      <div className="auth-copy">
        <h1>{signup.heading}</h1>
        <p className="lede">{signup.lede}</p>
        <ul className="ticks">
          {signup.includes.map((i) => (
            <li key={i}>
              <Check size={16} aria-hidden /> {i}
            </li>
          ))}
        </ul>
        <p className="muted">
          Already have one? <Link to="/signin">Sign in</Link>
        </p>
      </div>

      <div className="auth-card">
        {form.status === "done" ? (
          <div
            className="form-done"
            role="status"
            tabIndex={-1}
            ref={(el) => el?.focus()}
          >
            <h2>Workspace “{form.values.workspace}” is ready</h2>
            <p>
              Your test key is waiting in Settings → API keys. Workspace URL:{" "}
              <code>conduit.example/w/{slug}</code>
            </p>
            <div className="actions">
              <Link to="/app" className="btn btn-signal">
                Open the dashboard
              </Link>
              <Link to="/docs" className="btn btn-quiet">
                Read the quickstart
              </Link>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.submit}
            className="stack-form"
            aria-label="Create a workspace"
          >
            <div className="form-row">
              <Field
                form={form}
                name="name"
                label="Your name"
                autoComplete="name"
                required
              />
              <Field
                form={form}
                name="email"
                label="Work email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <Field
              form={form}
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              hint="At least 12 characters, including a number."
            />
            <Field
              form={form}
              name="workspace"
              label="Workspace name"
              required
              placeholder="Northbank Tea"
              hint={
                slug
                  ? `Your URL: conduit.example/w/${slug}`
                  : "Usually your company or product."
              }
            />
            <div className="form-row">
              <Field
                form={form}
                name="role"
                label="Role"
                options={signup.roles}
                required
              />
              <Field
                form={form}
                name="region"
                label="Data region"
                options={signup.regions}
                required
              />
            </div>
            <Field
              form={form}
              name="terms"
              label="I accept the terms of service and data processing agreement"
              type="checkbox"
              required
            />
            <button
              className="btn btn-signal btn-lg"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Creating workspace…"
                : "Create workspace"}
            </button>
            <p className="muted small">
              This is a demo: nothing is sent and no account is created.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
