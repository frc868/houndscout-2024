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
  WheelType,
  IntakeType,
  DrivetrainType,
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
      .map((team) => ({
        ...team.pitData,
        teamNumber: team.number,
      }))
      .filter((team) => team.submitted==true)
      //UPDATE CYCLE: Ensure all scoring events are listed here.
      .map((team) => {
        //Filters out the more complicated stuff.
        const {
          teamId,
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

    data.stats.map(async (stat: {
      teamNumber: number;
      id: number;
      drivetrain: DrivetrainType;
      wheels: WheelType;
      intake: IntakeType;
      hasAuton: boolean;
      comments: string;
      robotImage: string;
      canIntakeGroundCoral: boolean;
      canIntakeLollipopCoral: boolean;
      canIntakeStationCoral: boolean;
      canIntakeGroundAlgae: boolean;
      canIntakeLollipopAlgae: boolean;
      canIntakeReefAlgae: boolean;
      canRemoveReefAlgaeWithoutIntake: boolean;
      canScoreReefL1: boolean;
      canScoreReefL2: boolean;
      canScoreReefL3: boolean;
      canScoreReefL4: boolean;
      canScoreNet: boolean;
      canScoreProcessor: boolean;
      canPark: boolean;
      canShallow: boolean;
      canDeep: boolean;
    }) => {
      let team=await prisma.team.findFirst({
        where: {
          number: stat.teamNumber,
        },
        include: {
          pitData: true,
        }
      });
      if (team?.pitData==null){
        await prisma.pitData.create({
          data: {
            team: { connect: { number: stat.teamNumber } },
            drivetrain: stat.drivetrain,
            wheels: stat.wheels,
            intake: stat.intake,
            hasAuton: stat.hasAuton,
            comments: stat.comments,
            robotImage: stat.robotImage,
            canIntakeGroundCoral: stat.canIntakeGroundCoral,
            canIntakeLollipopCoral: stat.canIntakeLollipopCoral,
            canIntakeStationCoral: stat.canIntakeStationCoral,
            canIntakeGroundAlgae: stat.canIntakeGroundAlgae,
            canIntakeLollipopAlgae: stat.canIntakeLollipopAlgae,
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
          }
        });
      } else await prisma.pitData.update({
        where: {
          team: { number: stat.teamNumber },
          id: stat.id,
        },
        data: {
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
        }
      });
    });

    newTeams = await prisma.team.findMany();
    newPitData = await prisma.pitData.findMany();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ newTeams, newPitData, ok: true });
}
