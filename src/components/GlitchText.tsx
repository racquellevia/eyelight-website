"use client";

import { useEffect, useState } from "react";

export function GlitchText({
  text,
  lines,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  lines?: readonly [string, string];
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(id);
  }, []);

  const skew = tick % 3 === 0 ? "glitch-active" : "";

  return (
    <Tag
      className={`glitch ${skew} ${className}`}
      data-text={text}
      aria-label={text}
    >
      {lines ? (
        <>
          {lines[0]}
          <br />
          {lines[1]}
        </>
      ) : (
        text
      )}
    </Tag>
  );
}
