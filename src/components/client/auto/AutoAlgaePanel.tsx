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
    handleSelection: (
        phrase: string,
        data:{
            intakeSelection?: AlgaeIntakeLocation,
            scoringLocation?: AlgaeScoringLocation,
            dropped?: boolean,
            failedScoring?: boolean,
        },
    ) => void;
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoAlgaePanel({
    activeSide,
    intakeSelected,
    locationSelected,
    handleSelection,
}: Props) {
    const mainData = useSelector((state: ReduxState) => state.mainData);
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Algae</h1>
            <Row className="d-flex justify-content-center">
                <Col className="d-flex flex-column" md={8}>
                    <h2 className="text-center mb-1">Intake</h2>
                    {/* Copy everything in this div. */}
                    <Row>
                        <Col md={4}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Ground</h4>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND1}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOGROUND1
                                        })
                                    }}
                                    gamePiece="algae"
                                />
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND2}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOGROUND2
                                        })
                                    }}
                                    gamePiece="algae"
                                />
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND3}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOGROUND3
                                        })
                                    }}
                                    gamePiece="algae"
                                />
                            </div>
                        </Col>
                        <Col md={8}>
                            {/* Algae Reef in Auto */}
                            <div className="position-relative" style={{width: "100%"}}>
                                <img
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        transform: mainData.blueOnLeft?"":"rotate(180deg)",
                                    }}
                                    src={
                                        mainData.station?.includes("BLUE")
                                        ? "/assets/blue_start_prematch.png"
                                        : "/assets/red_start_prematch.png"
                                    }
                                />
                                    
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF1}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF1
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="20%"
                                    left="5%"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF2}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF2
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="5%"
                                    left="37%"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF3}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF3
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="20%"
                                    left="70%"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF4}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF4
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="55%"
                                    left="70%"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF5}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF5
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="71%"
                                    left="37%"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF6}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF6
                                        })
                                    }}
                                    gamePiece="algae"
                                    top="55%"
                                    left="5%"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="d-flex flex-column align-items-center" md={2}>
                    <h2 className="text-center mb-1">Scoring</h2>
                    <div className="d-flex flex-column align-items-center">
                        <LocationButton
                            className="mt-2"
                            active={activeSide=="scoring"}
                            selected={locationSelected == AlgaeScoringLocation.NET}
                            handleSelection={() => {
                                handleSelection("scoring",{
                                    scoringLocation: AlgaeScoringLocation.NET,
                                    dropped: false
                                })
                            }}
                            text="Net"
                        />
                        <LocationButton
                            className="mt-2"
                            active={activeSide=="scoring"}
                            selected={locationSelected == AlgaeScoringLocation.PROCESSOR}
                            handleSelection={() => {
                                handleSelection("scoring",{
                                    scoringLocation: AlgaeScoringLocation.PROCESSOR,
                                    dropped: false
                                })
                            }}
                            text="Proc."
                        />
                    </div>
                </Col>
                <Col className="d-flex flex-column"  md={2}>
                    <h2 className="text-center mb-1">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
                            className="mt-2"
                            active={activeSide=="result"}
                            handleClick={() => {
                                handleSelection("result",{
                                    failedScoring: false
                                })
                            }}
                        />
                        <FailButton
                            className="mt-2"
                            active={activeSide=="result"}
                            handleClick={() => {
                                handleSelection("result",{
                                    failedScoring: true
                                })
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
