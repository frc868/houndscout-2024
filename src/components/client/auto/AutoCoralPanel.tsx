/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Col, Row } from "react-bootstrap";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide } from "@prisma/client";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import ReefSideButton from "../mini/ReefSideButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  alliance: Alliance;
  blueOnLeft: boolean;
  intakeActive: boolean;
  levelActive: boolean;
  sideActive: boolean;
  resultActive: boolean;
  intakeSelected: CoralIntakeLocation;
  levelSelected: CoralScoringLevel;
  sideSelected: CoralScoringSide;
  handleIntake: (selection: CoralIntakeLocation) => void;
  handleLevel: (selection: CoralScoringLevel) => void;
  handleSide: (selection: CoralScoringSide) => void;
  handleResult: (selection: boolean) => void,
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoCoralPanel({
  alliance,
  blueOnLeft,
  intakeActive,
  levelActive,
  sideActive,
  resultActive,
  intakeSelected,
  levelSelected,
  sideSelected,
  handleIntake,
  handleLevel,
  handleSide,
  handleResult,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Coral</h1>
      <Row className="d-flex justify-content-center">
          <Col className="d-flex flex-column flex-grow-1" style={{backgroundColor:"orange"}}>
              <h1 className="text-center mb-1">Intake</h1>
              {/* Copy everything in this div. */}
                  <div className="d-flex flex-column">
                      <h3 className="text-center">Station 1</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={intakeActive}
                          selected={intakeSelected==CoralIntakeLocation.AUTOSTATION1}
                          handleSelection={() => handleIntake(CoralIntakeLocation.AUTOSTATION1)}
                          gamePiece="coral"
                      />
                  </div>
                  <div className="d-flex flex-column">
                      <h3 className="text-center">G1</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={intakeActive}
                          selected={intakeSelected==CoralIntakeLocation.AUTOGROUND1}
                          handleSelection={() => handleIntake(CoralIntakeLocation.AUTOGROUND1)}
                          gamePiece="coral"
                      />
                  </div>
                  <div className="d-flex flex-column">
                      <h3 className="text-center">G2</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={intakeActive}
                          selected={intakeSelected==CoralIntakeLocation.AUTOGROUND2}
                          handleSelection={() => handleIntake(CoralIntakeLocation.AUTOGROUND2)}
                          gamePiece="coral"
                      />
                  </div>
                  <div className="d-flex flex-column">
                      <h3 className="text-center">G3</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={intakeActive}
                          selected={intakeSelected==CoralIntakeLocation.AUTOGROUND3}
                          handleSelection={() => handleIntake(CoralIntakeLocation.AUTOGROUND3)}
                          gamePiece="coral"
                      />
                  </div>
                  <div className="d-flex flex-column">
                      <h3 className="text-center">Station 2</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={intakeActive}
                          selected={intakeSelected==CoralIntakeLocation.AUTOSTATION2}
                          handleSelection={() => handleIntake(CoralIntakeLocation.AUTOSTATION2)}
                          gamePiece="coral"
                      />
                  </div>
          </Col>
          <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"purple"}}>
              <h1 className="text-center mb-1">Scoring</h1>
              <Row>
                  <Col>
                      <div className="d-flex flex-column">
                          <LocationButton
                              className="mt-2"
                              active={levelActive}
                              selected={levelSelected==CoralScoringLevel.LEVEL1}
                              handleSelection={() => handleLevel(CoralScoringLevel.LEVEL1)}
                              text="L1"
                          />
                          <LocationButton
                              className="mt-2"
                              active={levelActive}
                              selected={levelSelected==CoralScoringLevel.LEVEL2}
                              handleSelection={() => handleLevel(CoralScoringLevel.LEVEL2)}
                              text="L2"
                          />
                          <LocationButton
                              className="mt-2"
                              active={levelActive}
                              selected={levelSelected==CoralScoringLevel.LEVEL3}
                              handleSelection={() => handleLevel(CoralScoringLevel.LEVEL3)}
                              text="L3"
                          />
                          <LocationButton
                              className="mt-2"
                              active={levelActive}
                              selected={levelSelected==CoralScoringLevel.LEVEL4}
                              handleSelection={() => handleLevel(CoralScoringLevel.LEVEL4)}
                              text="L4"
                          />
                      </div>
                  </Col>
                  <Col className="flex-grow-1">
                      {/* Coral Reef in Auto */}
                      <div className="position-relative" style={{width: "100%"}}>
                          <img
                              className="mx-auto my-2"
                              alt=""
                              style={{
                                  width: "65%",
                                  height: "auto",
                                  transform: !blueOnLeft?'rotate(180deg)':"",
                              }}
                              src={
                                  alliance === Alliance.BLUE
                                  ? "/assets/blue_start_prematch.png"
                                  : "/assets/red_start_prematch.png"
                              }
                          />

                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE1}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE1)}
                              top="24%"
                              left="13%"
                              text="1"
                          />
                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE2}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE2)}
                              top = "15%"
                              left = "37%"
                              text="2"
                          />
                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE3}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE3)}
                              top = "24%"
                              left = "61%"
                              text="3"
                          />
                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE4}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE4)}
                              top = "48%"
                              left = "61%"
                              text="4"
                          />
                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE5}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE5)}
                              top = "56%"
                              left = "37%"
                              text="5"
                          />
                          <ReefSideButton
                              active={sideActive}
                              selected={sideSelected==CoralScoringSide.SIDE6}
                              handleSelection={() => handleSide(CoralScoringSide.SIDE6)}
                              top = "48%"
                              left = "13%"
                              text="6"
                          />
                      </div>
                  </Col>
              </Row>
          </Col>
          <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"gray"}}>
              <h1 className="text-center mb-1">Result</h1>
              <div className="d-flex flex-column">
                  <ScoreButton
                      className="mt-2"
                      active={resultActive}
                      handleClick={() => handleResult(true)}
                  />
                  <FailButton
                      className="mt-2"
                      active={resultActive}
                      handleClick={() => handleResult(false)}
                  />
              </div>
          </Col>
      </Row>
    </div>
  );
}
