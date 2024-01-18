/* eslint-disable @next/next/no-img-element */
import { IntakeLocation } from "@prisma/client";
import IntakeGroup from "../mini/IntakeGroup";

interface Props {
  selected: IntakeLocation | null;
  handleSelection: (selection: IntakeLocation) => void;
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
            IntakeLocation.SOURCE.toString()
          }
          handleSelection={() =>
            handleSelection(IntakeLocation.SOURCE)
          }
        />
        <IntakeGroup
          className="my-2"
          name="Ground"
          selected={
            selected?.toString() ===
            IntakeLocation.GROUND.toString()
          }
          handleSelection={() =>
            handleSelection(IntakeLocation.GROUND)
          }
        />
      </div>
    </div>
  );
}
