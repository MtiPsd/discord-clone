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

  return <div>Navigation Sidebar</div>;
}

export default NavigationSidebar;
