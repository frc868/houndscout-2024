/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import IncapButton from "../mini/IncapButton";
import DroppedButton from "../mini/DroppedButton"

interface Props {
  incapActive: boolean;
  coralActive: boolean;
  algaeActive: boolean;
  handleIncap: () => void;
  handleCoralDropped: () => void;
  handleAlgaeDropped: () => void;
}

//The amount of notes clicked in AutoIntakePanel determines the numbers you can click for Notes Scored.
// 1 (preload) + the number of discs clicked.
export default function DroppedPanel({
  incapActive,
  coralActive,
  algaeActive,
  handleIncap,
  handleCoralDropped,
  handleAlgaeDropped,
}: Props) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center h-100 mx-5" style={{backgroundColor:"red"}}>
      <Row className="d-flex justify-content-center">
        <h1 className="d-flex justify-content-center">Dropped</h1>
        <Col className="d-flex justify-content-center">
            <DroppedButton
                className="mx-3 my-2"
                active={coralActive}
                gamePiece="coral"
                handleSelection={() => {handleCoralDropped}}
            />
            <DroppedButton
                className="mx-3 my-2"
                active={algaeActive}
                gamePiece="algae"
                handleSelection={() => {handleAlgaeDropped}}
            />
        </Col>
        <IncapButton
          className="text-nowrap justify-self-end mx-4"
          active={incapActive}
          handleClick={handleIncap}
        />
      </Row>
    </div>
  );
}

