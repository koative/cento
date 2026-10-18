import type { Img } from "../content";

type PhotoProps = {
  img: Img;
  caption?: string;
  className?: string;
  eager?: boolean;
};

/** A plate with an optional prospectus-style caption set beneath it. */
export function Photo({
  img,
  caption,
  className = "",
  eager = false,
}: PhotoProps) {
  const image = (
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading={eager ? "eager" : "lazy"}
    />
  );
  if (!caption) return <div className={`photo ${className}`}>{image}</div>;
  return (
    <figure className={`photo ${className}`}>
      {image}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
