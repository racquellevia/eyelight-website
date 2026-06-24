"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { midnightCensusTheme } from "../config";
import { CockroachSprite } from "./CockroachSprite";

type RoachSpec = {
  id: string;
  /** 0–1 scroll progress anchor */
  pathStart: number;
  yPercent: number;
  size: number;
  speed: number;
  flip: boolean;
  tint: string;
  photoIndex?: number;
};

const ROACHES: RoachSpec[] = [
  { id: "r1", pathStart: 0, yPercent: 12, size: 56, speed: 1.2, flip: false, tint: "#1a1209", photoIndex: 0 },
  { id: "r2", pathStart: 0.08, yPercent: 78, size: 42, speed: 0.9, flip: true, tint: "#5c1a3e" },
  { id: "r3", pathStart: 0.2, yPercent: 35, size: 64, speed: 1.4, flip: false, tint: "#2e3a87", photoIndex: 1 },
  { id: "r4", pathStart: 0.35, yPercent: 55, size: 38, speed: 1.1, flip: true, tint: "#9b2335" },
  { id: "r5", pathStart: 0.5, yPercent: 22, size: 50, speed: 1.3, flip: false, tint: "#1a6b6b", photoIndex: 2 },
  { id: "r6", pathStart: 0.62, yPercent: 68, size: 46, speed: 0.85, flip: true, tint: "#c45c26" },
  { id: "r7", pathStart: 0.75, yPercent: 42, size: 72, speed: 1.5, flip: false, tint: "#1a1209" },
  { id: "r8", pathStart: 0.88, yPercent: 85, size: 36, speed: 1.0, flip: true, tint: "#5c1a3e" },
];

export function ScurryingRoaches({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      setProgress(scrolled / scrollable);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef]);

  const photos = midnightCensusTheme.roachPhotos;

  return (
    <div className="midnight-census__roach-layer" aria-hidden>
      {ROACHES.map((roach) => {
        const local = Math.min(Math.max((progress - roach.pathStart) / 0.35, 0), 1);
        const x = `${-15 + local * 130 + Math.sin(progress * 20 + roach.pathStart * 10) * 4}vw`;
        const wobble = Math.sin(progress * 40 + roach.yPercent) * 6;
        const photo =
          roach.photoIndex !== undefined ? photos[roach.photoIndex] : undefined;
        const usePhoto = photo?.enabled;

        return (
          <div
            key={roach.id}
            className="midnight-census__roach"
            style={{
              top: `${roach.yPercent}%`,
              left: x,
              transform: `translateY(${wobble}px) rotate(${local * 12 - 6}deg)`,
              opacity: 0.15 + local * 0.85,
            }}
          >
            {usePhoto && photo ? (
              <Image
                src={photo.src}
                alt=""
                width={roach.size * 1.4}
                height={roach.size}
                className="rounded-sm object-cover"
                style={{ width: roach.size * 1.4, height: roach.size }}
              />
            ) : (
              <CockroachSprite size={roach.size} flip={roach.flip} tint={roach.tint} />
            )}
          </div>
        );
      })}
    </div>
  );
}
