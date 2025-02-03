import { CoralIntakeLocation } from "@prisma/client";
import IntakeButton from "../mini/TeleopIntakeButton";

interface Props {
  selected?: CoralIntakeLocation;
  handleSelection: (selection: CoralIntakeLocation) => void;
}

//Used to indicate where an game piece intake was.
export default function TeleopIntakePanel({
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Intake</h1>

      <div className="d-flex justify-content-center flex-column">
        <div className="d-flex flex-column my-2">
          <h3 className="text-center">Ground</h3>
          <IntakeButton
            className="mt-2"
            selected={selected == CoralIntakeLocation.TELEOPGROUND}
            handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
            gamePiece="coral"
          />
        </div>
        <div className="d-flex flex-column my-2">
          <h3 className="text-center">Ground</h3>
          <IntakeButton
            className="mt-2"
            selected={selected == CoralIntakeLocation.TELEOPSTATION}
            handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPSTATION)}
            gamePiece="algae"
          />
        </div>
      </div>
    </div>
  );
}
