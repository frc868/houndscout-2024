

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//ScoresSlice/sendAlgaeEvent
//Creates an algaeScoringEvent.
export async function POST(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match, formatteed qm_[number])
    station: string //Station (typically the one that called this route)
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
            AlgaeScoringEvents: {
              create: {
                // UPDATE CYCLE: Ensure these match the schema.
                intakeLocation: data.intakeLocation,
                scoringLocation: data.scoringLocation || undefined,
                dropped: data.dropped || false,
                failedScoring: data.failedScoring || false,
                timestampPickedUp: data.timestampPickedUp,
                timestampScored: data.timestampScored,
              },
            },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            AlgaeScoringEvents: true,
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
