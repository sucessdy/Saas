import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageWithBackButton } from "../../_components/PageWithBackButton";
import { ProductDetailsForm } from "../../_components/form/ProductDetailsForm";
import { cn } from "@/lib/utils";

export default function NewProductPage() {
  return (
   
    <PageWithBackButton
      PageTitle="Create Products"
      BackButtonHref="/dashboard/products"
    >
       <div
    className={cn(
      "w-full mx-auto  border bg-card rounded-xl flex flex-col justify-between"
    )}
  > 
      <Card className="">
        <CardHeader>
          <CardTitle className="text-xl"> Products details </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductDetailsForm />
        </CardContent>
      </Card>
      </div> 
    </PageWithBackButton>

  );
}
