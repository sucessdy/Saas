"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductDetailsSchema } from "@/schema/product";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createProduct, updateProduct } from "@/server/actions/products";
import { useToast } from "@/hooks/use-toast";

export function ProductDetailsForm({
  product,
}: {
  product?: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  const toast = useToast();
  const form = useForm<z.infer<typeof ProductDetailsSchema>>({
    resolver: zodResolver(ProductDetailsSchema),
    defaultValues: product?  {...product, description : product.description?? ""  }:  {
      name: "",
      url: "",
      description: "",
    }
  });
  async function onSubmit(values: z.infer<typeof ProductDetailsSchema>) {
    const action = product == null ? createProduct : updateProduct.bind(null, product.id)
    const data = await action(values);
    if (data?.message) {
      toast.toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6  flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="text-balance "> Product Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      "w-full relative text-sm sm:text-base z-0 border text-white bg-transparent  rounded-xl focus:outline-none focus:ring-0 pl-4 sm:pl-10 "
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel> Enter your website URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      "w-full relative text-sm sm:text-base z-0 border  text-white bg-transparent  rounded-xl focus:outline-none focus:ring-0 pl-4 sm:pl-10 "
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the path to the sales
                  page
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel className="text-balance  ">
                {" "}
                Product Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-20 resize-none rounded-xl"
                />
              </FormControl>
              <FormDescription>
                An optional description to help distinguish your product from
                other product
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button
            className=" relative flex space-x-2 items-center justify-start px-6 w-full text-black rounded-xl  h-10 font-medium shadow-input bg-white/90 shadow-[0px_0px_1px_1px_var(--neutral-800)] "
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
