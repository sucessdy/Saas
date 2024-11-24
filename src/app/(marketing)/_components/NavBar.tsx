"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { TfiLineDouble } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { useState } from "react";
import HoveredGradient from "./HoveredGradient";

export default function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <header className="mr-auto items-center gap-10 shadow-2xl  fixed p-6 top-0 w-full z-50 bg-black/15 backdrop-blur-md text-balance">
      <nav className="mr-auto container flex items-center font-medium gap-10        ">
        <Link href="/" className="mr-auto">
          <BrandLogo
            className="text-4xl font-bold text-white"
            words={["ArcBot", "ArcLabs"]}
            framerProps={undefined}
          />
        </Link>

        <button onClick={handleClick} className="md:hidden block z-30 ">
          {" "}
          {isOpenMenu ? (
            <AiOutlineClose className="size-6 md:size-7" />
          ) : (
            <TfiLineDouble className="size-6 md:size-7" />
          )}
        </button>

        {/* ÷Desktop  */}
        <div className="hidden md:flex gap-10 items-center ">
          <Link href="#" className="text-lg font-medium">
            {" "}
            Home{" "}
          </Link>
          <Link href="#" className="text-lg font-medium">
            {" "}
            About{" "}
          </Link>
          <Link href="#pricing" className="text-lg font-medium ">
            {" "}
            Pricing
          </Link>

          <div className="relative inline-flex h-11 overflow-hidden rounded-xl p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ">
            <span className="buttonComponents" />
            <span className=" relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6   text-sm font-medium text-white backdrop-blur-3xl text-balance">
              <SignedIn>
                <Link href="/dashboard"> Dashboard</Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">Login</SignInButton>
              </SignedOut>
            </span>
          </div>
        </div>
        {/* mobile */}
        {isOpenMenu && (
          <div className="fixed inset-0 z-20  flex justify-end  h-[99dvh]  gap-6  w-full bg-black/75 backdrop-blur-4xl md:hidden no-scrollbar overflow-hidden ">
            <HoveredGradient className="flex flex-col justify-center  items-center ">
              <Link
                href="#"
                onClick={handleClick}
                className="text-new "
              >
                <span className="">     Home</span>
           
              </Link>
              <Link
                href="#"
                onClick={handleClick}
                className="text-new "
         
                > <span> 
                  
                  About </span>
              </Link>
              <Link
                href="#pricing"
                onClick={handleClick}
                className="text-new"
                ><span>  

                Pricing

                </span>
              </Link>
              <div className="relative inline-flex h-11 overflow-hidden rounded-xl p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 w-[80%] mt-6">
                <span className="buttonComponents" />
                <span className=" relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6   text-sm font-medium text-white backdrop-blur-3xl text-balance">
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-white hover:text-white/70"
                    >
                      Dashboard
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <span className="text-lg font-medium text-white">
                        Login
                      </span>
                    </SignInButton>
                  </SignedOut>
                </span>
              </div>
            </HoveredGradient>
          </div>
        )}
      </nav>
    </header>
  );
}
