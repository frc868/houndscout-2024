import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented.
// Returns a certain teamScore, including tower attempts and incap segments.
export async function GET(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match)
    station: string //Station (typically the one that called this route)
  } }
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
          // UPDATE CYCLE (Client): Ensure all scoring-related relations as well as incapSegments are listed here, just in case.
          include: {
            towerAttempts: true,
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
//A do-it-all function that can update anything in the specified teamScore that needs to be updated.
export async function PATCH(
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
        [`${params.station.toLowerCase()}TeamScore`]: {
          // UPDATE CYCLE (Client): Please ensure this matches the TeamScore schema.
          update: {
            preloaded: data.preloaded,
            autoStartingZone: data.autoStartingZone,

            leftStartingZone: data.leftStartingZone,
            autoFuelScored: data.autoFuelScored,
            autoFuelIntakeSource: data.autoFuelIntakeSource,
            autoFuelAccuracy: data.autoFuelAccuracy,
            wonAuto: data.wonAuto,

            teleopShift1Fuel: data.teleopShift1Fuel,
            teleopShift2Fuel: data.teleopShift2Fuel,
            teleopShift3Fuel: data.teleopShift3Fuel,
            teleopShift4Fuel: data.teleopShift4Fuel,
            teleopEndgameFuel: data.teleopEndgameFuel,
            teleopFuelSource: data.teleopFuelSource,
            humanPlayerUsage: data.humanPlayerUsage,
            humanPlayerValuable: data.humanPlayerValuable,

            driverSkillRating: data.driverSkillRating,
            playstyle: data.playstyle,
            playedDefense: data.playedDefense,
            defensePlayedAgainst: data.defensePlayedAgainst,
            robotBrokeDown: data.robotBrokeDown,
            result: data.result,
            comments: data.comments,

            submitted: data.submitted,
            cancelled: data.cancelled,
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


//ScoresSlice/clearScoringEvents
//Deletes all tower attempts and incap segments related to a teamScore.
export async function DELETE(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match)
    station: string //Station (typically the one that called this route)
  } }
) {

  let match;
  try {
    match = await prisma.match.update({
      where: {
        name_eventCode: { name: params.name, eventCode: params.code },
      },
      data: {
        [`${params.station.toLowerCase()}TeamScore`]: {
          update: {
            towerAttempts: {deleteMany: {}},
            incapSegments: {deleteMany: {}},
          }
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            towerAttempts: true,
            incapSegments: true,
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