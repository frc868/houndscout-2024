//Currently unimplemented; all functionality is done through the route on the next highest level.
//Creates an endgame attempt.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically qm_[number])
    station: string //Station (typically the one that send this call
  } }
) {
  const data = await req.json();

  let match;
  try {
    match = await prisma.match.update({
      where: {
        name_eventCode: { name: params.name, eventCode: params.code },
      },
      data: {
        [`${params.station}TeamScore`]: {
          update: {
            endgameAttempts: {
              create: {
                timestampStarted: data.timestampStarted,
                endgameType: data.endgameType,
              },
            },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            chargeStationAttempts: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}
