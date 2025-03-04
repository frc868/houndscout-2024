import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  Event,
  IncapSegment,
  CoralScoringLevel,
  AlgaeScoringLocation,
  TeamScore,
  CoralScoringEvent,
  AlgaeScoringEvent,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

//see the "All JSON" button in ImportContent for implementation.
//Creates a JSON object containing all collected pit scouting data.
//UPDATE CYCLE: Most of the necessary edits also apply to the CSV button.
export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  let event;
  try {
    event = await prisma.event.findUniqueOrThrow({
      where: {
        code: params.code,
      },
      include: {
        teams: {include: {pitData: true}},
      },
    });

    let teams = event.teams;

    const pitDataWithDetails = teams
      //Calculates extra data about each teamScore
      //UPDATE CYCLE: Ensure all scoring locations for all scoring events are calculated here, including dropped pieces.
      .filter((team) => {team.pitData?.submitted===true})
      .map((team) => ({
        ...team.pitData,
        teamNumber: team.number,
      }))
      //UPDATE CYCLE: Ensure all scoring events are listed here.
      .map((team) => {
        //Filters out the more complicated stuff.
        const {
          id,
          teamId,
          submitted,
          ...rest
        } = team;
        return rest;
      });

    return NextResponse.json({ ok: true, stats: pitDataWithDetails});
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  const data = await req.json();

  let newTeams;
  let newPitData;
  try {

    data.stats.forEach(async (stat: { teamNumber: any; drivetrain: any; wheels: any; intake: any; hasAuton: any; comments: any; robotImage: any; canIntakeGroundCoral: any; canIntakeStationCoral: any; canIntakeGroundAlgae: any; canIntakeReefAlgae: any; canRemoveReefAlgaeWithoutIntake: any; canScoreReefL1: any; canScoreReefL2: any; canScoreReefL3: any; canScoreReefL4: any; canScoreNet: any; canScoreProcessor: any; canPark: any; canShallow: any; canDeep: any; }) => {
      await prisma.pitData.upsert({
        where: {
          team: { connect: { number: stat.teamNumber } },
        },
        update: {
            drivetrain: stat.drivetrain,
            wheels: stat.wheels,
            intake: stat.intake,
            hasAuton: stat.hasAuton,
            comments: stat.comments,
            robotImage: stat.robotImage,
            canIntakeGroundCoral: stat.canIntakeGroundCoral,
            canIntakeStationCoral: stat.canIntakeStationCoral,
            canIntakeGroundAlgae: stat.canIntakeGroundAlgae,
            canIntakeReefAlgae: stat.canIntakeReefAlgae,
            canRemoveReefAlgaeWithoutIntake: stat.canRemoveReefAlgaeWithoutIntake,
            canScoreReefL1: stat.canScoreReefL1,
            canScoreReefL2: stat.canScoreReefL2,
            canScoreReefL3: stat.canScoreReefL3,
            canScoreReefL4: stat.canScoreReefL4,
            canScoreNet: stat.canScoreNet,
            canScoreProcessor: stat.canScoreProcessor,
            canPark: stat.canPark,
            canShallow: stat.canShallow,
            canDeep: stat.canDeep,
          },
        create: {
            team: { connect: { number: stat.teamNumber } },
            drivetrain: stat.drivetrain,
            wheels: stat.wheels,
            intake: stat.intake,
            hasAuton: stat.hasAuton,
            comments: stat.comments,
            robotImage: stat.robotImage,
            canIntakeGroundCoral: stat.canIntakeGroundCoral,
            canIntakeStationCoral: stat.canIntakeStationCoral,
            canIntakeGroundAlgae: stat.canIntakeGroundAlgae,
            canIntakeReefAlgae: stat.canIntakeReefAlgae,
            canRemoveReefAlgaeWithoutIntake: stat.canRemoveReefAlgaeWithoutIntake,
            canScoreReefL1: stat.canScoreReefL1,
            canScoreReefL2: stat.canScoreReefL2,
            canScoreReefL3: stat.canScoreReefL3,
            canScoreReefL4: stat.canScoreReefL4,
            canScoreNet: stat.canScoreNet,
            canScoreProcessor: stat.canScoreProcessor,
            canPark: stat.canPark,
            canShallow: stat.canShallow,
            canDeep: stat.canDeep,
          },
      })
    });

    newTeams = await prisma.team.findMany();
    newPitData = await prisma.pitData.findMany();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ newTeams, newPitData, ok: true });
}
