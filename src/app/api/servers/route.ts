import { MemberRole, Profile, Server } from "@prisma/client";
import { currentProfile } from "@/src/lib/currentProfile";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile: Profile | null = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server: Server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
