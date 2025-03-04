import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented.
//Gets pit data for a specified team
export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  let team;
  try {
    team = await prisma.pitData.findUniqueOrThrow({
      where: {
        teamId: Number(params.id),
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, team });
}

// ScoresSlice/sendPitData
// ViewerDataSlice/updatePicklistsAsync
// Updates info about a specified team.
// UPDATE CYCLE: Ensure this matches the pit scouting section of the Team model.
export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  const data = await req.json();

  let team;
  try {
    team = await prisma.pitData.update({
      where: {
        teamId: Number(params.id),
      },
      data: {
        drivetrain: data.drivetrain,
        wheels: data.wheels,
        intake: data.intake,
        weight: data.weight,
        hasAuton: data.hasAuton,
        comments: data.comments,
        robotImage: data.robotImage,

        canIntakeGroundCoral: data.canIntakeGroundCoral,
        canIntakeStationCoral: data.canIntakeStationCoral,
        canIntakeGroundAlgae: data.canIntakeGroundAlgae,
        canIntakeReefAlgae: data.canIntakeReefAlgae,
        canRemoveReefAlgaeWithoutIntake: data.canRemoveReefAlgaeWithoutIntake,

        canScoreReefL1: data.canScoreReefL1,
        canScoreReefL2: data.canScoreReefL2,
        canScoreReefL3: data.canScoreReefL3,
        canScoreReefL4: data.canScoreReefL4,
        canScoreNet: data.canScoreNet,
        canScoreProcessor: data.canScoreProcessor,

        canPark: data.canPark,
        canShallow: data.canShallow,
        canDeep: data.canDeep,

        submitted: true,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ team, ok: true });
}

//adminDataSlice/deleteTeamAsync
// Deletes the team with the specified number.
export async function DELETE(
  req: Request,
  { params }: { params: { number: string } }
) {
  let team;
  try {
    team = await prisma.team.delete({
      where: {
        number: Number(params.number),
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ team, ok: true }, { status: 202 });
}
