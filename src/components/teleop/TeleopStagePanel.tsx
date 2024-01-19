//The spotlight and stuff related to the bonuses available at the Amp can be handled by the lead scouter.
//Note that this is very subject to adjustment.

/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  stage: "left" | "right" | "center" | null;
  handleStage: (
    selection: "left" | "right" | "center" | null
  ) => void;
  method: "parked" | "onstage" | "harmony" | "trap" | null;
  handleMethod: (
    selection: "parked" | "onstage" | "harmony" | "trap" | null
  ) => void;
}

export default function TeleopStagePanel({
  stage,
  handleStage,
  method,
  handleMethod
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Stage Location</h1>
      <ListGroup className="charge-selector text-center w-75 fs-5">
        <ListGroup.Item
          action
          active={stage === "left"}
          onMouseDown={() => handleStage("left")}
        >
          Stage Left
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={stage === "right"}
          onMouseDown={() => handleStage("right")}
        >
          Stage Right
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={stage === "center"}
          onMouseDown={() => handleStage("center")}
        >
          Center Stage
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={stage === null}
          onMouseDown={() => handleStage(null)}
        >
          Not at Stage
        </ListGroup.Item>
      </ListGroup>

      <h1 className="text-center mb-3">Stage Method</h1>
      <ListGroup className="charge-selector text-center w-75 fs-5">
        <ListGroup.Item
          action
          active={method === "parked"}
          onMouseDown={() => handleMethod("parked")}
        >
          Parked
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={method === "onstage"}
          onMouseDown={() => handleMethod("docked")}
        >
          Hanging Onstage
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={method === "harmony"}
          onMouseDown={() => handleMethod("harmony")}
        >
          Attempting Harmony
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={method === "trap"}
          onMouseDown={() => handleMethod("trap")}
        >
          Trap Score
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
