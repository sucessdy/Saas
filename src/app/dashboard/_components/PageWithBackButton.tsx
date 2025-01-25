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
    <div className="grid  grid-cols-[auto,1fr] gap-x-4 gap-y-8  ">
      <Button
        className="font-medium  w-5 lg:w-12 shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] text-purple-50 mt-12 rounded-lg "
        variant="outline"
        size="icon"  asChild
      >
        <Link href={BackButtonHref}>
          <span className="sr-only"> </span>
          <IoChevronBack className="size-4" />
        </Link>
      </Button>
      <header>
        <h1 className="text-new">{PageTitle}</h1>
      </header>
      <div className="col-start-2"> {children} </div>
    </div>
  );
}
