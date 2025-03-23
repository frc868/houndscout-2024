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
    let proc = JSON.parse(data.stats);
    console.log(proc);
    proc.stats.forEach(async (team: any) => {
      await prisma.team.update({
        where: {
          number: Number(team.teamNumber),
        },
        data: {
          pitData: {
            upsert: {
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

/* 
{"ok":true,"stats":[{"id":1,"drivetrain":"SWERVE","wheels":"TPU","intake":"MECHANICAL","weight":"100","hasAuton":true,"comments":"A very aggressive, fast robot. Has some reliability issues, but very great when it works. I'd also note that it can't grab both an algae and a coral at the same time.","robotImage":null,"canIntakeGroundCoral":true,"canIntakeLollipopCoral":false,"canIntakeStationCoral":false,"canIntakeGroundAlgae":true,"canIntakeLollipopAlgae":true,"canIntakeReefAlgae":true,"canRemoveReefAlgaeWithoutIntake":true,"canScoreReefL1":true,"canScoreReefL2":true,"canScoreReefL3":true,"canScoreReefL4":true,"canScoreNet":true,"canScoreProcessor":true,"canPark":true,"canShallow":false,"canDeep":true,"submitted":true,"teamNumber":868},{"id":2,"drivetrain":null,"wheels":null,"intake":null,"weight":"0","hasAuton":false,"comments":"\"The Cheesy Poof\" is the name of Team 254's robot, and it’s part of the team's unique culture and tradition of naming their robots with fun, memorable titles. The name \"Cheesy Poof\" is a playful reference to a snack from *South Park*, a popular animated show. Team 254, known for their creativity and sense of humor, has a history of giving their robots quirky and lighthearted names, which help build a strong team identity and make their robots easily recognizable. The name also adds to the excitement and personality of the team’s brand, which has become iconic in the FRC community.","robotImage":null,"canIntakeGroundCoral":true,"canIntakeLollipopCoral":true,"canIntakeStationCoral":false,"canIntakeGroundAlgae":false,"canIntakeLollipopAlgae":true,"canIntakeReefAlgae":false,"canRemoveReefAlgaeWithoutIntake":false,"canScoreReefL1":false,"canScoreReefL2":false,"canScoreReefL3":false,"canScoreReefL4":false,"canScoreNet":false,"canScoreProcessor":false,"canPark":false,"canShallow":false,"canDeep":false,"submitted":true,"teamNumber":251}]}
*/