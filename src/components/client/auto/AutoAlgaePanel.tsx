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
import { mainData } from "@/redux/adminDataSlice";

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

    const flip = (mainData.blueOnLeft && mainData.station?.includes("RED")) || (!mainData.blueOnLeft && mainData.station?.includes("BLUE"));
    return (
        <div className="d-flex flex-column align-items-center border border-2 border-secondary px-3">
            <h1>Algae</h1>
            <Row className="d-flex justify-content-center">
                <Col className="d-flex flex-column" md={8}>
                    <h2 className="text-center">Intake</h2>
                    {/* Copy everything in this div. */}
                    <Row className={`d-flex ${flip?"flex-row-reverse":"flex-row"}`}>
                        <Col className="d-flex flex-column" md={4}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Ground</h4>
                                <div className={`d-flex ${mainData.blueOnLeft?"flex-column":"flex-column-reverse"} justify-content-center align-items-center`}>
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
                                        number="1"
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
                                        number="2"
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
                                        number="3"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className="d-flex flex-column mt-3" md={8}>
                            {/* Algae Reef in Auto */}
                            <div className="position-relative mt-5" style={{width: "100%"}}>
                                <img
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        transform: mainData.blueOnLeft?"":"rotate(180deg)",
                                    }}
                                    src={
                                        mainData.station?.includes("BLUE")
                                        ? "/assets/blue_side.png"
                                        : "/assets/red_side.png"
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
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "5%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "5%" : "5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "78%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "77%" : "30%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="1"
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
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "5%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "4%" : "5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-5%" : "46%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "45%" : "-5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="2"
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
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "38%" : "36%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "35%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-20%" : "32%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "30%" : "-16%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="3"
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
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "70%" : "67%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "70%" : "65%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-5%" : "46%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "45%" : "-5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="4"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF5}
                                    handleSelection={() => {
                                        handleSelection("intaking",{
                                            intakeSelection: AlgaeIntakeLocation.AUTOREEF5
                                        })
                                    }}
                                    gamePiece="algae"top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "70%" : "68%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "70%" : "65%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "30%" : "78%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "75%" : "30%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="5"
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
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "38%" : "36%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "37%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "40%" : "93%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "91%" : "40%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="6"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="d-flex flex-column align-items-center" md={2}>
                    <h2 className="text-center">Scoring</h2>
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
                    <h2 className="text-center">Result</h2>
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
