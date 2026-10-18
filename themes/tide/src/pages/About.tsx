import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  images,
  reports,
  team,
  timeline,
  trustees,
  values,
} from "../content";
import { money } from "../lib/format";

export function About() {
  const latest = reports[0];
  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Neighbours with buckets, since {brand.founded}</h1>
          <p className="lede">
            Tide began with eleven people, a car boot of bin bags and a Sunday
            low tide on Merrow Bay. It is now a charity of six staff, 1,800
            volunteers and four trustees, still working the same coast.
          </p>
        </div>
        <img
          src={images.reefDiver.src}
          alt={images.reefDiver.alt}
          width={images.reefDiver.w}
          height={images.reefDiver.h}
          className="head-img"
        />
      </header>

      <section className="wrap section prose-grid">
        <div className="prose">
          <h2>The story</h2>
          <p>
            In the winter of 2008 a storm left Merrow Bay knee-deep in rope, net
            and plastic. Morwenna Treloar, then a harbour pilot, put a note
            through her neighbours' doors suggesting they meet at the slipway at
            low water. Eleven came. They filled forty bags and weighed every one
            on the fish market scales.
          </p>
          <p>
            Weighing became counting, counting became evidence, and evidence
            made the case for putting things back. The seagrass and oyster
            programmes grew out of the beach cleans; the strandings network grew
            out of a morning when nobody on the beach knew what to do for a
            stranded dolphin.
          </p>
          <p>
            We are still small on purpose. Most of our work happens in a few
            hours around low water, and most of it is done by people who live
            within sight of the sea.
          </p>
        </div>
        <ul className="values">
          {values.map((v) => (
            <li key={v.title}>
              <strong>{v.title}</strong>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-shallow">
        <div className="wrap">
          <h2>Tide by tide</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>The staff crew</h2>
          <p>
            Six of us, in a net loft on Quay Lane. Everyone on staff still leads
            at least one tide a month.
          </p>
        </div>
        <ul className="crew">
          {team.map((p) => (
            <li key={p.name}>
              <span className="initials" aria-hidden="true">
                {p.name
                  .replace("Dr ", "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <strong>{p.name}</strong>
                <span>{p.role}</span>
                <p>{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section-tight governance">
        <div>
          <h2>Trustees</h2>
          <ul className="trustees">
            {trustees.map((t) => (
              <li key={t.name}>
                <strong>{t.name}</strong>, {t.role}. <span>{t.bio}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Accounts</h2>
          <p>
            Income in {latest.year} was {money(latest.money.income)}. Our
            accounts are independently examined each year and summarised in
            every impact report.
          </p>
          <Link to={`/impact/${latest.year}`} className="text-link">
            {latest.year} impact report <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div>
          <h2>Find us</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <span>{brand.hours}</span>
          </address>
          <p className="quiet">
            Found a stranded animal? Call the same number at any hour and choose
            option 1. Keep people and dogs back and do not push it into the sea.
          </p>
        </div>
      </section>
    </>
  );
}
