import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented.
// Returns the scoring events and incap segments mapped to the specified station in the specified match.
// UPDATE CYCLE: Ensure all scoring events are listed here.
export async function GET(
  req: Request,
  { params }: { params: { code: string; name: string; station: string } }
) {
  let match;
  try {
    match = await prisma.match.findFirst({
      where: {
        event: {
          code: params.code,
        },
        name: params.name,
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            CoralScoringEvents: true,
            AlgaeScoringEvents: true,
            incapSegments: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      ok: false,
      [`${params.station}TeamScore`]: match?.[`${params.station}TeamScore`],
    });
  }

  return NextResponse.json({ ok: true, match });
}

//scoresSlice/(most things)
//A do-it-all function that can update update anything in the specified teamScore that needs to be updated.
// UPDATE CYCLE: Please ensure this matches the updated TeamScore schema.
export async function PATCH(
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
        [`${params.station.toLowerCase()}TeamScore`]: {
          update: {
            preloaded: data.preloaded,
            autoStartingZone: data.autoStartingZone,

            leftStartingZone: data.leftStartingZone,

            endgameType: data.endgameType,
            endgameSuccess: data.endgameSuccess,

            driverSkillRating: data.driverSkillRating,
            result: data.result,
            playedDefense: data.playedDefense,
            comments: data.comments,
            
            submitted: data.submitted,
          },
        },
      },
      include: {
        [`${params.station.toLowerCase()}TeamScore`]: true,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({ ok: true, match });
}
