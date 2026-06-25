"use client";

interface DecorativeStarProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  opacity?: number;
}

export function DecorativeStar({
  className = "",
  style,
  size = 16,
  opacity = 0.6,
}: DecorativeStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 0l2.2 5.8L16 8l-5.8 2.2L8 16l-2.2-5.8L0 8l5.8-2.2z"
        fill="#C9A84C"
        fillOpacity={opacity}
      />
    </svg>
  );
}
