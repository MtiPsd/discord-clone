import { currentProfile } from "@/src/lib/currentProfile";
import { db } from "@/src/lib/db";
import { Server } from "@prisma/client";
import { redirect } from "next/navigation";

async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers: Server[] = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div
      className="flex h-full w-full flex-col items-center space-y-4 py-3 
      text-primary dark:bg-[#1E1F22] "
    >
      Navigation Sidebar
    </div>
  );
}

export default NavigationSidebar;
