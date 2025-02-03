"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
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
  handleCoralIntakeSelection,
  handleCoralScoringSelection,
  handleCoralResultSelection,
  algaeActiveSide,
  algaeIntakeLocation,
  handleAlgaeIntakeSelection,
  handleAlgaeScoringSelection,
  handleAlgaeResultSelection,
  incapOn,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  

  return (
    <div className={`${!show && "d-none"}`}>
      { /* We're probably going to redo this layout, but keep a copy of it for future reference.  */ }
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={3}>
          <TeleopIntakePanel
            selected={coralIntakeLocation}
            handleSelection={handleCoralIntakeSelection}
          />
        </Col>
        <Col className="d-flex justify-content-end" md={4}>
          <TeleopScoringPanel
            active={coralActiveSide === "scoring"}
            handleSelection={handleCoralScoringSelection}
          />
        </Col>
      </Row>
    </div>
  );
}
