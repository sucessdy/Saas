import { db } from "@/drizzle/db";
import { ProductCustomizationTable, ProductTable } from "@/drizzle/schema";
import {
  CACHES_TAGS,
  dbCache,
  getIdTag,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, eq } from "drizzle-orm";

export function getProducts(userId: string, { limit }: { limit?: number }) {
  const cacheFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHES_TAGS.products)],
  });
  return cacheFn(userId, { limit });
}

export function getProduct({id, userId} : { id: string, userId: string} ){
    const cacheFn = dbCache(getProductInternal, {
        tags: [getIdTag(id, CACHES_TAGS.products)],
      });
      return cacheFn({id, userId })
}
export async function createProductDb(data: typeof ProductTable.$inferInsert) {
  const [newProduct] = await db
    .insert(ProductTable)
    .values(data)
    .returning({ id: ProductTable.id, userId: ProductTable.clerkUserId });
  try {
    await db
      .insert(ProductCustomizationTable)
      .values({ productId: newProduct.id })
      .onConflictDoUpdate({
        target: ProductCustomizationTable.productId,
        set: { productId: newProduct.id },
      });
  } catch (error) {
    await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id));
    // console.error("Error updating ProductCustomizationTable:", error);
  }

  revalidateDbCache({
    tag: CACHES_TAGS.products,
    userId: newProduct.userId,
    id: newProduct.id,
  });
  return newProduct;
}

export async function deleteProductDb({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const { rowCount } = await db
    .delete(ProductTable)
    .where(and(eq(ProductTable.id, id), eq(ProductTable.clerkUserId, userId)));
if(rowCount > 0 ) {
  revalidateDbCache({
    tag: CACHES_TAGS.products,
    userId,
    id,
  });
}
  return rowCount > 0;
}

export function getProductsInternal(
  userId: string,
  { limit }: { limit?: number }
) {
  return db.query.ProductTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  });
}


export function getProductInternal( {id, userId}: {id: string, userId  : string}
) {
  return db.query.ProductTable.findFirst({
    where: ({ clerkUserId , id: idCol}, { eq, and }) => and(eq(clerkUserId, userId) ,  eq(idCol, id)) 
  });
}