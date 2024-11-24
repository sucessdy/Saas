"use client"
import{ InfiniteMovingText} from "@/components/ui/ InfiniteMovingText";
import { TbBrandNextjs } from "react-icons/tb";
import { FaRust, FaGolang, FaAws, FaDocker } from "react-icons/fa6";

import { FaJsSquare } from "react-icons/fa";
import { RiRemixRunFill } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";

export default function MovingText() {
  return (
    <div className="h-[15rem] rounded-md flex flex-col antialiased bg-secondary-backgound text-primary-foreground   bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingText items={movingText} direction="right" speed="slow" />
    </div>
  );
}

const movingText = [
  {
    id: 0,
    name: "NextJS",
   icons: TbBrandNextjs,
  },
  {
    id: 1,
    name: "Rust",
   icons: FaRust,
  },
  {
    id: 2,
    name: "Go",
   icons: FaGolang,
  },
  {
    id: 3,
    name: "React",
   icons: IoLogoReact,
  },
  {
    id: 4,
    name: "JavaScript",
   icons: FaJsSquare ,
  },
  {
    id: 5,
    name: "Remix",
   icons: RiRemixRunFill ,
  },
  {
    id: 6,
    name: "AWS",
   icons: FaAws,
  },
  {
    id: 7,
    name: "Docker",
   icons: FaDocker,
  },
];
