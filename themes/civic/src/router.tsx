import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type RefObject,
} from "react";

/*
 * Hash routes (#/shop/linen-shirt) so the site runs from any static folder
 * without server rewrites. Hashes that are not routes (the skip link's #main)
 * leave the current page in place.
 */
let current = parse(window.location.hash) ?? "/";

function parse(hash: string) {
  if (!hash.startsWith("#/")) return null;
  return decodeURI(hash.slice(1).split("?")[0]).replace(/\/+$/, "") || "/";
}

function subscribe(onChange: () => void) {
  // Every subscriber is told; useSyncExternalStore skips the re-render when the snapshot is unchanged.
  const listener = () => {
    const next = parse(window.location.hash);
    if (next === null) return;
    current = next;
    onChange();
  };
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => current);
}

export function navigate(to: string) {
  window.location.hash = to;
}

/** match("/shop/:id", "/shop/linen") → { id: "linen" }; null when it does not match. */
export function match(pattern: string, path: string) {
  const want = pattern.split("/");
  const got = path.split("/");
  if (want.length !== got.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < want.length; i++) {
    if (want[i].startsWith(":"))
      params[want[i].slice(1)] = decodeURIComponent(got[i]);
    else if (want[i] !== got[i]) return null;
  }
  return params;
}

type LinkProps = { to: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

/** aria-current="page" on the exact page; data-active on its section too (e.g. /shop while on /shop/linen). */
export function Link({ to, ...rest }: LinkProps) {
  const path = useRoute();
  const section = to !== "/" && path.startsWith(to + "/");
  return (
    <a
      href={"#" + to}
      aria-current={path === to ? "page" : undefined}
      data-active={path === to || section ? "" : undefined}
      {...rest}
    />
  );
}

/** After a route change: scroll to top, set the document title, move focus to <main> for screen readers. */
export function usePageChange(
  main: RefObject<HTMLElement | null>,
  title: string,
) {
  const path = useRoute();
  const first = useRef(true);
  useEffect(() => {
    document.title = title;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    main.current?.focus({ preventScroll: true });
  }, [path, title, main]);
}
