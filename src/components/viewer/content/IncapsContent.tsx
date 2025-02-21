/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form, Table } from "react-bootstrap";
import { useState } from "react";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide, AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import TeamDropdown from "@/components/admin/TeamDropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";

interface Props {
  rankings: Ranking[];
  teams: Team[]
}

export default function IncapsContent({rankings, teams}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [coralIntake, setCoralIntake] = useState("");
  const [coralLevel, setCoralLevel] = useState("");
  const [coralSide, setCoralSide] = useState("");
  const [algaeIntake, setAlgaeIntake] = useState("");
  const [algaeScoring, setAlgaeScoring] = useState("");

  const [team, setTeam]=useState<Ranking | undefined>();

  const calculateCoralPieces=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.CoralScoringEvents.filter(
          (event) =>
            event.scoringLevel === CoralScoringLevel.LEVEL1
        ).length;
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }
  const calculateCoralSuccesses=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.CoralScoringEvents.filter(
          (event) =>
            event.scoringLevel === CoralScoringLevel.LEVEL1 && !event.failedScoring
        ).length;
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }
  const calculateCoralCycle=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.CoralScoringEvents.filter(
          (event) =>
            event.scoringLevel === CoralScoringLevel.LEVEL1 && !event.failedScoring
        ).reduce(
          (total, event) => {
            return total + (Number(event.timestampScored) - Number(event.timestampPickedUp));
          }, 0
        );
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }

  const calculateAlgaePieces=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.AlgaeScoringEvents.filter(
          (event) =>
            event.scoringLocation === AlgaeScoringLocation.NET
        ).length;
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }
  const calculateAlgaeSuccesses=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.AlgaeScoringEvents.filter(
          (event) =>
            event.scoringLocation === AlgaeScoringLocation.NET && !event.failedScoring
        ).length;
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }
  const calculateAlgaeCycle=()=>{
    if(team){
      return team.teamScores.reduce((total, score) => {
        const gameAmount = score.AlgaeScoringEvents.filter(
          (event) =>
            event.scoringLocation === AlgaeScoringLocation.NET && !event.failedScoring
        ).reduce(
          (total, event) => {
            return total + (Number(event.timestampScored) - Number(event.timestampPickedUp));
          }, 0
        );
        return total + gameAmount;
      }, 0) / team.teamScores.length;
    }
  }

  return (
    <div
    style={{
      height: "calc(100% - 2*24px)",
      width: "calc(100% - 2*24px)",
      color: "white",
      overflowX: "auto",
      overflowY: "auto",
      float: "right"
    }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Incap Event Data</h1>
      
      <Row className="d-flex flex-row justify-content-center align-items-center">
        <h3 className="mr-2">Team Number: </h3>
        <TeamDropdown
          red={false}
          activeTeam={Number(team?.teamnumber)}
          teams={teams as Team[]}
          handleTeamSelect={(number) => {
            setTeam(rankings.filter(team=>team.teamnumber===number)[0]);
          }}
        />
        {team && (<>
          <div
            className={"d-flex justify-content-start align-items-center"}
            style={{
              width: "auto",
              height: "100%",
              fontSize: "35pt",
              color: "gold",
              cursor: "pointer",
            }}
            onMouseDown={async () => {
              await dispatch(
                updatePicklistsAsync({
                  teamNumber: team.teamnumber as number,
                  firstPicklist: !(team.firstpicklist),
                  secondPicklist: team.secondpicklist
                })
              );
              setTeam({...team, firstpicklist: !team.firstpicklist});
            }}
          >
            <i className={`bi ${team.firstpicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
          <div
            className={"d-flex justify-content-end align-items-center"}
            style={{
              width: "auto",
              height: "100%",
              fontSize: "35pt",
              color: "silver",
              cursor: "pointer",
            }}
            onMouseDown={async () => {
              await dispatch(
                updatePicklistsAsync({
                  teamNumber: team.teamnumber as number,
                  firstPicklist: team.firstpicklist,
                  secondPicklist: !(team.secondpicklist)
                })
              );
              setTeam({...team, secondpicklist: !team.secondpicklist});
            }}
          >
            <i className={`bi ${team.secondpicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
        </>)}
      </Row>
      {team &&(
        <Table
          bordered
          hover
          variant="dark"
          className="table-responsive"
        >
          <thead>
            <tr>
              {/* Clickable table headers for sorting */}
              {[
                // "Match Number",
                "Incap Time (s)",
                "Completed?",
              ].map((header) => (
                <th
                  key={header}
                  // onClick={() =>
                  //   handleSort(
                  //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                  //   )
                  // }
                  style={{ cursor: "pointer" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.teamScores.filter(score=>score.submitted).flatMap((teamScore)=>(
              teamScore.incapSegments.map((r, idx) => (
                <tr key={r.id}>
                  <td>{(Number(r.timestampEnded)-Number(r.timestampStarted))/1000}</td>
                  <td>{r.full?"yes":"no"}</td>
                </tr>
              ))
            ))
            }
          </tbody>
        </Table>
      )}
    </div>
  );
}
