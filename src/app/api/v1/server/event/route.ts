import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  let event;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: 1,
      },
      include: {
        activeEvent: true,
      },
    });
    event = server?.activeEvent;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, event });
}

export async function POST(req: Request) {
  const data = await req.json();

  let event;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        activeEvent: { connect: { code: data.code } },
      },
      include: {
        activeEvent: true,
      },
    });
    event = server.activeEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ event, ok: true });
}
