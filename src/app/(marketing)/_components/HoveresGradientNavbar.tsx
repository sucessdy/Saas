"use client";
import React, { useState, useEffect } from "react";
 
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export default function HoveredGradientNavbar({
    children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1, 
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    duration?: number;
    clockwise?: boolean;
    className?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hover, setHover] = useState<boolean>(false);
  const [directions, setDirections] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(186,85,211 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #393BB2 0%, rgba(128,0,128, 0) 100%)";
    

  useEffect(() => {
    if (!hover) {
      const interval = setInterval(() => {
        setDirections((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hover]);
  return (
    <> 
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "relative rounded-sm border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 justify-center  p-px decoration-clone w-full h-auto flex  overflow-y-hidden",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full text-white z-10 bg-black px-4 py-2 rounded-[inherit] overflow-y-hidden",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[directions] }}
        animate={{
          background: hover
            ? [movingMap[directions], highlight]
            : movingMap[directions],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[1px]" />
    </Tag>
    </>
  );
}
