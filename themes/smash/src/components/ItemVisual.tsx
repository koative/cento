import type { MenuItem } from "../content";
import { describe, stackLayers } from "../lib";
import { Stack } from "./Stack";

/** A menu item's picture: its photo, else its default stack drawn, else a menu-board panel with the name. */
export function ItemVisual({
  item,
  lazy = true,
}: {
  item: MenuItem;
  lazy?: boolean;
}) {
  if (item.image) {
    return (
      <img
        className="item-photo"
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.w}
        height={item.image.h}
        loading={lazy ? "lazy" : undefined}
      />
    );
  }
  if (item.stack) {
    return (
      <div className="item-drawn">
        <Stack
          fit
          layers={stackLayers(item, item.options)}
          label={`${item.name}: ${describe(item, item.options)}`}
        />
      </div>
    );
  }
  return (
    <div
      className="item-panel"
      data-category={item.category}
      aria-hidden="true"
    >
      <span>{item.name}</span>
    </div>
  );
}
