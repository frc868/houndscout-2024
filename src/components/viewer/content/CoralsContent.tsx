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
import FieldMap from "../FieldMap";

interface Props {
  rankings: Ranking[];
  teams: Team[]
}

export default function CoralsContent({rankings, teams}: Props) {
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
      <h1>Coral Scoring Event Data</h1>
      <FieldMap />
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
      <Row className="d-flex flex-row mt-2">
        {/* <Col md={4}>
          <h5>Coral Intake Location:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralIntake}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralIntake("")}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralIntake("AUTOPRELOAD")}>{CoralIntakeLocation.AUTOPRELOAD}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralIntake("AUTOGROUND1")}>{CoralIntakeLocation.AUTOGROUND1}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralIntake("AUTOGROUND2")}>{CoralIntakeLocation.AUTOGROUND2}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralIntake("AUTOGROUND3")}>{CoralIntakeLocation.AUTOGROUND3}</Dropdown.Item>
                <Dropdown.Item key={6} onMouseDown={() => setCoralIntake("AUTOSTATION1")}>{CoralIntakeLocation.AUTOSTATION1}</Dropdown.Item>
                <Dropdown.Item key={7} onMouseDown={() => setCoralIntake("AUTOSTATION2")}>{CoralIntakeLocation.AUTOSTATION2}</Dropdown.Item>
                <Dropdown.Item key={8} onMouseDown={() => setCoralIntake("TELEOPGROUND")}>{CoralIntakeLocation.TELEOPGROUND}</Dropdown.Item>
                <Dropdown.Item key={9} onMouseDown={() => setCoralIntake("TELEOPSTATION")}>{CoralIntakeLocation.TELEOPSTATION}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={4}>
          <h5>Coral Scoring Level:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralLevel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralLevel("")}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralLevel("LEVEL1")}>{CoralScoringLevel.LEVEL1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralLevel("LEVEL2")}>{CoralScoringLevel.LEVEL2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralLevel("LEVEL3")}>{CoralScoringLevel.LEVEL3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralLevel("LEVEL4")}>{CoralScoringLevel.LEVEL4}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={4}>
          <h5>Coral Scoring Side (Auto):</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralSide}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralSide("")}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralSide("SIDE1")}>{CoralScoringSide.SIDE1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralSide("SIDE2")}>{CoralScoringSide.SIDE2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralSide("SIDE3")}>{CoralScoringSide.SIDE3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralSide("SIDE4")}>{CoralScoringSide.SIDE4}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralSide("SIDE3")}>{CoralScoringSide.SIDE5}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralSide("SIDE4")}>{CoralScoringSide.SIDE6}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col> */}
        
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
                "Intake Location",
                "Scoring Level",
                "Scoring Side (Auto)",
                "Dropped?",
                "Failed Scoring?",
                "Total Time (s)",
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
              teamScore.CoralScoringEvents.map((r, idx) => (
                <tr key={r.id}>
                  <td>{r.intakeLocation}</td>
                  <td>{r.scoringLevel}</td>
                  <td>{r.scoringSide}</td>
                  <td>{r.dropped?"yes":"no"}</td>
                  <td>{r.failedScoring?"yes":"no"}</td>
                  <td>{(Number(r.timestampScored)-Number(r.timestampPickedUp))/1000}</td>
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
