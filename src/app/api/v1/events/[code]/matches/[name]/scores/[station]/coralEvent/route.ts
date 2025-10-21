import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//ScoresSlice/sendCoralEvent
//Creates a coralScoringEvent.
//NOTE TO PROGRAMMERS: Please do not copy this version of the code for future ScoringEvents, as I have not added updated comments to it.
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
            CoralScoringEvents: {
              create: {
                // UPDATE CYCLE: Ensure these match the schema.
                intakeLocation: data.intakeLocation,
                scoringLevel: data.scoringLevel || undefined,
                scoringSide: data.scoringSide || undefined,
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
            CoralScoringEvents: true,
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
