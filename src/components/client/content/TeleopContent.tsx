"use client";

import TeleopCoralPanel from "@/components/client/teleop/TeleopCoralPanel";
import TeleopAlgaePanel from "@/components/client/teleop/TeleopAlgaePanel";
import DroppedPanel from "@/components/client/common/DroppedPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  CoralIntakeLocation, 
  AlgaeIntakeLocation,
  CoralScoringLevel,
  AlgaeScoringLocation
} from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MiniToggleBox from "../mini/MiniToggleBox";

interface Props {
  show: boolean;
  coralActiveSide: string;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  handleCoralIntakeSelection: (selection: CoralIntakeLocation) => void;
  handleCoralScoringSelection: (
      level?: CoralScoringLevel,
      dropped?: boolean
    ) => void;
  handleCoralResultSelection: (
      failedScoring: boolean,
    ) => void;
  algaeActiveSide: string;
  algaeIntakeLocation?: AlgaeIntakeLocation;
  algaeScoringLocation?: AlgaeScoringLocation;
  handleAlgaeIntakeSelection: (selection: AlgaeIntakeLocation) => void;
  handleAlgaeScoringSelection: (
      location?: AlgaeScoringLocation,
      dropped?: boolean
    ) => void;
  handleAlgaeResultSelection: (
      failedScoring: boolean,
    ) => void;
  incapOn: boolean;
}

//Teleop tab.
//Most of this stuff will probably be copied onto the new auton page, and duplicated for each game piece.
export default function TeleopContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  coralScoringLevel,
  handleCoralIntakeSelection,
  handleCoralScoringSelection,
  handleCoralResultSelection,
  algaeActiveSide,
  algaeIntakeLocation,
  algaeScoringLocation,
  handleAlgaeIntakeSelection,
  handleAlgaeScoringSelection,
  handleAlgaeResultSelection,
  incapOn,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={6}>
          <TeleopCoralPanel
            activeSide={coralActiveSide}
            intakeSelected={coralIntakeLocation}
            levelSelected={coralScoringLevel}
            handleIntake={handleCoralIntakeSelection}
            handleLevel={handleCoralScoringSelection}
            handleResult={handleCoralResultSelection}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={6}>
          <TeleopAlgaePanel
            activeSide={algaeActiveSide}
            intakeSelected={algaeIntakeLocation}
            locationSelected={algaeScoringLocation}
            handleIntake={handleAlgaeIntakeSelection}
            handleScoring={handleAlgaeScoringSelection}
            handleResult={handleAlgaeResultSelection}
          />
        </Col>
      </Row>
      <Row className="my-5 d-flex justify-content-center">
        <DroppedPanel
          coralActive={coralActiveSide=="level"}
          algaeActive={algaeActiveSide=="scoring"}
          handleCoralDropped={handleCoralScoringSelection}
          handleAlgaeDropped={handleAlgaeScoringSelection}
        />
      </Row>
    </div>
  );
}
