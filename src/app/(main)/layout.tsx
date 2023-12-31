import NavigationSidebar from "@/src/components/navigation/NavigationSidebar";
import { ReactNode } from "react";

async function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}

export default MainLayout;
