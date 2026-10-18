import type { sizeGuide } from "../content";

export function SizeTable({ guide }: { guide: (typeof sizeGuide)[number] }) {
  return (
    <div className="table-scroll">
      <table className="size-table">
        <thead>
          <tr>
            <th scope="col">cm</th>
            {guide.sizes.map((s) => (
              <th scope="col" key={s}>
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {guide.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i} className="num">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
