"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
  color?: string;
  tailLength?: number;
  sizeMin?: number;
  sizeMax?: number;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
  color = "#00ff88", // Default emerald green to match theme
  tailLength = 80,
  sizeMin = 0.5,
  sizeMax = 1.5,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
      return {
        "--angle": angle + "deg",
        "--size": size + "px",
        "--tail-length": tailLength + "px",
        "--color": color,
        top: -5,
        left: `calc(-50% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(
            Math.random() * (maxDuration - minDuration) + minDuration
          ) + "s",
      };
    });
    setMeteorStyles(styles);
  }, [
    number,
    minDelay,
    maxDelay,
    minDuration,
    maxDuration,
    angle,
    color,
    tailLength,
    sizeMin,
    sizeMax,
  ]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute w-[var(--size)] h-[var(--size)] rotate-[var(--angle)] animate-meteor rounded-full bg-[var(--color)] shadow-[0_0_8px_2px_var(--color)]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div
            className="pointer-events-none absolute top-1/2 -z-10 h-[1.5px] -translate-y-1/2 opacity-70"
            style={{
              width: `var(--tail-length)`,
              background: `linear-gradient(90deg, var(--color) 0%, rgba(0, 255, 136, 0.4) 50%, transparent 100%)`,
            }}
          />
        </span>
      ))}
    </>
  );
};
