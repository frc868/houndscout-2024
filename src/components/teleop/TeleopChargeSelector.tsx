/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ToggleBox from "@/components/mini/ToggleBox";
import { useState } from "react";
import ChargeButton from "../mini/ChargeButton";
import FailButton from "../mini/FailButton";

interface Props {
  outcome: "failed" | "climbed" | null;
  handleOutcome: (
    selection: "failed" | "climbed" | null
  ) => void;
  harmony: "failed" | "zero" | "one" | "two" | null;
  handleHarmony: (
    selection: "failed" | "zero" | "one" | "two" | null
  ) => void;
  trap: true | false;
  handleTrap: (
    selection: true | false
  ) => void;
  spotlit: true | false;
  handleSpotlit: (
    selection: true | false
  ) => void;
}

export default function TeleopChargeSelector({
  outcome,
  handleOutcome,
  harmony,
  handleHarmony,
  trap,
  handleTrap,
  spotlit,
  handleSpotlit,
}: Props) {
  const [charge, setCharge] = useState<true | false>(false);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Stage</h1>
      <Row className="d-flex justify-content-center">
        <ChargeButton className="ml-5 w-25" active={charge} handleClick={setCharge} />
        <Col className="d-flex">
          <h6>Location:</h6>
          <ListGroup className="charge-selector text-center w-30 fs-10">
            <ListGroup.Item
              action
              active={outcome === "failed"}
              onMouseDown={() => handleOutcome("failed")}
            >
              Failed
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={outcome === "climbed"}
              onMouseDown={() => handleOutcome("climbed")}
            >
              Climbed
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="d-flex">
          <h6># Other Robots</h6>
          <ListGroup horizontal className="charge-selector text-center w-40 fs-10">
            <ListGroup.Item
              action
              active={harmony === "zero"}
              onMouseDown={() => handleHarmony("zero")}
            >
              0
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "one"}
              onMouseDown={() => handleHarmony("one")}
            >
              1
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={harmony === "two"}
              onMouseDown={() => handleHarmony("two")}
            >
              2
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

        <ToggleBox
          name="Scored in Trap"
          enabled={trap}
          handleClick={() =>
            handleTrap(!trap)
          }
        />

        <ToggleBox
          name="Spotlit"
          enabled={spotlit}
          handleClick={() =>
            handleTrap(!spotlit)
          }
        />

      </Row>
    </div>
  );
}
