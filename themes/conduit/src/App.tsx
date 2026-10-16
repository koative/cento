import { useState } from "react";
import { Braces, Play, ArrowRight, Check, RotateCcw } from "lucide-react";
export default function App() {
  const [event, setEvent] = useState("order.created");
  const [ran, setRan] = useState(false);
  const [retries, setRetries] = useState(3);
  const [attempts, setAttempts] = useState(0);
  const [tab, setTab] = useState("Payload");
  const eventBody =
    event === "order.created"
      ? {
          event: "order.created",
          order_id: "ord_2048",
          total: 148,
          currency: "USD",
        }
      : {
          event: "customer.updated",
          customer_id: "cus_601",
          segment: "returning",
          email_consent: true,
        };
  return (
    <>
      <a className="skip" href="#main">
        Skip to integration lab
      </a>
      <header>
        <a className="brand" href="#">
          <Braces />
          conduit
        </a>
        <nav>
          <a href="#main">Workbench</a>
          <a href="#reference">Reference</a>
          <span className="sandbox">Sandbox</span>
        </nav>
      </header>
      <main id="main">
        <div className="lab-heading">
          <h1>Make the connection.</h1>
          <p>
            One event. The right destination. A clear view of everything in
            between.
          </p>
        </div>
        <section className="workbench">
          <div className="bench-toolbar">
            <span>storefront → fulfilment</span>
            <span>Local simulation / v1</span>
          </div>
          <div className="flow">
            <div className="node source">
              <small>Source</small>
              <Braces />
              <strong>Storefront</strong>
              <span>Event stream</span>
            </div>
            <div className={"connector " + (ran ? "complete" : "")}>
              <i />
              <span>{ran ? "200 OK" : "Ready"}</span>
            </div>
            <div className="node transform">
              <small>Transform</small>
              <span className="brackets">{"{ }"}</span>
              <strong>Normalize</strong>
              <span>JSON mapping</span>
            </div>
            <div className={"connector " + (ran ? "complete" : "")}>
              <i />
              <span>{ran ? "Delivered" : "Awaiting event"}</span>
            </div>
            <div className="node destination">
              <small>Destination</small>
              <Check />
              <strong>Fulfilment</strong>
              <span>Webhook endpoint</span>
            </div>
          </div>
          <div className="lab-panels">
            <section className="request">
              <h2>Build your event</h2>
              <label>
                Event type
                <select
                  value={event}
                  onChange={(e) => {
                    setEvent(e.target.value);
                    setRan(false);
                  }}
                >
                  <option>order.created</option>
                  <option>customer.updated</option>
                </select>
              </label>
              <label>
                Retry limit
                <select
                  value={retries}
                  onChange={(e) => setRetries(+e.target.value)}
                >
                  <option value="0">No retries</option>
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                </select>
              </label>
              <button
                className="primary"
                onClick={() => {
                  setRan(true);
                  setAttempts(attempts + 1);
                }}
              >
                <Play />
                Run test event
              </button>
              <p className="status" role="status">
                {ran
                  ? `${event} delivered to the local test destination.`
                  : "No network request will be made."}
              </p>
            </section>
            <section className="payload">
              <div className="tabs">
                {["Payload", "Response"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={tab === x}
                    onClick={() => setTab(x)}
                  >
                    {x}
                  </button>
                ))}
                <span>application/json</span>
              </div>
              <pre>
                {tab === "Payload"
                  ? JSON.stringify(eventBody, null, 2)
                  : ran
                    ? JSON.stringify(
                        {
                          status: 200,
                          accepted: true,
                          event: event,
                          retry_limit: retries,
                        },
                        null,
                        2,
                      )
                    : "// Run a test event to see its response."}
              </pre>
            </section>
          </div>
        </section>
        <section id="reference" className="reference">
          <article>
            <h2>Predictable by design.</h2>
            <p>
              Observe the entire path before you connect a production service.
              This workbench is a fully local teaching example.
            </p>
            <dl>
              <div>
                <dt>Events tested</dt>
                <dd>{attempts}</dd>
              </div>
              <div>
                <dt>Current retry policy</dt>
                <dd>{retries === 0 ? "Disabled" : `${retries} attempts`}</dd>
              </div>
            </dl>
          </article>
          <div className="event-log">
            <h3>Execution log</h3>
            {ran ? (
              <div className="log-row">
                <span className="success">Success</span>
                <code>{event}</code>
                <span>Simulation #{attempts}</span>
              </div>
            ) : (
              <p className="log-empty">
                The log is quiet. Run an event to trace its path.
              </p>
            )}
            <div className="reference-line">
              <strong>About retries</strong>
              <p>
                A real integration retries temporary failures. This demo records
                your selected policy without making requests or adding
                artificial delays.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <span>Conduit — fictional integration lab</span>
        <span>Local data. Real interactions.</span>
      </footer>
    </>
  );
}
