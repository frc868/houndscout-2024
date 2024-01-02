import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  let teams;
  try {
    teams = await prisma.team.findMany({
      include: {
        teamScores: true,
        events: true,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, teams });
}

export async function POST(req: Request) {
  const data = await req.json();

  let team;
  try {
    team = await prisma.team.create({
      data: {
        ...data,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, team });
}
