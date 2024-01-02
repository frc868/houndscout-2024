import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
