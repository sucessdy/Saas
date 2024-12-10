import SignedInButton from "@/components/ui/SignedInButton";
import MovingText from "./_components/MovingText";
import { subscriptionTiersInOrder } from "@/data/SubscriptionTiers";
import PricingCard from "@/components/PricingCard";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/BrandLogo";
import TextHoverEffect from "@/components/ui/TextHoverEffect";
import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from "react-icons/fa6";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br   from-[#000000] via-black/5  to-[#000000], hsl(var(--background))_90%)] relative overflow-hidden  flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <div className="utility bg-[radial-gradient(circle_at_bottom_right,_#ee82ee),_transparent)] opacity-25 blur-2xl"></div>
        <div className="utility bg-[radial-gradient(circle_at_top_left,_#393BB2,_transparent)] opacity-20 blur-3xl">
          {" "}
        </div>

        <div className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-purple-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="utility overflow-hidden rounded-full">
            <span className="utility rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgb(128, 90, 213)_0%,rgba(rgb(43,19,68))_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-0 rounded-full bg-zinc-950 py-[.180rem] px-4  ring-1 ring-white/10 ">
            <span> Optimize Your Pricing Strategy Now! </span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-[2px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
        <h1 className="text-3xl relative z-0 md:text-5xl lg:text-[5.5rem] font-bold text-center font-sans tracking-tight bg-[radial-gradient(ellipse at center,#fff,transparent)]   bg-clip-text text-transparent  bg-gradient-to-br  from-neutral-300 to-white  py-2    tracking-tight leading-loose   ">
          {" "}
          Discover Profits With <br />
          <span className="bg-clip-text text-transparent text-center bg-gradient-to-br  from-purple-400 to-white text-3xl md:text-5xl lg:text-[5.5rem]  font-sans py-2 md:py-10 relative z-1 font-bold tracking-tight leading-loose ">
            {" "}
            The Smarter Pricing!{" "}
          </span>{" "}
        </h1>
        <p className="para-short">
          Elevate your sales by optimizing pricing strategies across global
          markets. Capture up to 85% more customers with adaptive,
          location-specific pricing solutions.
        </p>

        <SignedInButton />
      </section>

      <section className="bg-secondary-backgound text-primary-foreground">
        <h2 className="text"> Trusted by Top Companies</h2>
        <MovingText />
      </section>

      <section
        id="pricing"
        className="px-8 py-7 bg-secondary-backgound text-primary-foreground"
      >
        <h3 className="text">Choose your right plan! </h3>
        <p className="para-short"> </p>
        <div className="mx-auto  grid  grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-screen-xl ">
          {subscriptionTiersInOrder?.length > 0 ? (
            subscriptionTiersInOrder.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))
          ) : (
            <p>No pricing tiers available</p>
          )}
        </div>
      </section>
      <footer className="container pt-28 pb-10 flex sm:flex-row flex-col gap-4 justify-between items-start  ">
        <Link href={""}>
          <BrandLogo
            className="text-4xl font-bold text-white"
            words={["ArcBot", "ArcLabs"]}
            // framerProps={undefined}
          />
          <div className="flex flex-row gap-2 text-center  group/link relative  overflow-hidden whitespace-nowrap   text-white before:absolute before:bg-[#16181D]">
            <div className="relative z-10 flex h-8 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2E3038] bg-[#16181D] border-gray-new-90">
              {" "}
              <FaTwitter aria-label="Twitter" />{" "}
            </div>
            <div className="relative z-10 flex h-8 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2E3038] bg-[#16181D] border-gray-new-90">
              {" "}
              <FaYoutube aria-label="Youtube" />{" "}
            </div>
            <div className="relative z-10 flex h-8 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2E3038] bg-[#16181D] border-gray-new-90">
              {" "}
              <FaMedium aria-label="Medium" />{" "}
            </div>
            <div className="relative z-10 flex h-8 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2E3038] bg-[#16181D] border-gray-new-90">
              {" "}
              <FaDiscord aria-label="Discord" />{" "}
            </div>
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row gap-10 ">
          <div className="flex flex-col gap-8">
            {" "}
            <FooterLinkGroup
              title="Help"
              links={[
                {
                  label: "ArcBot Discount",
                  href: "",
                },
                { label: "Discount", href: "" },
                { label: "Time based discounts", href: "" },
                { label: "Add banner to site", href: "" },
              ]}
            />{" "}
          </div>
          <div className="flex flex-col gap-8">
            {" "}
            <FooterLinkGroup
              title="Solution"
              links={[
                {
                  label: "SaaS Business",
                  href: "",
                },
                { label: "Newsletter", href: "" },
                { label: "Online Courses", href: "" },
                { label: "Info products", href: "" },
              ]}
            />{" "}
          </div>
          <div className="flex flex-col gap-8">
            {" "}
            <FooterLinkGroup
              title="Tools"
              links={[
                {
                  label: "Salary converter",
                  href: "",
                },

                { label: "Coupon generator", href: "" },
                { label: "Stripe app", href: "" },
              ]}
            />{" "}
          </div>
          <div className="flex flex-col gap-8">
            {" "}
            <FooterLinkGroup
              title="Legal"
              links={[
                {
                  label: "Terms and Conditions",
                  href: "",
                },

                { label: "Privacy Policy", href: "" },
                { label: "Contact", href: "" },
              ]}
            />{" "}
          </div>
        </div>
      </footer>
      <TextHoverEffect />
    </>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4  ">
      <h3 className="text-md  font-semibold text-white/95">{title}</h3>{" "}
      <ul className="flex flex-col gap-2 text-white/60">
        {" "}
        {links.map((link) => (
          <li key={link.label}>
            {" "}
            <Link href={link.href} target="_blank">
              {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
