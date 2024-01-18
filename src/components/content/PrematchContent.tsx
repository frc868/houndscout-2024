"use client";

import StartButton from "@/components/prematch/StartButton";
import StartingPositionSelector from "@/components/prematch/StartingZoneSelector";
import {
  setAutoStartingZone,
  setAutoStartingZoneAsync,
  // setPreloadPieceAsync,
  // setPresetPiecesAsync,
} from "@/redux/scoresSlice";
import { AppDispatch, ReduxState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function PrematchContent() {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  const mainData = useSelector((state: ReduxState) => state.mainData);

  // initializes API data with
  useEffect(() => {
    // dispatch(setPresetPiecesAsync({ pieces: scores.presetPieces }));
    // dispatch(setPreloadPieceAsync({ piece: scores.preloadPiece }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="my-5 d-flex justify-content-center">
        <Col
          md={2}
          className={`pt-3 pb-2 px-2 rounded-4 bg-${
            mainData.station?.includes("red") ? "danger" : "primary"
          }-subtle`}
        >
          <h1 className="text-center">
            {mainData.station?.includes("red") ? "Red" : "Blue"}{" "}
            {mainData.station?.[mainData.station?.length - 1]}
          </h1>
          <h1 className="text-center">Team {mainData.activeTeamNumber}</h1>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={5}>
          <StartingPositionSelector
            selected={scores.autoStartingZone}
            handleSelection={async (zone) => {
              dispatch(setAutoStartingZoneAsync({ zone }));
            }}
          />
        </Col>
        <Col md={3}>
          
        </Col>
        <Col md={3} className="d-flex justify-content-left">
          <div className="d-flex justify-content-center align-items-left flex-column">
            
            <StartButton enabled={false} handleClick={() => {}} />
          </div>
        </Col>
      </Row>
    </>
  );
}
