import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { IoChevronBack } from "react-icons/io5";

export function PageWithBackButton({
  BackButtonHref,
  PageTitle,
  children,
}: {
  BackButtonHref: string;
  PageTitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid  grid-cols-[auto,1fr] gap-x-4 gap-y-8 ">
      {" "}
      <Button
        className="font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] text-purple-50 mt-12"
        variant="outline"
      >
        {" "}
        <Link href={BackButtonHref}>
          {" "}
          <span className="sr-only"> </span>
          <IoChevronBack/>
        </Link>
      </Button>{" "}
      <h1 className="text-new"> {PageTitle}</h1>
      <div className="col-start-2"> {children} </div>
    </div>
  );
}
