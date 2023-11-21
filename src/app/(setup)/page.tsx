import { db } from "@/src/lib/db";
import { initialProfile } from "@/src/lib/initialProfile";
import { redirect } from "next/navigation";
import InitialModal from "@/src/components/modals/InitialModal";

async function SetupPage() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}

export default SetupPage;
