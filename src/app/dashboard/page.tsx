import { getProducts } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import NoProducts from "./_components/NoProducts";
import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "./_components/ProductGrid";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();
  const products = await getProducts(userId, { limit: 6 });

  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <>
      <h2 className="mb-6 text-xl lg:text-2xl font-medium  flex justify-between">
        <Link
          href="/dashboard/products"
          className="group mt-20 flex gap-2 items-center link link--metis hover:text-white/80 text-md md:text-xl"
        >
          {" "}
          Products{" "}
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />{" "}
        </Link>
        <Button className="mt-20 shadow-xl rounded-lg">
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center justify-center px-0 md:px-2 py-2  md:py-4 text-base font-medium text-center"
          >
            <PlusIcon className="size-3 md:size-5 mr-2" /> New Product{" "}
          </Link>{" "}
        </Button>
      </h2>
      <ProductGrid products={products} />
    </>
  );
}
