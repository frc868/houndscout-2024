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

      //Each of these functions calculates the average amount of a game piece that was successfully scored on a certain location in a certain phrase per game.
      //UPDATE CYCLE: Ensure all scoring locations for all scoring events are calculated here.
      const CoralLevel1Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL1 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel2Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL2 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel3Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL3 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel4Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL4 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeNetScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.NET && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeProcessorScored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.PROCESSOR && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;

      //Each of these functions calculates the average amount of a game piece that the robot attempted to score in a certain location.
      //UPDATE CYCLE: Ensure all scoring locations for all scoring events are calculated here.
      const CoralLevel1Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel2Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel3Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL3
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralLevel4Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringLevel === CoralScoringLevel.LEVEL4
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeNetAttempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.NET
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeProcessorAttempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.scoringLocation === AlgaeScoringLocation.PROCESSOR
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      
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

      //Each of these functions calculates the average amount of a game piece that the robot intaked from a certain location in a match.
      //UPDATE CYCLE: Ensure all intake locations for all scoring events are calculated here.
      const CoralAutoStation1Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.AUTOSTATION1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoGround1Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.AUTOGROUND1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoGround2Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.AUTOGROUND2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoGround3Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.AUTOGROUND3
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoStation2Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.AUTOSTATION2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralTeleopGroundIntaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.TELEOPGROUND
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralTeleopStationIntaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.intakeLocation === CoralIntakeLocation.TELEOPSTATION
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoGround1Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOGROUND1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoGround2Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOGROUND2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoGround3Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOGROUND3
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef1Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef2Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef3Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF3
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef4Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF4
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef5Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF5
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeAutoReef6Intaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.AUTOREEF6
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeTeleopGroundIntaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.TELEOPGROUND
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const AlgaeTeleopReefIntaked =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) =>
              event.intakeLocation === AlgaeIntakeLocation.TELEOPREEF
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;

      //Each of these functions calculates the average amount of coral that the robot attempted to score on a certain side of the reef in a match's auto section.
      //UPDATE CYCLE: Ensure all intake locations for all scoring events are calculated here.
      const CoralAutoSide1Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE1
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide2Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE2
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide3Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE3
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide4Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE4
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide5Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE5
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide6Attempted =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE6
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;

      //Each of these functions calculates the average amount of coral that the robot successfully scored on a certain side of the reef in a match's auto section.
      //UPDATE CYCLE: Ensure all intake locations for all scoring events are calculated here.
      const CoralAutoSide1Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE1 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide2Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE2 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide3Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE3 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide4Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE4 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide5Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE5 && !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const CoralAutoSide6Scored =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) =>
              event.scoringSide === CoralScoringSide.SIDE6 && !event.failedScoring
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
        teamNumber: team.number,//keep this
        teamName: team.name,//keep this
        teamScores: teamScores,//keep this
        //throw everything else out between games
        mobility,
        CoralLevel1Scored,
        CoralLevel2Scored,
        CoralLevel3Scored,
        CoralLevel4Scored,
        AlgaeNetScored,
        AlgaeProcessorScored,
        CoralLevel1Attempted,
        CoralLevel2Attempted,
        CoralLevel3Attempted,
        CoralLevel4Attempted,
        AlgaeNetAttempted,
        AlgaeProcessorAttempted,
        CoralDropped,
        AlgaeDropped,
        CoralAutoStation1Intaked,
        CoralAutoGround1Intaked,
        CoralAutoGround2Intaked,
        CoralAutoGround3Intaked,
        CoralAutoStation2Intaked,
        CoralTeleopGroundIntaked,
        CoralTeleopStationIntaked,
        AlgaeAutoGround1Intaked,
        AlgaeAutoGround2Intaked,
        AlgaeAutoGround3Intaked,
        AlgaeAutoReef1Intaked,
        AlgaeAutoReef2Intaked,
        AlgaeAutoReef3Intaked,
        AlgaeAutoReef4Intaked,
        AlgaeAutoReef5Intaked,
        AlgaeAutoReef6Intaked,
        AlgaeTeleopGroundIntaked,
        AlgaeTeleopReefIntaked,
        CoralAutoSide1Scored,
        CoralAutoSide2Scored,
        CoralAutoSide3Scored,
        CoralAutoSide4Scored,
        CoralAutoSide5Scored,
        CoralAutoSide6Scored,
        CoralAutoSide1Attempted,
        CoralAutoSide2Attempted,
        CoralAutoSide3Attempted,
        CoralAutoSide4Attempted,
        CoralAutoSide5Attempted,
        CoralAutoSide6Attempted,
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
