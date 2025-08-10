import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export function NoPremissionCard({
  children = "You don't have access to perform this action. Try upgrade your account to access this features",
}: {
  children?: ReactNode;
}) {
  return (
    <>

    
 <section className="rounded-lg border bg-card text-card-foreground shadow">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-xl"> Permission Denied </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription> {children}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button >
            <Link href="/dashboard/subscription"> Upgrade Account</Link>
          </Button>
        </CardFooter>
      </Card>
      </section>
    </>
  );
}
