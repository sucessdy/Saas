"use client";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";

export const InfiniteMovingText = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { id: number; name: string; icons: React.ComponentType }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  useEffect(() => {
    addAnimation();
  }, [direction, speed]);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const contentRef = Array.from(scrollerRef.current.children);

      contentRef.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setAnimationDirection();
      setAnimationSpeed();

      setStart(true);
    }
  }

  function setAnimationDirection() {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }

  function setAnimationSpeed() {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-1  max-w-7xl  overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4  w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[140px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-4 md:py-5 md:w-[160px] "
            key={item.id}
          >
            <blockquote className="flex flex-row items-center justify-center gap-2 text-center">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <span className=" relative z-20 text-md leading-[1.6] text-white/80 font-semibold ">
                {item.name}
              </span>
              <div className="text-2xl hover:text-xl  text-white/90 animate-none hover:animate-spin ease-in-out scroll-smooth  ">
                <item.icons aria-hidden="true"  />
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default  InfiniteMovingText;
