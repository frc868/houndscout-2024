/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form } from "react-bootstrap";
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

export default function AutosContent({rankings, teams}: Props) {
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
      }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Scoring Event Data (WIP)</h1>
      <div className="position-relative mt-4" style={{width: "100%"}}>
          <img
              alt=""
              style={{
                  width: "40%",
                  height: "auto",
                  left: "60%",
              }}
              src={"/assets/blue_side.png"}
          />
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "33%" }}
          >
            R1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "44%" }}
          >
            R2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "48%" }}
          >
            R3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "44%" }}
          >
            R4
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "33%" }}
          >
            R5
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "29%" }}
          >
            R6
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "22%" }}
          >
            G1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "22%" }}
          >
            G2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "22%" }}
          >
            G3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "17%", left: "15%" }}
          >
            S1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "75%", left: "15%" }}
          >
            S2
          </p>
      </div>
      <Row className="d-flex flex-row justify-content-center align-items-center">
        <h3 className="mr-2">Team Number: </h3>
        <TeamDropdown
          red={false}
          activeTeam={Number(team?.teamNumber)}
          teams={teams as Team[]}
          handleTeamSelect={(number) => {
            setTeam(rankings.filter(team=>team.teamNumber===number)[0]);
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
                  teamNumber: team.teamNumber as number,
                  firstPicklist: !(team.firstPicklist),
                  secondPicklist: team.secondPicklist
                })
              );
              setTeam({...team, firstPicklist: !team.firstPicklist});
            }}
          >
            <i className={`bi ${team.firstPicklist ? "bi-star-fill" : "bi-star"}`} />
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
                  teamNumber: team.teamNumber as number,
                  firstPicklist: team.firstPicklist,
                  secondPicklist: !(team.secondPicklist)
                })
              );
              setTeam({...team, secondPicklist: !team.secondPicklist});
            }}
          >
            <i className={`bi ${team.secondPicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
        </>)}
      </Row>
      <Row className="d-flex flex-row">
        <Col md={6}>
          <h3 className="mr-2">Coral Scoring Events:</h3>
        </Col>
        <Col md={6}>
          <h3 className="mr-2">Algae Scoring Events:</h3>
        </Col>
      </Row>
      <Row className="d-flex flex-row">
        <Col md={2}>
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
        <Col md={2}>
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
        <Col md={2}>
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
        </Col>
        <Col md={3}>
          <h5>Algae Intake Location:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {algaeIntake}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setAlgaeIntake("")}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setAlgaeIntake("AUTOGROUND1")}>{AlgaeIntakeLocation.AUTOGROUND1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setAlgaeIntake("AUTOGROUND2")}>{AlgaeIntakeLocation.AUTOGROUND2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setAlgaeIntake("AUTOGROUND3")}>{AlgaeIntakeLocation.AUTOGROUND3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setAlgaeIntake("AUTOREEF1")}>{AlgaeIntakeLocation.AUTOREEF1}</Dropdown.Item>
                <Dropdown.Item key={6} onMouseDown={() => setAlgaeIntake("AUTOREEF2")}>{AlgaeIntakeLocation.AUTOREEF2}</Dropdown.Item>
                <Dropdown.Item key={7} onMouseDown={() => setAlgaeIntake("AUTOREEF3")}>{AlgaeIntakeLocation.AUTOREEF3}</Dropdown.Item>
                <Dropdown.Item key={8} onMouseDown={() => setAlgaeIntake("AUTOREEF4")}>{AlgaeIntakeLocation.AUTOREEF4}</Dropdown.Item>
                <Dropdown.Item key={9} onMouseDown={() => setAlgaeIntake("AUTOREEF5")}>{AlgaeIntakeLocation.AUTOREEF5}</Dropdown.Item>
                <Dropdown.Item key={10} onMouseDown={() => setAlgaeIntake("AUTOREEF6")}>{AlgaeIntakeLocation.AUTOREEF6}</Dropdown.Item>
                <Dropdown.Item key={11} onMouseDown={() => setAlgaeIntake("TELEOPGROUND")}>{AlgaeIntakeLocation.TELEOPGROUND}</Dropdown.Item>
                <Dropdown.Item key={12} onMouseDown={() => setAlgaeIntake("TELEOPREEF")}>{AlgaeIntakeLocation.TELEOPREEF}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <h5>Algae Scoring Location:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {algaeScoring}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setAlgaeScoring("")}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setAlgaeScoring("NET")}>{AlgaeScoringLocation.NET}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setAlgaeScoring("PROCESSOR")}>{AlgaeScoringLocation.PROCESSOR}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="d-flex flex-row">
        <Col md={6}>
          <h4 className="mr-2">Avg Pieces/Game:</h4>
          <h4 className="mr-2">Avg Successes/Game:</h4>
          <h4 className="mr-2">Avg Time Held/Game (Successes Only):</h4>
        </Col>
        <Col md={6}>
          <h4 className="mr-2">Avg Pieces/Game:</h4>
          <h4 className="mr-2">Avg Successes/Game:</h4>
          <h4 className="mr-2">Avg Time Held/Game (Successes Only):</h4>
        </Col>
      </Row>
    </div>
  );
}
