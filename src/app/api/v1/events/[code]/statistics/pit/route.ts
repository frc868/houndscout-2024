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

//see the _ button in ImportContent for implementation.
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
        teamName: team.name,
        teamLocation: team.location,
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

// Location comment WIP
//Imports manually inputted pit data.
export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  const data = await req.json();
  let newTeams;
  let newPitData;
  try {
    let proc = JSON.parse(data.stats);
    proc.stats.forEach(async (team: any) => {
      await prisma.team.upsert({
        where: {
          number: Number(team.teamNumber),
        },
        update: {
          name: team.teamName,
          location: team.teamLocation,
          events: { connect: { code: params.code } },
          pitData: {
            upsert: {
              // UPDATE CYCLE (Pit): Make sure everything below this matches the PitData model.
              update: {
                drivetrain: team.drivetrain,
                wheels: team.wheels,
                intake: team.intake,
                weight: team.weight,
                hasAuton: team.hasAuton,
                comments: team.comments,
                robotImage: team.robotImage,
  
                canIntakeGroundCoral: team.canIntakeGroundCoral,
                canIntakeLollipopCoral: team.canIntakeLollipopCoral,
                canIntakeStationCoral: team.canIntakeStationCoral,
                canIntakeGroundAlgae: team.canIntakeGroundAlgae,
                canIntakeLollipopAlgae: team.canIntakeLollipopAlgae,
                canIntakeReefAlgae: team.canIntakeReefAlgae,
                canRemoveReefAlgaeWithoutIntake: team.canRemoveReefAlgaeWithoutIntake,
  
                canScoreReefL1: team.canScoreReefL1,
                canScoreReefL2: team.canScoreReefL2,
                canScoreReefL3: team.canScoreReefL3,
                canScoreReefL4: team.canScoreReefL4,
                canScoreNet: team.canScoreNet,
                canScoreProcessor: team.canScoreProcessor,
  
                canPark: team.canPark,
                canShallow: team.canShallow,
                canDeep: team.canDeep,
  
                submitted: true,
              },
              create: {
                drivetrain: team.drivetrain,
                wheels: team.wheels,
                intake: team.intake,
                weight: team.weight,
                hasAuton: team.hasAuton,
                comments: team.comments,
                robotImage: team.robotImage,
  
                canIntakeGroundCoral: team.canIntakeGroundCoral,
                canIntakeLollipopCoral: team.canIntakeLollipopCoral,
                canIntakeStationCoral: team.canIntakeStationCoral,
                canIntakeGroundAlgae: team.canIntakeGroundAlgae,
                canIntakeLollipopAlgae: team.canIntakeLollipopAlgae,
                canIntakeReefAlgae: team.canIntakeReefAlgae,
                canRemoveReefAlgaeWithoutIntake: team.canRemoveReefAlgaeWithoutIntake,
  
                canScoreReefL1: team.canScoreReefL1,
                canScoreReefL2: team.canScoreReefL2,
                canScoreReefL3: team.canScoreReefL3,
                canScoreReefL4: team.canScoreReefL4,
                canScoreNet: team.canScoreNet,
                canScoreProcessor: team.canScoreProcessor,
  
                canPark: team.canPark,
                canShallow: team.canShallow,
                canDeep: team.canDeep,
  
                submitted: true,
              }
            }
          }
        },
        create: {
          number: team.teamNumber,
          name: team.teamName,
          location: team.teamLocation,
          events: { connect: { code: params.code } },
          pitData: {
            create: {
              drivetrain: team.drivetrain,
              wheels: team.wheels,
              intake: team.intake,
              weight: team.weight,
              hasAuton: team.hasAuton,
              comments: team.comments,
              robotImage: team.robotImage,

              canIntakeGroundCoral: team.canIntakeGroundCoral,
              canIntakeLollipopCoral: team.canIntakeLollipopCoral,
              canIntakeStationCoral: team.canIntakeStationCoral,
              canIntakeGroundAlgae: team.canIntakeGroundAlgae,
              canIntakeLollipopAlgae: team.canIntakeLollipopAlgae,
              canIntakeReefAlgae: team.canIntakeReefAlgae,
              canRemoveReefAlgaeWithoutIntake: team.canRemoveReefAlgaeWithoutIntake,

              canScoreReefL1: team.canScoreReefL1,
              canScoreReefL2: team.canScoreReefL2,
              canScoreReefL3: team.canScoreReefL3,
              canScoreReefL4: team.canScoreReefL4,
              canScoreNet: team.canScoreNet,
              canScoreProcessor: team.canScoreProcessor,

              canPark: team.canPark,
              canShallow: team.canShallow,
              canDeep: team.canDeep,

              submitted: true,
            }
          }
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
