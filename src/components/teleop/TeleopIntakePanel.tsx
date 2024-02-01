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
          name="Source"
          selected={
            selected?.toString() ===
            [GamePiece.CONE, IntakeLocation.SHELF].toString()
          }
          handleSelection={() =>
            handleSelection([GamePiece.CONE, IntakeLocation.SHELF])
          }
        />
        <IntakeGroup
          className="mt-2"
          name="Field"
          selected={
            selected?.toString() ===
            [GamePiece.CONE, IntakeLocation.GROUND].toString()
          }
          handleSelection={() =>
            handleSelection([GamePiece.CONE, IntakeLocation.GROUND])
          }
        />
        />
      </div>
    </div>
  );
}
