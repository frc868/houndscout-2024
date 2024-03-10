import { IntakeLocation } from "@prisma/client";
import IntakeButton from "../mini/IntakeButton";

interface Props {
  selected?: IntakeLocation;
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
        <div className="d-flex flex-column my-2">
          <h3 className="text-center">Chute</h3>
          <IntakeButton
            className="mt-2"
            selected={selected == IntakeLocation.SOURCE}
            handleSelection={() => handleSelection(IntakeLocation.SOURCE)}
          />
        </div>
        <div className="d-flex flex-column my-2">
          <h3 className="text-center">Ground</h3>
          <IntakeButton
            className="mt-2"
            selected={selected == IntakeLocation.GROUND}
            handleSelection={() => handleSelection(IntakeLocation.GROUND)}
          />
        </div>
      </div>
    </div>
  );
}
