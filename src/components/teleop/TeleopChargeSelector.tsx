/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  location: "left" | "center" | "right" | null;
  handleLocation: (
    selection: "left" | "center" | "right" | null
  ) => void;
  harmony: "failed" | "zero" | "one" | "two" | null;
  handleHarmony: (
    selection: "failed" | "zero" | "one" | "two" | null
  ) => void;
  trap: "failed" | "success" | null;
  handleTrap: (
    selection: "failed" | "success" | null
  ) => void;
}

export default function TeleopChargeSelector({
  location,
  handleLocation,
  harmony,
  handleHarmony,
  trap,
  handleTrap,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Stage</h1>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex">
          <p>Location:</p>
          <ListGroup className="charge-selector text-center w-30 fs-6">
            <ListGroup.Item
              action
              active={location === null}
              onMouseDown={() => handleLocation(null)}
            >
              Not at Stage
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={location === "left"}
              onMouseDown={() => handleLocation("left")}
            >
              Stage Left
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={location === "center"}
              onMouseDown={() => handleLocation("center")}
            >
              Center Stage
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={location === "right"}
              onMouseDown={() => handleLocation("right")}
            >
              Stage Right
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="d-flex">
          <p>Harmony:</p>
          <ListGroup className="charge-selector text-center w-40 fs-6">
            <ListGroup.Item
              action
              active={harmony === null}
              onMouseDown={() => handleHarmony(null)}
            >
              Parked
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "zero"}
              onMouseDown={() => handleHarmony("zero")}
            >
              No Others
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "one"}
              onMouseDown={() => handleHarmony("one")}
            >
              1 Other
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "two"}
              onMouseDown={() => handleHarmony("two")}
            >
              2 Others
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "failed"}
              onMouseDown={() => handleHarmony("failed")}
            >
              Failed
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="d-flex">
          <p>Trap Score:</p>
          <ListGroup className="charge-selector text-center w-30 fs-6">
            <ListGroup.Item
              action
              active={trap === null}
              onMouseDown={() => handleTrap(null)}
            >
              No Attempt
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={trap === "failed"}
              onMouseDown={() => handleTrap("failed")}
            >
              Failed
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={trap === "success"}
              onMouseDown={() => handleTrap("success")}
            >
              Sucessful
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
