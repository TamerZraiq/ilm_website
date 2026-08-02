export interface ScatterItem {
  key: string;
  label: string;
  top: string;
  left: string;
  size: string;
  rotate: string;
}

/** Generic bold-scattered-words layout with a centered tagline and a
 *  mobile wrapped-list fallback. Used for both curricula and subjects —
 *  keeps the "real text, not stock photos" treatment consistent without
 *  duplicating the layout for each new list of words. */
export function ScatteredTypography({
  items,
  tagline,
}: {
  items: ScatterItem[];
  tagline: string;
}) {
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      {/* Desktop scatter */}
      <div className="relative hidden h-[560px] md:block">
        {items.map((item) => (
          <span
            key={item.key}
            className={`absolute font-extrabold tracking-tight text-navy ${item.size}`}
            style={{ top: item.top, left: item.left, transform: `rotate(${item.rotate})` }}
          >
            {item.label}
          </span>
        ))}
        <div className="absolute left-1/2 top-1/2 w-full max-w-[26ch] -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <p className="text-2xl text-navy/70 md:text-3xl">{tagline}</p>
        </div>
      </div>

      {/* Mobile fallback: no absolute scatter, just a clean wrapped list */}
      <div className="md:hidden">
        <p className="text-center text-xl text-navy/70">{tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-3">
          {items.map((item) => (
            <span key={item.key} className="text-lg font-extrabold tracking-tight text-navy">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
