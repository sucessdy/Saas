import { auth } from "@clerk/nextjs/server";
import { AwaitedReactNode } from "react";
import { NoPremissionCard } from "./NoPremissionCard";

export async function HasPermission({
  premission,
  renderFallback = false,
  fallBackText,
  children,
}: {
  premission: (userId: string | null) => Promise<boolean>;

  renderFallback?: boolean;
  fallBackText: string;
  children: AwaitedReactNode;
}) {
  const { userId } = await auth();
  const HasPermission = await premission(userId);
  if (HasPermission) return children;
  if (renderFallback)
    return <NoPremissionCard> {fallBackText}</NoPremissionCard>;

  return null; 
}
