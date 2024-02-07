/* eslint-disable @next/next/no-img-element */
import { IntakeLocation } from "@prisma/client";
import IntakeGroup from "../mini/IntakeGroup";

interface Props {
  selected: "GROUND" | "SOURCE" | "";
  handleSelection: (selection: "GROUND" | "SOURCE" | "") => void;
}

export default function TeleopIntakePanel({
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-2">Intake</h1>

      <div className="d-flex justify-content-center flex-column">
        <IntakeGroup
          className="mb-1"
          name="Source"
          selected={
            selected === "SOURCE"
          }
          handleSelection={() =>
            handleSelection("SOURCE")
          }
        />
        <IntakeGroup
          className="mt-1"
          name="Ground"
          selected={
            selected === "GROUND"
          }
          handleSelection={() =>
            handleSelection("GROUND")
          }
        />
      </div>
    </div>
  );
}
