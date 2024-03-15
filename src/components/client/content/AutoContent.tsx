"use client";

import AutoIntakePanel from "@/components/client/auto/AutoIntakePanel";
import AutoScoringPanel from "@/components/client/auto/AutoScoringPanel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  setAutoGamePiecesAsync,
  setAutoGamePiecesScoredAsync,
  setLeftStartingZoneAsync,
  setMissingAutoGamePiecesAsync,
} from "@/redux/scoresSlice";
import { AutoGamePiece, ScoringLocation } from "@prisma/client";

export default function AutoContent() {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);

  const [selectedGamePieces, setSelectedGamePieces] = useState<AutoGamePiece[]>(
    []
  );
  const [missingGamePieces, setMissingGamePieces] = useState<AutoGamePiece[]>(
    []
  );
  const [numSelected, setNumSelected] = useState<number | undefined>(undefined);

  const handleIntakeSelection = async (selection: AutoGamePiece) => {
    if (
      selectedGamePieces.includes(selection) &&
      !missingGamePieces.includes(selection)
    )
      setMissingGamePieces((old) => [...old, selection]);
    else if (
      selectedGamePieces.includes(selection) &&
      missingGamePieces.includes(selection)
    ) {
      setSelectedGamePieces((old) =>
        old.filter((value) => value !== selection)
      );
      setMissingGamePieces((old) => old.filter((value) => value !== selection));
    } else {
      setSelectedGamePieces((old) => [...old, selection]);
    }

    await dispatch(
      setAutoGamePiecesAsync({ autoGamePieces: selectedGamePieces })
    );
    await dispatch(
      setMissingAutoGamePiecesAsync({
        missingAutoGamePieces: missingGamePieces,
      })
    );
  };

  const handleScoringSelection = async (numSelected: number) => {
    setNumSelected(numSelected);
    await dispatch(
      setAutoGamePiecesScoredAsync({ autoGamePiecesScored: numSelected })
    );
  };

  return (
    <>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={5}>
          <AutoIntakePanel
            alliance={mainData.alliance}
            blueOnLeft={mainData.blueOnLeft}
            selected={selectedGamePieces}
            missing={missingGamePieces}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex flex-column" md={4}>
          <AutoScoringPanel
            numIntaked={
              selectedGamePieces.length - missingGamePieces.length + 1
            }
            numSelected={numSelected === undefined ? -1 : numSelected}
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
