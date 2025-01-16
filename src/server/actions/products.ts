"use server";

import { productCountryDiscountsSchema, ProductDetailsSchema } from "@/schema/product";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createProductDb,
  deleteProductDb,
  updateProductDb,
} from "../db/products";
import { redirect } from "next/navigation";
import { updateCountryDiscounts as updateCountryDiscountsDb,

} from "@/server/actions/products"
export async function createProduct(
  unsafeData: z.infer<typeof ProductDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data } = ProductDetailsSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating your product" };
  }
  const { id } = await createProductDb({ ...data, clerkUserId: userId });
  redirect(`/dashboard/products/${id}/edit?tab=countries`);
}
export async function updateProduct(
  id: string,
  unsafeData: z.infer<typeof ProductDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data } = ProductDetailsSchema.safeParse(unsafeData);
  const errorMessage = "There was an error updating  creating your product";

  if (!success || userId == null) {
    return {
      error: true,
      message: errorMessage,
    };
  }

  const isSuccess = await updateProductDb(data, { userId, id });
  return {
    error: !isSuccess,
    message: isSuccess ? "Product details is updated" : errorMessage,
  };
}

export async function deleteProduct(id: string) {
  const { userId } = await auth();
  const errorMessage = "There was a error deleting the product ";
  if (userId == null) {
    return { error: true, message: "There was an error deleting the product" };
  }

  const isSuccess = await deleteProductDb({ id, userId });
  return {
    error: !isSuccess,
    message: isSuccess ? "Successfully deleted the product" : errorMessage,
  };
}


export async function updateCountryDiscounts(
  id: string,
  unsafeData: z.infer<typeof productCountryDiscountsSchema>
) {
  const { userId } = await auth()
  const { success, data } = productCountryDiscountsSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return {
      error: true,
      message: "There was an error saving your country discounts",
    }
  }

  const insert: {
    countryGroupId: string
    productId: string
    coupon: string
    discountPercentage: number
  }[] = []
  const deleteIds: { countryGroupId: string }[] = []

  data.groups.forEach(group => {
    if (
      group.coupon != null &&
      group.coupon.length > 0 &&
      group.discountPercentage != null &&
      group.discountPercentage > 0
    ) {
      insert.push({
        countryGroupId: group.countryGroupId,
        coupon: group.coupon,
        discountPercentage: group.discountPercentage / 100,
        productId: id,
      })
    } else {
      deleteIds.push({ countryGroupId: group.countryGroupId })
    }
  })

  // await updateCountryDiscountsDb(deleteIds, insert, { productId: id, userId })

  return { error: false, message: "Country discounts saved" }
}


// export async function updateCountryDiscounts({
//   id: string,
//   unsafeData: z.infer<typeof productCountryDiscountsSchema>
// ) {
//   const { userId } = auth()
//   const { success, data } = productCountryDiscountsSchema.safeParse(unsafeData)

//   if (!success || userId == null) {
//     return {o
//       error: true,
//       message: "There was an error saving your country discounts",
//     }
//   }

//   const insert: {
//     countryGroupId: string
//     productId: string
//     coupon: string
//     discountPercentage: number
//   }[] = []
//   const deleteIds: { countryGroupId: string }[] = []

//   data.groups.forEach(group => {
//     if (
//       group.coupon != null &&
//       group.coupon.length > 0 &&
//       group.discountPercentage != null &&
//       group.discountPercentage > 0
//     ) {
//       insert.push({
//         countryGroupId: group.countryGroupId,
//         coupon: group.coupon,
//         discountPercentage: group.discountPercentage / 100,
//         productId: id,
//       })
//     } else {
//       deleteIds.push({ countryGroupId: group.countryGroupId })
//     }
  // })
