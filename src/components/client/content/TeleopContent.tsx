"use client";

import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  updateScoreFieldAsync,
  sendTowerAttempt,
  handleIncap,
} from "@/redux/scoresSlice";
import { FuelIntakeSource, HumanPlayerUsage, TowerLevel, TowerPosition, Segment } from "@prisma/client";
import IncapButton from "../mini/IncapButton";

interface Props {
  show: boolean;
}

//UPDATE CYCLE (Client): Teleop phase scouting for the current game.
//Teleop in REBUILT involves tracking fuel per shift, human player, and tower climbing.
export default function TeleopContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  const [towerLevel, setTowerLevel] = useState<TowerLevel>("LEVEL_1");
  const [towerPosition, setTowerPosition] = useState<TowerPosition>("MID");
  const [towerSucceeded, setTowerSucceeded] = useState(false);

  // Helper to create fuel +/- controls for a given shift
  const FuelShiftCounter = ({ label, field, value }: { label: string; field: string; value: number }) => (
    <Col className="d-flex flex-column align-items-center mb-3" md={2}>
      <h6>{label}</h6>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-danger"
          size="sm"
          className="rounded-circle"
          onClick={() => dispatch(updateScoreFieldAsync({ field, value: Math.max(0, value - 1) }))}
        >
          <b>−</b>
        </Button>
        <span className="fs-3 fw-bold">{value}</span>
        <Button
          variant="outline-success"
          size="sm"
          className="rounded-circle"
          onClick={() => dispatch(updateScoreFieldAsync({ field, value: value + 1 }))}
        >
          <b>+</b>
        </Button>
      </div>
    </Col>
  );

  return (
    <div className={`${!show && "d-none"}`}>
      {/* Fuel per Shift */}
      <Row className="d-flex justify-content-center my-3">
        <Col md={12}>
          <h5 className="text-center mb-3">Fuel Scored per Shift</h5>
        </Col>
        <FuelShiftCounter label="Shift 1" field="teleopShift1Fuel" value={scores.teleopShift1Fuel || 0} />
        <FuelShiftCounter label="Shift 2" field="teleopShift2Fuel" value={scores.teleopShift2Fuel || 0} />
        <FuelShiftCounter label="Shift 3" field="teleopShift3Fuel" value={scores.teleopShift3Fuel || 0} />
        <FuelShiftCounter label="Shift 4" field="teleopShift4Fuel" value={scores.teleopShift4Fuel || 0} />
        <FuelShiftCounter label="Endgame" field="teleopEndgameFuel" value={scores.teleopEndgameFuel || 0} />
      </Row>

      {/* Fuel Source */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={6}>
          <h5>Fuel Source</h5>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {(["DEPOT", "HUMAN_PLAYER", "NEUTRAL_ZONE"] as FuelIntakeSource[]).map((source) => (
              <Button
                key={source}
                variant={scores.teleopFuelSource === source ? "primary" : "outline-primary"}
                onClick={() => dispatch(updateScoreFieldAsync({ field: "teleopFuelSource", value: source }))}
              >
                {source.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Human Player */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={6}>
          <h5>Human Player Usage</h5>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {(["NONE", "RARELY", "SOMETIMES", "FREQUENTLY"] as HumanPlayerUsage[]).map((usage) => (
              <Button
                key={usage}
                variant={scores.humanPlayerUsage === usage ? "success" : "outline-success"}
                onClick={() => dispatch(updateScoreFieldAsync({ field: "humanPlayerUsage", value: usage }))}
              >
                {usage}
              </Button>
            ))}
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" md={3}>
          <Button
            variant={scores.humanPlayerValuable ? "success" : "outline-secondary"}
            className="px-3 py-2"
            onClick={() => dispatch(updateScoreFieldAsync({ field: "humanPlayerValuable", value: !scores.humanPlayerValuable }))}
          >
            {scores.humanPlayerValuable ? "✓ HP Valuable" : "HP Valuable?"}
          </Button>
        </Col>
      </Row>

      {/* Tower Climb */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={8}>
          <h5>Tower Climb</h5>
          <div className="d-flex gap-2 mb-2">
            <span className="align-self-center me-1">Level:</span>
            {(["LEVEL_1", "LEVEL_2", "LEVEL_3"] as TowerLevel[]).map((level) => (
              <Button
                key={level}
                variant={towerLevel === level ? "warning" : "outline-warning"}
                size="sm"
                onClick={() => setTowerLevel(level)}
              >
                {level.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
          <div className="d-flex gap-2 mb-2">
            <span className="align-self-center me-1">Position:</span>
            {(["LEFT", "MID", "RIGHT"] as TowerPosition[]).map((pos) => (
              <Button
                key={pos}
                variant={towerPosition === pos ? "info" : "outline-info"}
                size="sm"
                onClick={() => setTowerPosition(pos)}
              >
                {pos}
              </Button>
            ))}
          </div>
          <div className="d-flex gap-2">
            <Button
              variant={towerSucceeded ? "success" : "outline-secondary"}
              size="sm"
              onClick={() => setTowerSucceeded(!towerSucceeded)}
            >
              {towerSucceeded ? "✓ Succeeded" : "Succeeded?"}
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => {
                dispatch(sendTowerAttempt({
                  segment: "TELEOP" as Segment,
                  level: towerLevel,
                  succeeded: towerSucceeded,
                  towerPosition: towerPosition,
                }));
                setTowerSucceeded(false);
              }}
            >
              Log Tower Climb
            </Button>
          </div>
        </Col>
      </Row>

      {/* Incap */}
      <Row className="d-flex justify-content-center my-2">
        <Col className="d-flex justify-content-center align-items-center" md={4}>
          <IncapButton
            className="text-nowrap my-1"
            active={scores.incapOn}
          />
        </Col>
      </Row>
    </div>
  );
}