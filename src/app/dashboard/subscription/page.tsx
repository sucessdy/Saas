// import PricingCard from "@/components/PricingCard";
import HoveredGradient from "@/app/(marketing)/_components/HoveredGradient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  subscriptionTiers,
  subscriptionTiersInOrder,
  TierNames,
} from "@/data/SubscriptionTiers";

import { formatterCompactNumber } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { createCancelSession, createCheckoutSession, createCustomerPortalSession } from "@/server/actions/stripe";
import { getProductCount } from "@/server/db/products";
import { getProductViewCount } from "@/server/db/productViews";
import { getUserSubscriptionTier } from "@/server/db/subScriptions";
import { auth } from "@clerk/nextjs/server";
import { startOfMonth } from "date-fns";
import { CheckIcon } from "lucide-react";
import { ReactNode } from "react";
export default async function SubscriptionPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  const tier = await getUserSubscriptionTier(userId);

  const productCount = await getProductCount(userId);

  const pricingViewCount = await getProductViewCount(
    userId,
    startOfMonth(new Date())
  );

  return (
    <>
      <h1 className="mt-12 text-2xl md:text-3xl font-semibold ">
        Your Subscription
      </h1>
      <div className="flex flex-col mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <Card className="">
              <CardHeader>
                <CardTitle> Monthly Usage</CardTitle>
                <CardDescription>
                  {formatterCompactNumber(pricingViewCount)} /{" "}
                  {formatterCompactNumber(tier.maxNumberOfVisits)} visit the
                  page
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Progress
                  value={(pricingViewCount / tier.maxNumberOfVisits) * 100}
                />
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <Card>
              <CardHeader>
                <CardTitle> Number of Products</CardTitle>
                <CardDescription>
                  {productCount} / {tier.maxNumberOfProducts} product created
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Progress
                  value={(productCount / tier.maxNumberOfProducts) * 100}
                />
              </CardContent>
            </Card>
          </div>
          {tier != subscriptionTiers.Free && (
            <Card>
              <CardHeader>
                <CardTitle>Your currently on the {tier.name} plan</CardTitle>{" "}
                <CardDescription>
                  If you like to upgrade, or cancel , change the payment pls,
                  use the below button
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  action={async (formData: FormData) => {
                    await createCustomerPortalSession();
                  }}
                >
                  <Button variant="accent" className="text-lg rounded-lg">
                    Manage Subscription{" "}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl gap-4  mt-11">
        {" "}
        {subscriptionTiersInOrder.map((t) => (
          <PricingCard key={t.name} currentTierName={tier.name} {...t} />
        ))}{" "}
      </div>
    </>
  );
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
  currentTierName,
}: (typeof subscriptionTiersInOrder)[number] & { currentTierName: TierNames }) {
  const isCurrent = currentTierName === name;

  return (
  <> 
      <HoveredGradient
        containerClassName="w-full mx-auto rounded-xl"
        className="h-full w-full bg-black   flex flex-col justify-between"
        as="div"
        duration={2}
        clockwise={true}
      >
        <Card className="w-full h-full flex flex-col items-center rounded-xl  text-card-foreground min-h-[400px] ">
          <CardHeader>
            <CardTitle>
              <div className="bg-gradient-to-br from-purple-600 to-neutral-500  py-4 bg-clip-text text-xl font-medium tracking-tight text-transparent">
                {" "}
                {name}
              </div>
              ${(priceInCents / 100).toFixed(2)} /mo
            </CardTitle>
            <CardDescription>
              {formatterCompactNumber(maxNumberOfVisits)}
              {canAccessAnalytics ? " Includes Analytics" : " No Analytics"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* <form
          action={
         
            name === "Free"
              ? createCancelSession
              : createCheckoutSession.bind(null, name)
            
          }
            > */}
<form action={createCheckoutSession}>
  <input type="hidden" name="tier" value={name} />


              <Button
                className="text-sm cursor-pointer  w-full rounded-full px-4   py-4 backdrop-blur-3xl"
                disabled={isCurrent}
              >
                {isCurrent ? "Current" : "Swap"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col  gap-4 items-left">
            <div className="w-full relative h-full flex items-center gap-2 text-center text-white/40 text-xs uppercase mb-4">
              <div className="w-2 h-[.30rem] bg-white/20 rounded-full border border-gray-500/10 ">
                {" "}
              </div>
              <div className="w-[50%] h-px  bg-white/20  flex "> </div>
              Features
              <div className="w-[50%] h-px  bg-white/20  "> </div>
              <div className="w-2 h-[.30rem] bg-white/20 rounded-full border border-gray-500/10 ">
                {" "}
              </div>
            </div>
            <Feature>
              {maxNumberOfProducts}
              {maxNumberOfProducts == 1 ? " product " : " products"}
            </Feature>
            {canAccessAnalytics && <Feature> Access Analytics </Feature>}
            {canCustomizeBanner && <Feature> Banner Customization</Feature>}
            {canRemoveBranding && <Feature> Remove ArcBot Branding</Feature>}
          </CardFooter>
        </Card>
      </HoveredGradient>
    </>
  );
}

function Feature({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex   items-center gap-2", className)}>
      <CheckIcon className="size-4 p-px max-w-sm  mx-auto  rounded-full border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-violet-300/5 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group" />

      <span> {children} </span>
    </div>
  );
}
