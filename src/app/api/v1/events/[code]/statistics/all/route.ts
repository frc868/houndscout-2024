import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  Event,
  IncapSegment,
  CoralScoringLevel,
  AlgaeScoringLocation,
  TeamScore,
  CoralScoringEvent,
  AlgaeScoringEvent,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

//see the "All JSON" button in ImportContent for implementation.
//Creates a JSON object containing all collected data about the specified event.
//UPDATE CYCLE: Most of the necessary edits also apply to the CSV button.
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
            //UPDATE CYCLE: Ensure all scoring events are listed in each of the _TeamScore objects.
            red1TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red2TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red3TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue1TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue2TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue3TeamScore: {
              include: {
                team: true,
                CoralScoringEvents: true,
                AlgaeScoringEvents: true,
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
      //Turns all the match data into an array of submitted teamScores.
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
      //Calculates extra data about each teamScore
      //UPDATE CYCLE: Ensure all scoring locations for all scoring events are calculated here, including dropped pieces.
      .map((teamScore) => ({
        ...teamScore,
        teamNumber: teamScore.teamNumber,
        coralLevel1: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL1
        ).length,
        coralLevel1Scored: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL1
        ).length,
        coralLevel2: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL2
        ).length,
        coralLevel2Scored: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL2
        ).length,
        coralLevel3: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL3
        ).length,
        coralLevel3Scored: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL3
        ).length,
        coralLevel4: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL4
        ).length,
        coralLevel4Scored: teamScore.CoralScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLevel==CoralScoringLevel.LEVEL4
        ).length,
        algaeNet: teamScore.AlgaeScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLocation==AlgaeScoringLocation.NET
        ).length,
        algaeNetScored: teamScore.AlgaeScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLocation==AlgaeScoringLocation.NET
        ).length,
        algaeProcessor: teamScore.AlgaeScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLocation==AlgaeScoringLocation.PROCESSOR
        ).length,
        algaeProcessorScored: teamScore.AlgaeScoringEvents.filter(
          (event) => !event.failedScoring&&event.scoringLocation==AlgaeScoringLocation.PROCESSOR
        ).length,
        coralDropped: teamScore.CoralScoringEvents.filter((event) => event.dropped).length,
        algaeDropped: teamScore.AlgaeScoringEvents.filter((event) => event.dropped).length,
        totalIncapTime: teamScore.incapSegments.reduce(
          (sum, segment) => 
            sum +
            (Number(segment.timestampEnded) -
              Number(segment.timestampStarted)),
          0),
      }))
      //UPDATE CYCLE: Ensure all scoring events are listed here.
      .map((teamScore) => {
        const {
          team,
          id,
          teamId,
          submitted,
          scouterId,
          scouter,
          incapSegments,
          CoralScoringEvents,
          AlgaeScoringEvents,
          ...rest
        } = teamScore;
        return rest;
      });

    return NextResponse.json({ ok: true, scores: teamScoresWithDetails});
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
