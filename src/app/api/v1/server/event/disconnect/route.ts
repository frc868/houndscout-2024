import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented, as far as I know.
//Disconnects the current activeEvent. It's not deleted, but it's no longer the active event.
//Extra note: stuff in the server folder usually deals with active event and active match, as those are stored in the server table.
export async function POST(req: Request) {
  let event;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        activeEvent: { disconnect: {} },
      },
      include: {
        activeEvent: true,
      },
    });
    event = server.activeEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ event, ok: true });
}
