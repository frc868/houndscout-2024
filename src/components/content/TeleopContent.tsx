"use client";

import ChargeButton from "@/components/mini/ChargeButton";
import IncapButton from "@/components/mini/IncapButton";
import TeleopStagePanel from "@/components/teleop/TeleopStagePanel";
import TeleopIntakePanel from "@/components/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/teleop/TeleopScoringPanel";
import { sendAutoEvent, sendTeleopEvent } from "@/redux/scoresSlice";
import { AppDispatch, ReduxState } from "@/redux/store";
import { IntakeLocation, ScoringPosition } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function TeleopContent() {
  const dispatch = useDispatch<AppDispatch>();
  const [stageSelection, setStageSelection] = useState<
    "balanced" | "docked" | "failed" | null
  >(null);

  const [methodSelection, setMethodSelection] = useState<
    "balanced" | "docked" | "failed" | null
  >(null);

  const [intakeSelection, setIntakeSelection] = useState<
    IntakeLocation | null
  >(null);
  const [activeSide, setActiveSide] = useState("intaking");

  const handleIntakeSelection = (selection: IntakeLocation) => {
    setIntakeSelection(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    selection: ScoringPosition | "dropped" | "failed"
  ) => {
    const event = {
      intakeLocation: intakeSelection?.[1] as IntakeLocation,
      ...(selection === "failed"
        ? { failed: true }
        : selection === "dropped"
        ? { dropped: true }
        : { scoringPosition: selection, failed: false }),
    };

    await dispatch(sendTeleopEvent(event));

    setIntakeSelection(null);
    setActiveSide("intaking");
  };

  return (
    <>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={4}>
          <TeleopIntakePanel
            selected={intakeSelection}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={4}>
          <TeleopScoringPanel
            active={activeSide === "scoring"}
            handleClick={handleScoringSelection}
          />
        </Col>
        <Col className="d-flex justify-content-start" md={4}>
          <div className="d-flex flex-column">
            <ChargeButton className="my-2" />
            <IncapButton className="mt-2 mb-5" />
            <TeleopStagePanel
              stage={stageSelection}
              handleStage={setStageSelection}
              method={methodSelection}
              handleMethod={setMethodSelection}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
