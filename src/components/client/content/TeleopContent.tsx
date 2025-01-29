"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import { CoralIntakeLocation, AlgaeIntakeLocation, CoralScoringLevel, AlgaeScoringLocation } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TeleopStagePanel from "@/components/client/endgame/EndgamePanel";
import {
  sendCoralEvent,
  sendAlgaeEvent,
} from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

interface Props {
  show: boolean;
}

//Teleop tab.
//Most of this stuff will probably be copied onto the new auton page, and duplicated for each game piece.
export default function TeleopContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  //UPDATE CYCLE: Make sure everything down to handleScoringSelection is duplicated if there's multiple game pieces.
  //Also ensure the enums used are accurate; those are imported from Prisma, so update those as well.
  const [coralIntakeLocation, setCoralIntakeLocation] = useState<
    CoralIntakeLocation | undefined
  >(undefined);
  const [coralActiveSide, setCoralActiveSide] = useState("intaking");//This is set between intaking and scoring.
  
  //triggers when intake location is selected
  const handleCoralIntakeSelection = (selection: CoralIntakeLocation) => {
    //Add a timestamp creator at the first scoring input.
    setCoralIntakeLocation(selection);
    setCoralActiveSide("scoring");    
  };
  //triggers when scoring location is selected
  const handleCoralScoringSelection = async (
    location?: CoralScoringLevel,
    failedScoring?: boolean,
    dropped?: boolean
  ) => {
    if (coralActiveSide == "scoring") {
      //Add a timestamp creator here or wherever the first scoring input is.
      const event = {
        intakeLocation: coralIntakeLocation as CoralIntakeLocation,
        scoringLocation: location,
        failedScoring,
        dropped,
        //Need to add timestampPickedUp and timestampScored here.
      }; //teleopScoringEvent creation.
      setCoralIntakeLocation(undefined);
      setCoralActiveSide("intaking");

      await dispatch(sendCoralEvent(event));
    }
  };


  const [algaeIntakeLocation, setAlgaeIntakeLocation] = useState<
    AlgaeIntakeLocation | undefined
  >(undefined);
  const [algaeActiveSide, setAlgaeActiveSide] = useState("intaking");//This is set between intaking and scoring.
  
  //triggers when intake location is selected
  const handleAlgaeIntakeSelection = (selection: AlgaeIntakeLocation) => {
    //Add a timestamp creator at the first scoring input.
    setAlgaeIntakeLocation(selection);
    setAlgaeActiveSide("scoring");    
  };
  //triggers when scoring location is selected
  const handleAlgaeScoringSelection = async (
    location?: AlgaeScoringLocation,
    failedScoring?: boolean,
    dropped?: boolean
  ) => {
    if (algaeActiveSide == "scoring") {
      //Add a timestamp creator here or wherever the first scoring input is.
      const event = {
        intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
        scoringLocation: location,
        failedScoring,
        dropped,
        //Need to add timestampPickedUp and timestampScored here.
      }; //teleopScoringEvent creation.
      setAlgaeIntakeLocation(undefined);
      setAlgaeActiveSide("intaking");

      await dispatch(sendAlgaeEvent(event));
    }
  };

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
