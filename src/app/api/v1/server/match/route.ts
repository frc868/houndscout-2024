import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  let match;
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: 1,
      },
      include: {
        activeMatch: true,
      },
    });
    match = server?.activeMatch;
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, match });
}

export async function POST(req: Request) {
  const data = await req.json();

  let match;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        activeMatch: { connect: { key: data.key } },
      },
      include: {
        activeMatch: true,
      },
    });
    match = server.activeMatch;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ match, ok: true });
}
