"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import { TeleopCoralIntakeLocation, TeleopAlgaeIntakeLocation, CoralScoringLevel, AlgaeScoringLocation } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TeleopStagePanel from "@/components/client/endgame/EndgamePanel";
import {
  sendTeleopCoralEvent,
  sendTeleopAlgaeEvent,
} from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

interface Props {
  show: boolean;
  intakeSelected?: IntakeLocation;
  handleIntakeSelection: (selection: IntakeLocation) => void;
  scoringActive: boolean;
  handleScoringSelection: (
    location?: ScoringLocation,
    failed?: boolean,
    dropped?: boolean
  ) => void;
}


export default function SomethingPanel({ show, intakeSelected, handleIntakeSelection, scoringActive, handleScoringSelection }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  //UPDATE CYCLE: Make sure everything down to handleScoringSelection is duplicated if there's multiple game pieces.
  //Also ensure the enums used are accurate; those are imported from Prisma, so update those as well.
  const [coralIntakeLocation, setCoralIntakeLocation] = useState<
    TeleopCoralIntakeLocation | undefined
  >(undefined);
  const [coralActiveSide, setCoralActiveSide] = useState("intaking");//This is set between intaking and scoring.
  
  //triggers when intake location is selected
  const handleCoralIntakeSelection = (selection: TeleopCoralIntakeLocation) => {
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
        intakeLocation: coralIntakeLocation as TeleopCoralIntakeLocation,
        scoringLocation: location,
        failedScoring,
        dropped,
        //Need to add timestampPickedUp and timestampScored here.
      }; //teleopScoringEvent creation.
      setCoralIntakeLocation(undefined);
      setCoralActiveSide("intaking");

      await dispatch(sendTeleopCoralEvent(event));
    }
  };


  const [algaeIntakeLocation, setAlgaeIntakeLocation] = useState<
    TeleopAlgaeIntakeLocation | undefined
  >(undefined);
  const [algaeActiveSide, setAlgaeActiveSide] = useState("intaking");//This is set between intaking and scoring.
  
  //triggers when intake location is selected
  const handleAlgaeIntakeSelection = (selection: TeleopAlgaeIntakeLocation) => {
    //Add a timestamp creator at the first scoring input.
    setAlgaeIntakeLocation(selection);
    setAlgaeActiveSide("scoring");    
  };
  //triggers when scoring location is selected
  const handleAlgaeScoringSelection = async (
    location?: CoralScoringLevel,
    failedScoring?: boolean,
    dropped?: boolean
  ) => {
    if (algaeActiveSide == "scoring") {
      //Add a timestamp creator here or wherever the first scoring input is.
      const event = {
        intakeLocation: algaeIntakeLocation as TeleopAlgaeIntakeLocation,
        scoringLocation: location,
        failedScoring,
        dropped,
        //Need to add timestampPickedUp and timestampScored here.
      }; //teleopScoringEvent creation.
      setAlgaeIntakeLocation(undefined);
      setAlgaeActiveSide("intaking");

      await dispatch(sendTeleopAlgaeEvent(event));
    }
  };

  return (
    <div className={`${!show && "d-none"}`}>
      { /* We're probably going to redo this layout, but keep a copy of it for future reference.  */ }
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={3}>
          <TeleopIntakePanel
            selected={intakeLocation}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex justify-content-end" md={4}>
          <TeleopScoringPanel
            active={activeSide === "scoring"}
            handleSelection={handleScoringSelection}
          />
        </Col>
      </Row>
    </div>
  );
}
