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
      <h1 className="text-center mb-3">Stage</h1>
      <Row className="my-5 d-flex justify-content-center">
        <Col className="d-flex">
          <p>Location:</p>
          <ListGroup className="charge-selector text-center w-33 fs-6">
            <ListGroup.Item
              action
              active={selected === "balanced"}
              onMouseDown={() => handleSelection("balanced")}
            >
              Stage Left
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "docked"}
              onMouseDown={() => handleSelection("docked")}
            >
              Center Stage
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "parked"}
              onMouseDown={() => handleSelection("parked")}
            >
              Stage Right
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "failed"}
              onMouseDown={() => handleSelection("failed")}
            >
              Not at Stage
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="d-flex">
          <p>Hanging:</p>
          <ListGroup className="charge-selector text-center w-33 fs-6">
            <ListGroup.Item
              action
              active={selected === "balanced"}
              onMouseDown={() => handleSelection("balanced")}
            >
              Parked
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "docked"}
              onMouseDown={() => handleSelection("docked")}
            >
              No Others
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "parked"}
              onMouseDown={() => handleSelection("parked")}
            >
              1 Other
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "parked"}
              onMouseDown={() => handleSelection("parked")}
            >
              2 Others
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "failed"}
              onMouseDown={() => handleSelection("failed")}
            >
              Failed
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="d-flex">
          <p>Trap Score:</p>
          <ListGroup className="charge-selector text-center w-33 fs-6">
            <ListGroup.Item
              action
              active={selected === "balanced"}
              onMouseDown={() => handleSelection("balanced")}
            >
              No Attempt
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "docked"}
              onMouseDown={() => handleSelection("docked")}
            >
              Failed
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={selected === "parked"}
              onMouseDown={() => handleSelection("parked")}
            >
              Sucessful
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
