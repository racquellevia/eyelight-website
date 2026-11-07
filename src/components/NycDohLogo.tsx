/** NYC DOH client mark — agency text follows --ink (white in scary mode) */

export function NycDohLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 72"
      role="img"
      aria-label="NYC Department of Health and Mental Hygiene"
      className={className}
    >
      <rect x="0" y="4" width="64" height="64" fill="#0a0a0a" />
      <text
        x="32"
        y="24"
        textAnchor="middle"
        fill="#fafafa"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.02em"
      >
        N
      </text>
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="#fafafa"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.02em"
      >
        Y
      </text>
      <text
        x="32"
        y="60"
        textAnchor="middle"
        fill="#fafafa"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.02em"
      >
        C
      </text>
      <text
        x="80"
        y="30"
        fill="var(--ink)"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="16.5"
        fontWeight="800"
        letterSpacing="0.01em"
      >
        NYC Department of Health
      </text>
      <text
        x="80"
        y="52"
        fill="var(--ink)"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="16.5"
        fontWeight="800"
        letterSpacing="0.01em"
      >
        and Mental Hygiene
      </text>
    </svg>
  );
}
