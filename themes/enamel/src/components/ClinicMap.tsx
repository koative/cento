/** Street plan around the clinic: authored, not to scale. */
export function ClinicMap() {
  return (
    <figure className="clinic-map">
      <svg viewBox="0 0 480 320" role="img" aria-labelledby="map-t">
        <title id="map-t">
          Map: Enamel is on Halden Street at the corner of Larch Street,
          opposite the library. Tram stop Halden &amp; Larch is outside; the
          Library garage is one block west on Ninth.
        </title>
        <rect className="m-ground" width="480" height="320" />
        <rect
          className="m-block"
          x="20"
          y="20"
          width="150"
          height="110"
          rx="4"
        />
        <rect
          className="m-block"
          x="200"
          y="20"
          width="120"
          height="110"
          rx="4"
        />
        <rect
          className="m-block m-park"
          x="350"
          y="20"
          width="110"
          height="110"
          rx="4"
        />
        <rect
          className="m-block"
          x="20"
          y="170"
          width="150"
          height="130"
          rx="4"
        />
        <rect
          className="m-block m-library"
          x="200"
          y="170"
          width="120"
          height="130"
          rx="4"
        />
        <rect
          className="m-block"
          x="350"
          y="170"
          width="110"
          height="130"
          rx="4"
        />
        <path className="m-street" d="M0 150h480M185 0v320M335 0v320" />
        <path className="m-tram" d="M0 144h480" />
        <text className="m-name" x="24" y="164">
          Halden Street
        </text>
        <text
          className="m-name"
          x="191"
          y="300"
          transform="rotate(-90 191 300)"
        >
          Larch Street
        </text>
        <text
          className="m-name"
          x="341"
          y="300"
          transform="rotate(-90 341 300)"
        >
          Ninth Avenue
        </text>
        <text className="m-place" x="260" y="240" textAnchor="middle">
          Library
        </text>
        <text className="m-place" x="405" y="80" textAnchor="middle">
          Halden Green
        </text>
        <g className="m-garage">
          <rect x="378" y="212" width="54" height="40" rx="6" />
          <text x="405" y="238" textAnchor="middle">
            P
          </text>
        </g>
        <g className="m-stop">
          <circle cx="232" cy="144" r="7" />
          <text x="244" y="170">
            Tram 4 · 9
          </text>
        </g>
        <g className="m-pin">
          <path d="M260 60c-14 0-24 10-24 23 0 17 24 37 24 37s24-20 24-37c0-13-10-23-24-23z" />
          <circle cx="260" cy="83" r="8" />
          <text x="260" y="44" textAnchor="middle">
            Enamel · 2nd floor
          </text>
        </g>
      </svg>
    </figure>
  );
}
