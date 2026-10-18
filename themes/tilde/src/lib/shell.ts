import {
  about,
  brand,
  contact,
  now,
  posts,
  projects,
  resume,
  uses,
} from "../content";

/* tsh: a tiny shell over the site's own content. Paths mirror the routes. */

export type Line =
  | { kind: "cmd"; cwd: string; text: string }
  | { kind: "text"; text: string; tone?: "muted" | "error" }
  | { kind: "links"; items: { label: string; to: string; note?: string }[] };

export type Result = {
  lines: Line[];
  cwd?: string;
  clear?: boolean;
  go?: string;
  scheme?: boolean;
};

type Node =
  | { dir: true; to: string; children: Record<string, Node> }
  | { dir: false; to: string; cat: () => Line[] };

const text = (t: string, tone?: "muted" | "error"): Line => ({
  kind: "text",
  text: t,
  tone,
});

const tree: Node = {
  dir: true,
  to: "/",
  children: {
    projects: {
      dir: true,
      to: "/projects",
      children: Object.fromEntries(
        projects.map((p) => [
          p.slug,
          {
            dir: false,
            to: `/projects/${p.slug}`,
            cat: () => [
              text(`${p.name} · ${p.kind} · ${p.year} · ${p.language}`),
              text(p.summary),
              ...p.facts.map(([k, v]) =>
                text(`  ${k.padEnd(18)}${v}`, "muted"),
              ),
            ],
          },
        ]),
      ),
    },
    writing: {
      dir: true,
      to: "/writing",
      children: Object.fromEntries(
        posts.map((p) => [
          p.slug,
          {
            dir: false,
            to: `/writing/${p.slug}`,
            cat: () => [
              text(`${p.title} (${p.date})`),
              text(p.summary, "muted"),
            ],
          },
        ]),
      ),
    },
    "about.md": { dir: false, to: "/about", cat: () => [text(about.lead)] },
    "now.md": {
      dir: false,
      to: "/now",
      cat: () => [
        text(`Updated ${now.updated}`, "muted"),
        ...now.items.map((i) => text(`${i.title.padEnd(11)}${i.text}`)),
      ],
    },
    "uses.md": {
      dir: false,
      to: "/uses",
      cat: () =>
        uses.map((g) =>
          text(`${g.group}: ${g.items.map((i) => i.name).join(", ")}`),
        ),
    },
    "resume.json": {
      dir: false,
      to: "/resume",
      cat: () =>
        JSON.stringify(
          {
            name: brand.person,
            summary: resume.summary,
            work: resume.experience.map(
              (e) => `${e.title}, ${e.org} (${e.from}–${e.to})`,
            ),
          },
          null,
          2,
        )
          .split("\n")
          .map((l) => text(l)),
    },
    contact: {
      dir: false,
      to: "/contact",
      cat: () => [
        text(`${brand.email} · ${brand.phone}`),
        text(contact.lead, "muted"),
      ],
    },
  },
};

export const commands: Record<string, string> = {
  help: "list commands",
  ls: "list a directory",
  cd: "change directory",
  cat: "print a file",
  open: "go to that page",
  whoami: "who runs this site",
  pwd: "print the current directory",
  history: "commands you have run",
  theme: "switch light / dark",
  hire: "start a conversation",
  clear: "clear the screen",
};

/** Normalise a path against the current directory into segments under ~. */
function resolve(cwd: string, arg = "") {
  const parts = arg.startsWith("~") ? [] : cwd.split("/").slice(1);
  for (const seg of arg.replace(/^~/, "").split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  let node: Node | undefined = tree;
  for (const seg of parts) node = node?.dir ? node.children[seg] : undefined;
  return { node, path: ["~", ...parts].join("/") };
}

function listing(node: Extract<Node, { dir: true }>): Line {
  return {
    kind: "links",
    items: Object.entries(node.children).map(([name, child]) => ({
      label: child.dir ? name + "/" : name,
      to: child.to,
      note: child.dir
        ? `${Object.keys(child.children).length} entries`
        : undefined,
    })),
  };
}

export function run(input: string, cwd: string, history: string[]): Result {
  const [cmd = "", arg] = input.trim().split(/\s+/);
  const target = resolve(cwd, arg);
  const missing = text(`${cmd}: no such file or directory: ${arg}`, "error");

  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: Object.entries(commands).map(([c, d]) =>
          text(`${c.padEnd(9)}${d}`),
        ),
      };
    case "ls":
      if (!target.node) return { lines: [missing] };
      return { lines: [target.node.dir ? listing(target.node) : text(arg)] };
    case "cd":
      if (!arg) return { lines: [], cwd: "~" };
      if (!target.node) return { lines: [missing] };
      if (!target.node.dir)
        return { lines: [text(`cd: not a directory: ${arg}`, "error")] };
      return { lines: [], cwd: target.path };
    case "cat":
      if (!arg)
        return { lines: [text("cat: which file? Try: cat now.md", "error")] };
      if (!target.node) return { lines: [missing] };
      if (target.node.dir)
        return {
          lines: [text(`cat: ${arg} is a directory. Try: ls ${arg}`, "error")],
        };
      return { lines: target.node.cat() };
    case "open":
      if (!target.node) return { lines: [missing] };
      return {
        lines: [text(`opening ${target.path}`, "muted")],
        go: target.node.to,
      };
    case "hire":
      return { lines: [text("opening ~/contact", "muted")], go: "/contact" };
    case "whoami":
      return {
        lines: [
          text(
            `${brand.person}, ${brand.role.toLowerCase()} in ${brand.city}.`,
          ),
          text(brand.status, "muted"),
        ],
      };
    case "pwd":
      return { lines: [text(cwd.replace("~", "/home/" + brand.handle))] };
    case "history":
      return {
        lines: history.map((h, i) =>
          text(`${String(i + 1).padStart(4)}  ${h}`),
        ),
      };
    case "theme":
      return { lines: [text("switched colour scheme", "muted")], scheme: true };
    case "clear":
      return { lines: [], clear: true };
    default:
      return {
        lines: [
          text(
            `tsh: command not found: ${cmd}. Type help for the list.`,
            "error",
          ),
        ],
      };
  }
}

/** Tab completion: command names first, then entries of the directory being typed. */
export function complete(input: string, cwd: string) {
  const words = input.split(" ");
  if (words.length === 1) {
    const hits = Object.keys(commands).filter((c) => c.startsWith(words[0]));
    return hits.length === 1 ? hits[0] + " " : input;
  }
  const partial = words[words.length - 1];
  const slash = partial.lastIndexOf("/");
  const dir = resolve(cwd, partial.slice(0, slash + 1)).node;
  if (!dir?.dir) return input;
  const hits = Object.entries(dir.children).filter(([name]) =>
    name.startsWith(partial.slice(slash + 1)),
  );
  if (hits.length !== 1) return input;
  const [name, node] = hits[0];
  words[words.length - 1] =
    partial.slice(0, slash + 1) + name + (node.dir ? "/" : "");
  return words.join(" ");
}
