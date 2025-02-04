/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Col, Row } from "react-bootstrap";
import { CoralIntakeLocation, CoralScoringLevel } from "@prisma/client";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
    activeSide: string;
    intakeSelected?: CoralIntakeLocation;
    levelSelected?: CoralScoringLevel;
    handleIntake: (selection: CoralIntakeLocation) => void;
    handleLevel: (selection: CoralScoringLevel) => void;
    handleResult: (selection: boolean) => void,
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoCoralPanel({
  activeSide,
  intakeSelected,
  levelSelected,
  handleIntake,
  handleLevel,
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
                      <h3 className="text-center">Ground</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={activeSide=="intaking"}
                          selected={intakeSelected==CoralIntakeLocation.TELEOPGROUND}
                          handleSelection={() => handleIntake(CoralIntakeLocation.TELEOPGROUND)}
                          gamePiece="coral"
                      />
                  </div>
                  <div className="d-flex flex-column">
                      <h3 className="text-center">Station</h3>
                      <TeleopIntakeButton
                          className="mt-2"
                          active={activeSide=="intaking"}
                          selected={intakeSelected==CoralIntakeLocation.TELEOPSTATION}
                          handleSelection={() => handleIntake(CoralIntakeLocation.TELEOPSTATION)}
                          gamePiece="coral"
                      />
                  </div>
          </Col>
          <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"purple"}}>
              <h1 className="text-center mb-1">Scoring</h1>
                <div className="d-flex flex-column">
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="level"}
                        selected={levelSelected==CoralScoringLevel.LEVEL1}
                        handleSelection={() => handleLevel(CoralScoringLevel.LEVEL1)}
                        text="L1"
                    />
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="level"}
                        selected={levelSelected==CoralScoringLevel.LEVEL2}
                        handleSelection={() => handleLevel(CoralScoringLevel.LEVEL2)}
                        text="L2"
                    />
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="level"}
                        selected={levelSelected==CoralScoringLevel.LEVEL3}
                        handleSelection={() => handleLevel(CoralScoringLevel.LEVEL3)}
                        text="L3"
                    />
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="level"}
                        selected={levelSelected==CoralScoringLevel.LEVEL4}
                        handleSelection={() => handleLevel(CoralScoringLevel.LEVEL4)}
                        text="L4"
                    />
                </div>
          </Col>
          <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"gray"}}>
              <h1 className="text-center mb-1">Result</h1>
              <div className="d-flex flex-column">
                  <ScoreButton
                      className="mt-2"
                      active={activeSide=="result"}
                      handleClick={() => handleResult(true)}
                  />
                  <FailButton
                      className="mt-2"
                      active={activeSide=="result"}
                      handleClick={() => handleResult(false)}
                  />
              </div>
          </Col>
      </Row>
    </div>
  );
}
