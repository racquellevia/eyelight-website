/** Vector cockroach — swap for <Image> when you add photos in config */
export function CockroachSprite({
  size = 48,
  flip = false,
  tint = "#1a1209",
}: {
  size?: number;
  flip?: boolean;
  tint?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 80 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <ellipse cx="40" cy="32" rx="22" ry="14" fill={tint} opacity="0.9" />
      <ellipse cx="40" cy="30" rx="18" ry="10" fill="#3d2e1f" opacity="0.5" />
      <circle cx="62" cy="28" r="7" fill={tint} />
      <path
        d="M62 22 L72 14 M62 28 L74 28 M62 34 L72 42"
        stroke={tint}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 28 L8 18 M18 32 L6 32 M18 36 L8 44"
        stroke={tint}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 18 L24 8 M34 16 L36 6 M44 16 L48 6 M52 18 L56 8"
        stroke={tint}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M28 42 L24 50 M34 40 L36 50 M44 40 L48 50 M52 42 L56 50"
        stroke={tint}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="66" cy="26" r="1.5" fill="#e8a317" />
    </svg>
  );
}
