import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//mainDataSlice/getScouterAsync
//Gets the scouter currently set to run a station during a certain match
export async function GET(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match)
    station: string //Station (typically the one that called this route)
  } }
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
        [`${params.station}TeamScore`]: {
          include: {
            scouter: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      ok: false,
    });
  }

  return NextResponse.json({
    ok: true,
    scouter: (match as any)?.[`${params.station}TeamScore`]?.scouter,
  });
}

//adminDataSlice/setMatchScouterAsync
//Sets the scouter this is to run a station during a certain match
export async function POST(
  req: Request,
  { params }: { params: {
    code: string; //Event code (typically the active event)
    name: string; //Match name (typically the active match)
    station: string //Station (typically the one that called this route)
  } }
) {
  const data = await req.json();

  let match;
  try {
    match = await prisma.match.update({
      where: {
        name_eventCode: { name: params.name, eventCode: params.code },
      },
      data: {
        [`${params.station}TeamScore`]: {
          update: {
            scouter: { connect: { id: data.id } },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            scouter: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    scouter: (match as any)?.[`${params.station}TeamScore`]?.scouter,
  });
}
