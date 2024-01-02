import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { station: string } }
) {
  let server;
  try {
    server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        [`last${params.station[0].toUpperCase()}${params.station.slice(
          1
        )}Heartbeat`]: new Date(),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ server, ok: true });
}
