import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  Event,
  IncapSegment,
  TeamScore,
  AutoCoralScoringEvent,
  AutoAlgaeScoringEvent,
  TeleopCoralScoringEvent,
  TeleopAlgaeScoringEvent,
  CoralScoringLevel,
  AlgaeScoringLocation,
  EndgameType,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

//viewerDataSlice/getRankingsAsync
//see DataControls for additional implementation.
//If you just want raw JSON info about LITERALLY EVERYTHING in the event, here you go.
//This is way more complicated than everything else that's exportable, so this also feeds into the database.
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
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red2TeamScore: {
              include: {
                team: true,
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red3TeamScore: {
              include: {
                team: true,
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue1TeamScore: {
              include: {
                team: true,
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue2TeamScore: {
              include: {
                team: true,
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue3TeamScore: {
              include: {
                team: true,
                autoCoralScoringEvents: true,
                autoAlgaeScoringEvents: true,
                teleopCoralScoringEvents: true,
                teleopAlgaeScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
          },
        },
      },
    });

    let matches = event.matches;

    const rankings: Ranking[] = event.teams.map((team) => {
      const teamScores: (TeamScore & {
        autoCoralScoringEvents: AutoCoralScoringEvent[];
        autoAlgaeScoringEvents: AutoAlgaeScoringEvent[];
        teleopCoralScoringEvents: TeleopCoralScoringEvent[];
        teleopAlgaeScoringEvents: TeleopAlgaeScoringEvent[];
        incapSegments: IncapSegment[];
      })[] = matches
        .flatMap((match) => [
          match.red1TeamId === team.id ? match.red1TeamScore : null,
          match.red2TeamId === team.id ? match.red2TeamScore : null,
          match.red3TeamId === team.id ? match.red3TeamScore : null,
          match.blue1TeamId === team.id ? match.blue1TeamScore : null,
          match.blue2TeamId === team.id ? match.blue2TeamScore : null,
          match.blue3TeamId === team.id ? match.blue3TeamScore : null,
        ])
        .filter((score) => score?.submitted)
        .filter((score) => score !== null) as (TeamScore & {
        autoCoralScoringEvents: AutoCoralScoringEvent[];
        autoAlgaeScoringEvents: AutoAlgaeScoringEvent[];
        teleopCoralScoringEvents: TeleopCoralScoringEvent[];
        teleopAlgaeScoringEvents: TeleopAlgaeScoringEvent[];
        incapSegments: IncapSegment[];
      })[]; // Remove null entries

      const mobility:number =
        (teamScores.filter((score) => score.leftStartingZone).length /
          teamScores.length);
  
      // const autoSpeaker:number =
      //   teamScores.reduce((o, s) => o + (s?.autoGamePiecesScored || 0), 0) /
      //   teamScores.length;

      // const autoMisses:number =
      //   (teamScores.reduce((o, s) => o + (s?.autoGamePieces.length || 0), 0) -
      //     autoSpeaker +
      //     2) /
      //   teamScores.length;

      //Each of these functions calculates the average amount of a game piece that was successfully scored on a certain location in a certain phrase per game.
      const autoCoralLevel1Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoCoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL1 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const autoCoralLevel2Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoCoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL2 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const autoCoralLevel3Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoCoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL3 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const autoCoralLevel4Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoCoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL4 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const autoAlgaeNetScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoAlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.NET && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const autoAlgaeProcessorScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.autoAlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.PROCESSOR && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopCoralLevel1Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopCoralScoringEvents.filter(
            (event) =>
              event.scoringLocation === CoralScoringLevel.LEVEL1 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopCoralLevel2Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopCoralScoringEvents.filter(
            (event) =>
              event.scoringLocation === CoralScoringLevel.LEVEL2 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopCoralLevel3Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopCoralScoringEvents.filter(
            (event) =>
              event.scoringLocation === CoralScoringLevel.LEVEL3 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopCoralLevel4Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopCoralScoringEvents.filter(
            (event) =>
              event.scoringLocation === CoralScoringLevel.LEVEL4 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopAlgaeNetScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopAlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.NET && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const teleopAlgaeProcessorScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.teleopAlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.PROCESSOR && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      

      // Calculates the fraction of games in which the team did each of the following in endgame
      const parked:number =
        teamScores.filter((score) => score.endgameType === EndgameType.PARKED)
          .length / teamScores.length;
      const shallow:number =
        teamScores.filter((score) => score.endgameType === EndgameType.SHALLOW)
          .length / teamScores.length;
      const deep:number =
        teamScores.filter((score) => score.endgameType === EndgameType.DEEP)
          .length / teamScores.length;

      //Average Incap time per match
      const incap:number =
        teamScores.reduce((total, score) => {
          const totalIncapTime = score.incapSegments.reduce(
            (sum, segment) =>
              sum +
              (Number(segment.timestampEnded) -
                Number(segment.timestampStarted)),
            0
          );
          return total + totalIncapTime;
        }, 0) / teamScores.length;

      // fraction of games the robot played defence
      const defense:number =
        teamScores.filter((score) => score.playedDefense).length /
        teamScores.length;

      return {
        teamNumber: team.number,
        teamName: team.name,
        teamScores: teamScores,
        mobility,
        autoCoralLevel1Scored,
        autoCoralLevel2Scored,
        autoCoralLevel3Scored,
        autoCoralLevel4Scored,
        autoAlgaeNetScored,
        autoAlgaeProcessorScored,
        teleopCoralLevel1Scored,
        teleopCoralLevel2Scored,
        teleopCoralLevel3Scored,
        teleopCoralLevel4Scored,
        teleopAlgaeNetScored,
        teleopAlgaeProcessorScored,
        parked,
        shallow,
        deep,
        incap,
        defense,
        total: teamScores.length
      };
    });
    
    return NextResponse.json({ ok: true, rankings: rankings});
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
