import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented, as far as I know.
//Disconnects the current activeMatch. It's not deleted, but it's no longer the active match.
export async function POST(req: Request) {
  let match;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        activeMatch: { disconnect: {} },
      },
      include: {
        activeMatch: true,
      },
    });
    match = server.activeMatch;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ match, ok: true });
}
