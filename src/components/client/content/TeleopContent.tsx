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
import EndgamePanel from "@/components/client/teleop/EndgamePanel";
import {
  setEndgameTypeAsync,
  setEndgameSuccessAsync,
} from "@/redux/scoresSlice";
import IncapButton from "../mini/IncapButton";

interface Props {
  show: boolean;
  coralActiveSide: string;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  handleCoral: (
    phrase: string,
    data:{
      intakeSelection?: CoralIntakeLocation,
      scoringLevel?: CoralScoringLevel,
      dropped?: boolean,
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
}

//Teleop tab.
//Most of this stuff will probably be copied onto the new auton page, and duplicated for each game piece.
export default function TeleopContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  coralScoringLevel,
  handleCoral,
  algaeActiveSide,
  algaeIntakeLocation,
  algaeScoringLocation,
  handleAlgae,
  incapOn,
  handleIncap,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-left" md={4}>
          <TeleopCoralPanel
            incapActive={incapOn}
            activeSide={coralActiveSide}
            intakeSelected={coralIntakeLocation}
            levelSelected={coralScoringLevel}
            handleSelection={handleCoral}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={4}>
          <TeleopAlgaePanel
            incapActive={incapOn}
            activeSide={algaeActiveSide}
            intakeSelected={algaeIntakeLocation}
            locationSelected={algaeScoringLocation}
            handleSelection={handleAlgae}
          />
        </Col>
        <Col className="d-flex justify-content-right mx-3" md={1}>
          <EndgamePanel
            //Endgame content.
              endgameType={scores.endgameType}
              endgameSuccess={scores.endgameSuccess}
              handleEndgameTypeSelection={async (endgameType) =>
                await dispatch(setEndgameTypeAsync({ endgameType }))
              }
              handleSuccessSelection={async (endgameSuccess) =>
                await dispatch(setEndgameSuccessAsync({ endgameSuccess }))
              }
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
                <DroppedPanel
                  coralActive={coralActiveSide=="level"}
                  algaeActive={algaeActiveSide=="scoring"}
                  handleCoralDropped={() => {
                    handleCoral("level",{
                        scoringLevel: undefined,
                        dropped: true
                    })
                  }}
                  handleAlgaeDropped={() => {
                    handleAlgae("scoring",{
                        scoringLocation: undefined,
                        dropped: true
                    })
                  }}
                />
              </Col>
            </Row>
    </div>
  );
}
