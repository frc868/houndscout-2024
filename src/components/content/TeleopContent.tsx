"use client";

import ChargeButton from "@/components/mini/ChargeButton";
import IncapButton from "@/components/mini/IncapButton";
import TeleopChargeSelector from "@/components/teleop/TeleopChargeSelector";
import TeleopIntakePanel from "@/components/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/teleop/TeleopScoringPanel";
import { sendAutoEvent, sendTeleopEvent } from "@/redux/scoresSlice";
import { AppDispatch, ReduxState } from "@/redux/store";
import {  IntakeLocation, ScoringPosition } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  incap: true | false;
  setIncap: (
    selection: true | false
  ) => void;
  }

export default function TeleopContent({incap, setIncap}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [stageLocationSelection, setStageLocationSelection] = useState<
    "left" | "center" | "right" | null
  >(null);
  const [stageHarmonySelection, setStageHarmonySelection] = useState<
  "failed" | "zero" | "one" | "two" | null
  >(null);
  const [stageTrapSelection, setStageTrapSelection] = useState<
  "failed" | "success" | null
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
      <Row className="my-3">
        <Col className="d-flex justify-content-end" md={3}>
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
        <Col className="d-flex justify-content-start" md={5}>
          <div className="d-flex flex-column">
            <TeleopChargeSelector
              location={stageLocationSelection}
              handleLocation={setStageLocationSelection}
              harmony={stageHarmonySelection}
              handleHarmony={setStageHarmonySelection}
              trap={stageTrapSelection}
              handleTrap={setStageTrapSelection}
            />
          </div>
        </Col>
      </Row>
      <IncapButton className="mt-2" active={incap} handleClick={setIncap} />
    </>
  );
}
