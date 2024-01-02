/* eslint-disable @next/next/no-img-element */
import { GamePiece, IntakeLocation } from "@prisma/client";
import IntakeGroup from "../mini/IntakeGroup";

interface Props {
  selected: [GamePiece, IntakeLocation] | null;
  handleSelection: (selection: [GamePiece, IntakeLocation]) => void;
}

export default function TeleopIntakePanel({
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Intake</h1>

      <div className="d-flex justify-content-center flex-column">
        <IntakeGroup
          className="mb-2"
          name="Shelf"
          coneSelected={
            selected?.toString() ===
            [GamePiece.CONE, IntakeLocation.SHELF].toString()
          }
          handleConeSelection={() =>
            handleSelection([GamePiece.CONE, IntakeLocation.SHELF])
          }
          cubeSelected={
            selected?.toString() ===
            [GamePiece.CUBE, IntakeLocation.SHELF].toString()
          }
          handleCubeSelection={() =>
            handleSelection([GamePiece.CUBE, IntakeLocation.SHELF])
          }
        />
        <IntakeGroup
          className="my-2"
          name="Chute"
          coneSelected={
            selected?.toString() ===
            [GamePiece.CONE, IntakeLocation.CHUTE].toString()
          }
          handleConeSelection={() =>
            handleSelection([GamePiece.CONE, IntakeLocation.CHUTE])
          }
          cubeSelected={
            selected?.toString() ===
            [GamePiece.CUBE, IntakeLocation.CHUTE].toString()
          }
          handleCubeSelection={() =>
            handleSelection([GamePiece.CUBE, IntakeLocation.CHUTE])
          }
        />
        <IntakeGroup
          className="mt-2"
          name="Ground"
          coneSelected={
            selected?.toString() ===
            [GamePiece.CONE, IntakeLocation.GROUND].toString()
          }
          handleConeSelection={() =>
            handleSelection([GamePiece.CONE, IntakeLocation.GROUND])
          }
          cubeSelected={
            selected?.toString() ===
            [GamePiece.CUBE, IntakeLocation.GROUND].toString()
          }
          handleCubeSelection={() =>
            handleSelection([GamePiece.CUBE, IntakeLocation.GROUND])
          }
        />
      </div>
    </div>
  );
}
