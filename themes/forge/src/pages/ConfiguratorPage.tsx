import { Configurator } from "../components/Configurator";
import { Link } from "../router";

export function ConfiguratorPage() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Part configurator</h1>
        <p className="lede">
          Three of the part families we make most, priced live. Change a
          dimension and the drawing, price breaks and lead time follow. Have
          your own drawing already? <Link to="/rfq">Send it as an RFQ</Link>.
        </p>
      </header>
      <section className="wrap section-tight" aria-label="Configure a part">
        <Configurator />
      </section>
      <section className="wrap section faq-mini" aria-labelledby="cfg-faq">
        <h2 id="cfg-faq">How the estimate works</h2>
        <dl>
          <div>
            <dt>Where do the prices come from?</dt>
            <dd>
              Stock size and material price, an estimated cycle time for the
              features you chose, the finish, and a one-off setup spread across
              the quantity. A real quote is priced from CAM cycle times by an
              estimator, so expect it to differ.
            </dd>
          </div>
          <div>
            <dt>Why does the unit price fall so steeply?</dt>
            <dd>
              Programming, fixtures and first-article inspection cost the same
              for one part or a thousand. Above 100 pieces we also run the job
              on pallets, which shortens each cycle.
            </dd>
          </div>
          <div>
            <dt>Can I send this to an estimator?</dt>
            <dd>
              Yes. “Request a quote for this part” opens the RFQ form with this
              spec attached. Add your drawing there if you have one.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
