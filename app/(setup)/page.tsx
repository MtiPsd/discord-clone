import { initialProfile } from "@/lib/initial-profile";

async function SetupPage() {
  const profile = await initialProfile();

  return <div>create a Server</div>;
}

export default SetupPage;
