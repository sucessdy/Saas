"use client";
// import HoveredGradient from "@/app/(marketing)/_components/HoveredGradient";
import HoveredGradientNavbar from "@/app/(marketing)/_components/HoveresGradientNavbar";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TfiLineDouble } from "react-icons/tfi";

export default function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  const handleClick = () => setIsOpenMenu(!isOpenMenu);

  return (
    
    <header className="mr-auto items-center gap-10 shadow-2xl  fixed p-6 top-0 w-full z-10 bg-black/15 backdrop-blur-md text-balance  ">
      <nav className="mr-auto container flex items-center font-medium gap-10  ">
        <Link className="mr-auto" href="/dashboard">
          <BrandLogo
            className="text-2xl sm:text-4xl font-bold text-white"
            words={["ArcBot", "ArcLabs"]}
          />
        </Link>
        <Button variant="outline" onClick={handleClick} className="md:hidden block z-50  ">
          {" "}
          {isOpenMenu ? (
            <AiOutlineClose className="size-5 md:size-7" />
          ) : (
            <TfiLineDouble className="size-5 md:size-7" />
          )}
        </Button>
        {/* Desktop */}
        <Link
          href="dashboard/products"
          className=" hidden md:flex text-lg font-medium"
        >
          {" "}
          Products{" "}
        </Link>
        <Link
          href="dashboard/analytics"
          className=" hidden md:flex text-lg font-medium"
        >
          {" "}
          Analytics{" "}
        </Link>
        <Link
          href="dashboard/subscriptions"
          className=" hidden md:flex text-lg font-medium"
        >
          {" "}
          Subscriptions{" "}
        </Link>

        <UserButton />
        {/* mobile */}
        {isOpenMenu && (
          <div className="fixed inset-0 z-20  flex justify-end  h-[99dvh]  gap-6  w-full bg-black/75 backdrop-blur-4xl md:hidden no-scrollbar overflow-hidden"> 
            <HoveredGradientNavbar containerClassName="rounded-lg" className="flex flex-col justify-center  items-center ">
              <Link
                href="dashboard/products"
                onClick={handleClick}
                className="text-new  "
              >
                Products{" "}
              </Link>
              <Link
                href="dashboard/analytics"
                onClick={handleClick}
                className="text-new "
              >
                Analytics{" "}
              </Link>
              <Link
                href="dashboard/subscriptions"
                onClick={handleClick}
                className="text-new "
              >
                Subscriptions
              </Link>

              <div className="relative inline-flex h-11 overflow-hidden rounded-lg p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 w-[80%] mt-12 ">
                <div className="buttonComponents" />
                <div className=" relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-6   text-sm font-medium text-white backdrop-blur-3xl text-balance ">
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-white hover:text-white/70 "
                    >
                      Dashboard
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="text-lg font-medium text-white">
                        Login
                      </Button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
</HoveredGradientNavbar>
          </div>
        )}
      </nav>
    </header>
  );
}
