import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//adminDataSlice/getScoutersAsync
//Gets a list of all scouters in the database.
export async function GET(req: Request) {
  let scouters;
  try {
    scouters = await prisma.scouter.findMany();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, scouters });
}

//mainDataSlice/createScouterAsync
//Creates a new scouter.
export async function POST(req: Request) {
  const data = await req.json();

  let scouter;
  try {
    scouter = await prisma.scouter.create({
      data: {
        name: data.name,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, scouter });
}
