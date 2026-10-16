import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Plus,
  Minus,
  Check,
  ChevronDown,
} from "lucide-react";
import camera from "./assets/camera.jpg";
import ceramics from "./assets/ceramics.jpg";
import landscape from "./assets/landscape.jpg";
const lots = [
  {
    name: "The everyday camera",
    category: "Photography",
    image: camera,
    alt: "Black camera photographed against a dark background",
    number: "014",
    maker: "A study in form and function",
    estimate: "240–380",
    start: 245,
    description:
      "An object for noticing. A camera form selected for our fictional collection of tools that turn everyday moments into something worth keeping.",
    condition:
      "Illustrative lot. Image is representative; no physical item is being offered.",
  },
  {
    name: "Quiet vessels",
    category: "Objects",
    image: ceramics,
    alt: "Handcrafted ceramic vessels",
    number: "015",
    maker: "Objects for the everyday table",
    estimate: "120–200",
    start: 130,
    description:
      "Glazed forms, gentle imperfections. A study of functional ceramics and the small rituals that make a table feel like home.",
    condition:
      "Concept collection. Exact materials and maker are unspecified in this demonstration.",
  },
  {
    name: "The long view",
    category: "Editions",
    image: landscape,
    alt: "Mountain landscape with mist and sunlit valleys",
    number: "016",
    maker: "A photographic landscape study",
    estimate: "80–140",
    start: 90,
    description:
      "A moment of distance, printed in the imagination. An illustrative landscape edition for a wall that could use a wider horizon.",
    condition:
      "Demonstration imagery. No edition, certificate or artwork is available for sale.",
  },
];
export default function App() {
  const [selected, setSelected] = useState(0),
    [watched, setWatched] = useState<number[]>([]),
    [bids, setBids] = useState([245, 130, 90]),
    [offer, setOffer] = useState(265),
    [message, setMessage] = useState(""),
    [details, setDetails] = useState(false);
  const lot = lots[selected];
  function choose(i: number) {
    setSelected(i);
    setOffer(bids[i] + 20);
    setMessage("");
    setDetails(false);
  }
  return (
    <>
      <header>
        <a className="brand" href="#">
          gavel<span>Objects. Stories. Possibilities.</span>
        </a>
        <nav>
          <a href="#catalog">The collection</a>
          <a href="#how">How it works</a>
          <span className="watch-count">
            <Heart size={15} /> {watched.length}
          </span>
        </nav>
      </header>
      <main>
        <section className="opening">
          <h1>
            Objects with
            <br />
            <em>another chapter.</em>
          </h1>
          <div>
            <p>
              A considered collection of things
              <br />
              worth looking at twice.
            </p>
            <a href="#catalog">
              Explore the open collection <ArrowRight size={18} />
            </a>
          </div>
        </section>
        <div className="sale-line">
          <span>The everyday collection</span>
          <span>Three illustrative lots · An auction house concept</span>
          <span>Autumn edition</span>
        </div>
        <section id="catalog" className="lot-layout">
          <div className="lot-image">
            <img src={lot.image} alt={lot.alt} />
            <span className="lot-stamp">
              LOT
              <br />
              <strong>{lot.number}</strong>
            </span>
            <button
              className="watch"
              aria-label={
                watched.includes(selected)
                  ? "Remove from watchlist"
                  : "Add to watchlist"
              }
              aria-pressed={watched.includes(selected)}
              onClick={() =>
                setWatched(
                  watched.includes(selected)
                    ? watched.filter((i) => i !== selected)
                    : [...watched, selected],
                )
              }
            >
              <Heart
                size={20}
                fill={watched.includes(selected) ? "currentColor" : "none"}
              />
            </button>
            <span className="image-caption">
              Illustrative photography · fictional auction
            </span>
          </div>
          <div className="lot-content">
            <div className="lot-nav" role="tablist" aria-label="Auction lots">
              {lots.map((l, i) => (
                <button
                  key={l.number}
                  role="tab"
                  aria-selected={selected === i}
                  onClick={() => choose(i)}
                >
                  {l.number}
                  <span>{l.category}</span>
                </button>
              ))}
            </div>
            <div className="lot-description" role="tabpanel">
              <h2>{lot.name}</h2>
              <p className="maker">{lot.maker}</p>
              <p>{lot.description}</p>
              <div className="estimate">
                <span>Illustrative estimate</span>
                <span>€{lot.estimate}</span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (offer < bids[selected] + 20) {
                    setMessage(
                      "Please enter at least €" + (bids[selected] + 20) + ".",
                    );
                    return;
                  }
                  setBids(bids.map((b, i) => (i === selected ? offer : b)));
                  setOffer(offer + 20);
                  setMessage(
                    "Your demo bid of €" +
                      offer +
                      " is recorded locally. No payment or real bid was placed.",
                  );
                }}
              >
                <div className="current">
                  <span>Current demo bid</span>
                  <strong>€{bids[selected]}</strong>
                </div>
                <label className="offer">
                  Your next bid (€)
                  <div>
                    <button
                      type="button"
                      aria-label="Lower bid"
                      disabled={offer <= bids[selected] + 20}
                      onClick={() =>
                        setOffer(Math.max(bids[selected] + 20, offer - 20))
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      aria-label="Bid amount"
                      type="number"
                      step="1"
                      min={bids[selected] + 20}
                      required
                      value={offer}
                      onChange={(e) => setOffer(+e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label="Raise bid"
                      onClick={() => setOffer(offer + 20)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </label>
                <button className="bid-button">
                  Place a demo bid <ArrowUpRight size={19} />
                </button>
                {message && (
                  <p className="bid-message" role="status">
                    <Check size={17} />
                    {message}
                  </p>
                )}
                <p className="small-print">
                  No account. No payment. Just a demonstration.
                </p>
              </form>
              <button
                className="condition"
                aria-expanded={details}
                onClick={() => setDetails(!details)}
              >
                Condition &amp; provenance <ChevronDown size={17} />
              </button>
              {details && <p className="condition-content">{lot.condition}</p>}
            </div>
          </div>
        </section>
        <section id="how" className="how">
          <h2>
            A little history.
            <br />A new beginning.
          </h2>
          <div>
            <h3>Find what speaks to you.</h3>
            <p>
              Browse the collection and save the objects you want to come back
              to. Each lot opens a different part of the story.
            </p>
          </div>
          <div>
            <h3>Try the auction rhythm.</h3>
            <p>
              Choose an amount, place a local demo bid, and see the next
              increment. A simple interaction built for a thoughtful collection.
            </p>
          </div>
        </section>
        <section className="closing">
          <span>Good objects deserve another story.</span>
          <a href="#catalog">
            Start yours <ArrowUpRight size={24} />
          </a>
        </section>
      </main>
      <footer>
        <a href="../../">
          Elseform collection <ArrowUpRight size={14} />
        </a>
        <span>
          Gavel is a fictional auction house. All lots and prices are
          illustrative.
        </span>
      </footer>
    </>
  );
}
