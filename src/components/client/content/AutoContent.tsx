"use client";

import AutoIntakePanel from "@/components/client/auto/AutoIntakePanel";
import AutoScoringPanel from "@/components/client/auto/AutoScoringPanel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { sendAutoEvent, setLeftStartingZoneAsync } from "@/redux/scoresSlice";
import { AutoGamePiece, ScoringLocation } from "@prisma/client";

export default function AutoContent() {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);

  const [selectedGamePiece, setSelectedGamePiece] =
    useState<AutoGamePiece | null>(AutoGamePiece.PRELOAD);
  const [activeSide, setActiveSide] = useState("scoring");

  const handleIntakeSelection = (selection: AutoGamePiece) => {
    setSelectedGamePiece(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    scoringLocation?: ScoringLocation,
    failedScoring?: boolean,
    noNote?: boolean,
    missed?: boolean
  ) => {
    if (activeSide == "scoring") {
      const event = {
        gamePiece: selectedGamePiece as AutoGamePiece,
        scoringLocation,
        failedScoring: failedScoring || false,
        noNote: noNote || false,
        missed: missed || false,
      };

      await dispatch(sendAutoEvent(event));

      setSelectedGamePiece(null);
      setActiveSide("intaking");
    }
  };

  return (
    <>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-end pe-5" md={6}>
          <AutoIntakePanel
            alliance={mainData.alliance}
            blueOnLeft={mainData.blueOnLeft}
            selected={selectedGamePiece}
            usedGamePieces={scores.usedGamePieces}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex align-items-start flex-column" md={5}>
          <AutoScoringPanel
            active={activeSide === "scoring"}
            handleSelection={handleScoringSelection}
            leftStartingZoneEnabled={scores.leftStartingZone}
            handleLeftStartingZoneClick={() =>
              dispatch(
                setLeftStartingZoneAsync({
                  leftStartingZone: !scores.leftStartingZone,
                })
              )
            }
          />
        </Col>
      </Row>
    </>
  );
}
