/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Col, Row } from "react-bootstrap";
import { CoralIntakeLocation, CoralScoringLevel } from "@prisma/client";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/TeleopScoringButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import DroppedButton from "../mini/DroppedButton";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Section } from "@prisma/client";
import {
  handleCoral,
  handleCoralCancel,
} from "@/redux/scoresSlice";

interface Props {
    incapActive: boolean;
    activeSide: string;
    intakeSelected?: CoralIntakeLocation;
    levelSelected?: CoralScoringLevel;
    // handleSelection: (
    //     phrase: string,
    //     data:{
    //         intakeSelection?: CoralIntakeLocation,
    //         scoringLevel?: CoralScoringLevel,
    //         dropped?: boolean,
    //         failedScoring?: boolean,
    //     },
    // ) => void;
    // handleCancel: (phrase: string) => void;
}

export default function TeleopCoralPanel({
    incapActive,
    activeSide,
    intakeSelected,
    levelSelected,
    // handleSelection,
    // handleCancel,
}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const mainData = useSelector((state: ReduxState) => state.mainData);

    const handleIntaking = (intakeSelection: CoralIntakeLocation) => {
            if(!incapActive && activeSide=="intaking"){
                dispatch(
                    handleCoral({
                        tab: Section.TELEOP,
                        phrase: "intaking",
                        data: {
                            intakeSelection: intakeSelection
                        }
                    })
                );
            }
        };
        const handleScoring = (scoringLevel: CoralScoringLevel) => {
            if(!incapActive && activeSide=="level"){
                dispatch(
                    handleCoral({
                        tab: Section.TELEOP,
                        phrase: "level",
                        data: {
                            scoringLevel: scoringLevel,
                            dropped: false,
                        }
                    })
                );
            }
        }
        const handleResult = (failedScoring: boolean) => {
            if(!incapActive && activeSide=="result"){
                dispatch(
                    handleCoral({
                        tab: Section.TELEOP,
                        phrase: "result",
                        data: {
                            failedScoring: failedScoring
                        }
                    })
                );
            }
        }
        const handleCancel = (phrase: "intaking" | "level" | "side" | "result") => {
            dispatch(
                handleCoralCancel({
                    tab: Section.TELEOP,
                    phrase: phrase,
                })
            );
        }

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
                                active={activeSide=="intaking"&&!incapActive}
                                selected={intakeSelected==CoralIntakeLocation.TELEOPGROUND}
                                handleSelection={()=>handleIntaking(CoralIntakeLocation.TELEOPGROUND)}
                                handleCancel={() => handleCancel("level")}
                                gamePiece="coral"
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="text-center">Station</h3>
                            <TeleopIntakeButton
                                active={activeSide=="intaking"&&!incapActive}
                                selected={intakeSelected==CoralIntakeLocation.TELEOPSTATION}
                                handleSelection={()=>handleIntaking(CoralIntakeLocation.TELEOPSTATION)}
                                handleCancel={() => handleCancel("level")}
                                gamePiece="coral"
                            />
                        </div>
                </Col>
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-1">Scoring</h2>
                        <div className="d-flex flex-column align-items-center">
                            <LocationButton
                                active={activeSide=="level"&&!incapActive}
                                selected={levelSelected==CoralScoringLevel.LEVEL4}
                                handleSelection={() => {handleScoring(CoralScoringLevel.LEVEL4)}}
                                handleCancel={() => handleCancel("result")}
                                text="L4"
                            />
                            <LocationButton
                                className="mt-1"
                                active={activeSide=="level"&&!incapActive}
                                selected={levelSelected==CoralScoringLevel.LEVEL3}
                                handleSelection={() => {handleScoring(CoralScoringLevel.LEVEL3)}}
                                handleCancel={() => handleCancel("result")}
                                text="L3"
                            />
                            <LocationButton
                                className="mt-1"
                                active={activeSide=="level"&&!incapActive}
                                selected={levelSelected==CoralScoringLevel.LEVEL2}
                                handleSelection={() => {handleScoring(CoralScoringLevel.LEVEL2)}}
                                handleCancel={() => handleCancel("result")}
                                text="L2"
                            />
                            <LocationButton
                                className="mt-1"
                                active={activeSide=="level"&&!incapActive}
                                selected={levelSelected==CoralScoringLevel.LEVEL1}
                                handleSelection={() => {handleScoring(CoralScoringLevel.LEVEL1)}}
                                handleCancel={() => handleCancel("result")}
                                text="L1"
                            />
                        </div>
                </Col>
                <Col className="d-flex flex-column flex-shrink-1">
                    <h2 className="text-center mb-1">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => {handleResult(false)}}
                            gamePiece="coral"
                        />
                        <FailButton
                            className="mt-2"
                            active={activeSide=="result"&&!incapActive}
                            handleClick={() => {handleResult(true)}}
                            gamePiece="coral"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
