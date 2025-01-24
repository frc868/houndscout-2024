//Creates an autoCoralScoringEvent.
//UPDATE CYCLE: Please ensure this function's update values match the schema it's based off of.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { code: string; name: string; station: string } }
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
            autoCoralScoringEvents: {
              create: {
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
            autoCoralScoringEvents: true,
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
