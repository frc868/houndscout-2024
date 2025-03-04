import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { create } from "domain";

//adminDataSlice/getTeamsAsync
// Gets all teams in the database.
export async function GET(req: Request) {
  let teams;
  try {
    teams = await prisma.team.findMany();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, teams });
}

//adminDataSlice/createTeamAsync
//creates a team.
export async function POST(req: Request) {
  const data = await req.json();

  let team;
  try {
    team = await prisma.team.create({
      data: {
        ...data,
      }
    });
    await prisma.pitData.create({
      data: {team: { connect: { number: data.number } } }
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, team });
}
