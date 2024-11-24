import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import { getProduct } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function EditPage({
  param: { productId },
  searchParams: { tab = "details" },
}: {
  param: { productId: string };
  searchParams: { tab?: string };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();
  const product = await getProduct({ id: productId, userId });
  if (product == null) return notFound();
  return <PageWithBackButton BackButtonHref="/dashboard/products" PageTitle={"Edit Products"} > 

  </PageWithBackButton>
}
