/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import TeleopIntakeButton from "../mini/TeleopIntakeButton";
import LocationButton from "../mini/TeleopScoringButton";
import AutoIntakeButton from "../mini/AutoIntakeButton";
import DroppedButton from "../mini/DroppedButton";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { Col, Row } from "react-bootstrap";
import { AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, AppDispatch } from "@/redux/store";
import { mainData } from "@/redux/adminDataSlice";
import {
  handleAlgae,
  handleAlgaeCancel,
} from "@/redux/scoresSlice";
import { useEffect, useRef } from "react";

interface Props {
    incapActive: boolean;
    activeSide: string;
    intakeSelected?: AlgaeIntakeLocation;
    locationSelected?: AlgaeScoringLocation;
    // handleSelection: (
    //     phrase: string,
    //     data:{
    //         intakeSelection?: AlgaeIntakeLocation,
    //         scoringLocation?: AlgaeScoringLocation,
    //         dropped?: boolean,
    //         failedScoring?: boolean,
    //     },
    // ) => void;
    // handleCancel: (phrase: string) => void;
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

    const flip = (mainData.blueOnLeft && mainData.station?.includes("RED")) || (!mainData.blueOnLeft && mainData.station?.includes("BLUE"));
    
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
                <Col className="d-flex flex-column" md={8}>
                    <h2 className="text-center">Intake</h2>
                    {/* Copy everything in this div. */}
                    <Row className={`d-flex ${flip?"flex-row-reverse":"flex-row"}`}>
                        <Col className="d-flex flex-column" md={4}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h4>Ground</h4>
                                <div className={`d-flex ${flip?"flex-column-reverse":"flex-column"} justify-content-center align-items-center`}>
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"&&!incapActive}
                                        selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND1}
                                        handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOGROUND1)}
                                        handleCancel={() => handleCancel("scoring")}
                                        gamePiece="algae"
                                        number="1"
                                    />
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"&&!incapActive}
                                        selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND2}
                                        handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOGROUND2)}
                                        handleCancel={() => handleCancel("scoring")}
                                        gamePiece="algae"
                                        number="2"
                                    />
                                    <TeleopIntakeButton
                                        className="mt-2"
                                        active={activeSide=="intaking"&&!incapActive}
                                        selected={intakeSelected==AlgaeIntakeLocation.AUTOGROUND3}
                                        handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOGROUND3)}
                                        handleCancel={() => handleCancel("scoring")}
                                        gamePiece="algae"
                                        number="3"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className="d-flex flex-column mt-1" md={8}>
                        <h4 className="text-center">Reef</h4>
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
                                    
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF1}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF1)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "67%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "70%" : "5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-5%" : "78%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "77%" : "-5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="1"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF2}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF2)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "0%" : "68%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "70%" : "5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "25%" : "46%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "45%" : "30%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="2"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF3}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF3)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "38%" : "36%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "35%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "40%" : "32%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "30%" : "40%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="3"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF4}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF4)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "70%" : "5%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "4%" : "65%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "30%" : "46%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "45%" : "30%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="4"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF5}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF5)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "70%" : "5%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "5%" : "65%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-5%" : "78%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "75%" : "-5%" // Redside with BlueOnLeft/OnRight
                                    }
                                    number="5"
                                />
                                <AutoIntakeButton
                                    active={activeSide=="intaking"&&!incapActive}
                                    selected={intakeSelected == AlgaeIntakeLocation.AUTOREEF6}
                                    handleSelection={()=>handleIntaking(AlgaeIntakeLocation.AUTOREEF6)}
                                    handleCancel={() => handleCancel("scoring")}
                                    gamePiece="algae"
                                    top={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "38%" : "36%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "37%" : "35%" // Redside with BlueOnLeft/OnRight
                                    }
                                    left={
                                        mainData.station?.includes("BLUE")
                                            ? mainData.blueOnLeft ? "-20%" : "93%" // Blueside with BlueOnLeft/OnRight
                                            : mainData.blueOnLeft ? "91%" : "-16%" // Redside with BlueOnLeft/OnRight
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
                <Col className="d-flex flex-column"  md={2}>
                    <h2 className="text-center">Result</h2>
                    <div className="d-flex flex-column">
                        <ScoreButton
                            className="mt-2"
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
