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
            stageScoringAttempts: true,
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
        [`${params.station}TeamScore`]: {
          update: {
            driverSkillRating: data.driverSkillRating,
            defensePlayedAgainst: data.defensePlayedAgainst,
            autoStartingZone: data.autoStartingZone,
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: true,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({ ok: true, match });
}
