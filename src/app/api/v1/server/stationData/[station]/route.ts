import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Station } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { station: string } }
) {
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: 1,
      },
      include: {
        activeMatch: {
          include: {
            [`${params.station}TeamScore`]: {
              include: { scouter: true },
            },
            [`${params.station}Team`]: true,
          },
        },
        activeEvent: true,
      },
    });
    return NextResponse.json({
      ok: true,
      event: server?.activeEvent,
      match: server?.activeMatch,
      scouter: (server?.activeMatch as any)?.[`${params.station}TeamScore`]
        ?.scouter,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
