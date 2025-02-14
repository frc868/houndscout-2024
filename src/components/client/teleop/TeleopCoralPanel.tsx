/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Col, Row } from "react-bootstrap";
import { CoralIntakeLocation, CoralScoringLevel } from "@prisma/client";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { useEffect, useRef } from "react";

interface Props {
    activeSide: string;
    intakeSelected?: CoralIntakeLocation;
    levelSelected?: CoralScoringLevel;
    handleSelection: (
        phrase: string,
        data:{
            intakeSelection?: CoralIntakeLocation,
            scoringLevel?: CoralScoringLevel,
            dropped?: boolean,
            failedScoring?: boolean,
        },
    ) => void;
}

export default function TeleopCoralPanel({
  activeSide,
  intakeSelected,
  levelSelected,
  handleSelection,
}: Props) {
// Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const coralScoreRef = useRef<HTMLDivElement | null>(null);
const coralFailRef = useRef<HTMLDivElement | null>(null);
const pressedKeys = useRef(new Set<string>());
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);
    
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
            <Row className="d-flex justify-content-center">
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-1">Intake</h2>
                    {/* Copy everything in this div. */}
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="text-center">Ground</h3>
                            <TeleopIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected==CoralIntakeLocation.TELEOPGROUND}
                                handleSelection={() => {
                                    handleSelection("intaking",{
                                        intakeSelection: CoralIntakeLocation.TELEOPGROUND
                                    })
                                }}
                                gamePiece="coral"
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="text-center">Station</h3>
                            <TeleopIntakeButton
                                active={activeSide=="intaking"}
                                selected={intakeSelected==CoralIntakeLocation.TELEOPSTATION}
                                handleSelection={() => {
                                    handleSelection("intaking",{
                                        intakeSelection: CoralIntakeLocation.TELEOPSTATION
                                    })
                                }}
                                gamePiece="coral"
                            />
                        </div>
                </Col>
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-1">Scoring</h2>
                        <div className="d-flex flex-column align-items-center">
                            <LocationButton
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
                                className="mt-1"
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
                                className="mt-1"
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
                                className="mt-1"
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
                <Col className="d-flex flex-column flex-shrink-1">
                    <h2 className="text-center mb-1">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
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
                    </div>
                </Col>
            </Row>
        </div>
    );
}
