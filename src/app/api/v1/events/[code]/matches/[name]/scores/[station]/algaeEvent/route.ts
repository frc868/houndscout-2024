import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//ScoresSlice/sendAlgaeEvent
//Creates an algaeScoringEvent.
//UPDATE CYCLE (Client): This file (and its folder) is based off of a format for scoringEvent routes. Ensure there's one for each scoringEvent. See manual for details.
export async function POST(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match)
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
            // UPDATE CYCLE (Client): Ensure this field and its subfields match the scoringEvent schema for this game piece.
            AlgaeScoringEvents: {
              create: {
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
            // UPDATE CYCLE (Client): Just use the same field from above 
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
