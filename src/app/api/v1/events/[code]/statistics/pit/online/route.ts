import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
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

// Location comment WIP; please add.
//Extracts pit data directly from the TechHOUNDS website.
export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  let newTeams;
  let newPitData;
  try {
    
    let proc = (
      (
        await axios.get(
          `https://houndscout.techhounds.com/api/v1/events/${params.code}/statistics/pit`,
          { headers: { "X-TBA-Auth-Key": process.env.TBA_API_KEY } }
        )
      ).data
    );
    console.log(params.code);
    console.log(proc);
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
            // UPDATE CYCLE (Pit): Make sure everything below this matches the PitData model.
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
    // console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ newTeams, newPitData, ok: true });
}

/* 
{"ok":true,"stats":[{"id":1,"drivetrain":"SWERVE","wheels":"TPU","intake":"MECHANICAL","weight":"100","hasAuton":true,"comments":"A very aggressive, fast robot. Has some reliability issues, but very great when it works. I'd also note that it can't grab both an algae and a coral at the same time.","robotImage":null,"canIntakeGroundCoral":true,"canIntakeLollipopCoral":false,"canIntakeStationCoral":false,"canIntakeGroundAlgae":true,"canIntakeLollipopAlgae":true,"canIntakeReefAlgae":true,"canRemoveReefAlgaeWithoutIntake":true,"canScoreReefL1":true,"canScoreReefL2":true,"canScoreReefL3":true,"canScoreReefL4":true,"canScoreNet":true,"canScoreProcessor":true,"canPark":true,"canShallow":false,"canDeep":true,"submitted":true,"teamNumber":868},{"id":2,"drivetrain":null,"wheels":null,"intake":null,"weight":"0","hasAuton":false,"comments":"\"The Cheesy Poof\" is the name of Team 254's robot, and it’s part of the team's unique culture and tradition of naming their robots with fun, memorable titles. The name \"Cheesy Poof\" is a playful reference to a snack from *South Park*, a popular animated show. Team 254, known for their creativity and sense of humor, has a history of giving their robots quirky and lighthearted names, which help build a strong team identity and make their robots easily recognizable. The name also adds to the excitement and personality of the team’s brand, which has become iconic in the FRC community.","robotImage":null,"canIntakeGroundCoral":true,"canIntakeLollipopCoral":true,"canIntakeStationCoral":false,"canIntakeGroundAlgae":false,"canIntakeLollipopAlgae":true,"canIntakeReefAlgae":false,"canRemoveReefAlgaeWithoutIntake":false,"canScoreReefL1":false,"canScoreReefL2":false,"canScoreReefL3":false,"canScoreReefL4":false,"canScoreNet":false,"canScoreProcessor":false,"canPark":false,"canShallow":false,"canDeep":false,"submitted":true,"teamNumber":251}]}
*/
