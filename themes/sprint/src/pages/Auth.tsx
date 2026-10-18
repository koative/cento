import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { Logo } from "../components/Logo";

export default function Auth({ mode }: { mode: "signin" | "signup" }) {
  const up = mode === "signup";
  const form = useForm(
    { name: "", email: "", password: "" },
    (v) => ({
      name:
        up && !v.name.trim()
          ? "Add your name so your team knows who moved the card."
          : undefined,
      email: !v.email.trim()
        ? "Enter the email you use for Sprint."
        : !EMAIL.test(v.email)
          ? "That email is missing something — check the part after the @."
          : undefined,
      password:
        v.password.length < 8 ? "Use at least 8 characters." : undefined,
    }),
    () => navigate("/app"),
  );

  return (
    <section className="auth">
      <div className="auth-card">
        <Logo />
        <h1>{up ? signin.signupH1 : signin.signinH1}</h1>
        <p>{up ? signin.signupLede : signin.signinLede}</p>
        <form noValidate onSubmit={form.submit}>
          {up && (
            <Field
              form={form}
              name="name"
              label="Full name"
              autoComplete="name"
              required
            />
          )}
          <Field
            form={form}
            name="email"
            label="Work email"
            type="email"
            autoComplete="email"
            required
          />
          <Field
            form={form}
            name="password"
            label="Password"
            type="password"
            autoComplete={up ? "new-password" : "current-password"}
            hint={up ? "At least 8 characters." : undefined}
            required
          />
          <button
            className="btn btn-primary btn-lg btn-block"
            disabled={form.status !== "idle"}
          >
            {form.status === "idle"
              ? up
                ? "Create workspace"
                : "Sign in"
              : "Opening your board…"}
          </button>
        </form>
        <p className="auth-switch" aria-live="polite">
          {form.status === "done"
            ? "Signed in. Opening the demo board."
            : up
              ? "Already have a workspace? "
              : "New to Sprint? "}
          {form.status !== "done" && (
            <Link to={up ? "/signin" : "/signup"}>
              {up ? "Sign in" : "Start free"}
            </Link>
          )}
        </p>
      </div>
    </section>
  );
}
