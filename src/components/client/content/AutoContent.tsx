"use client";

import AutoCoralPanel from "@/components/client/auto/AutoCoralPanel";
import AutoAlgaePanel from "@/components/client/auto/AutoAlgaePanel";
import DroppedPanel from "@/components/client/common/DroppedPanel";
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
  CoralScoringSide,
  AlgaeScoringLocation
} from "@prisma/client";

interface Props {
  show: boolean;
  coralActiveSide: string;
  coralIntakeLocation?: CoralIntakeLocation;
  coralScoringLevel?: CoralScoringLevel;
  coralScoringSide?: CoralScoringSide;
  handleCoralIntakeSelection: (selection: CoralIntakeLocation) => void;
  handleCoralLevelSelection: (
      level?: CoralScoringLevel,
      dropped?: boolean
    ) => void;
  handleCoralSideSelection: (
      side: CoralScoringSide,
    ) => void;
  handleCoralResultSelection: (
      failedScoring: boolean,
    ) => void;
  algaeActiveSide: string;
  algaeIntakeLocation?: AlgaeIntakeLocation;
  algaeScoringLocation?: AlgaeScoringLocation;
  handleAlgaeIntakeSelection: (selection: AlgaeIntakeLocation) => void;
  handleAlgaeScoringSelection: (
      location?: AlgaeScoringLocation,
      dropped?: boolean
    ) => void;
  handleAlgaeResultSelection: (
      failedScoring: boolean,
    ) => void;
  incapOn: boolean;
}

export default function AutoContent({
  show,
  coralActiveSide,
  coralIntakeLocation,
  coralScoringLevel,
  coralScoringSide,
  handleCoralIntakeSelection,
  handleCoralLevelSelection,
  handleCoralSideSelection,
  handleCoralResultSelection,
  algaeActiveSide,
  algaeIntakeLocation,
  algaeScoringLocation,
  handleAlgaeIntakeSelection,
  handleAlgaeScoringSelection,
  handleAlgaeResultSelection,
  incapOn
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
          <AutoCoralPanel
            activeSide={coralActiveSide}
            intakeSelected={coralIntakeLocation}
            levelSelected={coralScoringLevel}
            sideSelected={coralScoringSide}
            handleIntake={handleCoralIntakeSelection}
            handleLevel={handleCoralLevelSelection}
            handleSide={handleCoralSideSelection}
            handleResult={handleCoralResultSelection}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={4}>
          <AutoAlgaePanel
            activeSide={algaeActiveSide}
            intakeSelected={algaeIntakeLocation}
            locationSelected={algaeScoringLocation}
            handleIntake={handleAlgaeIntakeSelection}
            handleScoring={handleAlgaeScoringSelection}
            handleResult={handleAlgaeResultSelection}
          />
        </Col>
      </Row>
    </div>
  );
}
