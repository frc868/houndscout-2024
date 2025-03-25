import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Station } from "@prisma/client";

//mainDataSlice/getStationData
//Gets server data to be sent to each of the client scouters.
//Specifically orientation, active event, and active match.
export async function GET(
  req: Request,
  { params }: { params: { station: string } }
) {
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: 1,
      },
      include: {
        activeMatch: {
          include: {
            [`${params.station}TeamScore`]: {
              include: { scouter: true },
            },
            [`${params.station}Team`]: true,
          },
        },
        activeEvent: true,
      },
    });
    return NextResponse.json({
      ok: true,
      blueOnLeft: server?.blueOnLeft,
      event: server?.activeEvent,
      match: server?.activeMatch,
      scouter: (server?.activeMatch as any)?.[`${params.station}TeamScore`]?.scouter,
      submitted: (server?.activeMatch as any)?.[`${params.station}TeamScore`]?.submitted,
      cancelled: (server?.activeMatch as any)?.[`${params.station}TeamScore`]?.cancelled,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}