"use client";

import UndoButton from "@/components/mini/UndoButton";
import IncapButton from "@/components/mini/IncapButton";
import AutoIntakePanel from "@/components/auto/AutoIntakePanel";
import AutoScoringPanel from "@/components/auto/AutoScoringPanel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { sendAutoEvent } from "@/redux/scoresSlice";

interface Props {
  incap: true | false;
  setIncap: (
    selection: true | false
  ) => void;
  activeSide: "intaking" | "scoring";
  setActiveSide: (
    selection: "intaking" | "scoring"
  ) => void;
}

export default function AutoContent({ incap, setIncap, activeSide, setActiveSide }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  const [selected, setSelected] = useState<number | null>(null);

  const handleIntakeSelection = (selection: number) => {
    setSelected(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    selection: "SPEAKER" | "AMP" | "", outcome: "FAIL" | "DROP" | "PICKUPFAIL" | "SUCCESS"
  ) => {
    const event = {
      intakeType: "PRESET" as "PRELOAD" | "PRESET",
      scoringPosition: selection,
      failed: outcome !== "SUCCESS",
    };

    await dispatch(sendAutoEvent(event));

    setSelected(null);
    setActiveSide("intaking");
  };

  return (
    <>
      <Row className="my-4 d-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={6}>
          <AutoIntakePanel
            presets={scores.presetPieces}
            selected={selected}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex flex-column align-items-stretch" md={5}>
          <AutoScoringPanel
            active={activeSide === "scoring"}
            handleClick={handleScoringSelection}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
            <UndoButton className="mr-5 w-25" handleClick={()=>{}} />
            <IncapButton className="ml-5 w-25" active={incap} handleClick={setIncap} />
      </Row>
    </>
  );
}
