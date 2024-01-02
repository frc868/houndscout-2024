import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let server;
  try {
    server = await prisma.server.findUnique({
      where: {
        id: 1,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({
    lastRed1Heartbeat: server?.lastRed1Heartbeat,
    lastRed2Heartbeat: server?.lastRed2Heartbeat,
    lastRed3Heartbeat: server?.lastRed3Heartbeat,
    lastBlue1Heartbeat: server?.lastBlue1Heartbeat,
    lastBlue2Heartbeat: server?.lastBlue2Heartbeat,
    lastBlue3Heartbeat: server?.lastBlue3Heartbeat,
    ok: true,
  });
}
