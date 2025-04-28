import { subscriptionTiers } from "@/data/SubscriptionTiers";
import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import { CACHES_TAGS, dbCache, getUserTag, revalidateDbCache } from "@/lib/cache";

export async function createUserSubscriptions(
  data: typeof UserSubscriptionTable.$inferInsert
) {
  const [newSubscription] = await db

    .insert(UserSubscriptionTable)
    .values(data)
    .onConflictDoNothing({ target: UserSubscriptionTable.clerkUserId })
    .returning({
      id: UserSubscriptionTable.id,
      userId: UserSubscriptionTable.clerkUserId,
    });

  if (newSubscription != null) {
    revalidateDbCache({
      tag: CACHES_TAGS.subscription,
      id: newSubscription.id,
      userId: newSubscription.userId,
    });
  }
  return newSubscription;
}


export function getUserSubscription(userId: string) {
  const cacheFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHES_TAGS.subscription)],
  })

  return cacheFn(userId)
}


export async function getUserSubscriptionTier(userId: string) {
  const subscription = await getUserSubscription(userId)

  if (subscription == null) throw new Error("User has no subscription")

  return subscriptionTiers[subscription.tier]
}

function getUserSubscriptionInternal(userId: string) {
  return db.query.UserSubscriptionTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
  })
}