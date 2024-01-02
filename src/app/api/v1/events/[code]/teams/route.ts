import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        teams: true,
      },
    });
  } catch {
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ teams: event.teams, ok: true });
}

export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  const data = await req.json();

  let numbers;
  if (data.number) {
    numbers = [{ number: data.number }];
  } else {
    numbers = data.numbers.map((number: number) => {
      return {
        number,
      };
    });
  }

  let event;
  try {
    event = await prisma.event.update({
      where: {
        code: params.code,
      },
      data: {
        teams: {
          connect: numbers,
        },
      },
      include: {
        teams: true,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ teams: event.teams, ok: true });
}
