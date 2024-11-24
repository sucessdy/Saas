import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { cache } from "react";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>;
export const CACHES_TAGS = {
  products: "products",
  productView: "productsView",
  subscription: "subscription",
} as const;

export function getGlobalTag(tag: keyof typeof CACHES_TAGS) {
  return `global ${CACHES_TAGS[tag]}` as const;
}

export function getUserTag(userId: string, tag: keyof typeof CACHES_TAGS) {
  return `user: ${userId} - ${CACHES_TAGS[tag]}` as const;
}

export function getIdTag(id: string, tag: keyof typeof CACHES_TAGS) {
  return `id: ${id} - ${CACHES_TAGS[tag]}as const`;
}

export function clearFullCache() {
  revalidateTag("*");
}

export function dbCache(
  cb: Parameters<typeof unstable_cache>[0],
  { tags }: { tags: ValidTags[] }
) {
  return cache(unstable_cache(cb, undefined, { tags: [...tags, "*"] }));
}

export function revalidateDbCache({
  tag,
  userId,
  id,
}: {
  tag: keyof typeof CACHES_TAGS;
  userId?: string;
  id?: string;
}) {
  revalidateTag(getGlobalTag(tag));
  if (userId != null) {
    revalidateTag(getUserTag(userId, tag));
  }
  if (id != null) {
    revalidateTag(getIdTag(id, tag));
  }
}
