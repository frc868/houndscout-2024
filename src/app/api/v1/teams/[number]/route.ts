import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Currently unimplemented.
//Gets a specified team
export async function GET(
  req: Request,
  { params }: { params: { number: string } }
) {
  let team;
  try {
    team = await prisma.team.findUniqueOrThrow({
      where: {
        number: Number(params.number),
      },
      include: {
        teamScores: true,
        events: true,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, team });
}

// ScoresSlice/sendPitData
// Updates info about a specified team.
// Note to Michael: David actually made this API route for a variety of purposes, so I don't think there's any need to edit here.
export async function PATCH(
  req: Request,
  { params }: { params: { number: string } }
) {
  const data = await req.json();

  let team;
  try {
    team = await prisma.team.update({
      where: {
        number: Number(params.number),
      },
      data: {
        ...data,
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
