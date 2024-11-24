import { ReactNode } from "react";
import NavBar from "./_components/NavBar";


export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
  
    <div className="selection:bg-[rgba(62,39,156,0.7)]">
      <NavBar />

      <main className="pt-20">{children}</main>
    </div>
    
  );
}
