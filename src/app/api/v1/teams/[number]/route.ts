import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
