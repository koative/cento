import { brand, type Endpoint } from "../content";

/*
 * The playground's fake API. It validates a request the way the documented
 * API would and answers from the endpoint's example response. No network.
 */

export type Inputs = {
  path: Record<string, string>;
  query: Record<string, string>;
  body: string;
};
export type Reply = {
  status: number;
  ms: number;
  body: string;
  requestId: string;
};

export const STATUS_TEXT: Record<number, string> = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  400: "Bad Request",
  404: "Not Found",
  422: "Unprocessable Entity",
};

export function initialInputs(e: Endpoint): Inputs {
  const inputs: Inputs = { path: {}, query: {}, body: e.request ?? "" };
  for (const p of e.params) {
    if (p.in === "path") inputs.path[p.name] = p.example ?? "";
    if (p.in === "query") inputs.query[p.name] = p.example ?? "";
  }
  return inputs;
}

export function buildUrl(e: Endpoint, inputs: Inputs) {
  const path = e.path.replace(/\{(\w+)\}/g, (_, k: string) =>
    encodeURIComponent(inputs.path[k] || `{${k}}`),
  );
  const qs = Object.entries(inputs.query)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim())}`)
    .join("&");
  return brand.baseUrl + path + (qs ? `?${qs}` : "");
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const TYPE_CHECK: Record<string, (v: unknown) => boolean> = {
  string: (v) => typeof v === "string",
  integer: (v) => Number.isInteger(v),
  boolean: (v) => typeof v === "boolean",
  object: (v) => typeof v === "object" && v !== null && !Array.isArray(v),
  "string[]": (v) => Array.isArray(v) && v.every((x) => typeof x === "string"),
};

type Failure = [status: number, code: string, message: string, param?: string];

function check(
  e: Endpoint,
  inputs: Inputs,
): Failure | Record<string, unknown> | null {
  for (const p of e.params.filter((p) => p.in === "path")) {
    const v = inputs.path[p.name]?.trim() ?? "";
    if (!v)
      return [
        400,
        "invalid_request",
        `${p.name} is required in the path.`,
        p.name,
      ];
    const prefix = p.example?.includes("_")
      ? p.example.split("_")[0] + "_"
      : null;
    if (prefix && !v.startsWith(prefix))
      return [
        404,
        "resource_missing",
        `No object with id "${v}". Ids for this resource start with ${prefix}.`,
        p.name,
      ];
  }
  const limit = inputs.query.limit?.trim();
  if (limit && !(/^\d+$/.test(limit) && +limit >= 1 && +limit <= 100))
    return [
      400,
      "invalid_request",
      "limit must be a whole number from 1 to 100.",
      "limit",
    ];

  if (e.request === undefined) return null;
  let body: unknown;
  try {
    body = JSON.parse(inputs.body || "{}");
  } catch (err) {
    return [
      400,
      "invalid_request",
      `Body is not valid JSON: ${(err as Error).message}`,
    ];
  }
  if (!TYPE_CHECK.object(body))
    return [400, "invalid_request", "Body must be a JSON object."];
  const obj = body as Record<string, unknown>;
  const fields = e.params.filter((p) => p.in === "body");
  for (const key of Object.keys(obj))
    if (!fields.some((p) => p.name === key))
      return [
        400,
        "invalid_request",
        `Unknown parameter ${key}. Check the spelling against the reference.`,
        key,
      ];
  for (const p of fields) {
    if (!(p.name in obj)) {
      if (p.required)
        return [422, "missing_field", `${p.name} is required.`, p.name];
      continue;
    }
    if (!TYPE_CHECK[p.type](obj[p.name]))
      return [
        400,
        "invalid_request",
        `${p.name} must be ${p.type === "integer" ? "an" : "a"} ${p.type}.`,
        p.name,
      ];
  }
  if (
    typeof obj.name === "string" &&
    !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/.test(obj.name)
  )
    return [
      400,
      "invalid_request",
      `name must be lowercase and dot-separated, like emails.welcome.`,
      "name",
    ];
  return obj;
}

export function send(e: Endpoint, inputs: Inputs, count: number): Reply {
  const url = buildUrl(e, inputs);
  const seed = hash(url + inputs.body + count);
  const requestId = "req_" + seed.toString(36).slice(0, 8);
  const ms = 22 + (seed % 71);
  const result = check(e, inputs);

  if (Array.isArray(result)) {
    const [status, code, message, param] = result;
    const error = param
      ? { code, message, param, request_id: requestId }
      : { code, message, request_id: requestId };
    return { status, ms, requestId, body: JSON.stringify({ error }, null, 2) };
  }

  let text = e.response.body;
  for (const p of e.params)
    if (p.in === "path" && p.example)
      text = text.replaceAll(
        `"${p.example}"`,
        JSON.stringify(inputs.path[p.name].trim()),
      );
  const response = JSON.parse(text) as Record<string, unknown>;
  if (result) {
    for (const [k, v] of Object.entries(result))
      if (k in response) response[k] = v;
    if (
      typeof result.name === "string" &&
      "queue" in response &&
      !("queue" in result)
    )
      response.queue = result.name.split(".")[0];
  }
  const limit = Number(inputs.query.limit);
  if (Array.isArray(response.data) && limit)
    response.data = response.data.slice(0, limit);
  return {
    status: e.response.status,
    ms,
    requestId,
    body: JSON.stringify(response, null, 2),
  };
}

/* ---------- Code generation ---------- */

function toPython(v: unknown, depth = 1): string {
  const pad = "    ".repeat(depth);
  const end = "    ".repeat(depth - 1);
  if (v === null) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (Array.isArray(v))
    return `[${v.map((x) => toPython(x, depth + 1)).join(", ")}]`;
  if (typeof v === "object")
    return `{\n${Object.entries(v as Record<string, unknown>)
      .map(([k, x]) => `${pad}${JSON.stringify(k)}: ${toPython(x, depth + 1)}`)
      .join(",\n")}\n${end}}`;
  return JSON.stringify(v);
}

function parsed(inputs: Inputs): unknown {
  try {
    return JSON.parse(inputs.body || "{}");
  } catch {
    return undefined;
  }
}

export function snippets(e: Endpoint, inputs: Inputs) {
  const url = buildUrl(e, inputs);
  const hasBody = e.request !== undefined;
  const body = hasBody ? parsed(inputs) : undefined;
  const bad = hasBody && body === undefined;

  const curl = [
    `curl ${e.method === "GET" ? "" : `-X ${e.method} `}"${url}"`,
    `  -H "Authorization: Bearer $STACK_KEY"`,
    ...(hasBody
      ? [
          `  -H "Content-Type: application/json"`,
          `  -d '${bad ? inputs.body.replace(/\s+/g, " ") : JSON.stringify(body)}'`,
        ]
      : []),
  ].join(" \\\n");

  const fetchLines = [
    `const res = await fetch("${url}", {`,
    `  method: "${e.method}",`,
    `  headers: {`,
    "    Authorization: `Bearer ${process.env.STACK_KEY}`,",
    ...(hasBody ? [`    "Content-Type": "application/json",`] : []),
    `  },`,
    ...(hasBody
      ? [
          `  body: JSON.stringify(${JSON.stringify(body, null, 2)?.replace(/\n/g, "\n  ")}),`,
        ]
      : []),
    `});`,
    `const json = await res.json();`,
  ];

  const python = [
    "import os, requests",
    "",
    `res = requests.${e.method.toLowerCase()}(`,
    `    "${url}",`,
    `    headers={"Authorization": f"Bearer {os.environ['STACK_KEY']}"},`,
    ...(hasBody ? [`    json=${toPython(body, 2)},`] : []),
    ")",
    "print(res.json())",
  ].join("\n");

  const broken = "// Fix the JSON body to generate this snippet.";
  return {
    curl,
    ts: bad ? broken : fetchLines.join("\n"),
    py: bad ? broken.replace("//", "#") : python,
  };
}
