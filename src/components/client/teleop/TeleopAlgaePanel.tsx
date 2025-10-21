/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/TeleopScoringButton";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import DroppedButton from "../mini/DroppedButton";
import { Col, Row } from "react-bootstrap";
import { AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, AppDispatch } from "@/redux/store";
import { mainData } from "@/redux/adminDataSlice";
import {
  handleAlgae,
  handleAlgaeCancel,
} from "@/redux/scoresSlice";

interface Props {
    incapActive: boolean;
    activeSide: string;
    intakeSelected?: AlgaeIntakeLocation;
    locationSelected?: AlgaeScoringLocation;
    // handleSelection: (
    //     phrase: string,
    //     data:{
    //       intakeSelection?: AlgaeIntakeLocation,
    //       scoringLocation?: AlgaeScoringLocation,
    //       dropped?: boolean,
    //       failedScoring?: boolean,
    //     },
    //   ) => void;
    //   handleCancel: (phrase: string) => void;
}

//Displays a map of half of the field.
//The notes are clickable, each representing an enum choice that represents that position.
//Click a note again to render it missing, and click again to indicate no pickup.
export default function AutoAlgaePanel({
    incapActive,
    activeSide,
    intakeSelected,
    locationSelected,
    // handleSelection,
    // handleCancel,
}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const mainData = useSelector((state: ReduxState) => state.mainData);

    const handleIntaking = (intakeSelection: AlgaeIntakeLocation) => {
        if(!incapActive && activeSide=="intaking"){
            dispatch(
                handleAlgae({
                    phrase: "intaking",
                    data: {
                        intakeSelection: intakeSelection
                    }
                })
            );
        }
    };
    const handleScoring = (scoringLocation: AlgaeScoringLocation) => {
        if(!incapActive && activeSide=="scoring"){
            dispatch(
                handleAlgae({
                    phrase: "scoring",
                    data: {
                        scoringLocation: scoringLocation,
                        dropped: false
                    }
                })
            );
        }
    };
    const handleResult = (failedScoring: boolean) => {
        if(!incapActive && activeSide=="result"){
            dispatch(
                handleAlgae({
                    phrase: "result",
                    data: {
                        failedScoring: failedScoring
                    }
                })
            );
        }
    };
    const handleCancel = (phrase: "intaking" | "scoring" | "result") => {
        dispatch(
            handleAlgaeCancel({
                phrase: phrase,
            })
        );
    }

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
                            handleSelection={() => handleIntaking(AlgaeIntakeLocation.TELEOPGROUND)}
                            handleCancel={() => handleCancel("scoring")}
                            gamePiece="algae"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <h3 className = "text-center">Reef</h3>
                        <TeleopIntakeButton
                            active={activeSide=="intaking"&&!incapActive}
                            selected={intakeSelected == AlgaeIntakeLocation.TELEOPREEF}
                            handleSelection={() => handleIntaking(AlgaeIntakeLocation.TELEOPREEF)}
                            handleCancel={() => handleCancel("scoring")}
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
                            handleSelection={() => handleScoring(AlgaeScoringLocation.NET)}
                            handleCancel={() => handleCancel("result")}
                            text="Net"
                        />
                        <LocationButton
                            className="mt-2"
                            active={activeSide=="scoring"&&!incapActive}
                            selected={locationSelected == AlgaeScoringLocation.PROCESSOR}
                            handleSelection={() => handleScoring(AlgaeScoringLocation.PROCESSOR)}
                            handleCancel={() => handleCancel("result")}
                            text="Proc."
                        />
                    </div>
                </Col>
                <Col className="d-flex flex-column">
                    <h2 className="text-center mb-1">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => handleResult(false)}
                            gamePiece="algae"
                        />
                        <FailButton
                            className="mt-2"
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => handleResult(true)}
                            gamePiece="algae"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
