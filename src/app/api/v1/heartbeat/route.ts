import { Station } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const heartbeats = await prisma.heartbeat.findMany();
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
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
