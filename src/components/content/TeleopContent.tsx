"use client";

import ChargeButton from "@/components/mini/ChargeButton";
import UndoButton from "@/components/mini/UndoButton";
import IncapButton from "@/components/mini/IncapButton";
import TeleopChargeSelector from "@/components/teleop/TeleopChargeSelector";
import TeleopIntakePanel from "@/components/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/teleop/TeleopScoringPanel";
import { sendTeleopEvent } from "@/redux/scoresSlice";
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
  const [stageOutcomeSelection, setStageOutcomeSelection] = useState<
  "failed" | "climbed" | null
  >(null);
  const [stageHarmonySelection, setStageHarmonySelection] = useState<
  "failed" | "zero" | "one" | "two" | null
  >(null);
  const [stageTrapSelection, setStageTrapSelection] = useState<boolean>(false);
  const [stageSpotlitSelection, setStageSpotlitSelection] = useState<boolean>(false);

  const [intakeSelection, setIntakeSelection] = useState<
    "GROUND" | "SOURCE" | ""
  >("");
  const [activeSide, setActiveSide] = useState("intaking");

  const handleIntakeSelection = (selection: "GROUND" | "SOURCE" | "") => {
    setIntakeSelection(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    selection: "SPEAKER" | "AMP" | "", outcome: "FAIL" | "DROP" | "SUCCESS"
  ) => {
    const event = {
      intakeLocation: intakeSelection,
      scoringPosition: selection,
      failed: outcome !== "SUCCESS",
    };

    await dispatch(sendTeleopEvent(event));

    setIntakeSelection("");
    setActiveSide("intaking");
  };

  return (
    <>
      <Row className="my-3">
        <Col className="d-flex justify-content-end" md={2}>
          <TeleopIntakePanel
            selected={intakeSelection}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex flex-column align-items-stretch" md={5}>
          <TeleopScoringPanel
            active={activeSide === "scoring"}
            handleClick={handleScoringSelection}
          />
        </Col>
        <Col className="d-flex justify-content-start" md={5}>
          <div className="d-flex flex-column">
            <TeleopChargeSelector
              outcome={stageOutcomeSelection}
              handleOutcome={setStageOutcomeSelection}
              harmony={stageHarmonySelection}
              handleHarmony={setStageHarmonySelection}
              trap={stageTrapSelection}
              handleTrap={setStageTrapSelection}
              spotlit={stageSpotlitSelection}
              handleSpotlit={setStageSpotlitSelection}
            />
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
            <UndoButton className="mr-5 w-25" handleClick={()=>{}} />
            <IncapButton className="ml-5 w-25" active={incap} handleClick={setIncap} />
      </Row>
    </>
  );
}
