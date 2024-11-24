"use client"

import {  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { deleteProduct } from "@/server/actions/products";
import { useTransition } from "react";

export function DeleteProductAlertDialogContent({id} : {id : string}){
    const [isDeletePending, startDeleteTransition] = useTransition()
return (
   
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction  onClick={() => {startDeleteTransition(async () => { const data = await deleteProduct(id)  
        if(data.message)
{
toast({
    title: data.error ? "Error" : "Success",
    description: data.message,
    variant: data.error ? "destructive" : "default",
  });
}        })}}  disabled={isDeletePending}>Continue</AlertDialogAction> 
      </AlertDialogFooter>
    </AlertDialogContent>
)

}