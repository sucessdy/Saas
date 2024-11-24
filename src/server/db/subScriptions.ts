import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import { CACHES_TAGS, revalidateDbCache } from "@/lib/cache";

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
