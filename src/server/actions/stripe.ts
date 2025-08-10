"use server";

import { PaidTierNames, subscriptionTiers } from "@/data/SubscriptionTiers";
import { auth, currentUser, User } from "@clerk/nextjs/server";
import { getUserSubscription } from "../db/subScriptions";
import Stripe from "stripe";
import { env as ServerEnv } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";

import { redirect } from "next/navigation";

const stripe = new Stripe(ServerEnv.STRIPE_SECRET_KEY);

export async function createCancelSession() {
   const user = await currentUser()
  if (user == null) return { error: true }

  const subscription = await getUserSubscription(user.id)

  if (subscription == null) return { error: true }

  if (
    subscription.stripeCustomerId == null ||
    subscription.stripeSubscriptionId == null
  ) {
    return new Response(null, { status: 500 })
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    flow_data: {
      type: "subscription_cancel",
      subscription_cancel: {
        subscription: subscription.stripeSubscriptionId,
      },
    },
  })

  redirect(portalSession.url)
}

export async function createCustomerPortalSession() {
   const { userId } = await auth()

  if (userId == null) return { error: true }

  const subscription = await getUserSubscription(userId)

  if (subscription?.stripeCustomerId == null) {
    return { error: true }
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  })

  redirect(portalSession.url)
 
}

// export async function createCheckoutSession(tier: PaidTierNames) {
//   const user = await currentUser();
//   if (user == null) return { error: true };

//   const subscription = await getUserSubscription(user.id);
//   if (subscription == null) return { error: true };

//   if (subscription.stripeCustomerId == null) {
//     const url = await getCheckoutSession(tier, user);
//     if ( url == null)  return {error: true}
//   redirect(url)
//   } else {
    
//   }
// }


// ...existing imports...

export async function createCheckoutSession(formData: FormData) {
  const tier = formData.get("tier") as PaidTierNames;
  if (!tier) return; // just return

  const user = await currentUser();
  if (user == null) return;

  const subscription = await getUserSubscription(user.id);
  if (subscription == null) return;

  if (subscription.stripeCustomerId == null) {
    const url = await getCheckoutSession(tier, user);
    if (url == null) return;
    redirect(url);
  } else {
    // handle upgrade/downgrade if needed
    return;
  }
}
async function getCheckoutSession(tier: PaidTierNames, user: User) {
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return null;

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    subscription_data: {
      metadata: {
        clerkUserId: user.id,
      },
    },
    line_items: [
      {
        price: subscriptionTiers[tier].stripePriceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    cancel_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  });

  return session.url;
}

