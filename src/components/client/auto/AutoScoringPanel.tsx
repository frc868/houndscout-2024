/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { ScoringLocation } from "@prisma/client";
import SidewaysToggleBox from "../mini/SidewaysToggleBox";

interface Props {
  numIntaked: number;
  numSelected: number;
  handleSelection: (numSelected: number) => void;
  leftStartingZoneEnabled: boolean;
  handleLeftStartingZoneClick: () => void;
}

export default function AutoScoringPanel({
  numIntaked,
  numSelected,
  handleSelection,
  leftStartingZoneEnabled,
  handleLeftStartingZoneClick,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mb-5 h-100 mx-5">
      <h1 className="text-center mb-1">Notes Scored</h1>

      <Row>
        <Col className="mx-1">
          <div className="d-flex flex-column my-3">
            <ListGroup
              horizontal
              className="stage-selector text-center fs-5 px-5"
            >
              {Array.from(Array(numIntaked + 1).keys()).map((item) => (
                <ListGroup.Item
                  key={item}
                  className={`mx-auto py-2 fs-1 border-0 ${
                    numSelected !== item ? "bg-dark-subtle" : ""
                  }`}
                  active={numSelected === item}
                  onMouseDown={() => handleSelection(item)}
                >
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <SidewaysToggleBox
        className="mt-4"
        name="Left Starting Zone"
        enabled={leftStartingZoneEnabled}
        handleClick={handleLeftStartingZoneClick}
      />
    </div>
  );
}
