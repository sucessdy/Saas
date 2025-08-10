import { db } from "@/drizzle/db";
import {
  CountryGroupDiscountTable,
  CountryTable,
  ProductCustomizationTable,
  ProductTable,
} from "@/drizzle/schema";
import {
  CACHES_TAGS,
  dbCache,
  getGlobalTag,
  getIdTag,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import { BatchItem } from "drizzle-orm/batch";

export function getProductCountryGroups({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const cacheFn = dbCache(getProductCountryGroupsInternal, {
    tags: [
      getIdTag(productId, CACHES_TAGS.products),
      getGlobalTag(CACHES_TAGS.countries),
      getGlobalTag(CACHES_TAGS.countryGroups),
    ],
  });
  return cacheFn({ productId, userId });
}

export function getProducts(
  userId: string,
  { limit }: { limit?: number } = {}
) {
  const cacheFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHES_TAGS.products)],
  });
  return cacheFn(userId, { limit });
}

// export function getProductCustomization({
//   productId,
//   userId,
// }: {
//   productId: string;
//   userId: string;
// }) {
//   const cacheFn = dbCache(getProductCustomizationInternal, {
//     tags: [getIdTag(productId, CACHES_TAGS.products )],
//   });

//   async function getProductCustomizationInternal({
//     productId,
//     userId,
//   }: {
//     productId: string;
//     userId: string;
//   }) {
//     return db.query.ProductCustomizationTable.findFirst({
//       // where: ({ productId: id }, { eq }) => eq(id, productId),
//       where: (fields, { eq }) => eq(fields.productId, productId),
//     });
//   }
//   return cacheFn({ productId, userId });
// }
export function getProductCustomization({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const cacheFn = dbCache(getProductCustomizationInternal, {
    tags: [getIdTag(productId, CACHES_TAGS.products)],
  });

  return cacheFn({ productId, userId });
}

export function getProduct({ id, userId }: { id: string; userId: string }) {
  const cacheFn = dbCache(getProductInternal, {
    tags: [getIdTag(id, CACHES_TAGS.products)],
  });

  return cacheFn({ id, userId });
}


export function getProductCount(userId: string ) {
  const cacheFn = dbCache(getProductCountInternal, {
    tags: [getIdTag(userId, CACHES_TAGS.products)],
  });

  return cacheFn( userId );
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

export async function updateProductDb(
  data: Partial<typeof ProductTable.$inferInsert>,
  { id, userId }: { id: string; userId: string }
) {
  const { rowCount } = await db
    .update(ProductTable)
    .set(data)
    .where(and(eq(ProductTable.clerkUserId, userId), eq(ProductTable.id, id)));
  if (rowCount > 0) {
    revalidateDbCache({ tag: CACHES_TAGS.products, userId, id });
  }
  return rowCount;
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
  if (rowCount > 0) {
    revalidateDbCache({
      tag: CACHES_TAGS.products,
      userId,
      id,
    });
  }
  return rowCount > 0;
}

export async function updateCountryDiscounts(
  deleteGroup: { countryGroupId: string }[],
  insertGroup: (typeof CountryGroupDiscountTable.$inferInsert)[],
  { productId, userId }: { productId: string; userId: string }
) {
  const product = await getProduct({ id: productId, userId });
  if (product == null) return false;

  const statements: BatchItem<"pg">[] = [];
  if (deleteGroup.length > 0) {
    statements.push(
      db.delete(CountryGroupDiscountTable).where(
        and(
          eq(CountryGroupDiscountTable.productId, productId),
          inArray(
            CountryGroupDiscountTable.countryGroupId,
            deleteGroup.map((group) => group.countryGroupId)
          )
        )
      )
    );
  }
  //  inssert group

  if (insertGroup.length > 0) {
    statements.push(
      db
        .insert(CountryGroupDiscountTable)
        .values(insertGroup)
        .onConflictDoUpdate({
          target: [
            CountryGroupDiscountTable.productId,
            CountryGroupDiscountTable.countryGroupId,
          ],
          set: {
            coupon: sql.raw(
              `excluded.${CountryGroupDiscountTable.coupon.name}`
            ),
            discountPercentage: sql.raw(
              `excluded.${CountryGroupDiscountTable.discountPercentage.name}`
            ),
          },
        })
    );
  }

  if (statements.length > 0) {
    await db.batch(statements as [BatchItem<"pg">]);
  }

  revalidateDbCache({ tag: CACHES_TAGS.products, userId, id: productId });
}

//  customization Db

export async function updateProductCustomizationDb(
  data: Partial<typeof ProductCustomizationTable.$inferInsert>,
  { productId, userId }: { productId: string; userId: string }
) {
  const product = await getProduct({ id: productId, userId });
  if (product == null) return;

  await db.update(ProductCustomizationTable).set(data).where(eq(ProductCustomizationTable.productId, productId)); 

  revalidateDbCache({tag: CACHES_TAGS.products, userId, id: productId})
}

async function getProductCountryGroupsInternal({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const product = await getProduct({ id: productId, userId });
  if (product == null) return [];

  const data = await db.query.CountryGroupTable.findMany({
    with: {
      countries: {
        columns: {
          name: true,
          code: true,
        },
      },
      countryGroupDiscounts: {
        columns: {
          coupon: true,
          discountPercentage: true,
        },
        where: ({ productId: id }, { eq }) => eq(id, productId),
        limit: 1,
      },
    },
  });

  return data.map((groups) => {
    return {
      id: groups.id,
      name: groups.name,
      recommendedDiscountPercentage: groups.recommendedDiscountPercentage,
      countries: groups.countries,
      discount: groups.countryGroupDiscounts.at(0),
    };
  });
}

async function getProductCustomizationInternal({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const data = await db.query.ProductTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(id, productId), eq(clerkUserId, userId)),
    with: {
      productCustomization: true,
    },
  });

  return data?.productCustomization;
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

export function getProductInternal({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return db.query.ProductTable.findFirst({
    where: ({ clerkUserId, id: idCol }, { eq, and }) =>
      and(eq(clerkUserId, userId), eq(idCol, id)),
  });
}



 async function  getProductCountInternal(userId: string) { 
const counts =  await db.select({productCount:  count()}).from(ProductTable).where(eq(ProductTable.clerkUserId, userId)); 

return counts[0]?.productCount ?? 0; 
}