import { auth } from "@clerk/nextjs/server";
import { notFound  } from "next/navigation";
import {
  getProduct,
 
  getProductCustomization,
} from "@/server/db/products"
import {  getProductCountryGroups} from "@/server/db/products"
import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import { CountryDiscountsForm } from "@/app/dashboard/_components/form/CountryDiscountForm";
import { ProductDetailsForm } from "@/app/dashboard/_components/form/ProductDetailsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { canCustomizeBanner, canRemoveBranding } from "@/server/premission";
import { ProductCustomizationForm } from "@/app/dashboard/_components/form/ProductCustomizationForm";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: Record<string, string | undefined>;
}) {
  // Await asynchronous properties
  const { productId } = params;
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const product = await getProduct({ id: productId, userId });
  if (product == null) return notFound();

  const tab = searchParams?.tab ?? "details";

  return (

    <PageWithBackButton
      BackButtonHref="/dashboard/products"
      PageTitle={"Edit Product"} 
    >
      <Tabs defaultValue={tab}>
        <TabsList className="bg-background/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="countries">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailsTab product={product} />
        </TabsContent>
        <TabsContent value="countries">
          <CountryTab productId={productId} userId={userId} />
        </TabsContent>
        <TabsContent value="customization">
          <CustomizationsTab productId={productId} userId={userId} />
        </TabsContent>
      </Tabs>
    </PageWithBackButton>
  );
}

function DetailsTab({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  return (
    <section className="rounded-lg border bg-card text-card-foreground shadow">
      <Card className="rounded-lg border bg-card text-card-foreground shadow">
        <CardHeader>
          <CardTitle className="text-xl">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductDetailsForm product={product} />
        </CardContent>
      </Card>
    </section>
  );
}

async function CountryTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const countryGroups = await getProductCountryGroups({
    productId,
    userId,
  });
  console.log(countryGroups);
  return (
    <section className="rounded-xl border bg-card text-card-foreground shadow ">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Country Discounts</CardTitle>
          <CardDescription className="w-auto">
            Leave the discount field blank if you do not want to display deals
            for any specific parity group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CountryDiscountsForm
            productId={productId}
            countryGroups={countryGroups}
          />

          
        </CardContent>
      </Card>
    </section>
  );
}

async function CustomizationsTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const customization = await getProductCustomization({ productId, userId });

  if (customization == null) return notFound();
const canRemove = await canRemoveBranding(userId)
  return (
    <section className="rounded-xl border bg-card text-card-foreground shadow">
      <Card>
      <CardHeader>
        <CardTitle className="text-xl">Banner Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductCustomizationForm
        // canRemoveBranding={canRemove}
// canCustomizeBanner={await canCustomizeBanner(userId)}
          canRemoveBranding={await canRemoveBranding(userId)}
          canCustomizeBanner={await canCustomizeBanner(userId) } // || true 
          customization={customization}
        />
      </CardContent>
    </Card>
    </section>
  );
}

