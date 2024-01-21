import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let heartbeats;
  try {
    heartbeats = await prisma.heartbeat.findMany();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({
    heartbeats: {
      red1: heartbeats.find((h) => h.station === "red1"),
      red2: heartbeats.find((h) => h.station === "red2"),
      red3: heartbeats.find((h) => h.station === "red3"),
      blue1: heartbeats.find((h) => h.station === "blue1"),
      blue2: heartbeats.find((h) => h.station === "blue2"),
      blue3: heartbeats.find((h) => h.station === "blue3"),
    },
    ok: true,
  });
}
