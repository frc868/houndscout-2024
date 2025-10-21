import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//mainDataSlice/getActiveEventAsync
//Gets the active event.
export async function GET(req: Request) {
  let onLeft;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: 1,
      }
    });
    onLeft = server?.blueOnLeft;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ ok: true, onLeft });
}

// mainDataSlice/setBlueOnLeftAsync
//Sets field orientation.
export async function POST(req: Request) {
  const data = await req.json();
  let onLeft;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        blueOnLeft: data.onLeft,
      }
    });
    onLeft = server.blueOnLeft;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ onLeft, ok: true });
}
