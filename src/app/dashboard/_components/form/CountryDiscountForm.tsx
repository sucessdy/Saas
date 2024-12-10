import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { productCountryDiscountsSchema } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

export function CountryDiscountForm({
  productId,
  countryGroups,
}: {
  productId: string;
  countryGroups: {
    id: string;
    name: string;
    recommendedDiscountPercentage: number | null;
    countries: { name: string; code: string }[];
    discount?: { coupon: string; discountPercentage: number };
  }[];
}) {
  const form = useForm<z.infer<typeof productCountryDiscountsSchema>>({
    resolver: zodResolver(productCountryDiscountsSchema),
    defaultValues: {
      groups: countryGroups.map((group) => {
        const discount =
          group.discount?.discountPercentage ??
          group.recommendedDiscountPercentage;
        return {
          countryGroupId: group.id,
          coupon: group.discount?.coupon ?? "",
          discountPercentage: discount != null ? discount * 100 : undefined,
        };
      }),
    },
  });

  async function onSubmit(
    values: z.infer<typeof productCountryDiscountsSchema>
  ) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {countryGroups.map((group) => (
          <Card id="">
            {" "}
            <CardContent className="pt-2 ">
              {" "}
              <div>
                {" "}
                <h2> {group.name}</h2>
              </div>{" "}
            </CardContent>
          </Card>
        ))}
      </form>
    </Form>
  );
}
