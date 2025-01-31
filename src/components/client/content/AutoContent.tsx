"use client";

import AutoIntakePanel from "@/components/client/auto/AutoIntakePanel";
import AutoScoringPanel from "@/components/client/auto/AutoScoringPanel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

import {
  setLeftStartingZoneAsync,
} from "@/redux/scoresSlice";
import {
  CoralIntakeLocation, 
  AlgaeIntakeLocation,
  CoralScoringLevel,
  AlgaeScoringLocation
} from "@prisma/client";

interface Props {
  show: boolean;
    coralActiveSide: string;
    coralIntakeLocation?: CoralIntakeLocation;
    handleCoralIntakeSelection: (selection: CoralIntakeLocation) => void;
    handleCoralScoringSelection: (
        location?: CoralScoringLevel,
        failed?: boolean,
        dropped?: boolean
      ) => void;
    algaeActiveSide: string;
    algaeIntakeLocation?: AlgaeIntakeLocation;
    handleAlgaeIntakeSelection: (selection: AlgaeIntakeLocation) => void;
    handleAlgaeScoringSelection: (
        location?: AlgaeScoringLocation,
        failed?: boolean,
        dropped?: boolean
      ) => void;
}

export default function AutoContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  handleCoralIntakeSelection,
  handleCoralScoringSelection,
  algaeActiveSide,
  algaeIntakeLocation,
  handleAlgaeIntakeSelection,
  handleAlgaeScoringSelection,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);

  // const [selectedGamePieces, setSelectedGamePieces] = useState<AutoGamePiece[]>(
  //   []
  // );
  // const [missingGamePieces, setMissingGamePieces] = useState<AutoGamePiece[]>(
  //   []
  // );
  // const [numSelected, setNumSelected] = useState<number | undefined>(undefined);

  // const handleIntakeSelection = async (selection: AutoGamePiece) => {
  //   if (
  //     selectedGamePieces.includes(selection) &&
  //     !missingGamePieces.includes(selection)
  //   )
  //     setMissingGamePieces((old) => [...old, selection]);
  //     //If selected game piece already in selected array but not in missing array, adds it to missing array
  //   else if (
  //     selectedGamePieces.includes(selection) &&
  //     missingGamePieces.includes(selection)
  //   ) {
  //     setSelectedGamePieces((old) =>
  //       old.filter((value) => value !== selection)
  //     );
  //     setMissingGamePieces((old) => old.filter((value) => value !== selection));
  //     //If selected game piece is already in both arrays, removes it from both arrays
  //   } else {
  //     setSelectedGamePieces((old) => [...old, selection]);
  //   }

  //   //Then sends the new game piece arrays to the database.
  //   await dispatch(
  //     setAutoGamePiecesAsync({ autoGamePieces: selectedGamePieces })
  //   );
  //   await dispatch(
  //     setMissingAutoGamePiecesAsync({
  //       missingAutoGamePieces: missingGamePieces,
  //     })
  //   );
  // };

  // const handleScoringSelection = async (numSelected: number) => {
  //   setNumSelected(numSelected);
  //   await dispatch(
  //     setAutoGamePiecesScoredAsync({ autoGamePiecesScored: numSelected })
  //   );
  // };

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={5}>
          {/* <AutoIntakePanel
            alliance={mainData.alliance}
            blueOnLeft={mainData.blueOnLeft}
            selected={selectedGamePieces}
            missing={missingGamePieces}
            handleSelection={handleIntakeSelection}
          /> */}
        </Col>
        <Col className="d-flex flex-column" md={4}>
          {/* <AutoScoringPanel
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
          /> */}
        </Col>
      </Row>
    </div>
  );
}
