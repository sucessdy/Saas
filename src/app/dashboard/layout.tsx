import { ReactNode } from "react";
import NavBar  from "@/app/dashboard/_components/NavBar"
import { ClerkProvider } from "@clerk/nextjs";


export default function layout({children} : {children :ReactNode}) {
  return (
    <ClerkProvider> 
    <div className="  min-h-screen"> 
    <NavBar/>
    <div className="container py-6 mt-10"> {children}</div>
    </div>
    </ClerkProvider>
  )
}
