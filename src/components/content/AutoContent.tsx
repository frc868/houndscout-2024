"use client";

import ChargeButton from "@/components/mini/ChargeButton";
import IncapButton from "@/components/mini/IncapButton";
import AutoChargeSelector from "@/components/auto/AutoChargeSelector";
import AutoIntakePanel from "@/components/auto/AutoIntakePanel";
import AutoScoringPanel from "@/components/auto/AutoScoringPanel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { sendAutoEvent } from "@/redux/scoresSlice";

export default function AutoContent() {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  const [selected, setSelected] = useState<number | null>(null);
  const [activeSide, setActiveSide] = useState("intake");

  const handleIntakeSelection = (selection: number) => {
    setSelected(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    selection: "SPEAKER" | "AMP" | "FAILED"
  ) => {
    const event = {
      intakeType: "PRESET" as "PRELOAD" | "PRESET",
      gamePiece: scores.presetPieces[Number(selected)],
      ...(selection === "FAILED"
        ? { failed: true }
        : { scoringPosition: selection, failed: false }),
    };

    await dispatch(sendAutoEvent(event));

    setSelected(null);
    setActiveSide("intaking");
  };

  return (
    <>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-end pe-5 me-5" md={5}>
          <AutoIntakePanel
            selected={selected}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={2}>
          <AutoScoringPanel
            active={activeSide === "scoring"}
            handleClick={handleScoringSelection}
          />
        </Col>
        <Col
          className="d-flex align-items-center justify-content-start ms-5 ps-5"
          md={4}
        >
          <div className="d-flex flex-column">
            <ChargeButton className="my-2" />
            <IncapButton className="mt-2 mb-5" />
            
          </div>
        </Col>
      </Row>
    </>
  );
}
