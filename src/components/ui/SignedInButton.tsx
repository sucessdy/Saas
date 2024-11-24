import { ClerkProvider, SignUpButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./button";
import { ArrowRightIcon } from "lucide-react";

export default function SignedInButton() {
  
  return (
 <>  
      {" "}
      <SignUpButton>
        <Button className="text-sm rounded-xl bg-white text-black p-6 px-6 py-5 flex gap-2">
          {" "}
          Start Your Free Trial <ArrowRightIcon className="size-5" />{" "}
        </Button>
      </SignUpButton>
      </>
  );
}
