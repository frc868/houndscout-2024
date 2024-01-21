import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { station: string } }
) {
  const data = await req.json();

  let heartbeat;
  try {
    heartbeat = await prisma.heartbeat.update({
      where: {
        station: params.station,
      },
      data: {
        time: new Date(),
        section: data.section,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ heartbeat, ok: true });
}
