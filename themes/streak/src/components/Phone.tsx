import { useState, type ReactNode } from "react";
import {
  BarChart3,
  BatteryFull,
  CalendarCheck,
  Camera,
  Check,
  ChevronLeft,
  Download,
  Flashlight,
  Grid3x3,
  KeyRound,
  Lock,
  ShieldCheck,
  Trash2,
  User,
  Wifi,
} from "lucide-react";
import {
  brand,
  buddies,
  chainView,
  eveningHabits,
  graceView,
  habits,
  insights,
  month,
  notifications,
  week,
  type Habit,
  type Screen,
} from "../content";
import { analyse, inChain, type Mark } from "../lib/chain";
import { Cross } from "./marks";

/**
 * A phone drawn in CSS. Everything inside is sized in em off a container-query
 * font size, so one mockup scales cleanly from a 150px thumbnail to the hero.
 * Static mockups pass `label` and become a single described image.
 */
export function Phone({
  screen,
  label,
  interactive,
  className = "",
}: {
  screen: Screen;
  label?: string;
  interactive?: boolean;
  className?: string;
}) {
  const night = screen === "evening" || screen === "lock";
  return (
    <div
      className={`phone ${className}`}
      data-night={night ? "" : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="phone-screen" aria-hidden={label ? true : undefined}>
        <div className="ph-status">
          <span>{screen === "lock" ? "" : "9:41"}</span>
          <span className="ph-island" />
          <span className="ph-sys">
            <Wifi /> <BatteryFull />
          </span>
        </div>
        {screens[screen](Boolean(interactive))}
        {screen !== "lock" && (
          <Tabs
            active={
              screen === "insights"
                ? 2
                : screen === "privacy"
                  ? 3
                  : screen === "chain" ||
                      screen === "grace" ||
                      screen === "buddies"
                    ? 1
                    : 0
            }
          />
        )}
      </div>
    </div>
  );
}

const screens: Record<Screen, (interactive: boolean) => ReactNode> = {
  today: (interactive) => <TodayScreen interactive={interactive} />,
  evening: () => (
    <ListScreen
      title="Evening"
      list={[...eveningHabits].sort((a, b) => Number(a.done) - Number(b.done))}
      sub="2 still open · last call at 21:00"
    />
  ),
  chain: () => <ChainScreen />,
  grace: () => <ChainScreen grace />,
  lock: () => <LockScreen />,
  insights: () => <InsightsScreen />,
  buddies: () => <BuddiesScreen />,
  privacy: () => <PrivacyScreen />,
};

function Tabs({ active }: { active: number }) {
  const tabs = [
    { label: "Today", Icon: CalendarCheck },
    { label: "Chains", Icon: Grid3x3 },
    { label: "Insights", Icon: BarChart3 },
    { label: "You", Icon: User },
  ];
  return (
    <div className="ph-tabs">
      {tabs.map(({ label, Icon }, i) => (
        <span key={label} data-on={i === active ? "" : undefined}>
          <Icon />
          {label}
        </span>
      ))}
    </div>
  );
}

function WeekStrip() {
  return (
    <div className="ph-week">
      {week.dates.map((d, i) => (
        <span key={d} className="ph-day" data-today={i === 6 ? "" : undefined}>
          <small>{week.labels[i]}</small>
          <span
            className="ph-daynum"
            data-grace={week.marks[i] === 2 ? "" : undefined}
          >
            {d}
            {week.marks[i] === 1 && <Cross />}
          </span>
        </span>
      ))}
    </div>
  );
}

function HabitRow({
  habit,
  onToggle,
}: {
  habit: Habit;
  onToggle?: () => void;
}) {
  const body = (
    <>
      <span className="ph-icon">
        <habit.icon />
      </span>
      <span className="ph-name">
        {habit.name}
        <small>
          {habit.chain}-day chain · {habit.when}
        </small>
      </span>
      <span className="ph-check" data-done={habit.done ? "" : undefined}>
        {habit.done && <Check />}
      </span>
    </>
  );
  return onToggle ? (
    <li>
      <button
        type="button"
        className="ph-row"
        aria-pressed={habit.done}
        onClick={onToggle}
      >
        {body}
        <span className="sr-only">
          {habit.done ? ", done today" : ", not done yet"}
        </span>
      </button>
    </li>
  ) : (
    <li className="ph-row">{body}</li>
  );
}

function TodayScreen({ interactive }: { interactive: boolean }) {
  const [list, setList] = useState(habits);
  const done = list.filter((h) => h.done).length;
  const toggle = (id: string) =>
    setList((l) =>
      l.map((h) =>
        h.id === id
          ? { ...h, done: !h.done, chain: h.chain + (h.done ? -1 : 1) }
          : h,
      ),
    );
  return (
    <div className="ph-body">
      <p className="ph-kick">Sunday, October 18</p>
      <p className="ph-title">Today</p>
      <WeekStrip />
      <p className="ph-sub" aria-live={interactive ? "polite" : undefined}>
        {done} of {list.length} done
        {done === list.length ? " · every chain is safe" : ""}
      </p>
      <ul className="ph-list">
        {list.map((h) => (
          <HabitRow
            key={h.id}
            habit={h}
            onToggle={interactive ? () => toggle(h.id) : undefined}
          />
        ))}
      </ul>
      <p className="ph-add">+ New habit</p>
    </div>
  );
}

function ListScreen({
  title,
  sub,
  list,
}: {
  title: string;
  sub: string;
  list: Habit[];
}) {
  return (
    <div className="ph-body">
      <p className="ph-kick">Sunday, October 18 · 21:12</p>
      <p className="ph-title">{title}</p>
      <p className="ph-sub">{sub}</p>
      <ul className="ph-list">
        {list.map((h) => (
          <HabitRow key={h.id} habit={h} />
        ))}
      </ul>
      <p className="ph-foot">Morning habits are tucked away until tomorrow.</p>
    </div>
  );
}

function MiniMonth({ marks }: { marks: Mark[] }) {
  const { states } = analyse(marks);
  return (
    <div className="ph-month">
      {week.labels.map((d, i) => (
        <small key={i}>{d}</small>
      ))}
      {Array.from({ length: month.offset }, (_, i) => (
        <span key={`b${i}`} />
      ))}
      {Array.from({ length: month.days }, (_, i) => (
        <span
          key={i}
          className="ph-cell"
          data-state={states[i] ?? "future"}
          data-link={
            inChain(states[i]) &&
            inChain(states[i + 1]) &&
            (i + month.offset) % 7 !== 6
              ? ""
              : undefined
          }
        >
          {i + 1}
          {states[i] === "done" && <Cross />}
        </span>
      ))}
    </div>
  );
}

function ChainScreen({ grace }: { grace?: boolean }) {
  const view = grace ? graceView : chainView;
  return (
    <div className="ph-body">
      <p className="ph-back">
        <ChevronLeft /> Chains
      </p>
      <p className="ph-title ph-title-sm">{view.habit}</p>
      <div className="ph-count">
        <strong>{view.chain}</strong>
        <span>
          {grace ? "days, at risk" : "day chain"}
          <small>Longest {view.longest}</small>
        </span>
      </div>
      <p className="ph-monthname">{month.name}</p>
      <MiniMonth marks={view.marks} />
      {grace ? (
        <div className="ph-sheet">
          <p className="ph-sheet-title">Missed yesterday?</p>
          <p>
            Spend a grace day to keep your {view.chain}-day chain. You'll earn
            another in 7 days.
          </p>
          <span className="ph-btn ph-btn-grace">Spend grace day</span>
          <span className="ph-btn ph-btn-quiet">Not now</span>
        </div>
      ) : (
        <p className="ph-foot">
          <span className="ph-swatch" /> Grace day on October 10
        </p>
      )}
    </div>
  );
}

function LockScreen() {
  return (
    <div className="ph-body ph-lock">
      <p className="ph-lock-date">
        <Lock /> Sunday, October 18
      </p>
      <p className="ph-lock-time">6:40</p>
      <div className="ph-widget">
        <span className="ph-widget-name">Read 20 pages · 41</span>
        <span className="ph-widget-week">
          {week.marks.map((m, i) => (
            <span key={i} data-grace={m === 2 ? "" : undefined}>
              {m === 1 && <Cross />}
            </span>
          ))}
        </span>
      </div>
      {notifications.map((n) => (
        <div className="ph-note" key={n.title}>
          <span className="ph-note-app">
            <Cross /> {n.app.toUpperCase()}
            <small>{n.time}</small>
          </span>
          <strong>{n.title}</strong>
          <span>{n.body}</span>
        </div>
      ))}
      <div className="ph-lock-tools">
        <span>
          <Flashlight />
        </span>
        <span>
          <Camera />
        </span>
      </div>
    </div>
  );
}

function InsightsScreen() {
  const max = 7;
  return (
    <div className="ph-body">
      <p className="ph-title">Insights</p>
      <p className="ph-pill">{insights.habit}</p>
      <div className="ph-count">
        <strong>{insights.month}%</strong>
        <span>
          of days in October
          <small>September: 79%</small>
        </span>
      </div>
      <svg className="ph-bars" viewBox="0 0 140 70">
        {insights.days.map((d, i) => {
          const h = (d.done / max) * 52;
          return (
            <g key={d.label}>
              <rect
                x={i * 20 + 3}
                y={56 - h}
                width="12"
                height={h}
                rx="2"
                data-low={d.done < 5 ? "" : undefined}
              />
              <text x={i * 20 + 9} y="68" textAnchor="middle">
                {d.label[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="ph-facts">
        <li>
          Usually ticked at <strong>{insights.bestTime}</strong>
        </li>
        <li>
          Wobbly day: <strong>Saturday</strong>
        </li>
        <li>
          Seven-week ticks: <strong>41 of 49</strong>
        </li>
      </ul>
    </div>
  );
}

function BuddiesScreen() {
  return (
    <div className="ph-body">
      <p className="ph-back">
        <ChevronLeft /> Chains
      </p>
      <p className="ph-title ph-title-sm">{buddies.habit}</p>
      <p className="ph-sub">Shared with Maya · last 14 days</p>
      {buddies.people.map((p) => (
        <div className="ph-buddy" key={p.name}>
          <span className="ph-buddy-name">{p.name}</span>
          <span className="ph-buddy-row">
            {p.marks.map((m, i) => (
              <span key={i} data-grace={m === 2 ? "" : undefined}>
                {m === 1 && <Cross />}
              </span>
            ))}
          </span>
        </div>
      ))}
      <p className="ph-foot">Both of you ticked today at 06:52 and 07:05.</p>
    </div>
  );
}

function PrivacyScreen() {
  const rows = [
    { Icon: User, label: "Account", value: "Not required" },
    { Icon: ShieldCheck, label: "Sync", value: "Encrypted · on" },
    { Icon: KeyRound, label: "Recovery key", value: "Saved Oct 2" },
    { Icon: Download, label: "Export", value: "CSV · JSON" },
  ];
  return (
    <div className="ph-body">
      <p className="ph-title">Your data</p>
      <p className="ph-sub">
        Stored on this phone and in an encrypted copy only your devices can
        open.
      </p>
      <ul className="ph-settings">
        {rows.map(({ Icon, label, value }) => (
          <li key={label}>
            <Icon />
            {label}
            <small>{value}</small>
          </li>
        ))}
        <li className="ph-danger">
          <Trash2 /> Delete all data
        </li>
      </ul>
      <p className="ph-foot">
        {brand.name} {brand.version} · no ads, no trackers
      </p>
    </div>
  );
}
