import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
        matches: {
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
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, matches: event.matches });
}

export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  const data = await req.json();

  let event;
  try {
    event = await prisma.event.update({
      where: {
        code: params.code,
      },
      data: {
        matches: {
          create: {
            name: data.name,
            key: data.key,
            number: data.number,
            red1Team: { connect: { number: data.red1 } },
            red2Team: { connect: { number: data.red2 } },
            red3Team: { connect: { number: data.red3 } },
            blue1Team: { connect: { number: data.blue1 } },
            blue2Team: { connect: { number: data.blue2 } },
            blue3Team: { connect: { number: data.blue3 } },
            red1TeamScore: {
              create: { team: { connect: { number: data.red1 } } },
            },
            red2TeamScore: {
              create: { team: { connect: { number: data.red2 } } },
            },
            red3TeamScore: {
              create: { team: { connect: { number: data.red3 } } },
            },
            blue1TeamScore: {
              create: { team: { connect: { number: data.blue1 } } },
            },
            blue2TeamScore: {
              create: { team: { connect: { number: data.blue2 } } },
            },
            blue3TeamScore: {
              create: { team: { connect: { number: data.blue3 } } },
            },
          },
        },
      },
      include: {
        matches: {
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
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match: event });
}
