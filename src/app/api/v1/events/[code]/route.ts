import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  let event;
  try {
    event = await prisma.event.findUniqueOrThrow({
      where: {
        code: params.code,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, event });
}

export async function PATCH(
  req: Request,
  { params }: { params: { code: string } }
) {
  const data = await req.json();

  let event;
  try {
    event = await prisma.event.update({
      where: {
        code: params.code,
      },
      data: {
        ...data,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ event, ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { code: string } }
) {
  let event;
  try {
    event = await prisma.event.delete({
      where: {
        code: params.code,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ event, ok: true }, { status: 202 });
}
