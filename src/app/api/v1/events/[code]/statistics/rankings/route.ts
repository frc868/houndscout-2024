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
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red2TeamScore: {
              include: {
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            red3TeamScore: {
              include: {
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue1TeamScore: {
              include: {
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue2TeamScore: {
              include: {
                teleopScoringEvents: true,
                incapSegments: true,
                scouter: true,
              },
            },
            blue3TeamScore: {
              include: {
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

    const rankings: Ranking[] = event.teams.map((team) => {
      const teamScores: (TeamScore & {
        teleopScoringEvents: TeleopScoringEvent[];
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
        teleopScoringEvents: TeleopScoringEvent[];
        incapSegments: IncapSegment[];
      })[]; // Remove null entries

      const mobility =
        (teamScores.filter((score) => score.leftStartingZone).length /
          teamScores.length) *
        100;

      const autoSpeaker =
        teamScores.reduce((o, s) => o + (s?.autoGamePiecesScored || 0), 0) /
        teamScores.length;

      const autoMisses =
        (teamScores.reduce((o, s) => o + (s?.autoGamePieces.length || 0), 0) -
          autoSpeaker +
          2) /
        teamScores.length;

      const speaker =
        teamScores.reduce((total, score) => {
          const speakerEvents = score.teleopScoringEvents.filter(
            (event) =>
              event.scoringLocation === ScoringLocation.SPEAKER &&
              !event.dropped
          ).length;
          return total + speakerEvents;
        }, 0) / teamScores.length;

      // Speaker Misses calculation
      const speakerMisses =
        teamScores.reduce((total, score) => {
          const speakerMissEvents = score.teleopScoringEvents.filter(
            (event) =>
              event.scoringLocation === ScoringLocation.SPEAKER && event.dropped
          ).length;
          return total + speakerMissEvents;
        }, 0) / teamScores.length;

      // Amp calculation
      const amp =
        teamScores.reduce((total, score) => {
          const ampEvents = score.teleopScoringEvents.filter(
            (event) =>
              event.scoringLocation === ScoringLocation.AMP && !event.dropped
          ).length;
          return total + ampEvents;
        }, 0) / teamScores.length;

      // Amp Misses calculation
      const ampMisses =
        teamScores.reduce((total, score) => {
          const ampMissEvents = score.teleopScoringEvents.filter(
            (event) =>
              event.scoringLocation === ScoringLocation.AMP && event.dropped
          ).length;
          return total + ampMissEvents;
        }, 0) / teamScores.length;

      // Climb calculation
      const climb =
        (teamScores.filter((score) => score.climbType === ClimbType.CLIMBED)
          .length /
          teamScores.length) *
        100;

      const ensemble =
        teamScores.reduce(
          (total, score) => total + (score.numberRobotsOnChain || 0),
          0
        ) / teamScores.length;

      // Trap calculation
      const trap =
        (teamScores.filter((score) => score.scoredInTrap).length /
          teamScores.length) *
        100;

      // Incap calculation
      const incap =
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

      // Defense calculation
      const defense =
        (teamScores.filter((score) => score.playedDefense).length /
          teamScores.length) *
        100;

      return {
        team: team.number,
        mobility,
        autoSpeaker,
        autoMisses,
        speaker,
        speakerMisses,
        amp,
        ampMisses,
        climb,
        ensemble,
        trap,
        incap,
        defense,
      };
    });
    return NextResponse.json(rankings);
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
