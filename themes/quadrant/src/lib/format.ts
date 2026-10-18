import { capabilities, people } from "../content";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
export const longDate = (iso: string) =>
  dateFmt.format(new Date(iso + "T12:00:00"));

export const personById = (id: string) => people.find((p) => p.id === id);
export const capabilityBySlug = (slug: string) =>
  capabilities.find((c) => c.slug === slug);

export type Errors = Record<string, string>;
