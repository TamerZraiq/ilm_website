/** Decorative marks lifted from the brand logo. Pure presentational SVG —
 *  no hooks, no state, so no client boundary of their own. */
interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
}

export function LeafHorizontal({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 190 77" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M87.804 73.4829C45.9102 64.0893 27.9126 50.8488 0.803955 19.9829C39.3346 0.762144 61.7858-3.51118 103.804 3.98288C142.618 12.4738 160.826 24.5753 188.304 56.4829C152.676 75.2495 130.794 79.39 87.804 73.4829Z" fill="currentColor" />
    </svg>
  );
}

export function LeafMedium({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 46 71" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M8.7713 27.6512C1.33043 40.3316-0.226453 49.6954 0.771302 69.6512C18.8188 64.4442 27.1121 57.9303 38.2713 39.1512C45.2865 22.3264 46.6553 13.8344 43.7713 0.651215C29.3795 5.47702 21.5941 10.4247 8.7713 27.6512Z" fill="currentColor" />
    </svg>
  );
}

export function StarSmall({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 36 34" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M18.5 33.5H17L11 22.5L2 21.5L0.5 21V19.5L9 10.5L7 2.5V0.5H9L17 5H19L27 0.5H28.5L29 2L27 11.5L27.5 13L34 19L35 21L34 22.5H23.5L18.5 33.5Z" fill="currentColor" />
    </svg>
  );
}

export function StarLarge({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 93 89" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M29.5 59.5521L1.5 55.5521L0.5 54.0521V52.0521L21 31.0521L17.5 2.55209L18.5 0.552094H21L46.5 13.0521L71.5 1.05209L74 0.552094L75.5 2.55209L71.5 31.5521L90.5 50.5521L91.5 52.0521L92 54.0521L90.5 56.5521L62.5 60.0521L47 87.5521H44.5L29.5 59.5521Z" fill="currentColor" />
    </svg>
  );
}
