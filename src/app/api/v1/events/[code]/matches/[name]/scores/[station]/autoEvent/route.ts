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
        name_eventCode: { number: params.number, eventCode: params.code },
      },
      data: {
        [`${params.station}TeamScore`]: {
          update: {
            autoScoringEvents: {
              create: {
                intakeType: data.intakeType,
                scoringPosition: data.scoringPosition || undefined,
                failed: data.failed || false,
                timestampScored: data.timestampScored,
              },
            },
          },
        },
      },
      include: {
        [`${params.station}TeamScore`]: {
          include: {
            autoScoringEvents: true,
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
