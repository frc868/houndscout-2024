/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { Col, Row } from "react-bootstrap";
import { AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { useEffect, useRef } from "react";

interface Props {
    incapActive: boolean;
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
    incapActive,
    activeSide,
    intakeSelected,
    locationSelected,
    handleSelection,
}: Props) {
// Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const algaeScoreRef = useRef<HTMLDivElement | null>(null);
const algaeFailRef = useRef<HTMLDivElement | null>(null);
const pressedKeys = useRef(new Set<string>());
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);
    // Presses the the algae score button if active
    if (pressedKeys.current.has('Y')) {
      // Check if buttonRef.current is not null
      if (algaeScoreRef.current) {
        algaeScoreRef.current.click();
      }
    }
    // Presses the the coral fail button if active
    if (pressedKeys.current.has('N')) {
      // Check if buttonRef.current is not null
      if (algaeFailRef.current) {
        algaeFailRef.current.click();
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
            <h1>Algae</h1>
            <Row className="d-flex justify-content-center">
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-1">Intake</h2>
                    {/* Copy everything in this div. */}
                    <div className="d-flex flex-column align-items-center">
                        <h3 className = "text-center">Ground</h3>
                        <TeleopIntakeButton
                            active={activeSide=="intaking"&&!incapActive}
                            selected={intakeSelected == AlgaeIntakeLocation.TELEOPGROUND}
                            handleSelection={() => {
                                handleSelection("intaking",{
                                    intakeSelection: AlgaeIntakeLocation.TELEOPGROUND
                                })
                            }}
                            gamePiece="algae"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <h3 className = "text-center">Reef</h3>
                        <TeleopIntakeButton
                            active={activeSide=="intaking"&&!incapActive}
                            selected={intakeSelected == AlgaeIntakeLocation.TELEOPREEF}
                            handleSelection={() => {
                                handleSelection("intaking",{
                                    intakeSelection: AlgaeIntakeLocation.TELEOPREEF
                                })
                            }}
                            gamePiece="algae"
                        />
                    </div>
                </Col>
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-1">Scoring</h2>
                    <div className="d-flex flex-column">
                        <LocationButton
                            className="mt-2"
                            active={activeSide=="scoring"&&!incapActive}
                            selected={locationSelected == AlgaeScoringLocation.NET}
                            handleSelection={() => {
                                handleSelection("scoring",{
                                    scoringLocation: AlgaeScoringLocation.NET
                                })
                            }}
                            text="Net"
                        />
                        <LocationButton
                            className="mt-2"
                            active={activeSide=="scoring"&&!incapActive}
                            selected={locationSelected == AlgaeScoringLocation.PROCESSOR}
                            handleSelection={() => {
                                handleSelection("scoring",{
                                    scoringLocation: AlgaeScoringLocation.PROCESSOR
                                })
                            }}
                            text="Proc."
                        />
                    </div>
                </Col>
                <Col className="d-flex flex-column">
                    <h2 className="text-center mb-1">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => {
                                handleSelection("result",{
                                    failedScoring: false
                                })
                            }}
                            ref={algaeScoreRef}
                        />
                        <p className="d-flex flex-row justify-content-center">Y</p>
                        <FailButton
                            className="mt-2"
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => {
                                handleSelection("result",{
                                    failedScoring: true
                                })
                            }}
                            ref={algaeFailRef}
                        />
                        <p className="d-flex flex-row justify-content-center">N</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
