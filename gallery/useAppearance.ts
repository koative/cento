import { useEffect, useState } from "react";
export type Appearance = "system" | "light" | "dark";
const key = "cento-appearance";
function preference(value: string | null): Appearance {
  return value === "light" || value === "dark" ? value : "system";
}
function readPreference(): Appearance {
  try {
    return preference(localStorage.getItem(key));
  } catch {
    return "system";
  }
}
export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(readPreference);
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const theme =
    appearance === "system" ? (systemDark ? "dark" : "light") : appearance;
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const change = () => setSystemDark(media.matches);
    media.addEventListener("change", change);
    change();
    const sync = (event: StorageEvent) => {
      if (event.key === key || event.key === null)
        setAppearance(readPreference());
    };
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", change);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0b0b0d" : "#ffffff");
  }, [theme]);
  function setPreference(next: Appearance) {
    setAppearance(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      /* The current visit still honors the selection. */
    }
  }
  return { appearance, theme, setPreference };
}
