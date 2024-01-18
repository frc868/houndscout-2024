//This file needs significant changes to fit the stage mechanics, such as the trap, harmony, spotlight, and general hanging.
//Some of this stuff may be omitted for time purposes.

/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  selected: "balanced" | "docked" | "failed" | "parked" | null;
  handleSelection: (
    selection: "balanced" | "docked" | "failed" | "parked" | null
  ) => void;
}

export default function TeleopChargeSelector({
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Charge Station</h1>

      <ListGroup className="charge-selector text-center w-75 fs-5">
        <ListGroup.Item
          action
          active={selected === "balanced"}
          onMouseDown={() => handleSelection("balanced")}
        >
          Balanced
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={selected === "docked"}
          onMouseDown={() => handleSelection("docked")}
        >
          Docked
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={selected === "parked"}
          onMouseDown={() => handleSelection("parked")}
        >
          Parked
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={selected === "failed"}
          onMouseDown={() => handleSelection("failed")}
        >
          Failed
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
