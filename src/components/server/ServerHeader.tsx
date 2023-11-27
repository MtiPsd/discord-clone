"use client";
import { MemberRole, Server } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@/types";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

function ServerHeader({ server, role }: ServerHeaderProps) {
  return <div>Server Header</div>;
}

export default ServerHeader;
