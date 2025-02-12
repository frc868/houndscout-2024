import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// adminDataSlice/removeTeamFromEventAsync
//Removes a team from the specified event with the specified number.
//See api/v1/teams/[number] for deleting a team entirely.
export async function DELETE(
  req: Request,
  { params }: { params: { code: string; number: string } }
) {
  let event;
  try {
    event = await prisma.event.update({
      where: {
        code: params.code,
      },
      data: {
        teams: {
          disconnect: {
            number: Number(params.number),
          },
        },
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ event, ok: true }, { status: 202 });
}
