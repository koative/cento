import type { Action, Connector } from "../content";

/*
 * A local model of Conduit's request pipeline: auth → transform → upstream (with retries).
 * It returns the whole run up front; the console then plays the phases back in time.
 */

export type Fault = "none" | "rate-limit" | "outage";
export type PhaseKind = "auth" | "transform" | "upstream" | "wait";
export type Phase = {
  kind: PhaseKind;
  label: string;
  ms: number;
  ok: boolean;
  note: string;
};

export type Run = {
  id: string;
  connector: Connector;
  action: Action;
  body: string;
  status: number;
  attempts: number;
  phases: Phase[];
  total: number;
  response: Record<string, unknown>;
  headers: [string, string][];
  at: string;
};

const rand = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));
const token = (n: number) =>
  Math.random()
    .toString(36)
    .slice(2, 2 + n)
    .padEnd(n, "0");

export function parseBody(text: string): Record<string, unknown> | string {
  try {
    const value: unknown = JSON.parse(text);
    if (value && typeof value === "object" && !Array.isArray(value))
      return value as Record<string, unknown>;
    return "The body must be a JSON object, wrapped in { }.";
  } catch (e) {
    return `Invalid JSON: ${(e as Error).message}`;
  }
}

export function run(
  connector: Connector,
  action: Action,
  bodyText: string,
  fault: Fault,
  retries: number,
): Run {
  const id = "req_" + token(10);
  const phases: Phase[] = [
    {
      kind: "auth",
      label: "Auth",
      ms: rand(2, 5),
      ok: true,
      note: "Workspace key verified, vault credential attached",
    },
  ];
  const meta = { request_id: id, connector: connector.slug };
  const finish = (
    status: number,
    response: Record<string, unknown>,
    attempts: number,
    extra: [string, string][] = [],
  ): Run => ({
    id,
    connector,
    action,
    body: bodyText,
    status,
    attempts,
    phases,
    total: phases.reduce((sum, p) => sum + p.ms, 0),
    response,
    headers: [
      ["content-type", "application/json"],
      ["conduit-request-id", id],
      ["conduit-attempts", String(attempts)],
      ["x-ratelimit-remaining", String(rand(880, 999))],
      ...extra,
    ],
    at: new Date().toLocaleTimeString("en-US", { hour12: false }),
  });

  // Transform: GETs carry no body; writes are parsed and checked against required fields.
  let body: Record<string, unknown> = {};
  if (action.method !== "GET") {
    const parsed = parseBody(bodyText);
    if (typeof parsed === "string") {
      phases.push({
        kind: "transform",
        label: "Transform",
        ms: 1,
        ok: false,
        note: "Body rejected before leaving Conduit",
      });
      return finish(
        400,
        {
          error: {
            type: "invalid_request",
            code: "invalid_json",
            message: parsed + " Fix the body and send again.",
          },
          meta,
        },
        0,
      );
    }
    const missing = action.required.filter((f) => !(f in parsed));
    if (missing.length) {
      phases.push({
        kind: "transform",
        label: "Transform",
        ms: 2,
        ok: false,
        note: `Missing ${missing.join(", ")}`,
      });
      return finish(
        422,
        {
          error: {
            type: "invalid_request",
            code: "missing_field",
            message: `Add ${missing[0]} to the body — ${action.name.toLowerCase()} requires ${action.required.join(", ")}.`,
          },
          meta,
        },
        0,
      );
    }
    body = parsed;
  }
  phases.push({
    kind: "transform",
    label: "Transform",
    ms: rand(3, 6),
    ok: true,
    note: `Mapped to ${connector.name} schema`,
  });

  // Upstream: a rate limit clears on the third attempt; an outage never does.
  const maxAttempts = retries + 1;
  const failStatus = fault === "outage" ? 503 : 429;
  let attempt = 0;
  for (;;) {
    attempt++;
    const fails = fault === "outage" || (fault === "rate-limit" && attempt < 3);
    const ms = fails
      ? rand(18, 60)
      : Math.max(20, connector.latency + rand(-25, 40));
    phases.push({
      kind: "upstream",
      label: `${connector.name} · try ${attempt}`,
      ms,
      ok: !fails,
      note: fails
        ? `${failStatus} ${failStatus === 429 ? "Too Many Requests" : "Service Unavailable"}`
        : "200 OK",
    });
    if (!fails) break;
    if (attempt >= maxAttempts) {
      return finish(
        502,
        {
          error: {
            type: "upstream_error",
            code: "upstream_failed",
            message: `${connector.name} answered ${failStatus} on all ${attempt} attempt${attempt > 1 ? "s" : ""}. The request is in the dead-letter queue; replay it once the provider recovers.`,
            upstream: { status: failStatus },
          },
          meta: { ...meta, attempts: attempt },
        },
        attempt,
        [["retry-after", "30"]],
      );
    }
    const wait = 200 * 2 ** (attempt - 1) + rand(0, 60);
    phases.push({
      kind: "wait",
      label: "Backoff",
      ms: wait,
      ok: true,
      note: `Waiting ${wait} ms with jitter`,
    });
  }

  const upstreamMs = phases
    .filter((p) => p.kind === "upstream" && p.ok)
    .reduce((s, p) => s + p.ms, 0);
  const data = {
    id: `${action.response.object ?? "obj"}_${token(6)}`,
    ...body,
    ...action.response,
  };
  return finish(
    action.method === "POST" ? 201 : 200,
    { data, meta: { ...meta, attempts: attempt, upstream_ms: upstreamMs } },
    attempt,
  );
}

export function curl(action: Action, bodyText: string, base: string) {
  const lines = [
    `curl -X ${action.method} ${base}${action.path}`,
    `  -H "Authorization: Bearer $CONDUIT_TEST_KEY"`,
  ];
  if (action.method !== "GET") {
    lines.push(`  -H "Content-Type: application/json"`);
    const parsed = parseBody(bodyText);
    lines.push(
      `  -d '${typeof parsed === "string" ? bodyText.trim() : JSON.stringify(parsed)}'`,
    );
  }
  return lines.join(" \\\n");
}
