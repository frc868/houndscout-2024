import { NextResponse } from "next/server";

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
            chargeStationAttempts: {
              create: {
                segment: data.segment,
                timestampScored: data.timestampScored,
                timestampEnded: data.timestampEnded,
                numberRobots: data.numberRobots,
                interaction: data.interaction,
              },
            },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            chargeStationAttempts: true,
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
