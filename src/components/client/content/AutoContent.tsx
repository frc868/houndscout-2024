"use client";

import AutoCoralPanel from "@/components/client/auto/AutoCoralPanel";
import AutoAlgaePanel from "@/components/client/auto/AutoAlgaePanel";
import SidewaysToggleBox from "@/components/client/mini/SidewaysToggleBox";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

import {
  setLeftStartingZoneAsync,
} from "@/redux/scoresSlice";
import {
  CoralIntakeLocation, 
  AlgaeIntakeLocation,
  CoralScoringLevel,
  CoralScoringSide,
  AlgaeScoringLocation
} from "@prisma/client";
import IncapButton from "../mini/IncapButton";

interface Props {
  show: boolean;
  coralActiveSide: string;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  coralScoringSide?: CoralScoringSide;
  handleCoral: (
    phrase: string,
    data:{
      intakeSelection?: CoralIntakeLocation,
      scoringLevel?: CoralScoringLevel,
      dropped?: boolean,
      scoringSide?: CoralScoringSide,
      failedScoring?: boolean,
    },
  ) => void;
  algaeActiveSide: string;
  algaeIntakeLocation?: AlgaeIntakeLocation;
  algaeScoringLocation?: AlgaeScoringLocation;
  handleAlgae: (
    phrase: string,
    data:{
      intakeSelection?: AlgaeIntakeLocation,
      scoringLocation?: AlgaeScoringLocation,
      dropped?: boolean,
      failedScoring?: boolean,
    },
  ) => void;
  incapOn: boolean;
  handleIncap: () => void;
  mobility: boolean;
  handleMobility: () => void;
}

export default function AutoContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  coralScoringLevel,
  coralScoringSide,
  handleCoral,
  algaeActiveSide,
  algaeIntakeLocation,
  algaeScoringLocation,
  handleAlgae,
  incapOn,
  handleIncap,
  mobility,
  handleMobility,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={6}>
          <AutoCoralPanel
            incapActive={incapOn}
            activeSide={coralActiveSide}
            intakeSelected={coralIntakeLocation}
            levelSelected={coralScoringLevel}
            sideSelected={coralScoringSide}
            handleSelection={handleCoral}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={6}>
          <AutoAlgaePanel
            incapActive={incapOn}
            activeSide={algaeActiveSide}
            intakeSelected={algaeIntakeLocation}
            locationSelected={algaeScoringLocation}
            handleSelection={handleAlgae}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center align-items-center" md={6}>
          <IncapButton
            className="text-nowrap my-1"
            active={incapOn}
            handleClick={handleIncap}
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center" md={6}>
          <SidewaysToggleBox
            name="Left Starting Area?"
            enabled={mobility}
            handleClick={handleMobility}
          />
        </Col>
      </Row>
    </div>
  );
}
