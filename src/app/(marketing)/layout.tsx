import { ReactNode } from "react";
import NavBar from "./_components/NavBar";


export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
  
    <div className="selection:bg-[rgba(20,15,41,0.29)] overflow-hidden">
      <NavBar />

      <main className="pt-20 overflow-hidden">{children}</main>
    </div>
     
  );
}
