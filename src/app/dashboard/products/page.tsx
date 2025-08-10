import { getProducts } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import NoProducts from "../_components/NoProducts";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductGrid } from "../_components/ProductGrid";

export default async function Products() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();
  const products = await getProducts(userId);
  if (products.length === 0) return <NoProducts />;

  return (
    <>
      <h1 className="mt-20 text-xl md:text-2xl font-medium  flex justify-between ">
        {" "}
        Products
        <Button className=" shadow-xl rounded-lg flex">
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center justify-center px-0 md:px-2 py-2  md:py-4 text-base font-medium text-center"
          >
            <PlusIcon className="size-3 md:size-5 mr-2" /> New Product{" "}
          </Link>{" "}
        </Button>
      </h1>
<div className="mt-4"> 
      <ProductGrid  products={products} />
      </div> 
    </>
  );
}
