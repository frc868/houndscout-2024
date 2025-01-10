import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//mainDataSlice/getEventsAsync
//Gets every event in the database.
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

//adminDataSlice/createEventAsync
//creates a new event.
export async function POST(req: Request) {
  const data = await req.json();

  let event;
  try {
    event = await prisma.event.create({
      data: {
        name: data.name,
        code: data.code,
        weekNumber: data.week,
        startDate: new Date(data.start),//Is this right?
        endDate: new Date(data.end),
        address: data.address
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ ok: true, event });
}
