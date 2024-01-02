import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  let scouter;
  try {
    scouter = await prisma.scouter.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, scouter });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  let scouter;
  try {
    scouter = await prisma.scouter.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: data.name,
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ scouter, ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  let scouter;
  try {
    scouter = await prisma.scouter.delete({
      where: {
        id: Number(params.id),
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ scouter, ok: true }, { status: 202 });
}
