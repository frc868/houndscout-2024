import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { code: string; name: string; station: string } }
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
            incapSegments: {
              create: {
                timestampStarted: data.timestampStarted,
                timestampEnded: data.timestampEnded,
                full: data.full,
              },
            },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            incapSegments: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}
