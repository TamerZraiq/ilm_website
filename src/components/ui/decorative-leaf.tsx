"use client";

interface DecorativeLeafProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  opacity?: number;
}

export function DecorativeLeaf({
  className = "",
  style,
  size = 24,
  opacity = 0.7,
}: DecorativeLeafProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2C8 2 4 6.5 4 12c0 4 2.5 7.5 8 10 5.5-2.5 8-6 8-10 0-5.5-4-10-8-10Z"
        fill="#C9A84C"
        fillOpacity={opacity}
      />
    </svg>
  );
}
