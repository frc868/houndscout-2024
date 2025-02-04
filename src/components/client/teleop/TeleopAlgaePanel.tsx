/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/LocationButton";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { Col, Row } from "react-bootstrap";
import { AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";

interface Props {
  intakeActive: boolean;
  locationActive: boolean;
  resultActive: boolean;
  intakeSelected: AlgaeIntakeLocation;
  locationSelected: AlgaeScoringLocation;
  handleIntake: (selection: AlgaeIntakeLocation) => void;
  handleLocation: (selection: AlgaeScoringLocation) => void;
  handleResult: (selection: boolean) => void,
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoAlgaePanel({
  intakeActive,
  locationActive,
  resultActive,
  intakeSelected,
  locationSelected,
  handleIntake,
  handleLocation,
  handleResult,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
        <h1>Algae</h1>
        <Row className="d-flex justify-content-center">
            <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                <h1 className="text-center mb-1">Intake</h1>
                {/* Copy everything in this div. */}
                <div className="d-flex flex-column">
                    <h3 className = "text-center">Ground</h3>
                    <TeleopIntakeButton
                        className="mt-2"
                        active={intakeActive}
                        selected={intakeSelected == AlgaeIntakeLocation.TELEOPGROUND}
                        handleSelection={() => handleIntake(AlgaeIntakeLocation.TELEOPGROUND)}
                        gamePiece="algae"
                    />
                </div>
                <div className="d-flex flex-column">
                    <h3 className = "text-center">Reef</h3>
                    <TeleopIntakeButton
                        className="mt-2"
                        active={intakeActive}
                        selected={intakeSelected == AlgaeIntakeLocation.TELEOPREEF}
                        handleSelection={() => handleIntake(AlgaeIntakeLocation.TELEOPREEF)}
                        gamePiece="algae"
                    />
                </div>
            </Col>
            <Col className="d-flex flex-column" style={{backgroundColor:"purple"}}>
                <h1 className="text-center mb-1">Scoring</h1>
                <div className="d-flex flex-column">
                    <LocationButton
                        className="mt-2"
                        active={locationActive}
                        selected={locationSelected == AlgaeScoringLocation.NET}
                        handleSelection={() => handleLocation(AlgaeScoringLocation.NET)}
                        text="Net"
                    />
                    <LocationButton
                        className="mt-2"
                        active={locationActive}
                        selected={locationSelected == AlgaeScoringLocation.PROCESSOR}
                        handleSelection={() => handleLocation(AlgaeScoringLocation.PROCESSOR)}
                        text="Proc."
                    />
                </div>
            </Col>
            <Col className="d-flex flex-column" style={{backgroundColor:"gray"}}>
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
