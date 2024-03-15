import { Station } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  let heartbeats;
  try {
    heartbeats = await prisma.heartbeat.findMany();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({
    heartbeats: {
      red1: heartbeats.find((h) => h.station === Station.RED1),
      red2: heartbeats.find((h) => h.station === Station.RED2),
      red3: heartbeats.find((h) => h.station === Station.RED3),
      blue1: heartbeats.find((h) => h.station === Station.BLUE1),
      blue2: heartbeats.find((h) => h.station === Station.BLUE2),
      blue3: heartbeats.find((h) => h.station === Station.BLUE3),
    },
    ok: true,
  });
}
