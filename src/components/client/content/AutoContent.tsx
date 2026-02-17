
Autocontent · TSX
"use client";

import { useState } from "react";
import { Col, Row, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  setLeftStartingZoneAsync,
  updateScoreFieldAsync,
  sendTowerAttempt,
  handleIncap,
} from "@/redux/scoresSlice";
import { FuelIntakeSource, Accuracy, TowerPosition, Segment, TowerLevel } from "@prisma/client";
import IncapButton from "../mini/IncapButton";
import MobilityToggleBox from "../mini/MobilityToggleBox";

interface Props {
  show: boolean;
}

// UPDATE CYCLE (Client): Auto phase scouting for the current game.
export default function AutoContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  const [towerPosition, setTowerPosition] = useState<TowerPosition>("MID");
  const [towerSucceeded, setTowerSucceeded] = useState(false);

  const incrementFuel = () => {
    dispatch(updateScoreFieldAsync({ field: "autoFuelScored", value: (scores.autoFuelScored || 0) + 1 }));
  };
  const decrementFuel = () => {
    dispatch(updateScoreFieldAsync({ field: "autoFuelScored", value: Math.max(0, (scores.autoFuelScored || 0) - 1) }));
  };

  const getAccuracyColor = (acc: string) => {
    switch (acc) {
      case "LOW": return "danger";
      case "MEDIUM": return "warning";
      case "HIGH": return "info";
      case "VERY_HIGH": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className={`${!show && "d-none"}`}>
      {/* Fuel Counter */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={4}>
          <h5>Fuel Scored</h5>
          <div className="d-flex align-items-center gap-3">
            <Button variant="outline-danger" size="lg" className="rounded-circle px-3" onClick={decrementFuel}>
              <b>−</b>
            </Button>
            <span className="fs-1 fw-bold">{scores.autoFuelScored || 0}</span>
            <Button variant="outline-success" size="lg" className="rounded-circle px-3" onClick={incrementFuel}>
              <b>+</b>
            </Button>
          </div>
        </Col>

        {/* Intake Source */}
        <Col className="d-flex flex-column align-items-center" md={4}>
          <h5>Intake Source</h5>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {(["DEPOT", "HUMAN_PLAYER", "NEUTRAL_ZONE"] as FuelIntakeSource[]).map((source) => (
              <Button
                key={source}
                variant={scores.autoFuelIntakeSource === source ? "primary" : "outline-primary"}
                onClick={() => dispatch(updateScoreFieldAsync({ field: "autoFuelIntakeSource", value: source }))}
              >
                {source.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </Col>

        {/* Accuracy */}
        <Col className="d-flex flex-column align-items-center" md={4}>
          <h5>Accuracy {scores.autoFuelAccuracy && <Badge bg={getAccuracyColor(scores.autoFuelAccuracy)}>{scores.autoFuelAccuracy}</Badge>}</h5>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {(["LOW", "MEDIUM", "HIGH", "VERY_HIGH"] as Accuracy[]).map((acc) => (
              <Button
                key={acc}
                variant={scores.autoFuelAccuracy === acc ? getAccuracyColor(acc) : `outline-${getAccuracyColor(acc)}`}
                onClick={() => dispatch(updateScoreFieldAsync({ field: "autoFuelAccuracy", value: acc }))}
              >
                {acc.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Won Auto & Mobility */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex justify-content-center" md={3}>
          <Button
            variant={scores.wonAuto ? "success" : "outline-secondary"}
            className="px-4 py-2 fs-5"
            onClick={() => dispatch(updateScoreFieldAsync({ field: "wonAuto", value: !scores.wonAuto }))}
          >
            {scores.wonAuto ? "✓ Won Auto" : "Won Auto?"}
          </Button>
        </Col>
        <Col className="d-flex justify-content-center" md={3}>
          <MobilityToggleBox
            enabled={scores.leftStartingZone}
            handleClick={() => dispatch(setLeftStartingZoneAsync({ leftStartingZone: !scores.leftStartingZone }))}
          />
        </Col>
      </Row>

      {/* Tower L1 Attempt (auto only allows L1) */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={6}>
          <h5>Tower L1 Attempt</h5>
          <div className="d-flex gap-2 mb-2">
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
                  segment: "AUTO" as Segment,
                  level: "LEVEL_1" as TowerLevel,
                  succeeded: towerSucceeded,
                  towerPosition: towerPosition,
                }));
                setTowerSucceeded(false);
              }}
            >
              Log Tower Attempt
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