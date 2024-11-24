import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NoProducts() {
  return (
    <div className="mt-28 flex items-center justify-center flex-col text-balance"> 
    <h1  className="text"> You have no products  </h1>
    <p className="para-short "> Get started with Arcbot by create a Product </p>
    <Button  size="lg"
              className="text-sm relative cursor-pointer  w-[22rem] rounded-full px-4   py-4 backdrop-blur-3xl "
              variant={ "outline" }
           
            > <Link href="/dashboard/products/new" className="text-white "> Add Product </Link></Button>
    </div>
  )
}
