import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { code: string; name: string } }
) {
  let match;
  try {
    match = await prisma.match.findFirst({
      where: {
        event: {
          code: params.code,
        },
        name: params.name,
      },
      include: {
        red1Team: true,
        red2Team: true,
        red3Team: true,
        blue1Team: true,
        blue2Team: true,
        blue3Team: true,
        red1TeamScore: { include: { scouter: true } },
        red2TeamScore: { include: { scouter: true } },
        red3TeamScore: { include: { scouter: true } },
        blue1TeamScore: { include: { scouter: true } },
        blue2TeamScore: { include: { scouter: true } },
        blue3TeamScore: { include: { scouter: true } },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}

export async function PATCH(
  req: Request,
  { params }: { params: { code: string; name: string } }
) {
  const data = await req.json();
  let updateData: any = {};

  if (data.red1) {
    updateData.red1Team = { connect: { number: data.red1 } };
  }
  if (data.red2) {
    updateData.red1Team = { connect: { number: data.red2 } };
  }
  if (data.red3) {
    updateData.red1Team = { connect: { number: data.red3 } };
  }
  if (data.blue1) {
    updateData.blue1Team = { connect: { number: data.blue1 } };
  }
  if (data.blue2) {
    updateData.blue1Team = { connect: { number: data.blue2 } };
  }
  if (data.blue3) {
    updateData.blue1Team = { connect: { number: data.blue3 } };
  }
  if (data.name) {
    updateData.name = data.name;
  }
  if (data.startTime) {
    updateData.startTime = data.startTime;
  }

  let match;
  try {
    match = await prisma.match.update({
      where: {
        name_eventCode: { name: params.name, eventCode: params.code },
      },
      data: updateData,
      include: {
        red1Team: true,
        red2Team: true,
        red3Team: true,
        blue1Team: true,
        blue2Team: true,
        blue3Team: true,
        red1TeamScore: true,
        red2TeamScore: true,
        red3TeamScore: true,
        blue1TeamScore: true,
        blue2TeamScore: true,
        blue3TeamScore: true,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}

export async function DELETE(
  req: Request,
  { params }: { params: { code: string; name: string } }
) {
  let match;
  try {
    match = await prisma.match.delete({
      where: {
        name_eventCode: { name: params.name, eventCode: params.code },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}
