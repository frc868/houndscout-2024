"use client";

import AutoCoralPanel from "@/components/client/auto/AutoCoralPanel";
import AutoAlgaePanel from "@/components/client/auto/AutoAlgaePanel";
import DroppedPanel from "@/components/client/common/DroppedPanel";
import MobilityToggleBox from "@/components/client/mini/MobilityToggleBox";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

import {
  setLeftStartingZoneAsync,
  handleCoral,
  handleAlgae,
} from "@/redux/scoresSlice";
import {
  CoralIntakeLocation, 
  AlgaeIntakeLocation,
  CoralScoringLevel,
  CoralScoringSide,
  AlgaeScoringLocation,
  Section,
} from "@prisma/client";
import IncapButton from "../mini/IncapButton";


interface Props {
  show: boolean;
  coralActiveSide: string;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  coralScoringSide?: CoralScoringSide;
  // handleCoral: (
  //   phrase: string,
  //   data:{
  //     intakeSelection?: CoralIntakeLocation,
  //     scoringLevel?: CoralScoringLevel,
  //     dropped?: boolean,
  //     scoringSide?: CoralScoringSide,
  //     failedScoring?: boolean,
  //   },
  // ) => void;
  // handleCoralCancel: (phrase: string) => void;
  algaeActiveSide: string;
  algaeIntakeLocation?: AlgaeIntakeLocation;
  algaeScoringLocation?: AlgaeScoringLocation;
  // handleAlgae: (
  //   phrase: string,
  //   data:{
  //     intakeSelection?: AlgaeIntakeLocation,
  //     scoringLocation?: AlgaeScoringLocation,
  //     dropped?: boolean,
  //     failedScoring?: boolean,
  //   },
  // ) => void;
  // handleAlgaeCancel: (phrase: string) => void;
  incapOn: boolean;
  // handleIncap: () => void;
  mobility: boolean;
  // handleMobility: () => void;
}

export default function AutoContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  coralScoringLevel,
  coralScoringSide,
  // handleCoral,
  // handleCoralCancel,
  algaeActiveSide,
  algaeIntakeLocation,
  algaeScoringLocation,
  // handleAlgae,
  // handleAlgaeCancel,
  incapOn,
  // handleIncap,
  mobility,
  // handleMobility,
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
            // handleSelection={handleCoral}
            // handleCancel={handleCoralCancel}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={6}>
          <AutoAlgaePanel
            incapActive={incapOn}
            activeSide={algaeActiveSide}
            intakeSelected={algaeIntakeLocation}
            locationSelected={algaeScoringLocation}
            // handleSelection={handleAlgae}
            // handleCancel={handleAlgaeCancel}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center align-items-center" md={4}>
          <IncapButton
            className="text-nowrap my-1"
            active={incapOn}
            // handleClick={handleIncap}
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center" md={4}>
          <DroppedPanel
            coralActive={coralActiveSide=="level"}
            algaeActive={algaeActiveSide=="scoring"}
            handleCoralDropped={() => dispatch(
              handleCoral({
                tab: Section.AUTO,
                phrase: "level",
                data: {
                  scoringLevel: undefined,
                  dropped: true
                }
              })
            )}
            handleAlgaeDropped={() => dispatch(
              handleAlgae({
                phrase: "scoring",
                data: {
                  scoringLocation: undefined,
                  dropped: true
                }
              })
            )}
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center" md={4}>
          <MobilityToggleBox
            enabled={mobility}
            handleClick={() => dispatch(
              setLeftStartingZoneAsync({leftStartingZone: mobility})
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
