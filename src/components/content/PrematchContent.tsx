"use client";

import PreloadSelector from "@/components/prematch/PreloadSelector";
import PresetSelector from "@/components/prematch/PresetSelector";
import StartButton from "@/components/prematch/StartButton";
import StartingPositionSelector from "@/components/prematch/StartingZoneSelector";
import {
  setAutoStartingZone,
  setAutoStartingZoneAsync,
  setPreloadPieceAsync,
  setPresetPiecesAsync,
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
    dispatch(setPresetPiecesAsync({ pieces: scores.presetPieces }));
    dispatch(setPreloadPieceAsync({ piece: scores.preloadPiece }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-end" md={6}>
          <StartingPositionSelector
            selected={scores.autoStartingZone}
            handleSelection={async (zone) => {
              dispatch(setAutoStartingZoneAsync({ zone }));
            }}
          />
        </Col>
        <Col md={4} className="justifty-content-center align-items-center">
          <Row className={`my-5 rounded-4 d-flex justify-content-end align-items-center bg-${mainData.station?.includes("red") ? "danger" : "primary"}-subtle`}>
            <h1 className="text-center">
              {mainData.station?.includes("red") ? "Red" : "Blue"} {mainData.station?.[mainData.station?.length - 1]} Team {mainData.activeTeamNumber}
            </h1>
          </Row>
          <Row className=" my-5 d-flex justify-content-center align-items-center">
            <StartButton enabled={false} handleClick={() => { }} />
          </Row>
        </Col>
      </Row>
    </>
  );
}
