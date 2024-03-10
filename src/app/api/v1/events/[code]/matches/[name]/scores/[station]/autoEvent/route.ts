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
            autoScoringEvents: {
              create: {
                gamePiece: data.gamePiece,
                scoringLocation: data.scoringLocation || undefined,
                noNote: data.noNote || false,
                missed: data.missed || false,
                failedScoring: data.failedScoring || false,
                timestampPickedUp: data.timestampPickedUp,
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
