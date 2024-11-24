'use client'
import { BrandLogo } from "@/components/ui/BrandLogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TfiLineDouble } from "react-icons/tfi";

export default function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleClick = () => setIsOpenMenu(!isOpenMenu)
  return (
    <header className="mr-auto items-center gap-10 shadow-2xl  fixed p-6 top-0 w-full z-10 bg-black/15 backdrop-blur-md text-balance  ">
      <nav className="mr-auto container flex items-center font-medium gap-10  ">
        <Link className="mr-auto" href="dashboard">
          {" "}
          <BrandLogo
            className="text-4xl font-bold text-white"
            words={["ArcBot", "ArcLabs"]}
            framerProps={undefined}
          />
        </Link>

        <button onClick={handleClick} className="md:hidden block z-50  ">
          {" "}
          {isOpenMenu ? <AiOutlineClose  className="size-5 md:size-7"/> : <TfiLineDouble  className="size-5 md:size-7"/>}
        </button>

{/* Desktop */}
        <Link href="dashboard/products" className=" hidden md:flex text-lg font-medium">
            {" "}
          Products{" "}
          </Link>
        <Link href="dashboard/analytics" className=" hidden md:flex text-lg font-medium">
            {" "}
    Analytics{" "}
          </Link>
        <Link href="dashboard/subscriptions" className=" hidden md:flex text-lg font-medium">
            {" "}
     Subscriptions{" "}
          </Link>

          <UserButton/>
          {/* mobile */}
{isOpenMenu && 
(          <div className="fixed inset-0 z-20  flex items-center justify-center w-full md:w-auto bg-black/95 backdrop-blur-4xl md:hidden  h-full  overflow-hidden-y  [perspective:800px]  group isolate  flex-col   shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] ">
          
            <div className="flex flex-col pt-24 space-y-2  mr-auto pl-12 bg-gradient-to-t inset-x-0  bg-black  relative" >
              <Link
             href="dashboard/products"
                onClick={handleClick}
                className="link link--metis  text-lg font-medium text-white hover:text-white/70 "
               >
                Products{" "}
              </Link>
              <Link
                href="dashboard/analytics"
                onClick={handleClick}
                className="link link--metis  text-lg font-medium text-white hover:text-white/70"
               >
              Analytics{" "}
              </Link>
              <Link 
               href="dashboard/subscriptions"
                onClick={handleClick}
                className="link link--metis text-lg font-medium text-white hover:text-white/70" 
               >
           Subscriptions
              </Link>
             
                
             
            </div>
          </div>
)}
      </nav>
    </header>
  );
}
