/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import ScoreGroup from "../mini/ScoreGroup";
import FailButton from "../mini/FailButton";

interface Props {
  active: boolean;
  handleClick: (selection: "SPEAKER" | "AMP" | "", outcome: "FAIL" | "DROP" | "PICKUPFAIL" | "SUCCESS") => void;
}

export default function AutoScoringPanel({ active, handleClick }: Props) {
  return (
    <div className="d-flex flex-column align-items-stretch">
      <h1 className="text-center">Scoring</h1>
      <Row className="d-flex flex-row justify-content-center">
        <Col className="align-items-center d-flex flex-column mr-3">
          <ScoreGroup
            className="mx-5 mb-3"
            name="Speaker"
            successActive={active}
            handleSuccess={() => {
              handleClick("SPEAKER", "SUCCESS");
            }}
            failActive={active}
            handleFail={() => {
              handleClick("SPEAKER", "FAIL");
            }}
          />
          <ScoreGroup
            className="mx-5 mt-3"
            name="Amp"
            successActive={active}
            handleSuccess={() => {
              handleClick("AMP", "SUCCESS");
            }}
            failActive={active}
            handleFail={() => {
              handleClick("AMP", "FAIL");
            }}
          />
        </Col>
        <Col className="align-items-center d-flex flex-column ml-2">
          <div className="mb-3  justify-content-center align-items-center">
            <h5 className="text-center">Dropped</h5>
            <FailButton
              active={active}
              handleClick={() => handleClick("", "DROP")}
            />
          </div>
          <div className="mt-3 justify-content-center align-items-center">
            <h5 className="text-center">Not Picked Up</h5>
            <FailButton
              active={active}
              handleClick={() => handleClick("", "PICKUPFAIL")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
