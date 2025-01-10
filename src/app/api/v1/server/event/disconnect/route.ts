import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Further research required. Sorry...
//As compensation, stuff in the server folder usually deals with active event and active match, as those are stored in the server table.
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
