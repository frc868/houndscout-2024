/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  active: boolean;
  handleClick: (selection: "SPEAKER" | "AMP" | "FAILED") => void;
}

//If we have time, maybe add some keyboard shortcuts. That's what the parentheses are for.
export default function AutoScoringPanel({ active, handleClick }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Scoring</h1>

      <Row>
        <Col className="mx-2">
          <ScoreButton
            className="mb-3"
            name="Speaker (S)"
            active={active}
            handleClick={() => {
              handleClick("SPEAKER");
            }}
          />   
          <ScoreButton
            className="mt-3"
            name="Amp (A)"
            active={active}
            handleClick={() => {
              handleClick("AMP");
            }}
          />
        </Col>
        <Col className="d-flex align-items-center mx-2">
          <FailButton
            name="Failed (X)"
            active={active}
            handleClick={() => {
              handleClick("FAILED");
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
