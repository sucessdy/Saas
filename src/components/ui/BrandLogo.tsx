"use client";

import { AnimatePresence, HTMLMotionProps } from "framer-motion";
import { DraftingCompass } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotate {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"p">;
  className?: string;
}

export const BrandLogo = ({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  className,
}: WordRotate) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          className={cn(className)}
          {...framerProps}
          initial={{ opacity: 0, y: -0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className="text-xl  flex flex-row justify-center items-center transform transition-transform duration-500 rotate-3d  ">
            <DraftingCompass className="size-5 mr-2" />
            {words[index]}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
