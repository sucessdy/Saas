import { removeTrailingSlash } from "@/lib/utils";
import { z } from "zod";

export const ProductDetailsSchema = z.object({
    name: z.string().min(1, "required"),
    url: z.string().min(1, "required").transform(removeTrailingSlash), 
    description: z.string(),
  });
  