import { removeTrailingSlash } from "@/lib/utils";
import { z } from "zod";

export const ProductDetailsSchema = z.object({
    name: z.string().min(1, "required"),
    url: z.string().min(1, "required").transform(removeTrailingSlash), 
    description: z.string(),
  });
  
  export const productCountryDiscountsSchema = z.object({
    groups: z.array(z.object ({
      countryGroupId: z.string().min(1, "required"), 
      discountPercentage:z 
      .number()
          .max(100)
          .min(1)
          .or(z.nan())
          .transform(n => (isNaN(n) ? undefined : n))
          .optional(),
        coupon: z.string().optional(),
    }))
  })