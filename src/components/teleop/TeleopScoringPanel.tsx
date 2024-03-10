import { Col, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { ScoringLocation } from "@prisma/client";

interface Props {
  active: boolean;
  handleSelection: (
    location?: ScoringLocation,
    failed?: boolean,
    dropped?: boolean
  ) => void;
}

export default function TeleopScoringPanel({ active, handleSelection }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-1">Scoring</h1>
      <Row>
        <Col>
          <div className="d-flex flex-column my-3">
            <h3 className="text-center">Speaker</h3>
            <div className="d-flex justify-content-center">
              <ScoreButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(ScoringLocation.SPEAKER);
                }}
              />
              <FailButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(ScoringLocation.SPEAKER, true);
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column my-3">
            <h3 className="text-center">Amp</h3>
            <div className="d-flex justify-content-center">
              <ScoreButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(ScoringLocation.AMP);
                }}
              />
              <FailButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(ScoringLocation.AMP, true);
                }}
              />
            </div>
          </div>
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center my-3">
          <h3 className="text-center">Dropped</h3>
          <FailButton
            className="mx-3 my-2"
            active={active}
            handleClick={() => {
              handleSelection(undefined, false, true);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
