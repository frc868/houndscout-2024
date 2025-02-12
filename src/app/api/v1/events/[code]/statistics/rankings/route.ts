import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  Event,
  IncapSegment,
  TeamScore,
  CoralScoringEvent,
  AlgaeScoringEvent,
  CoralScoringLevel,
  AlgaeScoringLocation,
  EndgameType,
  CoralIntakeLocation,
  AlgaeIntakeLocation,
  CoralScoringSide,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

//viewerDataSlice/getRankingsAsync
//see the "Aggregate JSON" button in DataControls for additional implementation.
//Creates a JSON object containing performance data about each team in the specified event.
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

    const rankings: Ranking[] = event.teams.map((team) => {
      const teamScores: (TeamScore & {
        //UPDATE CYCLE: Ensure all scoring events are listed here.
        CoralScoringEvents: CoralScoringEvent[];
        AlgaeScoringEvents: AlgaeScoringEvent[];
        incapSegments: IncapSegment[];
      })[] = matches
        //Filters out teamScores not attributed to the specified team, and that aren't submitted or null.
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
        CoralScoringEvents: CoralScoringEvent[];
        AlgaeScoringEvents: AlgaeScoringEvent[];
        incapSegments: IncapSegment[];
      })[]; // Remove null entries
  
      // Archived from Crescendo
      // const autoSpeaker:number =
      //   teamScores.reduce((o, s) => o + (s?.autoGamePiecesScored || 0), 0) /
      //   teamScores.length;
      // const autoMisses:number =
      //   (teamScores.reduce((o, s) => o + (s?.autoGamePieces.length || 0), 0) -
      //     autoSpeaker +
      //     2) /
      //   teamScores.length;

      // Calculates the fraction of games in which the team left the starting zone in auto.
      const mobility:number =
        (teamScores.filter((score) => score.leftStartingZone).length /
          teamScores.length);
      
      //Each of these functions calculates the average amount of a game piece that the robot dropped without scoring.
      //UPDATE CYCLE: Ensure all scoring locations for all scoring events are calculated here, including dropped pieces.
      const CoralDropped =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) => event.dropped
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeDropped =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) => event.dropped
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;

      // Each of these functions calculates the fraction of games in which the team did a certain thing in endgame.
      //UPDATE CYCLE: Ensure this is consistent with the Endgame section of TeamScore.
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

      //UPDATE CYCLE: Ensure everything calculated above is listed here.
      return {
        //keep these:
        teamNumber: team.number,
        teamName: team.name,
        teamScores: teamScores,
        firstPicklist: team.firstPicklist,
        secondPicklist: team.secondPicklist,
        //change these between games:
        mobility,
        CoralDropped,
        AlgaeDropped,
        parked,
        shallow,
        deep,
        incap,
        defense,
        drivetrain: team.drivetrain,
        wheels: team.wheels,
        intake: team.intake,
        weight: team.weight,
        hasAuton: team.hasAuton,
        comments: team.comments,
        canIntakeGroundCoral: team.canIntakeGroundCoral,
        canIntakeStationCoral: team.canIntakeStationCoral,
        canIntakeGroundAlgae: team.canIntakeGroundAlgae,
        canIntakeReefAlgae: team.canIntakeReefAlgae,
        canRemoveReefAlgaeWithoutIntake: team.canRemoveReefAlgaeWithoutIntake,
        canScoreReefL1: team.canScoreReefL1,
        canScoreReefL2: team.canScoreReefL2,
        canScoreReefL3: team.canScoreReefL3,
        canScoreReefL4: team.canScoreReefL4,
        canScoreNet: team.canScoreNet,
        canScoreProcessor: team.canScoreProcessor,
        canPark: team.canPark,
        canShallow: team.canShallow,
        canDeep: team.canDeep,
        total: teamScores.length
      };
    });
    
    return NextResponse.json({ ok: true, rankings: rankings});
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
