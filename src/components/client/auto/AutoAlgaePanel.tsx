/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { Col, Row } from "react-bootstrap";
import { AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";

interface Props {
    activeSide: string;
    intakeSelected?: AlgaeIntakeLocation;
    locationSelected?: AlgaeScoringLocation;
    handleIntake: (selection: AlgaeIntakeLocation) => void;
    handleScoring: (selection: AlgaeScoringLocation) => void;
    handleResult: (selection: boolean) => void,
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoAlgaePanel({
  activeSide,
  intakeSelected,
  locationSelected,
  handleIntake,
  handleScoring,
  handleResult,
}: Props) {
    const mainData = useSelector((state: ReduxState) => state.mainData);
  return (
    <div className="d-flex flex-column align-items-center">
        <h1>Algae</h1>
        <Row className="d-flex justify-content-center">
            <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                <h1 className="text-center mb-1">Intake</h1>
                {/* Copy everything in this div. */}
                <Row>
                    <Col>
                      <div className="d-flex flex-column">
                        <h3 className="text-center">G1</h3>
                        <TeleopIntakeButton
                            className="mt-2"
                            active={activeSide=="intaking"}
                            selected={intakeSelected == AlgaeIntakeLocation.AUTOGROUND1}
                            handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOGROUND1)}
                            gamePiece="algae"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <h3 className = "text-center">G2</h3>
                        <TeleopIntakeButton
                            className="mt-2"
                            active={activeSide=="intaking"}
                            selected={intakeSelected == AlgaeIntakeLocation.AUTOGROUND2}
                            handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOGROUND2)}
                            gamePiece="algae"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <h3 className = "text-center">G3</h3>
                        <TeleopIntakeButton
                            className="mt-2"
                            active={activeSide=="intaking"}
                            selected={intakeSelected == AlgaeIntakeLocation.AUTOGROUND3}
                            handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOGROUND3)}
                            gamePiece="algae"
                        />
                      </div>
                    </Col>
                    <Col>
                        {/* Algae Reef in Auto */}
                        <div className="position-relative" style={{width: "25%"}}>
                            <img
                                className="mx-auto my-2"
                                alt=""
                                style={{
                                    width: "65%",
                                    height: "auto",
                                    transform: mainData.blueOnLeft?"":"rotate(180deg)",
                                }}
                                src={
                                    mainData.station?.includes("red")
                                    ? "/assets/blue_start_prematch.png"
                                    : "/assets/red_start_prematch.png"
                                }
                            />
                                
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF1}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF1)}
                                gamePiece="algae"
                                top="20%"
                                left="5%"
                            />
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF2}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF2)}
                                gamePiece="algae"
                                top="5%"
                                left="37%"
                            />
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF3}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF3)}
                                gamePiece="algae"
                                top="20%"
                                left="70%"
                            />
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF4}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF4)}
                                gamePiece="algae"
                                top="55%"
                                left="70%"
                            />
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF5}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF5)}
                                gamePiece="algae"
                                top="71%"
                                left="37%"
                            />
                            <AutoIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF6}
                                handleSelection={() => handleIntake(AlgaeIntakeLocation.AUTOREEF6)}
                                gamePiece="algae"
                                top="55%"
                                left="5%"
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col className="d-flex flex-column" style={{backgroundColor:"purple"}}>
                <h1 className="text-center mb-1">Scoring</h1>
                <div className="d-flex flex-column">
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="scoring"}
                        selected={locationSelected == AlgaeScoringLocation.NET}
                        handleSelection={() => handleScoring(AlgaeScoringLocation.NET)}
                        text="Net"
                    />
                    <LocationButton
                        className="mt-2"
                        active={activeSide=="scoring"}
                        selected={locationSelected == AlgaeScoringLocation.PROCESSOR}
                        handleSelection={() => handleScoring(AlgaeScoringLocation.PROCESSOR)}
                        text="Proc."
                    />
                </div>
            </Col>
            <Col className="d-flex flex-column" style={{backgroundColor:"gray"}}>
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
