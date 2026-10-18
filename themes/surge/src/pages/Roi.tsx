import { Link } from "../router";
import { roiPage } from "../content";
import { RoiModel } from "../components/RoiModel";

export function Roi() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{roiPage.h1}</h1>
          <p className="lede">{roiPage.lede}</p>
        </div>
      </header>
      <section className="section-tight" aria-label="ROI calculator">
        <div className="wrap">
          <RoiModel />
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap two-col">
          {roiPage.explain.map((block) => (
            <div key={block.title} className="prose">
              <h2 className="h-md">{block.title}</h2>
              {block.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="wrap">
          <Link to="/approach" className="text-link">
            How we size and call a test
          </Link>
        </div>
      </section>
    </>
  );
}
