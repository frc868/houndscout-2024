"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch } from "@/redux/store";
import { ClimbType, IntakeLocation, ScoringLocation } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TeleopStagePanel from "@/components/client/teleop/TeleopStagePanel";
import { sendTeleopEvent } from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

export default function TeleopContent() {
  const dispatch = useDispatch<AppDispatch>();

  const [intakeLocation, setIntakeLocation] = useState<
    IntakeLocation | undefined
  >(undefined);
  const [activeSide, setActiveSide] = useState("intaking");

  const [climbActive, setClimbActive] = useState(false);
  const [climbType, setClimbType] = useState<ClimbType | undefined>(undefined);
  const [numRobots, setNumRobots] = useState<number | undefined>(undefined);
  const [scoredInTrap, setScoredInTrap] = useState(false);
  const [spotlit, setSpotlit] = useState(false);

  const handleIntakeSelection = (selection: IntakeLocation) => {
    setIntakeLocation(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    location?: ScoringLocation,
    failed?: boolean,
    dropped?: boolean
  ) => {
    if (activeSide == "scoring") {
      const event = {
        intakeLocation: intakeLocation as IntakeLocation,
        scoringLocation: location,
        failed,
        dropped,
      };

      await dispatch(sendTeleopEvent(event));

      setIntakeLocation(undefined);
      setActiveSide("intaking");
    }
  };

  return (
    <>
      <Row></Row>
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
        <Col className="d-flex justify-content-start ms-5" md={4}>
          <TeleopStagePanel
            active={climbActive}
            climbType={climbType}
            numRobots={numRobots}
            scoredInTrap={scoredInTrap}
            spotlit={spotlit}
            handleStart={() => setClimbActive((old) => !old)}
            handleClimbTypeSelection={setClimbType}
            handleNumRobotsSelection={setNumRobots}
            handleScoredInTrapSelection={setScoredInTrap}
            handleSpotlitSelection={setSpotlit}
          />
        </Col>
      </Row>
    </>
  );
}
