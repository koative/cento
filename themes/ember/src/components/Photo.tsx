import type { Photo as P } from "../content";

/** A content photo with intrinsic size; lazy unless it is above the fold. */
export function Photo({
  photo,
  className,
  eager,
}: {
  photo: P;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={photo.src}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
