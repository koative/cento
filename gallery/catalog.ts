export type Template = {
  slug: string;
  number: number;
  name: string;
  sector: string;
  category: string;
  tagline: string;
  description: string;
  tags: string[];
  pages: { path: string; title: string }[];
  colors: { paper: string; ink: string; accent: string };
  fonts: string[];
};

// Every theme describes itself in themes/<slug>/cento.json; adding a folder adds a card.
const files = import.meta.glob<Omit<Template, "slug">>(
  "../themes/*/cento.json",
  {
    eager: true,
    import: "default",
  },
);

export const catalog: Template[] = Object.entries(files)
  .map(([path, meta]) => ({ ...meta, slug: path.split("/")[2] }))
  .sort((a, b) => a.number - b.number);

export const categories = [
  "Technology",
  "Commerce",
  "Food & Drink",
  "Travel & Stay",
  "Health & Wellness",
  "Services",
  "Creative",
  "Culture & Media",
  "Education & Community",
  "Industry",
];

export const repo = "https://github.com/koative/cento";
export const degit = (t: Template) =>
  `npx degit koative/cento/themes/${t.slug} my-site`;
export const preview = (t: Template) =>
  `${import.meta.env.BASE_URL}previews/${t.slug}.webp`;
export const liveUrl = (t: Template, path = "/") =>
  `${import.meta.env.BASE_URL}themes/${t.slug}/${path === "/" ? "" : "#" + path}`;
export const sourceUrl = (t: Template) => `${repo}/tree/main/themes/${t.slug}`;
