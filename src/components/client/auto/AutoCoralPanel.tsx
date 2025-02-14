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
import { useEffect, useRef } from "react";

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

    // Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const side1Ref = useRef<HTMLDivElement | null>(null);
const side2Ref = useRef<HTMLDivElement | null>(null);
const side3Ref = useRef<HTMLDivElement | null>(null);
const side4Ref = useRef<HTMLDivElement | null>(null);
const side5Ref = useRef<HTMLDivElement | null>(null);
const side6Ref = useRef<HTMLDivElement | null>(null);
const coralScoreRef = useRef<HTMLDivElement | null>(null);
const coralFailRef = useRef<HTMLDivElement | null>(null);
const pressedKeys = useRef(new Set<string>());
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);
    // Presses the the coral scoring side 1 button if active
    if (pressedKeys.current.has('1')) {
      // Check if buttonRef.current is not null
      if (side1Ref.current) {
        side1Ref.current.click();
      }
    }
    // Presses the the coral scoring side 2 button if active
    if (pressedKeys.current.has('2')) {
      // Check if buttonRef.current is not null
      if (side2Ref.current) {
        side2Ref.current.click();
      }
    }
    // Presses the the coral scoring side 3 button if active
    if (pressedKeys.current.has('3')) {
      // Check if buttonRef.current is not null
      if (side3Ref.current) {
        side3Ref.current.click();
      }
    }
    // Presses the the coral scoring side 4 button if active
    if (pressedKeys.current.has('4')) {
      // Check if buttonRef.current is not null
      if (side4Ref.current) {
        side4Ref.current.click();
      }
    }
    // Presses the the coral scoring side 5 button if active
    if (pressedKeys.current.has('5')) {
      // Check if buttonRef.current is not null
      if (side5Ref.current) {
        side5Ref.current.click();
      }
    }
    // Presses the the coral scoring side 6 button if active
    if (pressedKeys.current.has('6')) {
      // Check if buttonRef.current is not null
      if (side6Ref.current) {
        side6Ref.current.click();
      }
    }
    // Presses the the coral score button if active
    if (pressedKeys.current.has('Q')) {
      // Check if buttonRef.current is not null
      if (coralScoreRef.current) {
        coralScoreRef.current.click();
      }
    }
    // Presses the the coral fail button if active
    if (pressedKeys.current.has('Z')) {
      // Check if buttonRef.current is not null
      if (coralFailRef.current) {
        coralFailRef.current.click();
      }
    }
  };
    const handleKeyup = (e: KeyboardEvent) => {
        // Remove the key from the pressedKeys set when released
        pressedKeys.current.delete(e.key);
    };
    // Attach event listeners for keydown and keyup
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
});
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
                                <div className={`d-flex ${flip?"flex-column-reverse":"flex-column"} justify-content-center align-items-center`}>
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
                                <div className={`d-flex ${flip?"flex-column-reverse":"flex-column"} justify-content-center align-items-center`}>
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
                                            ? mainData.blueOnLeft ? "5%" : "65%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "68%" : "7%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "79%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "74%" : "-3%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="1"
                                    ref={side1Ref}
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
                                            ? mainData.blueOnLeft ? "5%" : "65%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "68%" : "7%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "45%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "46%" : "27%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="2"
                                    ref={side2Ref}
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
                                            ? mainData.blueOnLeft ? "35%" : "35%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "35%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "35%" : "35%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "30%" : "40%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="3"
                                    ref={side3Ref}
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
                                            ? mainData.blueOnLeft ? "65%" : "9%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "7%" : "67%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "45%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "45%" : "27%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="4"
                                    ref={side4Ref}
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
                                            ? mainData.blueOnLeft ? "65%" : "9%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "7%" : "67%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "79%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "74%" : "-3%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="5"
                                    ref={side5Ref}
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
                                            ? mainData.blueOnLeft ? "35%" : "35%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "35%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-10%" : "90%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "90%" : "-15%" // Redside with BlueOnLeft/OnRight
                                    }
                                    text="6"
                                    ref={side6Ref}
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
                            ref={coralScoreRef}
                        />
                        <p className="d-flex flex-row justify-content-center">Q</p>
                        <FailButton
                            className="mt-2"
                            active={activeSide=="result"}
                            handleClick={() => {
                                handleSelection("result",{
                                    failedScoring: true
                                })
                            }}
                            ref={coralFailRef}
                        />
                        <p className="d-flex flex-row justify-content-center">Z</p>
                </Col>
            </Row>
        </div>
    );
}
