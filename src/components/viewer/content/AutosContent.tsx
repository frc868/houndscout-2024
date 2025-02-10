/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide, AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import TeamDropdown from "@/components/admin/TeamDropdown";

interface Props {
  rankings: Ranking[];
  teams: Team[]
}

export default function HomeContent({rankings, teams}: Props) {

  const [teamNumber, setTeamNumber] = useState<number | undefined>(undefined);

  const [coralIntake, setCoralIntake] = useState("");
  const [coralLevel, setCoralLevel] = useState("");
  const [coralSide, setCoralSide] = useState("");
  const [algaeIntake, setAlgaeIntake] = useState("");
  const [algaeScoring, setAlgaeScoring] = useState("");

  return (
    <div
      style={{
        height: "calc(100% - 2*24px)",
        width: "calc(100% - 2*24px)",
        color: "white",
      }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Autos</h1>
      <p>WIP</p>
      <div className="position-relative mt-4" style={{width: "100%"}}>
          <img
              alt=""
              style={{
                  width: "60%",
                  height: "auto",
                  left: "20%",
              }}
              src={"/assets/blue_side.png"}
          />
      </div>
      <Row className="d-flex flex-row">
        <h3 className="mr-2">Team Number: </h3>
        <TeamDropdown
          red={false}
          activeTeam={Number(teamNumber)}
          teams={teams as Team[]}
          handleTeamSelect={(number) => setTeamNumber(number)}
        />
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
    </div>
  );
}
