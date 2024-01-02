import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  let match;
  try {
    const server = await prisma.server.update({
      where: {
        id: 1,
      },
      data: {
        activeMatch: { disconnect: {} },
      },
      include: {
        activeMatch: true,
      },
    });
    match = server.activeMatch;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ match, ok: true });
}
