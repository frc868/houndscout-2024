/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { ScoringPosition } from "@prisma/client";

interface Props {
  active: boolean;
  handleClick: (selection: ScoringPosition | "dropped" | "failed") => void;
}

export default function TeleopScoringPanel({ active, handleClick }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-2">Scoring</h1>

      <Row>
        <Col className="mx-2">
          <ScoreButton
            className="mb-2"
            name="Speaker"
            active={active}
            handleClick={() => handleClick(ScoringPosition.SPEAKER)}
          />
          <ScoreButton
            className="mt-2"
            name="Amp"
            active={active}
            handleClick={() => handleClick(ScoringPosition.AMP)}
          />
        </Col>
        <Col className="d-flex flex-column justify-content-center mx-2">
          <FailButton
            className="mb-2"
            name="Failed"
            active={active}
            handleClick={() => handleClick("failed")}
          />
          <FailButton
            className="mt-2"
            name="Dropped"
            active={active}
            handleClick={() => handleClick("dropped")}
          />
        </Col>
      </Row>
    </div>
  );
}
