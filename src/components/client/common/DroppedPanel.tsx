/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import IncapButton from "../mini/IncapButton";
import DroppedButton from "../mini/DroppedButton"

interface Props {
  coralActive: boolean;
  algaeActive: boolean;
  handleCoralDropped: () => void;
  handleAlgaeDropped: () => void;
}

//The amount of notes clicked in AutoIntakePanel determines the numbers you can click for Notes Scored.
// 1 (preload) + the number of discs clicked.
export default function DroppedPanel({
  coralActive,
  algaeActive,
  handleCoralDropped,
  handleAlgaeDropped,
}: Props) {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center mt-2">
      <Col className="d-flex justify-content-center align-items-center">
          <h4>Dropped</h4>
          <DroppedButton
              className="mx-1"
              active={coralActive}
              gamePiece="coral"
              handleSelection={handleCoralDropped}
          />
          <DroppedButton
              className="mx-1"
              active={algaeActive}
              gamePiece="algae"
              handleSelection={handleAlgaeDropped}
          />
      </Col>
    </div>
  );
}

