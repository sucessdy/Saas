"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productCountryDiscountsSchema } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCountryDiscounts } from "@/server/actions/products";
export function CountryDiscountsForm({
  productId,
  countryGroups,
}: {
  productId: string;
  countryGroups: {
    id: string;
    name: string;
    recommendedDiscountPercentage: number | null;
    countries: {
      name: string;
      code: string;
    }[];
    discount?: {
      coupon: string;
      discountPercentage: number;
    };
  }[];
}) {
  const { toast } = useToast();
  const defaultValues = {
    groups: countryGroups.map((group) => ({
      countryGroupId: group.id,
      coupon: group.discount?.coupon ?? "",
      discountPercentage:
        group.discount?.discountPercentage ??
        group.recommendedDiscountPercentage ??
        undefined,
    })),
  };

  const form = useForm<z.infer<typeof productCountryDiscountsSchema>>({
    resolver: zodResolver(productCountryDiscountsSchema),
    defaultValues,
  });

  async function onSubmit(
    values: z.infer<typeof productCountryDiscountsSchema>
  ) {
    const data = await updateCountryDiscounts(productId, values);

    if (data.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {countryGroups.map((group, index) => (
          <Card key={group.id} className="text-card-foreground shadow">
            <CardContent className=" p-6 pt-6 flex gap-6 items-center border  border-white/10 rounded-lg">
              <div>
                <h2 className="text-muted-foreground gap-6 text-sm md:text-lg  font-semibold mb-2 ">
                  {group.name}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {group.countries.map((country) => (
                    <Image
                      key={country.code}
                      width={24}
                      height={16}
                      alt={country.name}
                      title={country.name}
                   
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
                      className="border"
                    />
                  ))}
                </div>
              </div>
              <Input
                type="hidden"
                {...form.register(`groups.${index}.countryGroupId`)}
              />

              <div className="ml-auto flex-shrink-0 flex gap-2  flex-col w-min ">
                <div className="flex gap-4  ">
                  <FormField
                    control={form.control}
                    name={`groups.${index}.discountPercentage`}
                    render={({ field }) => (
                      <FormItem className="text-sm md:text-lg">
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input
                            className="w-14 md:w-24  "
                            {...field}
                            type="number"
                            // value={field.value ?? "" }
                            value={
                              field.value != null && !isNaN(field.value)
                                ? field.value
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            min="0"
                            max="100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`groups.${index}.coupon`}
                    render={({ field }) => (
                      <FormItem className="text-sm md:text-lg">
                        <FormLabel>Coupon</FormLabel>
                        <FormControl>
                          <Input className=" w-20 md:w-48" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage>
                  {form.formState.errors.groups?.[index]?.root?.message}
                </FormMessage>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="self-end mt-4 rounded-lg">
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
