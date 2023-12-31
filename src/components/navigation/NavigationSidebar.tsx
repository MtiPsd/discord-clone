import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { currentProfile } from "@/src/lib/currentProfile";
import ModeToggle from "@/src/components/ModeToggle";
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Server } from "@prisma/client";
import { db } from "@/src/lib/db";

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
      <NavigationAction />
      <Separator
        className="mx-auto h-[2px] w-10 rounded-md 
       bg-zinc-300 dark:bg-zinc-700"
      />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
}

export default NavigationSidebar;
