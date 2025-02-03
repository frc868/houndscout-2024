/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import SidewaysToggleBox from "../mini/SidewaysToggleBox";
import DroppedButton from "../mini/DroppedButton"

interface Props {
  coralActive: boolean;
  algaeActive: boolean;
  handleCoralDropped: () => void;
  handleAlgaeDropped: () => void;
}

//The amount of notes clicked in AutoIntakePanel determines the numbers you can click for Notes Scored.
// 1 (preload) + the number of discs clicked.
export default function AutoScoringPanel({
  coralActive,
  algaeActive,
  handleCoralDropped,
  handleAlgaeDropped,
}: Props) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center mb-5 h-100 mx-5">
        <h1 className="d-flex justify-content-center">Dropped:</h1>
        <div className="d-flex justify-content-center">
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
        </div>
    </div>
  );
}

