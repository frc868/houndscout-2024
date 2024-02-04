/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import ScoreGroup from "../mini/ScoreGroup";
import FailButton from "../mini/FailButton";
import { ScoringPosition } from "@prisma/client";

interface Props {
  active: boolean;
  handleClick: (selection: ScoringPosition | "DROPPED" | "SPEAKERFAIL" | "AMPFAIL") => void;
}

export default function TeleopScoringPanel({ active, handleClick }: Props) {
  return (
    <div className="d-flex flex-colum align-items-center">
      <h1 className="text-center mb-2">Scoring</h1>

      <Row className="d-flex flex-row" mb={10}>
        <Col className="mx-2">
          <ScoreGroup
            className="mb-3"
            name="Speaker"
            successActive={active}
            handleSuccess={() => {
              handleClick("SPEAKER");
            }}
            failActive={active}
            handleFail={() => {
              handleClick("SPEAKERFAIL");
            }}
          />
          <ScoreGroup
            className="mt-3"
            name="Amp"
            successActive={active}
            handleSuccess={() => {
              handleClick("AMP");
            }}
            failActive={active}
            handleFail={() => {
              handleClick("AMPFAIL");
            }}
          />
        </Col>
        <Col className="d-flex flex-column justify-content-center mx-2">
          <div className="mb-2">
            <h5 className="text-center">Dropped</h5>
            <FailButton
              active={active}
              handleClick={() => handleClick("DROPPED")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
