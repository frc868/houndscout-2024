import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  CoralScoringLevel,
  AlgaeScoringLocation,
} from "@prisma/client";
import axios from "axios";

//see the "All CSV" button in ImportContent for implementation.
//Creates an spreadsheet containing all collected data about the specified event.
export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const jsonData = (
      await axios.get(
        `http://localhost:3012/api/v1/events/${params.code}/statistics/pit`
      )
    ).data;

    if (jsonData.stats.length == 0) {
      return NextResponse.json({ ok: false, message: "No match data." });
    }

    //The stuff below is getting this data into spreadsheet form.

    const headers = Object.keys((jsonData.stats as Object[])[0]).join(
      ","
    );
    const csvRows = jsonData.stats
      .map((teamScore:any) =>
        Object.values(teamScore)
          .map(
            (value) => (Array.isArray(value) ? value.join(";") : value) // Join array elements with ";"
          )
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${csvRows}`;

    // Setup headers for CSV download
    const responseHeaders = {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="pit_data_${
        params.code
      }_${Date.now()}.csv"`,
    };

    return new NextResponse(csvContent, { headers: responseHeaders });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
}
