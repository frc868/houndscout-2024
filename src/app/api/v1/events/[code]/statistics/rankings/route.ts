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
  Match,
  Scouter,
} from "@prisma/client";
import { Ranking } from "@/lib/enums";

//viewerDataSlice/getRankingsAsync
//see the "Aggregate JSON" button in ImportContent for additional implementation.
//Creates a JSON object containing aggregated performance data about each team in the specified event as well as other infromation for the data viewer.
//This is way more complicated than everything else that's exportable.
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
        teams: {
          include: { pitData: true, }
        },
        matches: {
          include: {
            red1Team: true,
            red2Team: true,
            red3Team: true,
            blue1Team: true,
            blue2Team: true,
            blue3Team: true,
            //UPDATE CYCLE (Client): Ensure all scoring events are listed in each of the _TeamScore objects.
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
        //UPDATE CYCLE (Client): Ensure all scoring events and incap segments are listed here.
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

      // Calculates the fraction of games in which the team left the starting zone in auto.
      const mobility:number =
        (teamScores.filter((score) => score.leftStartingZone).length /
          teamScores.length);
      
      //Each of these functions calculates the average amount of a game piece that the robot dropped without scoring.
      //UPDATE CYCLE (Client): Ensure all scoring locations for all scoring events are calculated here, including dropped pieces.
      const coraldropped =
        teamScores.reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(
            (event) => event.dropped
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;
      const algaedropped =
        teamScores.reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(
            (event) => event.dropped
          ).length;
          return total + gameAmount;
        }, 0) / teamScores.length;

      // Each of these functions calculates the fraction of games in which the team did a certain thing in endgame.
      //UPDATE CYCLE (Client): Ensure this is consistent with the Endgame section of TeamScore.
      const endgameparked:number =
        teamScores.filter((score) => score.endgameType === EndgameType.PARKED)
          .length / teamScores.length;
      const endgameshallow:number =
        teamScores.filter((score) => score.endgameType === EndgameType.SHALLOW)
          .length / teamScores.length;
      const endgamedeep:number =
        teamScores.filter((score) => score.endgameType === EndgameType.DEEP)
          .length / teamScores.length;
      
      const endgamesuccess:number =
        teamScores.filter((score) => score.endgameSuccess === true)
          .length / teamScores.length;

      //Average Incap time per match in seconds
      const incap:number =
        teamScores.reduce((total, score) => {
          const totalIncapTime = score.incapSegments.reduce(
            (sum, segment) => 
              sum +
              (Number(segment.timestampEnded) -
                Number(segment.timestampStarted)),
            0);
          return total + totalIncapTime;
        }, 0) / (teamScores.length * 1000);

      //Average driver skill rating
      const driverskill:number =
        teamScores.reduce((total, score) => {
          if(score.driverSkillRating){
            return total + score.driverSkillRating;
          }
          return total;
        }, 0) / teamScores.filter((score) => score.driverSkillRating).length;

      // fraction of games the robot played defence
      const defense:number =
        teamScores.filter((score) => score.playedDefense).length /
        teamScores.length;

      // Please note all the object keys here should be lowercase due to how the data viewer works.
      return {
        //keep these:
        teamnumber: team.number,
        teamname: team.name,
        teamScores: teamScores,
        firstpicklist: team.firstPicklist,
        secondpicklist: team.secondPicklist,
        //UPDATE CYCLE (Client): Ensure everything calculated above is listed here.
        mobility,
        coraldropped,
        algaedropped,
        endgameparked,
        endgameshallow,
        endgamedeep,
        endgamesuccess,
        incap,
        defense,
        driverskill,
        //UPDATE CYCLE (Pit): Make sure this matches the pitData model.
        drivetrain: team.pitData?.drivetrain,
        wheels: team.pitData?.wheels,
        intake: team.pitData?.intake,
        weight: team.pitData?.weight,
        hasauton: team.pitData?.hasAuton,
        comments: team.pitData?.comments,
        robotimage: team.pitData?.robotImage,
        canintakegroundcoral: team.pitData?.canIntakeGroundCoral,
        canintakelollipopcoral: team.pitData?.canIntakeLollipopCoral,
        canintakestationcoral: team.pitData?.canIntakeStationCoral,
        canintakegroundalgae: team.pitData?.canIntakeGroundAlgae,
        canintakelollipopalgae: team.pitData?.canIntakeLollipopAlgae,
        canintakereefalgae: team.pitData?.canIntakeReefAlgae,
        canremovereefalgaewithoutintake: team.pitData?.canRemoveReefAlgaeWithoutIntake,
        canscorereefl1: team.pitData?.canScoreReefL1,
        canscorereefl2: team.pitData?.canScoreReefL2,
        canscorereefl3: team.pitData?.canScoreReefL3,
        canscorereefl4: team.pitData?.canScoreReefL4,
        canscorenet: team.pitData?.canScoreNet,
        canscoreprocessor: team.pitData?.canScoreProcessor,
        canpark: team.pitData?.canPark,
        canshallow: team.pitData?.canShallow,
        candeep: team.pitData?.canDeep,
        pitsubmitted: team.pitData?.submitted,
        totalgames: teamScores.length
      };
    });
    
    return NextResponse.json({ ok: true, rankings: rankings});
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}
