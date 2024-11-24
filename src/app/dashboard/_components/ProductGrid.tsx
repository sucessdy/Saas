import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import AddToSiteProductModalContent from "./AddToSiteProductModalContent";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteProductAlertDialogContent } from "./DeleteProductAlertDialogContent";

export function ProductGrid({
  products,
}: {
  products: {
    id: string;
    name: string;
    url: string;
    description?: string | null;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
      {" "}
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}{" "}
    </div>
  );
}
export function ProductCard({
  id,
  name,
  url,
  description,
}: {
  id: string;
  name: string;
  url: string;
  description?: string | null;
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto  border bg-card rounded-xl flex flex-col justify-between"
      )}
    >
      <Card>
        <CardHeader>
          <div className="flex gap-2 justify-between items-end">
            <CardTitle>
              <Link href={`/dashboard/products/${id}/edit`}>{name}</Link>
            </CardTitle>
            <Dialog>
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="size-8 p-0">
                      <div className="sr-only">Action Menu</div>
                      <DotsHorizontalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/products/${id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DialogTrigger>
                      <DropdownMenuItem>Add To Site</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteProductAlertDialogContent id={id} />
              </AlertDialog>
              <AddToSiteProductModalContent id={id} />
            </Dialog>
          </div>
          <CardDescription>{url}</CardDescription>
        </CardHeader>
        {description && <CardContent>{description}</CardContent>}
      </Card>
    </div>
  );
}
