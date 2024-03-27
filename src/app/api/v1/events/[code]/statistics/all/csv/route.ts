import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ClimbType,
  Event,
  IncapSegment,
  ScoringLocation,
  StageAttempt,
  TeamScore,
  TeleopScoringEvent,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

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
      include: {
        teams: true,
        matches: {
          include: {
            red1Team: true,
            red2Team: true,
            red3Team: true,
            blue1Team: true,
            blue2Team: true,
            blue3Team: true,
            red1TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red2TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red3TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue1TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue2TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue3TeamScore: {
              include: {
                team: true,
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
          },
        },
      },
    });

    let matches = event.matches;

    const teamScoresWithDetails = matches
      .flatMap((match) => [
        ...(match.red1TeamScore
          ? [
              {
                ...match.red1TeamScore,
                teamNumber: match.red1Team.number,
                station: "red1",
                matchName: match.name,
              },
            ]
          : []),
        ...(match.red2TeamScore
          ? [
              {
                ...match.red2TeamScore,
                teamNumber: match.red2Team.number,
                station: "red2",
                matchName: match.name,
              },
            ]
          : []),
        ...(match.red3TeamScore
          ? [
              {
                ...match.red3TeamScore,
                teamNumber: match.red3Team.number,
                station: "red3",
                matchName: match.name,
              },
            ]
          : []),
        ...(match.blue1TeamScore
          ? [
              {
                ...match.blue1TeamScore,
                teamNumber: match.blue1Team.number,
                station: "blue1",
                matchName: match.name,
              },
            ]
          : []),
        ...(match.blue2TeamScore
          ? [
              {
                ...match.blue2TeamScore,
                teamNumber: match.blue2Team.number,
                station: "blue2",
                matchName: match.name,
              },
            ]
          : []),
        ...(match.blue3TeamScore
          ? [
              {
                ...match.blue3TeamScore,
                teamNumber: match.blue3Team.number,
                station: "blue3",
                matchName: match.name,
              },
            ]
          : []),
      ])
      .filter((teamScore) => teamScore.submitted)
      .map((teamScore) => ({
        ...teamScore,
        teamNumber: teamScore.teamNumber,
        speakerScored: teamScore.teleopScoringEvents.filter(
          (event) =>
            event.scoringLocation === ScoringLocation.SPEAKER &&
            !event.failedScoring
        ).length,
        speakerMissed: teamScore.teleopScoringEvents.filter(
          (event) =>
            event.scoringLocation === ScoringLocation.SPEAKER &&
            event.failedScoring
        ).length,
        ampScored: teamScore.teleopScoringEvents.filter(
          (event) =>
            event.scoringLocation === ScoringLocation.AMP &&
            !event.failedScoring
        ).length,
        ampMissed: teamScore.teleopScoringEvents.filter(
          (event) =>
            event.scoringLocation === ScoringLocation.AMP && event.failedScoring
        ).length,
        dropped: teamScore.teleopScoringEvents.filter((event) => event.dropped)
          .length,
      }))
      .map((teamScore) => {
        const {
          team,
          id,
          teamId,
          submitted,
          scouterId,
          scouter,
          incapSegments,
          teleopScoringEvents,
          ...rest
        } = teamScore;
        return rest;
      });

    if (teamScoresWithDetails.length == 0) {
      return NextResponse.json({ ok: false, message: "No match data." });
    }

    const headers = Object.keys((teamScoresWithDetails as Object[])[0]).join(
      ","
    );
    const csvRows = teamScoresWithDetails
      .map((teamScore) =>
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
      "Content-Disposition": `attachment; filename="team_scores_${
        params.code
      }_${Date.now()}.csv"`,
    };

    return new NextResponse(csvContent, { headers: responseHeaders });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
