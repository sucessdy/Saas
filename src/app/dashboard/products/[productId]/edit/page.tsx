import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import { CountryDiscountForm } from "@/app/dashboard/_components/form/CountryDiscountForm";
import { ProductDetailsForm } from "@/app/dashboard/_components/form/ProductDetailsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProduct, getProductCountryGroups, getProductCustomization } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function EditPage({
  params: { productId },
  searchParams,
}: {
  params: { productId: string };
  searchParams: Record<string, string | undefined>;
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();


  const tab = searchParams.tab || "details";

  const validTabs = ["details", "countries", "customization"];
  const currentTab = validTabs.includes(tab) ? tab : "details";

  const product = await getProduct({ productId, userId });
  if (!product) return notFound();


  return (
    <PageWithBackButton
      BackButtonHref="/dashboard/products"
      PageTitle={"Edit Products"}
    >
      <Tabs defaultValue={currentTab}>
        <TabsList className="bg-white/10 rounded-xl">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="countries">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailTabs product={product} />
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
function DetailTabs({
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
    <Card>
      <CardHeader>
        <CardTitle className="text-new">Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm product={product} />
      </CardContent>
    </Card>
  );
}

async function CountryTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const countryGroups = await getProductCountryGroups({ productId, userId });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-new">Country Discounts</CardTitle>
        <CardDescription>
          {" "}
          Leave the discount filed if u don't want a discount
        </CardDescription>
      </CardHeader>
      <CardContent>
      <CountryDiscountForm
          productId={productId} countryGroups={[  {countries: [{code: "US" , name: "US"},{code: "IN" , name: "india"},   ], id: "11" , name:"US", recommendedDiscountPercentage: .1}]}          
        />
      </CardContent>
    </Card>
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

  if ( customization === null ) return notFound()


    return (

      <> 
       <Card>
      <CardHeader>
        <CardTitle className="text-xl">Banner Customization</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ProductCustomizationForm
          canRemoveBranding={await canRemoveBranding(userId)}
          canCustomizeBanner={await canCustomizeBanner(userId)}
          customization={customization}
        /> */}
      </CardContent>
      </Card>

      </>
    )
}
