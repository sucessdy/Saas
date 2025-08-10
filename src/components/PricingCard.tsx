"use client";
import { formatterCompactNumber } from "@/lib/formatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import HoveredGradient from "@/app/(marketing)/_components/HoveredGradient";

export default function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
}: {
  name: string;
  priceInCents: number;
  maxNumberOfProducts: number;
  maxNumberOfVisits: number;
  canAccessAnalytics: boolean;
  canCustomizeBanner: boolean;
  canRemoveBranding: boolean;
}) {
  const isMostPopular = name === "Standard";

  const [btn, setBtn] = useState(false);
  const handleClick = () => {
    setBtn(!btn);
  };

  return (
    <>
      <HoveredGradient
        containerClassName="w-full mx-auto rounded-xl"
        className="h-full w-full bg-black   flex flex-col justify-between"
        as="div"
        duration={2}
        clockwise={true}
      >
        <Card className="w-full h-full flex flex-col items-center rounded-xl  text-card-foreground min-h-[400px]">
          <CardHeader>
            <CardTitle>
              <div className="bg-gradient-to-br from-purple-600 to-neutral-500  py-4 bg-clip-text text-xl font-medium tracking-tight text-transparent">
                {" "}
                {name}
              </div>
              ${(priceInCents / 100).toFixed(2)} /mo
            </CardTitle>
            <CardDescription>
              {formatterCompactNumber(maxNumberOfVisits)}
              {canAccessAnalytics ? " Includes Analytics" : " No Analytics"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignUpButton>
              <Button
                className="text-sm cursor-pointer  w-full rounded-full px-4   py-4 backdrop-blur-3xl"
                variant={isMostPopular ? "accent" : "outline"}
                onClick={handleClick}
              >
                {btn ? "Sign Up" : "Get Started"}
              </Button>
            </SignUpButton>
          </CardContent>
          <CardFooter className="flex flex-col  gap-4 items-left">
            <div className="w-full relative h-full flex items-center gap-2 text-center text-white/40 text-xs uppercase mb-4">
              <div className="w-2 h-[.30rem] bg-white/20 rounded-full border border-gray-500/10 ">
                {" "}
              </div>
              <div className="w-[50%] h-px  bg-white/20  flex "> </div>
              Features
              <div className="w-[50%] h-px  bg-white/20  "> </div>
              <div className="w-2 h-[.30rem] bg-white/20 rounded-full border border-gray-500/10 ">
                {" "}
              </div>
            </div>
            <Feature>
              {maxNumberOfProducts}
              {maxNumberOfProducts == 1 ? " product " : " products"}
            </Feature>

            {canCustomizeBanner && <Feature> Banner Customization</Feature>}
            {canRemoveBranding && <Feature> Remove ArcBot Branding</Feature>}
          </CardFooter>
        </Card>
      </HoveredGradient>
    </>
  );
}

function Feature({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return ( 

    
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 p-px max-w-sm  mx-auto  rounded-full border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-violet-300/5 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group" />

      <span> {children} </span>
    </div>
  );
}
