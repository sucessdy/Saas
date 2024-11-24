"use server";

import { ProductDetailsSchema } from "@/schema/product";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createProductDb, deleteProductDb } from "../db/products";
import { redirect } from "next/navigation";

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
