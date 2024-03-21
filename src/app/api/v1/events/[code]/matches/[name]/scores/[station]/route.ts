import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
            autoScoringEvents: true,
            teleopScoringEvents: true,
            stageAttempts: true,
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
            leftStartingZone: data.leftStartingZone,
            driverSkillRating: data.driverSkillRating,
            playedDefense: data.playedDefense,
            underDefense: data.underDefense,
            comments: data.comments,
            autoStartingZone: data.autoStartingZone,
            autoGamePieces: data.autoGamePieces,
            missingAutoGamePieces: data.missingAutoGamePieces,
            autoGamePiecesScored: data.autoGamePiecesScored,
            climbType: data.climbType,
            numberRobotsOnChain: data.numberRobotsOnChain,
            scoredInTrap: data.scoredInTrap,
            spotlit: data.spotlit,
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
