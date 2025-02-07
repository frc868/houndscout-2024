/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Col, Row } from "react-bootstrap";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide } from "@prisma/client";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import ReefSideButton from "../mini/ReefSideButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";

interface Props {
    activeSide: string;
    intakeSelected?: CoralIntakeLocation;
    levelSelected?: CoralScoringLevel;
    sideSelected?: CoralScoringSide;
    handleSelection: (
        phrase: string,
        data:{
            intakeSelection?: CoralIntakeLocation,
            scoringLevel?: CoralScoringLevel,
            dropped?: boolean,
            scoringSide?: CoralScoringSide,
            failedScoring?: boolean,
        },
    ) => void;
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoCoralPanel({
    activeSide,
    intakeSelected,
    levelSelected,
    sideSelected,
    handleSelection,
}: Props) {
    const mainData = useSelector((state: ReduxState) => state.mainData);

    const flip = (mainData.blueOnLeft && mainData.station?.includes("RED")) || (!mainData.blueOnLeft && mainData.station?.includes("BLUE"));
    return (
        <div className="d-flex flex-column align-items-center border border-2 border-secondary px-3">
            <h1>Coral</h1>
            <Row className="d-flex flex-row justify-content-center">
                <Col className="d-flex flex-column flex-nowrap" md={4}>
                    <h2 className="text-center">Intake</h2>
                    <Row className={`d-flex ${flip?"flex-row-reverse":"flex-row"}`}>
                        <Col className="d-flex flex-column">
                            <div className="d-flex flex-column justify-items-center align-items-center">
                                <h4>Station</h4>
                                <div className={`d-flex ${mainData.blueOnLeft?"flex-column":"flex-column-reverse"} justify-content-center align-items-center`}>
                                    <TeleopIntakeButton
                                        className="my-4"
                                        active={activeSide=="intaking"}
                                        selected={intakeSelected==CoralIntakeLocation.AUTOSTATION1}
                                        handleSelection={() => {
                                            handleSelection("intaking",{
                                                intakeSelection: CoralIntakeLocation.AUTOSTATION1
                                            })
                                        }}
                                        gamePiece="coral"
                                        number="1"
                                    />
                                    <TeleopIntakeButton
                                        className="my-4"
                                        active={activeSide=="intaking"}
                                        selected={intakeSelected==CoralIntakeLocation.AUTOSTATION2}
                                        handleSelection={() => {
                                            handleSelection("intaking",{
                                                intakeSelection: CoralIntakeLocation.AUTOSTATION2
                                            })
                                        }}
                                        gamePiece="coral"
                                        number="2"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className="d-flex flex-column">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Ground</h4>
                                <div className={`d-flex ${mainData.blueOnLeft?"flex-column":"flex-column-reverse"} justify-content-center align-items-center`}>
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"}
                                        selected={intakeSelected==CoralIntakeLocation.AUTOGROUND1}
                                        handleSelection={() => {
                                            handleSelection("intaking",{
                                                intakeSelection: CoralIntakeLocation.AUTOGROUND1
                                            })
                                        }}
                                        gamePiece="coral"
                                        number="1"
                                    />
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"}
                                        selected={intakeSelected==CoralIntakeLocation.AUTOGROUND2}
                                        handleSelection={() => {
                                            handleSelection("intaking",{
                                                intakeSelection: CoralIntakeLocation.AUTOGROUND2
                                            })
                                        }}
                                        gamePiece="coral"
                                        number="2"
                                    />
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"}
                                        selected={intakeSelected==CoralIntakeLocation.AUTOGROUND3}
                                        handleSelection={() => {
                                            handleSelection("intaking",{
                                                intakeSelection: CoralIntakeLocation.AUTOGROUND3
                                            })
                                        }}
                                        gamePiece="coral"
                                        number="3"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row> 
                </Col>
                <Col className="d-flex flex-column flex-grow-4">
                    <h2 className="text-center">Scoring</h2>
                    <Row className="d-flex flex-row">
                        <Col className="d-flex flex-column" md={3}>
                            <div className="d-flex flex-column">
                                <LocationButton
                                    className="mt-2"
                                    active={activeSide=="level"}
                                    selected={levelSelected==CoralScoringLevel.LEVEL1}
                                    handleSelection={() => {
                                        handleSelection("level",{
                                            scoringLevel: CoralScoringLevel.LEVEL1,
                                            dropped: false
                                        })
                                    }}
                                    text="L1"
                                />
                                <LocationButton
                                    className="mt-2"
                                    active={activeSide=="level"}
                                    selected={levelSelected==CoralScoringLevel.LEVEL2}
                                    handleSelection={() => {
                                        handleSelection("level",{
                                            scoringLevel: CoralScoringLevel.LEVEL2,
                                            dropped: false
                                        })
                                    }}
                                    text="L2"
                                />
                                <LocationButton
                                    className="mt-2"
                                    active={activeSide=="level"}
                                    selected={levelSelected==CoralScoringLevel.LEVEL3}
                                    handleSelection={() => {
                                        handleSelection("level",{
                                            scoringLevel: CoralScoringLevel.LEVEL3,
                                            dropped: false
                                        })
                                    }}
                                    text="L3"
                                />
                                <LocationButton
                                    className="mt-2"
                                    active={activeSide=="level"}
                                    selected={levelSelected==CoralScoringLevel.LEVEL4}
                                    handleSelection={() => {
                                        handleSelection("level",{
                                            scoringLevel: CoralScoringLevel.LEVEL4,
                                            dropped: false
                                        })
                                    }}
                                    text="L4"
                                />
                            </div>
                        </Col>
                        <Col className="d-flex flex-column mt-4" md={9}>
                            {/* Coral Reef in Auto */}
                            <div className="position-relative mt-4" style={{width: "100%"}}>
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

                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE1}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE1
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "5%" : "20%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "20%" : "20%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-10%" : "10%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "10%" : "10%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="1"
                                />
                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE2}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE2
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "5%" : "20%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "20%" : "20%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "40%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "40%" : "40%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="2"
                                />
                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE3}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE3
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "20%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "20%" : "20%" // BlRedsideueside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "40%" : "60%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "60%" : "60%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="3"
                                />
                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE4}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE4
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "60%" : "50%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "50%" : "50%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "30%" : "60%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "60%" : "60%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="4"
                                />
                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE5}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE5
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "60%" : "60%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "60%" : "60%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-10%" : "40%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "40%" : "40%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="5"
                                />
                                <ReefSideButton
                                    active={activeSide=="side"}
                                    selected={sideSelected==CoralScoringSide.SIDE6}
                                    handleSelection={() => {
                                        handleSelection("side",{
                                            scoringSide: CoralScoringSide.SIDE6
                                        })
                                    }}
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "30%" : "50%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "50%" : "50%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-10%" : "10%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "10%" : "10%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="6"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="d-flex flex-column align-items-center" md={2}>
                    <h2 className="text-center">Result</h2>
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
                </Col>
            </Row>
        </div>
    );
}
