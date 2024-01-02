import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  let events;
  try {
    events = await prisma.event.findMany();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, events });
}

export async function POST(req: Request) {
  const data = await req.json();

  let event;
  try {
    event = await prisma.event.create({
      data: {
        code: data.code,
        weekNumber: Number(data.weekNumber),
        startDate: new Date(data.startDate),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, event });
}
