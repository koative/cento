import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { useEffect } from "react";

export default function SignIn() {
  const form = useForm({ email: "", password: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter the email you signed up with."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete — check for an @ and a domain."
        : undefined,
    password: !v.password ? "Enter your password." : undefined,
  }));

  // Demo only: any well-formed email and password opens the workspace.
  useEffect(() => {
    if (form.status === "done") navigate("/learn");
  }, [form.status]);

  return (
    <div className="wrap page auth auth-narrow">
      <div className="auth-panel">
        <h1>{signin.heading}</h1>
        <form noValidate onSubmit={form.submit} className="form">
          <Field
            form={form}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
          />
          <Field
            form={form}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button
            className="btn btn-primary btn-block btn-lg"
            disabled={form.status !== "idle"}
          >
            {form.status === "idle" ? "Sign in" : "Opening your desk…"}
          </button>
          <p className="sr-only" aria-live="polite">
            {form.status === "idle" ? "" : "Signed in. Opening your desk."}
          </p>
          <p className="form-quiet">
            Demo sign-in: any valid email and password opens the sample
            workspace. Nothing is sent.
          </p>
        </form>
        <p className="muted">
          New to Campus? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
