/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";
import { ScoringLocation } from "@prisma/client";
import SidewaysToggleBox from "../mini/SidewaysToggleBox";

interface Props {
  active: boolean;
  handleSelection: (
    location?: ScoringLocation,
    failedScoring?: boolean,
    noNote?: boolean,
    missed?: boolean
  ) => void;
  leftStartingZoneEnabled: boolean;
  handleLeftStartingZoneClick: () => void;
}

export default function AutoScoringPanel({
  active,
  handleSelection,
  leftStartingZoneEnabled,
  handleLeftStartingZoneClick,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h1 className="text-center mb-1">Scoring</h1>

      <Row>
        <Col className="mx-1">
          <div className="d-flex flex-column my-3">
            <h3 className="text-center">Speaker</h3>
            <div className="d-flex justify-content-center">
              <ScoreButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(ScoringLocation.SPEAKER, false);
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
                  handleSelection(ScoringLocation.AMP, false);
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
        <Col className="mx-1">
          <div className="d-flex flex-column my-3">
            <h3 className="text-center">No Note</h3>
            <div className="d-flex justify-content-center">
              <FailButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(undefined, false, true, false);
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column my-3">
            <h3 className="text-center">Missed Intake</h3>
            <div className="d-flex justify-content-center">
              <FailButton
                className="mx-3 my-2"
                active={active}
                handleClick={() => {
                  handleSelection(undefined, false, false, true);
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <SidewaysToggleBox
        className="mt-2"
        name="Left Starting Zone"
        enabled={leftStartingZoneEnabled}
        handleClick={handleLeftStartingZoneClick}
      />
    </div>
  );
}
